/**
 * Post-build optimization script.
 * Minifies CSS and JS files in the _site output directory.
 * HTML minification is handled by the Eleventy transform in eleventy.config.js.
 *
 * Run: node scripts/optimize.js
 */

const fs = require('fs');
const path = require('path');
const CleanCSS = require('clean-css');
const { minify: terserMinify } = require('terser');
const sharp = require('sharp');

const SITE_DIR = path.join(__dirname, '..', '_site');

let stats = { css: 0, js: 0, cssSaved: 0, jsSaved: 0, img: 0, imgSaved: 0 };

const IMG_EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp']);
// Skip already-optimized subdirectories produced by eleventy-img and retro-images
const IMG_SKIP_DIRS = new Set(['generated', 'retro']);

function walk(dir, callback, skipDirs = new Set()) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            if (!skipDirs.has(entry.name)) {
                walk(fullPath, callback, skipDirs);
            }
        } else {
            callback(fullPath);
        }
    }
}

async function minifyCSS(filePath) {
    const original = fs.readFileSync(filePath, 'utf8');
    const result = new CleanCSS({ level: 2 }).minify(original);
    if (result.errors.length > 0) {
        console.warn(`  CSS warnings in ${filePath}:`, result.errors);
        return;
    }
    const saved = original.length - result.styles.length;
    fs.writeFileSync(filePath, result.styles, 'utf8');
    stats.css++;
    stats.cssSaved += saved;
}

async function compressImage(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    const original = fs.readFileSync(filePath);
    const originalSize = original.length;

    let compressed;
    if (ext === '.png') {
        compressed = await sharp(original).png({ compressionLevel: 9, quality: 80 }).toBuffer();
    } else if (ext === '.webp') {
        compressed = await sharp(original).webp({ quality: 82 }).toBuffer();
    } else {
        // .jpg / .jpeg
        compressed = await sharp(original).jpeg({ quality: 82, mozjpeg: false }).toBuffer();
    }

    // Only write if we actually saved bytes
    if (compressed.length < originalSize) {
        fs.writeFileSync(filePath, compressed);
        stats.img++;
        stats.imgSaved += originalSize - compressed.length;
    }
}

async function minifyJS(filePath) {
    const original = fs.readFileSync(filePath, 'utf8');
    try {
        const result = await terserMinify(original, {
            compress: true,
            mangle: true,
        });
        if (result.code) {
            const saved = original.length - result.code.length;
            fs.writeFileSync(filePath, result.code, 'utf8');
            stats.js++;
            stats.jsSaved += saved;
        }
    } catch (err) {
        console.warn(`  JS minification skipped for ${path.relative(SITE_DIR, filePath)}: ${err.message}`);
    }
}

async function run() {
    if (!fs.existsSync(SITE_DIR)) {
        console.error(`Error: output directory "${SITE_DIR}" not found. Run the build first.`);
        process.exit(1);
    }

    console.log('Optimizing assets in _site/...');

    const cssFiles = [];
    const jsFiles = [];
    const imgFiles = [];

    walk(SITE_DIR, (filePath) => {
        const ext = path.extname(filePath).toLowerCase();
        if (ext === '.css') cssFiles.push(filePath);
        else if (ext === '.js') jsFiles.push(filePath);
        else if (IMG_EXTS.has(ext)) imgFiles.push(filePath);
    }, IMG_SKIP_DIRS);

    await Promise.all(cssFiles.map(minifyCSS));
    await Promise.all(jsFiles.map(minifyJS));
    await Promise.all(imgFiles.map(compressImage));

    const fmt = (bytes) => `${(bytes / 1024).toFixed(1)} KB`;
    console.log(`  CSS: ${stats.css} files minified, saved ${fmt(stats.cssSaved)}`);
    console.log(`  JS:  ${stats.js} files minified, saved ${fmt(stats.jsSaved)}`);
    console.log(`  IMG: ${stats.img} files compressed, saved ${fmt(stats.imgSaved)}`);
    console.log(`Done. Total saved: ${fmt(stats.cssSaved + stats.jsSaved + stats.imgSaved)}`);
}

run().catch((err) => {
    console.error('Optimization failed:', err);
    process.exit(1);
});

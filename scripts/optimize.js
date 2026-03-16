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

const SITE_DIR = path.join(__dirname, '..', '_site');

let stats = { css: 0, js: 0, cssSaved: 0, jsSaved: 0 };

function walk(dir, callback) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            walk(fullPath, callback);
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

    walk(SITE_DIR, (filePath) => {
        const ext = path.extname(filePath);
        if (ext === '.css') cssFiles.push(filePath);
        else if (ext === '.js') jsFiles.push(filePath);
    });

    await Promise.all(cssFiles.map(minifyCSS));
    await Promise.all(jsFiles.map(minifyJS));

    const fmt = (bytes) => `${(bytes / 1024).toFixed(1)} KB`;
    console.log(`  CSS: ${stats.css} files minified, saved ${fmt(stats.cssSaved)}`);
    console.log(`  JS:  ${stats.js} files minified, saved ${fmt(stats.jsSaved)}`);
    console.log(`Done. Total saved: ${fmt(stats.cssSaved + stats.jsSaved)}`);
}

run().catch((err) => {
    console.error('Optimization failed:', err);
    process.exit(1);
});

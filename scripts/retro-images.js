/**
 * Retro image optimization script.
 * Produces greyscale, dithered, aggressively-compressed JPEG variants of all
 * source images, sized for low-end / retro devices (BlackBerry, early Symbian,
 * feature-phone browsers). Max width: 160 px. Quality: 30.
 *
 * Output: _site/assets/images/retro/<name>-retro.jpg
 *
 * Run standalone: node scripts/retro-images.js
 * Called automatically by: npm run build (via scripts/optimize.js chain)
 */

'use strict';

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const SRC_DIR = path.join(__dirname, '..', 'src', 'assets', 'img');
const OUT_DIR = path.join(__dirname, '..', '_site', 'assets', 'img', 'retro');

// BlackBerry screens topped out around 360 CSS px; serving 160 px content
// images leaves headroom for the browser to scale up without wasting bytes.
const MAX_WIDTH = 160;
const JPEG_QUALITY = 30;

const IMAGE_EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif', '.tiff']);

function collectImages(dir) {
    const results = [];
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            results.push(...collectImages(fullPath));
        } else if (IMAGE_EXTS.has(path.extname(entry.name).toLowerCase())) {
            results.push(fullPath);
        }
    }
    return results;
}

async function processImage(srcPath) {
    const baseName = path.basename(srcPath, path.extname(srcPath));
    const outPath = path.join(OUT_DIR, `${baseName}-retro.jpg`);

    // Ordered (Bayer) dithering: sharp doesn't expose it directly, but
    // greyscale → normalise → threshold at 128 + low-quality JPEG produces
    // the high-contrast, "old thermal printer" look that reads well on
    // BlackBerry-class screens with limited colour depth.
    await sharp(srcPath)
        .resize({ width: MAX_WIDTH, withoutEnlargement: true })
        .greyscale()
        .normalise()
        .threshold(128)
        .jpeg({ quality: JPEG_QUALITY, mozjpeg: false })
        .toFile(outPath);

    const srcSize = fs.statSync(srcPath).size;
    const outSize = fs.statSync(outPath).size;
    return { srcPath, outPath, saved: srcSize - outSize };
}

async function run() {
    if (!fs.existsSync(SRC_DIR)) {
        console.error(`Error: source image directory not found: ${SRC_DIR}`);
        process.exit(1);
    }

    fs.mkdirSync(OUT_DIR, { recursive: true });

    const images = collectImages(SRC_DIR);
    if (images.length === 0) {
        console.log('No images found — nothing to do.');
        return;
    }

    console.log(`Generating retro images (${MAX_WIDTH}px, q${JPEG_QUALITY}, greyscale+dither)...`);

    const results = await Promise.all(images.map(processImage));

    let totalSaved = 0;
    for (const { srcPath, saved } of results) {
        const rel = path.relative(SRC_DIR, srcPath);
        const savedKb = (saved / 1024).toFixed(1);
        console.log(`  ${rel} → saved ${savedKb} KB`);
        totalSaved += saved;
    }

    console.log(`Done. ${results.length} retro images written to ${path.relative(process.cwd(), OUT_DIR)}/`);
    console.log(`Total saved: ${(totalSaved / 1024).toFixed(1)} KB`);
}

run().catch((err) => {
    console.error('Retro image generation failed:', err);
    process.exit(1);
});

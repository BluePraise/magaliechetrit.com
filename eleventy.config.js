const { DateTime } = require("luxon");
const childProcess = require('child_process');
const htmlMinifier = require('html-minifier-terser');
const Image = require('@11ty/eleventy-img');
const path = require('path');

const isProd = process.env.NODE_ENV === 'production';

module.exports = function (eleventyConfig) {

    // Minify HTML output in production builds
    if (isProd) {
        eleventyConfig.addTransform('htmlmin', async (content, outputPath) => {
            if (outputPath && outputPath.endsWith('.html')) {
                return htmlMinifier.minify(content, {
                    collapseWhitespace: true,
                    removeComments: true,
                    minifyCSS: true,
                    minifyJS: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                });
            }
            return content;
        });
    }

    // Add a shortcode to get the latest git commit date
    eleventyConfig.addShortcode('lastCommitDate', function () {
        const lastUpdatedFromGit = childProcess.execSync(`git log -1 --format=%cd --date=short`).toString().trim();
        const formattedDate = DateTime.fromISO(lastUpdatedFromGit).toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY);
        return formattedDate;
    });
    // Add a shortcode to get the latest git commit date
    eleventyConfig.addShortcode('lastCommitHash', function () {
        const lastCommitHash = childProcess.execSync(`git rev-parse --short HEAD`).toString().trim();
        return lastCommitHash;
    });


    eleventyConfig.setServerOptions({
        showVersion: true,
        liveReload: false
    });
    // move css and jpg to output folder
    eleventyConfig.addPassthroughCopy("src/assets/*/**");
    eleventyConfig.addWatchTarget("src/assets/css/*.css");

    // presents current year
    eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

    // presents modified date in format 01-01-2022
    eleventyConfig.addFilter("makeDateReadable", (dateObj) => {
        return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY);
    });

    // Sort articles by dateCreated in descending order
    eleventyConfig.addFilter("sortByDateCreated", (articles) => {
        return articles.sort((a, b) => {
            const dateA = a.data.dateCreated ? new Date(a.data.dateCreated) : new Date(0);
            const dateB = b.data.dateCreated ? new Date(b.data.dateCreated) : new Date(0);
            return dateB - dateA; // Sort in descending order
        });
    });

    // Get the next post in a series
    eleventyConfig.addFilter("getNextInSeries", (collection, currentPost) => {
        if (!currentPost || !currentPost.data || !currentPost.data.series) return null;

        const seriesPosts = collection
            .filter(post => post.data && post.data.series === currentPost.data.series)
            .sort((a, b) => (a.data.seriesNumber || 0) - (b.data.seriesNumber || 0));

        const currentIndex = seriesPosts.findIndex(post => post.url === currentPost.url);
        return currentIndex >= 0 && currentIndex < seriesPosts.length - 1
            ? seriesPosts[currentIndex + 1]
            : null;
    });

    // Get the previous post in a series
    eleventyConfig.addFilter("getPreviousInSeries", (collection, currentPost) => {
        if (!currentPost || !currentPost.data || !currentPost.data.series) return null;

        const seriesPosts = collection
            .filter(post => post.data && post.data.series === currentPost.data.series)
            .sort((a, b) => (a.data.seriesNumber || 0) - (b.data.seriesNumber || 0));

        const currentIndex = seriesPosts.findIndex(post => post.url === currentPost.url);
        return currentIndex > 0 ? seriesPosts[currentIndex - 1] : null;
    });

    // Get all posts in a specific series, sorted by seriesNumber
    eleventyConfig.addFilter("getSeriesPosts", (collection, seriesName) => {
        if (!seriesName) return [];

        return collection
            .filter(post => post.data && post.data.series === seriesName)
            .sort((a, b) => (a.data.seriesNumber || 0) - (b.data.seriesNumber || 0));
    });

    // Responsive image shortcode using @11ty/eleventy-img
    // Usage: {% image "src/assets/images/me.png", "Alt text", "my-css-class", [400, 800] %}
    eleventyConfig.addAsyncShortcode('image', async (src, alt, className, widths = [400, 800, null]) => {
        const absoluteSrc = path.resolve(__dirname, src);
        const metadata = await Image(absoluteSrc, {
            widths,
            formats: ['webp', 'jpeg'],
            outputDir: '_site/assets/images/generated',
            urlPath: '/assets/images/generated',
        });

        const lowsrc = metadata.jpeg[0];
        const highsrc = metadata.jpeg[metadata.jpeg.length - 1];
        const classAttr = className ? ` class="${className}"` : '';

        return `<picture>
  ${Object.values(metadata).map(imageFormat => {
    return `<source type="${imageFormat[0].sourceType}" srcset="${imageFormat.map(e => e.srcset).join(', ')}" sizes="(max-width: 600px) 100vw, 50vw">`;
  }).join('\n  ')}
  <img${classAttr} src="${lowsrc.url}" width="${highsrc.width}" height="${highsrc.height}" alt="${alt}" loading="lazy" decoding="async">
</picture>`;
    });


    return {
        dir: {
            input: 'src',
            includes: '_includes',
            output: '_site',
        },
        markdownTemplateEngine: 'njk',
    }

}

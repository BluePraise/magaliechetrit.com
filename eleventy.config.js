const { DateTime } = require("luxon");
const childProcess = require('child_process')


module.exports = function (eleventyConfig) {

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


    return {
        dir: {
            input: 'src',
            includes: '_includes',
            output: '_site',
        },
        markdownTemplateEngine: 'njk',
    }

}

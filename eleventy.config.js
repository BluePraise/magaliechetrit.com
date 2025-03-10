const pluginRev = require("eleventy-plugin-rev");
const { DateTime } = require("luxon");
const childProcess = require('child_process')


module.exports = function (eleventyConfig) {
    eleventyConfig.addPlugin(pluginRev);
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


    eleventyConfig.setServerOptions({ showVersion: true });
    // move css and jpg to output folder
    eleventyConfig.addPassthroughCopy("src/assets/*/**");   
    eleventyConfig.addWatchTarget("src/assets/css/*.css");

    // presents current year
    eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

    // presents modified date in format 01-01-2022
    eleventyConfig.addFilter("makeDateReadable", (dateObj) => {
        return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY);
    });

    // Sort Posts with `Array.sort`
    eleventyConfig.addCollection("sortPostsAsc", function (collectionApi) {
        return collectionApi.getAll().sort(function (a, b) {
            return a.dateCreated - b.dateCreated; // sort by date - ascending
        });
    });

    return {
        dir: {
            input: 'src',
            includes: '_includes',
            output: 'output',
        },
        markdownTemplateEngine: 'njk',
    }

}

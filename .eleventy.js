const pluginRev = require("eleventy-plugin-rev")
const { DateTime } = require("luxon")


module.exports = function (eleventyConfig) {
    eleventyConfig.addPlugin(pluginRev)
    eleventyConfig.setServerOptions({ showVersion: true })
    // move css and jpg to output folder
    eleventyConfig.addPassthroughCopy("src/assets/")
    eleventyConfig.addWatchTarget("src/assets/css/*.css")

    // presents current year
    eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`)

    // presents modified date in format 01-01-2022
    eleventyConfig.addFilter("makeDateReadable", (dateObj) => {
        return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED)
    })


    return {
        dir: {
            input: 'src',
            includes: '_includes',
            output: 'output',
        },
        markdownTemplateEngine: 'njk',
    }

}
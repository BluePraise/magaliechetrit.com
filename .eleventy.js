const pluginRev = require("eleventy-plugin-rev")

module.exports = function (eleventyConfig) {
    eleventyConfig.addPlugin(pluginRev)
    eleventyConfig.setServerOptions({ showVersion: true })
    // move css and jpg to output folder
    eleventyConfig.addPassthroughCopy("src/assets/")
    eleventyConfig.addWatchTarget("src/assets/css/*.css")
    eleventyConfig.addPassthroughCopy("src/css/")

    // Collections
    // config.addCollection('projects', collection => {
    //     return sortByDisplayOrder(collection.getFilteredByGlob('./src/projects/*.md'));
    // })

    // presents current year
    eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

    return {
        dir: {
            input: 'src',
            includes: '_includes',
            output: 'output',
        },
        templateFormats: ['md', 'njk', 'html'],
        markdownTemplateEngine: 'njk',
        htmlTemplateEngine: 'njk',
        dataTemplateEngine: 'njk',
    }

}
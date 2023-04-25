module.exports = function (eleventyConfig) {
    // move css and jpg to output folder
    eleventyConfig.addWatchTarget("./src/assets/css/*.css")
    eleventyConfig.addPassthroughCopy("*.css")
    // eleventyConfig.addPassthroughCopy("**/*/*/*.jpg")
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
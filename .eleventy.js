module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("**/*/*/*.css")
    eleventyConfig.addPassthroughCopy("**/*/*/*.jpg")
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
    };
}
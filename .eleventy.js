module.exports = function (eleventyConfig) {
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
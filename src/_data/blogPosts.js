const EleventyFetch = require("@11ty/eleventy-fetch")

async function getBlogPosts() {

    const url = `https://libra.nightschool.studio/mc/wp-json/wp/v2/posts`
    const response = EleventyFetch(url, {
        duration: "1d",
        type: "json"
    });
    const articles = await response
    // console.log(articles)
    return articles
}

module.exports = getBlogPosts
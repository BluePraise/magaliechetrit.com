
$(function () {

    $(window).on('load', function () {
        $('.page-loader').delay('400').fadeOut(600);

    });
    $(document).ready(function() {
        new WOW().init();
    });

});

document.addEventListener("DOMContentLoaded", (event) => {
    function startTime() {
        const today = new Date();
        let h = today.getHours();
        let m = today.getMinutes();
        let s = today.getSeconds();
        m = checkTime(m);
        s = checkTime(s);
        document.querySelector('.clock').innerHTML = h + ":" + m + ":" + s;
        setTimeout(startTime, 1000);
    }

    function checkTime(i) {
        if (i < 10) { i = "0" + i };  // add zero in front of numbers < 10
        return i;
    }
    // startTime();
});


// References and sources:
// https://linguinecode.com/post/enable-wordpress-rest-api-cors

// const url = 'https://libra.nightschool.studio/mc/wp-json/wp/v2/posts'
// console.log(url)
// const response = fetch(url)
//     .then(response => response.json())
//     .then(data => data.forEach(post => {
//         console.log(post.title.rendered);
//     }));

// // this one works. Fallback.
// function fetchAllPosts() {
//     let request = new XMLHttpRequest();
//     if (request) {
//         request.onreadystatechange = function () {
//             if (this.readyState == 4 && (this.status == 200 || this.status == 304)) {
//                 // why does a XMLHttpRequest need to be parsed and the fetch does not?
//                 parsedData = JSON.parse(request.responseText);
//                 console.log(parsedData[0].title);
//             }
//         }
//         request.open("GET", url, true)
//         request.send(null)
//     }
// }

// fetchAllPosts();
// import { fetchAllPosts } from '../../_data/blogPosts.js';
// fetchAllPosts();
// console.log('Fetching all posts...');
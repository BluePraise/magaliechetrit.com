$(function () {

    $(window).on('load', function () {
        $('.page-loader').delay('400').fadeOut(600);

    });
});



document.addEventListener("DOMContentLoaded", (event) => {

    // A custom digital clock that shows the current time in the user's locale format.
    function updateClock() {
        const clockElement = document.getElementsByClassName('js-digital-clock')[0];
        if (clockElement) {
            const now = new Date();
            clockElement.textContent = now.toLocaleTimeString(undefined, {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
        }
    }
    // Update the clock every second
    setInterval(updateClock, 1000);
    // Initial call to display the clock immediately on page load
    updateClock();

});

/**
 * Shows more text in hero section when clicking on "Read more" label.
 * @param {string} readMore - The element to click on.
*/
const readMore = document.querySelector('.js-read-more');
if (readMore) {
    readMore.addEventListener('click', function () {
        readMore.classList.remove('block');
        readMore.classList.add('hide');
        if (document.querySelector('.hero-more').classList.contains('hide')) {
            document.querySelector('.hero-more').classList.remove('hide');
            document.querySelector('.hero-more').classList.add('block');
            return;
        }
    });
}

/**
* The more the image in hero section scrolls out of viewport, the grayscale of the image is decreased.
* We use the observer API to detect when the image is out of the viewport.
*/
const heroImage = document.querySelector('.hero-image');
if (heroImage) {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            // Calculate the grayscale and opacity values based on the intersection ratio
            const grayscaleValue = 1 - entry.intersectionRatio;
            const opacityValue = entry.intersectionRatio;
            // Apply the grayscale filter and opacity to the image
            heroImage.style.filter = `grayscale(${grayscaleValue})`;
            heroImage.style.opacity = opacityValue;
        });
    }, {
        threshold: Array.from({ length: 101 }, (_, i) => i / 100) // Create thresholds from 0 to 1 in increments of 0.01
    });

    observer.observe(heroImage);
}

// Lightbox-style modal for .content-image
const contentImage = document.querySelector('.content-image');
if (contentImage) {
    contentImage.addEventListener('click', function () {
        const modal = document.createElement('div');
        modal.classList.add('lightbox-overlay');
        modal.innerHTML = `
            <div class="lightbox-content">
                <button class="lightbox-close" aria-label="Close lightbox">×</button>
                <img src="${contentImage.src}" alt="${contentImage.alt}" />
                <figcaption class="lightbox-caption">${contentImage.alt || 'Image'}</figcaption>
            </div>
        `;
        document.body.appendChild(modal);

        function closeModal() {
            modal.remove();
            document.removeEventListener('keydown', escListener);
        }

        modal.querySelector('.lightbox-close').addEventListener('click', closeModal);
        modal.addEventListener('click', function (e) {
            if (e.target === modal) closeModal();
        });

        function escListener(event) {
            if (event.key === 'Escape') closeModal();
        }

        document.addEventListener('keydown', escListener);
    });
}
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
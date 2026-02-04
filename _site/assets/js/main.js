$(function () {

    $(window).on('load', function () {
        $('.page-loader').delay('400').fadeOut(600);

    });
});



document.addEventListener("DOMContentLoaded", () => {

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
    const heroMore = document.querySelector('#hero-more') || document.querySelector('.hero-more');

    const setExpandedState = (isExpanded) => {
        readMore.setAttribute('aria-expanded', String(isExpanded));
        readMore.textContent = isExpanded ? 'Read less' : 'Read more';
        if (heroMore) heroMore.hidden = !isExpanded;
    };

    setExpandedState(false);

    readMore.addEventListener('click', function () {
        const isExpanded = readMore.getAttribute('aria-expanded') === 'true';
        setExpandedState(!isExpanded);
    });
}

/**
* The more the image in hero section scrolls out of viewport, the grayscale of the image is decreased.
* We use the observer API to detect when the image is out of the viewport.
*/
const heroImage = document.querySelector('.hero-image');
if (heroImage) {
    const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
        heroImage.style.filter = '';
        heroImage.style.opacity = '';
    } else {
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
}

// Lightbox-style modal for .content-image
const contentImages = document.querySelectorAll('img.content-image');
if (contentImages.length) {
    const openLightbox = (triggerImage) => {
        const previousActiveElement = document.activeElement;
        const previousBodyOverflow = document.body.style.overflow;

        const modal = document.createElement('div');
        modal.classList.add('lightbox-overlay');
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-modal', 'true');
        modal.setAttribute('aria-label', 'Image lightbox');

        const captionText = triggerImage.alt || 'Image';
        const captionId = 'lightbox-caption';
        modal.setAttribute('aria-describedby', captionId);

        modal.innerHTML = `
            <div class="lightbox-content">
                <button type="button" class="lightbox-close" aria-label="Close lightbox">×</button>
                <img src="${triggerImage.currentSrc || triggerImage.src}" alt="${triggerImage.alt}" />
                <figcaption id="${captionId}" class="lightbox-caption">${captionText}</figcaption>
            </div>
        `;

        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';

        const inertTargets = [document.querySelector('header'), document.querySelector('main'), document.querySelector('footer')]
            .filter(Boolean);
        inertTargets.forEach((el) => {
            el.setAttribute('aria-hidden', 'true');
            el.inert = true;
        });

        const closeButton = modal.querySelector('.lightbox-close');

        const getFocusableElements = () => {
            const focusableSelector = [
                'a[href]',
                'button:not([disabled])',
                'input:not([disabled])',
                'select:not([disabled])',
                'textarea:not([disabled])',
                '[tabindex]:not([tabindex="-1"])'
            ].join(',');
            return Array.from(modal.querySelectorAll(focusableSelector))
                .filter((el) => !el.hasAttribute('disabled') && el.offsetParent !== null);
        };

        const closeModal = () => {
            document.removeEventListener('keydown', keydownListener, true);
            modal.remove();

            inertTargets.forEach((el) => {
                el.removeAttribute('aria-hidden');
                el.inert = false;
            });

            document.body.style.overflow = previousBodyOverflow;

            if (previousActiveElement && previousActiveElement.focus) {
                previousActiveElement.focus();
            } else if (triggerImage && triggerImage.focus) {
                triggerImage.focus();
            }
        };

        const keydownListener = (event) => {
            if (event.key === 'Escape') {
                event.preventDefault();
                closeModal();
                return;
            }

            if (event.key !== 'Tab') return;

            const focusable = getFocusableElements();
            if (!focusable.length) return;

            const first = focusable[0];
            const last = focusable[focusable.length - 1];

            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        };

        closeButton.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });

        document.addEventListener('keydown', keydownListener, true);
        closeButton.focus();
    };

    contentImages.forEach((img) => {
        img.setAttribute('tabindex', '0');
        img.setAttribute('role', 'button');
        img.setAttribute('aria-label', `Open image in lightbox: ${img.alt || 'Image'}`);

        img.addEventListener('click', () => openLightbox(img));
        img.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                openLightbox(img);
            }
        });
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
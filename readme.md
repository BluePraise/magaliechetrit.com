# Welcome to my site
[![Netlify Status](https://api.netlify.com/api/v1/badges/05ee597d-181b-4a9b-a205-799e28bcce29/deploy-status)](https://app.netlify.com/projects/magaliechetrit/deploys)

## What it is this site built with?
- [Eleventy.js](https://www.11ty.dev)
- [Nunjucks](https://github.com/mozilla/nunjucks)
- Netlify

## About CSS Structure
Style.css contains the main styles for the site or elements that are used in all pages. The rest of the styles are in the respective pages.
For example: there should only be one H1 on a site so why give it a classname? Just style it in the main stylesheet.

### Responsive.css
There's a separate responsive css file which is easier for tweaking the many breakpoints I've set. I've tried to keep the breakpoints to a minimum but I've found that it's easier to tweak the styles in a separate file.

## Responsive Breakpoints
- 320px
- 480px
- 768px
- 1024px
- `> 1280px`

### Styling feature
`.highlight` class is used for highlighting text. It's a css var `--highlight-color` which is a light green color.

### Content elements
#### Job Title in Portfolio items
For Portfolio items sometimes I'd like to add a job title and sometimes I don't. There's a conditional in the nunjucks file that checks if there's a job title and if there is it will display it.

### To-Do
- [x] convert to eleventy.js
- [x] add Nunjucks
- [x] Add a fixed topbar
- [ ] replace jquery with vanilla javascript
- [x] replace bootstrap with my own css
- [x] use more css vars
- [ ] multilingual
- [ ] about page
- [x] fix relative path structures
- [x] make site semantic (add sections)
- [x] fix blog links
- [ ] Modular JavaScript
- [x] Automatic Deployment (CD) -> Used Github Actions
- [x] Make date dynamic
- [x] Adapt taskrunner to copy css to output folder
- [x] Add portfolio section
    - [x] Add ArtEZ Press gif
    - [x] Add McD As Featured In gif
- [x] Add skills section
- [x] A11Y
- [ ] Make all CSS Values scalable to the viewport
- [x] Better naming convention for `.section-label`. It is being used for a button too.



### Removed Tasks
- [ ] Add testimonial section
- [ ] Add resume section
- [ ] Move .table-grid css to frontpage.css
- [ ] replace Inter with an nicer font
- [ ] Implement React or Vue.js < we're never using React if we have a choice. >
- [ ] Update github actions with newer node (see github actions) <moved to Netlify>

### Some sparkles ✨
1. I demand great A11Y.
2. I demand great performance.
3. I do not care about SEO.
4. I want to show that partials are possible and very practical.

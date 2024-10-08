Styleguide for Magaliechetrit.com
Updated: 04 August 2024
Version: 0.5

# Colors
## Highlight/Accent
- Highlight/Accent Color: #28e98c;
(is a ccs var `--highlight-color`)
`.highlight`:
    - color: var(--highlight-color);


# Typography

## Headings

### Guidelines
- H1 only in header.
- H2 for main sections.
- H2 for page titles
- Default color: black.
- Default font-family: Bricolage Grotesque `var(--header-font)`

_Including margins and responsive sizes._
- H1 `.site-title`:
    - font-size: 24px
- H2
    `h2.heading__huge`:
    _Used on homepage_
    Large titles.
    - font-size: clamp(1.4rem, 12.5vw, 12.5vw);

    `h2.heading__large`:
    _used on section titles_
    - font-size: clamp(1.4rem, 12.5vw, 12.5vw);

    `h2` and `heading__medium`:
    _Used on project titles on single page_
    - font-size: clamp(2rem, 4vw, 4rem);
    - line-height: 1;
    - font-weight: 300;

- H3
    I found that 2rem works well within the container size on all devices.
    `h3` (no class. in article content `.article-content h3`):
    _Used on article title, article h3 in content and project detail_
    - font-size: 2rem;
    - font-size: 1.5rem;
    - font-weight: 300;

- Small Text
`span.text__small`:
    - font-size: 12px
    - font-weight: 400

- Meta Data
_Used for portfolio items, for articles_
`.meta`:
    - font-family: var(--header-font);
    - font-size: 12px
    - font-weight: 400
    - display: block;
    - margin-bottom: 0px;


## Buttons
- Buttons are wrapped in a div with class `.buttons`

_button styling, for now only one button_
`.button__primary`:
    - padding: 10px 20px;
    - border: 1px solid black;
    - margin-bottom: 20px;
    - font-family: var(--header-font);
    - font-size: 24px;
    - transition: all 0.3s ease;
    - display: inline-block;
    - text-decoration: none;

`.button__primary:hover`:
    - background-color: black;
    - color: white;

## Containers
Unified container styling for all
_uses `^=` to select all classes starting with container_
`[class^="container__"]`:
- width: 100%;
- margin: 0 auto;
- padding: 0 20px;

`.container__medium`:
    - max-width: 60%;
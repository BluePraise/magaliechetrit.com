Styleguide for Magaliechetrit.com
Updated: 8 May 2024
Version: 0.2.1

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

    `h2` and `heading__medium`:
    _Used on blog titles and project titles on single page_
    - font-size: clamp(2rem, 4vw, 4rem);
    - line-height: 1;
    - font-weight: 300;

- H3
    I found that 2rem works well within the container size on all devices.
    `h3` (no class. in article content `.article-content h3`):
    _Used on article and project detail_
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
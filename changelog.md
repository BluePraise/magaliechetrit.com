# Changelog
(more like a worklog)

## 06 August 2024
- Updated gitignore to exclude output files.
- Updated hero text with more details.
- Removed WOW from the project.
- Removed masonry.js from the project. Unused.
- Removed lightbox.js from the project. Unused.
- Removed smooth-scrollbar.js from the project. Unused.

## 05 August 2024
- File restructure. Included a `detail-views` folder for detail views such as articles and portfolio items.
- Fixed UTC date off by 1 day.

## 04 August 2024
- Updated client sections. It no longer uses logo images. Instead, it uses a list of clients.
- Added a new partial for resume buttons. There is now a paid download for my resume.
- Added `_resume-buttons.njk` to article detail view and porfolio item view.
- Temporarily commented out read more button on articles view.
- Removed redundant code from `_base.njk`.
- Updated styleguide to reflect addition of resume buttons.

## 22 May 2024
- Updated classnames for containers throughout the site to match the typography naming.
- Updated hero and footer partial to reflect changes in classnames.
- Portfolio has a conditional for `jobTitle`.
- Updated Readme. Wow. I should have done this earlier.
- Removed heading styling from h3 article title. It's now a default h3.
- Updated styleguide.md to reflect changes.

## 20 May 2024
- Removed spacings in As featured in
- Updated techstack in As featured in
- Added content to Modem.Work

## 10 May 2024
- Updated all headings articles and projects to conform to semantic structure.
- Renamed blog to articles to adhere to logical structure.
- Updated styleguide to reflect changes in `h3` headings.
- Renamed classes for articles for uniformity in naming convention.
- Cleaned up styling for article detail view.
- Renamed `.article-subtitle` to `.subtitle` for uniformity. (new applied uniformity removed the need for more styling ✨)
- Semantic structure and A11y applied to project detail page.
- Conditional on subtitle because not all projects need a subtitle.
- Reduced timing on fade in animation.
- Added index to stylesheet for readability.

## 9 May 2024
- Unfified `h2` headings everywhere.
- Blog posts, articles, and portfolio items (on detailpages) now have the same styling for headings.
- Updated styleguide to reflect changes in headings.
- Removed media query for headings due to the use of `clamp` for font-size.

## 8 May 2024
- Merged styling for metadata by using one class for all meta data: `meta`.
- Changed css variable name for highlight color to `--highlight-color`.
- Updated styleguide to reflect changes in metadata styling.
- Uniformity in read more links by adding icons
- Changed heading from `h1` to `h2` in blog overview partial.

## 7 May 2024
- Filtered out portfolio items that are not projects on the front page.
- Added a styleguide to keep better track of changes v0.1 has typography
- A11y check on `blog-posts` partial ✅
- A11y check on `article` partial ✅
- A11y check on `hero` partial ✅

## 24 April 2024
- Added new article: Why I use LinkedIn for contact requests and resume.
- Moved portfolio items to a partial.
- Added blog-posts partial.
- Updated articles.
- Added conditionals to elements to prevent empty HTML.
- Added span to back link in detail pages.
- Updated font-weight Bricolage Grotesque from 200 to 800.
- Updated images for two portfolio items.

## 27 December 2023
- Fixed date in eleventy config
- Added new articles

## 21 November 2023
- Changed layout again.
- Fixed page loader

## 28 September 2023
- Keep it simple: removed navigation
- Removed most js
- Can't add more portfolio items

## 08 September 2023
- Decided to remove fixed sidebar since it added no value and only complexity.
- Changed content width to 960px

## 24 August 2023
- CSS values are now in VW. This is to make the site more responsive.
- Some CSS responsive code are in their respective files, because of hierarchy issues.

## 17 August 2023
- Clients Logo's

## 16 August 2023
- Added hero.css
- Restructured folder structure
- Reworked left sidebar to be more semantic
- Styling for left sidebar is only for > 1440px
- Reworked hero section
- Removed section label in hero section
- Working on Typography CSS
- Updated fade in animation
- Reworked the layout grid
- Added animations to elements on sidebar left

## 2023, March 2
- Updated content encrypted email
- Updated content referral links
- Responsive styling added for screens with a viewport of 410px and lower resolution.

## 2023, February 28
- Changed order of changelog
- Updated metadata in `<head>`

## 2023, January 14.
- Started to remove all spaces from files
- Added fancy header
- Folder structure
- Style fixes in writing
- Added additional paragraphs in content on frontpage
- Class text-container has a small box
- Added link color for careless css
- Removed navigation temporarily from front page
- Changed style of H3
- Updated work grid/table
- Updated footer to align with rest of sections
- Removed IRC

## 2022, August 30.
- Header height is now full screen height
- I chose an emoji

## 2022, July 11.
- Added a changelog to article

## 2022, July 10.
- Finished article/search-filter-js!
- Added buymeacoffee
- Updated careless.css
- Updated technical parts about this site
- Added navigation

## 2022, July 5.
- Changed background color
- Moved fonts out of careless css and into custom css
- Bumped Mint Grotesk to V13
- Updated to do list
- Updated content
# Changelog
16 August 2023
- Added hero.css

7 April 2023
- Updated resume
- Turned off icon
- Added activity and skills in resume
- Updated social links

31 March 2023
- Added Eleventy
- Added support for Nunjucks
- Set up structure to support Nunjucks
- Removed redundant code for left sidebar
- Better look and feel for responsive
- Added rainbow buttons - copied from Eleventy.js site
- Improved file structure by using partials
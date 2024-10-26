---
title: How to get the latest Git commit date using 11ty
author: Magalie Chetrit
dateCreated: 2024-09-29
dateModified: 2024-08-31
tags: post
image:
imageAlt:
description: I wanted to add the latest commit date to the footer of my site. Here's how I did it.
---
### An archive piece for my future self

I would say I am a medior when it comes to JavaScript, SPG and CI/CD. As I am self taught, I am still searching for the best way to do things. Especially, when it comes with folder structure. But as with everything coding, baby steps.

For a while I have wanted to have the date in the footer of my site to be the latest commit date. I couldn't figure out how to do it from the [11ty documentation](https://www.11ty.dev/docs/dates/). In the documentation it states to use `git Last Modified` or `git Created`. In my current configuration this would return "Invalid Datetime".

### Search trail references:
- [11ty documentation](https://www.11ty.dev/docs/dates/)
- [Add Build Info to an 11ty Site](https://www.aleksandrhovhannisyan.com/blog/eleventy-build-info/) The suggestion in step 3 didn't really work for me.
- [11ty plugin git](https://www.npmjs.com/package/eleventy-plugin-git) I couldn't make this work.

### The solution: Make my own shortcode
After actually reading the articles, I figured out that I could make my own shortcode.
<script src="https://gist.github.com/BluePraise/c4e4897c47a11e1ed8aa8a935defa7f4.js"></script>
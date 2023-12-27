---
title: How to make a search filter with pure JavaScript
author: Magalie Chetrit
dateCreated: 2022-07-05
date: Last Modified
tags: post
image:
imageAlt: Magalie Chetrit
description: I was working on a project for a friend and she wanted a search filter on her site. Most active search filters require a database connection or XHR requests. That was a bit too heavy for me. All I wanted was a functionality that searched through the current page, something light and simple. I couldn't really find anything so I set about making one myself
---
 I was working on a project for a friend and she wanted a search filter on her site. The search filter is supposed to search through a list of work that she has on various pages.
 Most active search filters require a database connection or XHR requests. That was a bit too heavy for me. Other search filters were difficult to adapt to what my friend wanted.
 All I wanted was a functionality that searched through the current page, something simple, light and adjustable. It was really hard to find something like that. So I set about making one myself.

The search filter I created is a simple JavaScript function that searches through a list of items and hides the items that don't match the search query. It's a simple function that can be used on any page. It's also very easy to adapt to your own needs. I've used it on a few projects now and it's been working great.

I'm working on a few improvements but I wanted to share it with you. I hope you find it useful.
## List of requirements.
- Lightweight
- Flexible and easy to adapt to different projects
- Easy to implement
- No database connection
- No XHR requests
- No jQuery
- No plugins
- No dependencies
- No CSS frameworks
- Show search results after two characters have been typed

## List of To-Dos
- Show a message when there are no results
- A reset button


## The Demo.
<p class="codepen" data-height="600" data-theme-id="dark" data-default-tab="result" data-slug-hash="MWxWXyE" data-user="magaliechetrit" style="height: 600px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/magaliechetrit/pen/MWxWXyE">
  A Simple Search Filter with Vanilla Javascript</a> by Magalie Chetrit (<a href="https://codepen.io/magaliechetrit">@magaliechetrit</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

## The HTML Markup.
A simple search input with a class of `js-search-field` and a list item with a class of `js-search-item`. I am using the prefix `js-` prefix to indicate that this is a class that will be used in JavaScript. It's a convention that I like to use to keep things organized.

```<input type="search" class="js-search-field" placeholder="Type a word.."/>```

With just this simple search input it's easy to add it to any place. I've even implemented in a WordPress project. The only thing you need to do is add the class `js-search-field` to the search input.

## The items to be searched (search dataset).
In this case, the dataset is the list of items that we want to search through. In my demo, I am using a list of random list items. Each item has a class of `js-search-item` which is set in an array called `searchItems`.

The meat of the operation is in the function `renderResults`. This function is called when the user types in the search field. The function loops through the array `searchItems` and checks if the search query matches any of the items in the array. If it does, it shows the item. If it doesn't, right now it does nothing. But it would be nice if it showed a message that there are no results. See To Do List.

## Key takeaways.
Lately, I've been on a big kick to learn more about JavaScript. I've been using it for a while but I've never taken the time to learn it properly. I was a little scared of it, I think. I mainly defaulted to jQuery. I still appreciate jQuery. It's one of the best libraries on the web.

Using vanilla JavaScript taught me to appreciate the sequence of rendering of a website.

I also understand other languages such as PHP much better. I know PHP is a server-side language, but because I was exposed to new principles I understand the MVC patterns and why some things are done the way they are.

Debugging is also much easier in vanilla JavaScript. I've learned to use the console and the debugger. I've also learned to use the `debugger` keyword. It's a great way to stop the code at a certain point and see what's going on.

Let me know if you have any questions or suggestions. I'm always open to learning new things. And I would love to know if you've used this in any of your projects, shoot me an email!
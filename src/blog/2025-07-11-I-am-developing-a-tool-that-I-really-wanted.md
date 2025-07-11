---
title: Hello. I am developing a tool I really wanted.
author: Magalie Chetrit
dateCreated: 2025-07-11
tags: ['post', 'post-by-email']
series: post-by-email
seriesNumber: 1
image:
imageAlt:
description: Here are some tips for privacy on the web.
---
The internet used to be a fun place, but currently I am very burnt out on the current state of the internet. Instagram was the straw that broke the camel's back. On top of that all of the demands that the housekeeping of accounts require is just too much for me. We need to install password managers, 2FA and update these regularly.

For a really long time, I want to be able to email posts to my websites. I want to use the email app of my choice and then simply send it off. It is not a popular request or very interesting to many. This feature already exists in WordPress and before this in Tumblr.

My schedule freed up, so now is a good time to work on it. This is a good full stack development project to help me discover new tools and learn about other areas where I am need some more exposure. Web architecture, security and Node.js come to mind.

I had a long discussion with ChatGPT and ClaudeAI to knock out the requirements and get some insights on what I may expect. It turns out to be a huge undertaking if I don't keep it very very small for now. The discussions digressed into AWS Lambda, self hosting email servers on my synology, Next.js, email security.

It seems more sensible to keep it small so I manage to understand each step. Keep in mind I have only helpt built something, but never took the steps to really start building something by myself. When web developers get stuck, we usually ask the person that's stuck "What are you trying to have it do? What are you trying to accomplish?". This is helpful now too.

I want to send an email to a dedicated email address and the content of that email will be used as a post on my website. I don't want to log into a CMS or deal with code editors. You know how you post on instagram? Well, it needs to be like that, but then by email. Post by E-Mail.

Breaking things down we'll need to:
1. Receive an email (securely),
2. Parse (or convert) email content to HTML,
3. Place post in site in the form of a html file.

Starting small, means we need to also leave some cool ideas for later. No AWS SES or Synology mail server for now. We also won't deal with images, because that adds some complexity with AWS or other cloud storages. And we have to wait with database or headless CMS until later.

It is a milestone when these blogposts are sent through email. I can't wait.

Let's start at the beginning with step 1!
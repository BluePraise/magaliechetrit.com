---
title: Post-by-Email Development Log 2 - Demo Built, Mailgun Lessons, and the Power of Small Steps
author: Magalie Chetrit
dateCreated: 2025-07-14
tags: ['post', 'post-by-email']
series: post-by-email
seriesNumber: 2
imageAlt:
description: Building a tool to email posts directly to my website - one step at a time
---
Progress update on my post-by-email project! If you missed the beginning of this journey, [check out part 1](https://magaliechetrit.com/blog/2025-07-11-I-am-developing-a-tool-that-I-really-wanted/) where I explained why I'm building this and what I'm trying to accomplish.

### What I Built This Week
I've made some real progress! I successfully created a demo project and deployed it to Netlify. More importantly, I dove deep into the email handling side of things and learned a ton about the underlying architecture.

### Setting Up Mailgun
I started by integrating Mailgun for email forwarding. The setup process was educational, as in difficult. Mailgun's UI is nice if you want to test simple scenarios.

### Getting Familiar with Email Processing and Netlify deploys
To handle the email parsing logic, I had to write my first Netlify function. This was actually a little daunting. I used [Mailparser](https://nodemailer.com/extras/mailparser), an NPM package I'd never worked with before. It forced me to understand how email parsing works and how Node and Netlify functions operate.

This is the email recieving function I wrote:
<script src="https://gist.github.com/BluePraise/b905ea6b36b8b843cd8612024b4a02e9.js"></script>
If you have JS disabled or use blockers, this is the link to [my Github Gist](https://gist.github.com/BluePraise/b905ea6b36b8b843cd8612024b4a02e9)

I built a demo and deployed it to Netlify. But first I tried it out on local!

![Success working on local, but not when I deployed to Netlify](/assets/img/2025-07-14-getting-very-familiar-with-email-standards.png)

### Why Mailgun Didn't Make the Cut
After getting everything set up, I realized Mailgun wasn't going to work for my use case. Two main issues:

1. MIME limitations: I couldn't get the MIME handling I needed for future features
2. Poor logging: The debugging experience was frustrating when things went wrong

I overestimated Mailgun's free tier and MIME turned out to be more important than I initially realized. It's the standard that defines how email content is structured, especially when you have mixed content types like text, HTML, and attachments. It's going to be essential for what I'm building. The MIME issue was the real dealbreaker. While I could have taken a shortcut and parsed emails as JSON for now, that would have been shortsighted.

### Taking Architecture Seriously
This is where I'm proud of the decision I made. I could have pushed forward with a quick JSON-based solution, but I stopped and thought about the bigger picture. If I want to eventually support:

- Email attachments (images for blog posts!)
- Rich HTML content
- Better formatting options

Then I need proper MIME support from the start. Building on shaky foundations would just create technical debt I'd have to deal with later.

### What's Next: The Email Service Hunt
Now I'm researching alternatives. My current list includes:

- BREVO
- SendGrid
- Mailjet
- Postmark
- Forward Email
- Scaleway Transactional Email

I'm looking for something that gives me the MIME support I need while also providing better logging and debugging capabilities. And for now I need it to be free.

### Updating the Project Management
I need to update my GitHub issues tracker to reflect what I've learned. The original plan was a bit too optimistic about sticking with Mailgun, so I'm adjusting the roadmap.
You can still follow along with the project at the [GitHub repo issues](https://github.com/BluePraise/post-by-email/issues) - I keep the issues updated as I go.

### 💎 Personal Learning: Taking Projects Seriously
Here's something that might resonate with other developers: I've always struggled with taking my side projects seriously. There's something about personal projects that makes me want to rush through them, cut corners or discard. But this project is different. Maybe it's because I've wanted this feature for so long, or maybe I'm just at a different point in my development growth. Either way, I'm finding myself making thoughtful architectural decisions instead of just trying to get something working quickly. The decision to abandon Mailgun despite having it working is a perfect example. Old me would have said "good enough" and moved on. Current me is willing to take the time to build something sustainable.

Another example is using Netlify vs my own SiteGround hosting. Siteground hosting is amazing for WordPress projects. But using email comes with security considerations and working PHP will be a lot of ground to cover in this early stage. I am looking forward to build something with it when this feature has evolved.

### The Power of Small Steps
One thing I'm really appreciating is how breaking this project into tiny pieces is making it manageable. Each step teaches me something specific, and I'm not getting overwhelmed by the bigger picture.
This week I learned about:

- MIME and email structure
- Netlify Functions
- Mailparser NPM package
- Architecture decisions

None of these are earth-shattering on their own, but together they're building toward something I'm genuinely excited about.

### What's Coming Next
Next week I'll be diving into the email service research and hopefully settling on a replacement for Mailgun. I'm also planning to document the technical requirements I've discovered so far - turns out there were some assumptions in my original plan that needed updating. The goal is still the same: I want to email this very blog post to my website instead of writing it in a code editor. We're not there yet, but every step is getting me closer.
***
Following along with this project? I'd love to hear your thoughts in the [GitHub discussions](https://github.com/BluePraise/post-by-email/discussions/24) or [feel free to reach out](mailto:email@magaliechetrit.com)!
---
title: McDonald's Restaurant Experience
subtitle: A custom campaign planning tool for McDonald's North America
introduction: Enterprise campaign planning platform enabling McDonald's restaurants across North America to create, schedule, and manage marketing campaigns through quarterly and monthly timelines. Features comprehensive user management, approval workflows, and real-time collaboration tools.
years: 2025, 2024
order: 4,
dateCreated: 2025-03-04
dateModified: 2025-06-16
tags: ['project', 'post']
imageFront: /assets/img/mcdrive-jurij-kenda-OcMKDx5y11A-unsplash.jpg
featuredImage: /assets/img/mcdrive-jurij-kenda-OcMKDx5y11A-unsplash.jpg
featuredImageAlt: McDonald's Restaurant Experience
technologies: ['React', 'TypeScript', 'Redux', 'Git', 'Gradle', 'Tailwind', 'JIRA', 'Figma', 'Node.js', 'Docker', 'MySQL', Rest API]
jobTitle: Senior Web Developer
---
### Introduction
<img
  src="/assets/img/mcd-january-2024-breakfast.png"
  alt="January 2024 Breakfast Campaign Materials"
  class="content-image"
/>
*Visual reference: January 2024 promotional campaign touchpoints across in-store and drive-thru displays*

Let me paint a picture.

Imagine you walk into a McDonald’s—not in New York or LA, but maybe somewhere like Fargo or Fresno. You see a promo for a seasonal campaign: maybe it’s Monopoly, maybe it’s Grimace’s birthday (yes, that was real), or maybe it’s a locally approved charity drive. What you don’t see is the digital machinery powering that decision—how it got scheduled, translated, reviewed, approved, and pushed live across thousands of restaurants.

That’s where REX comes in. (Technically it's the “Restaurant Experience” platform. Internally, we sometimes called it RIQ. Either way, same beast.)

And I helped build that.

### The challenge: legacy code, real deadlines, and real people relying on you

When I joined the project, REX already existed—but it was clunky. Think: hardcoded values, inconsistent state logic, brittle components that snapped under the weight of real business rules. Worse? The devs before us didn’t leave great documentation (sound familiar?).

Our job was to not only *stabilize* the system, but to modernize it—without breaking the workflows of the people already using it daily. These weren’t just internal teams. We were talking about franchise owners, regional marketers, and store managers who needed the system to do one thing above all else: **just work.**

So we made it work. And we made it better.

### What it actually *does* (and why it matters)

REX is a campaign planning tool for all McDonald’s restaurants across North America. It’s where new offers get created, added to calendars, reviewed by marketing leads, and eventually published across multiple timelines—quarterly and monthly views, with full scheduling logic baked in.

I personally developed the right panel interface used for campaign input—complete with Material UI components, date-fns, and robust date validation logic to enforce complex business rules. I also built the comments component by myself, implementing finely tuned visibility logic based on user roles—some users could see all comments, others only their own or those from specific stages of the workflow.

Some of the things we handled:

- User management with granular roles (admin, editor, regional approver, etc.)
- Real-time collaboration features—comments, approval workflows, status indicators
- Smart date validation (no more overlapping campaigns unless explicitly allowed)
- Custom React components for repeatable campaign elements

All of it backed by a MySQL database, REST API, Dockerized environments, and a deeply integrated design system built in Figma. My role focused on the front-end React/TypeScript architecture and its harmony with back-end constraints. Which is a fancy way of saying: I wrangled complexity so it felt simple.

### Behind the scenes: the messy, beautiful part of the job

You know what’s funny? People often think big projects hinge on the code. And yeah, of course—it matters. But what *really* made this work was communication. It was the 15-minute Slack huddles when something broke in QA. It was the async threads with design when component specs needed clarification. It was the calls with business analysts to say, “Wait, can you explain *why* this logic matters again?”

I thrived on that. I *like* being the person who bridges the technical with the human.

### Tools of the trade (because someone will ask)

- **React + TypeScript** – Custom components, reusable logic, hooks for days.
- **Redux** – Predictable state management (and yes, we kept it lean—no bloat).
- **Tailwind CSS** – Because design fidelity mattered and we needed to move fast.
- **Node.js + Docker** – Back-end API integration and containerized deployments.
- **MySQL** – Our campaign data lived here.
- **Gradle** – For building and bundling.
- **JIRA** – Sprint planning, ticket triage, all that fun stuff.
- **Figma** – Source of visual truth. Sometimes source of confusion. But we worked through it.

### What I’m proud of (and why it’s more than just “shipping”)

We didn’t just deliver a refactor. We delivered a **trustworthy tool**. One that respected people’s time. One that caught issues *before* they caused headaches. One that quietly let campaigns go live across the continent without fanfare—which, honestly, is kind of the goal.

A moment that stuck with me? A regional manager told our team, “It finally feels like the platform *knows* how we work.” That was it. That was the win.

### So… what’s the takeaway?

This wasn’t about bleeding-edge innovation. It wasn’t about some sleek public launch. It was about building something people actually use—and making their jobs smoother.

If you're a hiring manager reading this, and you’re looking for someone who can navigate chaos, communicate clearly, and ship features that stick—I’d love to talk.

Because these are the kinds of projects I *want* to be working on: quietly powerful, deeply useful, and made with care.

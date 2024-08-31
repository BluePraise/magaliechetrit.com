---
title: Tools I use to develop projects
author: Magalie Chetrit
dateCreated: 2024-08-06
dateModified: 2024-08-31
tags: post
image:
imageAlt:
description: This year I have learned to use new tools to improve myself in my work. Here's how I use them and why I love them.
---

One thing I really enjoy about developing projects is optimizing my workflow. That adage of "you are only as good as your tools" applies to this. Here are some of the tools I have been using and why I love them.

### tmux
In my work and side projects, I often have several terminals open: one for a local server, one for running tests, one for Git, and another for executing various commands. I was looking for a way to split my terminal into multiple panes—similar to the functionality in VS Code. After some research, I discovered [tmux](https://github.com/tmux/tmux/wiki), a terminal multiplexer that allows me to split my terminal into multiple panes, exactly what I needed to boost my productivity without the visual clutter.

While tmux is generally used in combination with Neovim, I have yet to transition fully from Visual Studio Code. Although VS Code allows us to add a terminal within our workspace, it tends to become visually overwhelming.

My most basic usage of tmux involves splitting the terminal into two panes: one pane for running a local server or watcher, and another for Git. With tmux, I can also detach from a session and reattach later, which is especially useful when I need to step away from my computer and return later. When I reattach to the session, I can easily continue where I left off.
I’ve been using tmux on and off and have grown accustomed to its keybindings, which took some time. While there are various plugins available for tmux, I haven’t explored those yet and am still delving into its basic functionality.

I believe that [hyper.js the terminal provides a plugin to split the terminal into panes](https://hyper.is/store/hyper-pane) and iTerm2 does too. I have not used hyper.js yet, but I have used iTerm2. It didn't really work for me.

![A screenshot of two terminal panes in tmux](/assets/img/2024-08-06-tools-I%20use%20to%20develop/screenshot-tmux.png "A screenshot of two terminal panes in tmux")
*Two terminal panes in tmux.*

### Oh My Zsh
I know how to write bash, because I use SSH a lot. But I am more a fan of Oh My Zsh. It comes bundled with a ton of helpful functions, helpers, plugins, and themes. I don't use it to it's fullest capacity. I've got a lot of alias's installed and I am still trying out new plugins.

### Velja
For my work I have a few browsers open. Add to this the profiles in Chrome and you have a few clicks to make in order to open a link right in that specific browser. With Velja I can choose which browser I'd like to open the link. And here's a link to [Velja](https://sindresorhus.com/velja).

### Raycast
Raycast is a digital swiss army knife. It's a spotlight for you mac, but then on steroids. Each month, I discover something new here. I try not to go too crazy with all the extensions available in the Raycast store. Because after a while I forget about them. For example, I installed a color picker extension and I never used it. That being said, I do enjoy the extensions that I have installed. Searching chrome tabs from raycast, without leaving my VS Code interface, or window management by just tying a few keys, although I am still a fan of BetterSnapTool. The combination of Google Search in Raycast and Velja has helped me in my efficiency. Mainly because I know longer see all the open tabs in my chrome, I get less distracted. Recently, I als made a hotkey to toggle my Airpods settings. Here's a link to [Raycast](https://raycast.com/).


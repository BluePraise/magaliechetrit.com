---
title: Tools for Terminal I use to develop projects
author: Magalie Chetrit
dateCreated: 2024-08-06
date: 2024-08-05
dateModified: 2024-08-07
tags: post, draft
image:
imageAlt:
description: This year I have learned to use new tools to improve myself in my work. Here's how I use them and why I love them.
---

One thing I really enjoy about developing projects is optimizing my workflow. That adage of "you are only as good as your tools" applies to this. Here are some of the tools I have been using and why I love them.

Mostly, I alternate between using the terminal (I use [Alacritty](https://alacritty.org/)) and VS Code for my workspaces. They both have their pros and cons. It just depends on the use case.

## tmux
In my work and side projects, I often have several terminals open: one for a local server, one for running tests, one for Git, and another for executing various commands. I was looking for a way to split my terminal into multiple panes—similar to the functionality in VS Code. After some research, I discovered [tmux](https://github.com/tmux/tmux/wiki), a terminal multiplexer that allows me to split my terminal into multiple panes, exactly what I needed to boost my productivity without the visual clutter.


While tmux is generally used in combination with Neovim, I have yet to transition fully from Visual Studio Code. Although VS Code allows us to add a terminal within our workspace, it tends to become visually overwhelming.

My most basic usage of tmux involves splitting the terminal into two panes: one pane for running a local server or watcher, and another for Git. With tmux, I can also detach from a session and reattach later, which is especially useful when I need to step away from my computer and return later. When I reattach to the session, I can easily continue where I left off.
I’ve been using tmux on and off and have grown accustomed to its keybindings, which took some time. While there are various plugins available for tmux, I haven’t explored those yet and am still delving into its basic functionality.

I believe that [hyper.js the terminal provides a plugin to split the terminal into panes](https://hyper.is/store/hyper-pane). I have not used it yet, but I am curious to see how it compares to tmux. 

## Lazygit
Actually, I use a lot of UI's for git. Sourcetree, Github desktop's client, Git extensions in VS Code. But since I have applied tmux in my toolkit, I am now able to have Lazygit open in a panel so I can get a nice overview of the branches and a little view of the git flow. Sourcetree does all of these things, but it has crashed on me so many times and it is slow. Lazygit is fast and lightweight. It's a terminal UI for git.


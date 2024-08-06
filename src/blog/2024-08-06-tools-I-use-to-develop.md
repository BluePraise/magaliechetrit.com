---
title: Tools for Terminal I use to develop projects
author: Magalie Chetrit
dateCreated: 2024-08-06
date: 2024-08-06
tags: post, draft
image:
imageAlt:
description: This year I have learned to use new tools to improve myself in my work. Here's how I use them and why I love them.
---

One thing I really enjoy about developing projects is optimizing my workflow. Getting really efficient with the tools I use. That adage of "you are only as good as your tools" applies to this. Here are some of the tools I have been using and why I love them.

Mostly, I alternate between using the terminal (I use Alacritty) and VS Code for my workspaces. They both have their pros and cons. It just depends on the use case.

## tmux
tmux is usually used in combination with Neovim. I have never been able to transition to Vim and therefore Neovim. I still use Visual Studio Code.
In VS Code we can use a terminal as well, but I have found it to become visually cluttered. For my work I also have to have a few terminals open. One for the local server, one for running tests and one for running other commands.
But I have been using tmux for a while now and I love it. It's a terminal multiplexer. Which basically means that allows me to split my terminal into multiple panes. Exactly what I needed to be more productive without the visual clutter.

The most basic usage for me is to split the terminal into two panes. One pane is for running a local server or a watcher. The other pane is for git. I can also detach from a session and reattach later. This is great when I have to leave my computer and come back to it later. I reattach to the session and continue where I left off.
I have been using it on and off and I noticed I got used to the keybindings which took quite a while. There are plugins out there for tmux, but I haven't used those yet. I am still exploring the basic functionality.


## Lazygit
Actually, I use a lot of UI's for git. Sourcetree, Github desktop's client, Git extensions in VS Code. But since I have applied tmux in my toolkit, I am now able to have Lazygit open in a panel so I can get a nice overview of the branches and a little view of the git flow. Sourcetree does all of these things, but it has crashed on me so many times and it is slow. Lazygit is fast and lightweight. It's a terminal UI for git.

## Midnight Commander

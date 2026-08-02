---
title: Privacy Chess - Offline Chess Game
years: 2024
dateCreated: 2024-01-15
dateModified: 2026-08-02
order: 5
tags: project
image: /assets/img/chess-board.png
imageFront: /assets/img/chess-board.png
technologies: ['Vanilla JavaScript', 'CSS Grid', 'Browser Storage', 'Privacy-First']
jobTitle: Developer
---

Privacy Chess is a fully-featured chess game that runs entirely in your browser with zero external dependencies, tracking, or server connection. Every aspect of your game stays on your device.

## Features

**Complete Chess Implementation** — Full rule support including castling, en passant, pawn promotion, and checkmate/stalemate detection. The game engine uses pseudo-legal move generation with proper check validation.

**Save & Load Games** — Export games in PGN (Portable Game Notation) format and load them back to continue or analyze. All games are stored locally and never sent anywhere.

**Move History** — Complete algebraic notation move list displayed in real-time as you play, making it easy to review your game afterward.

**Responsive Design** — Works seamlessly on desktop and mobile devices. Touch-friendly interface for phone play with immediate visual feedback for selected pieces and valid moves.

**Privacy-First Architecture** — No JavaScript frameworks, no external CDNs, no analytics. The entire game runs in vanilla JavaScript with zero tracking. Built for privacy advocates and players who value complete control over their data.

The project demonstrates how to implement a complex algorithm (chess move validation with check detection) entirely in the browser using vanilla JavaScript, CSS Grid for board layout, and clever state management for game history and undo functionality.

You can play online at [/chess](/chess/).

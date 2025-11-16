---
title: How Claude Taught Me the Magic of Symlinks (And Wrote Me a Script)
author: Magalie Chetrit
dateCreated: 2025-11-14
tags: ['post']
series:
seriesNumber:
imageAlt:
description:
---
I'll be honest—before this week, I thought symlinks were some kind of dark wizardry reserved for Linux veterans and people who actually read man pages. Then Claude (yes, the AI) patiently explained them to me, and suddenly my WordPress development workflow got about 300% smoother. Turns out symlinks are just shortcuts on steroids, and they're exactly what I needed to stop copying files back and forth like some kind of digital packrat.

The problem was simple but annoying: I keep my WordPress projects in a tidy `Projects` folder with Git repos, but Local by Flywheel expects everything to live in its own special `Local Sites` folder. So every time I made changes, I'd have to manually sync things, or worse, work directly in the Local folder and forget to commit my changes. Symlinks solved this — they let me work in my Git-tracked project folder while Local thinks the files are right where it wants them. It's like being in two places at once, minus the existential crisis.

But here's where it gets really good: I didn't just learn about symlinks, I made Claude write me a custom ZSH script that automates the entire setup process. The script — which I charmingly named `wplink` — asks me three simple questions (project name, theme or plugin, and GitHub repo name), then creates all my folder structure, clones the repo from my GitHub, and sets up the symlink automatically. No more remembering the exact syntax or where everything goes. Just type `wplink` in your terminal, answer a few questions, and boom💥 — instant workflow magic.

Claude walked me through exactly how it works, so I actually understand what's happening under the hood. The script creates my project folders, builds the GitHub URL (since I only use one account for client work), clones the repo into the right spot, and then creates a symbolic link between my `Projects` folder and Local's WordPress installation. It even shows me the exact command before running it, so I can see what's happening and learn as I go. It's like having a really patient senior dev who never gets tired of my questions.

You can find the script here: [Gist on Github](https://gist.github.com/BluePraise/8dcb8b6de4b9aa54f5d3a3c34dc348a7)

Install it in your home folder.

<hr>

## WordPress Local Development Symlink Helper

A ZSH script that automates the workflow of cloning WordPress themes/plugins from GitHub and symlinking them to Local by Flywheel installations.

### What It Does

This script streamlines your WordPress development workflow by:
1. Creating a clean project folder structure
2. Cloning your GitHub repository
3. Creating symbolic links between your project folder and Local by Flywheel

No more manually copying files or working directly in Local's folders!

### Prerequisites

- macOS or Linux with ZSH shell
- [Local by Flywheel](https://localwp.com/) installed
- Git configured with SSH access to GitHub
- A GitHub account

### Installation

1. Download the `wplink.sh` file

2. Open the file and customize these settings:
   - **Line 13**: Change `GITHUB_USERNAME` to your GitHub username
   - **Line 39**: Change `~/Projects` if you use a different projects folder
   - **Line 98**: Change `~/Local Sites` if Local uses a different path

3. Add the script to your `.zshrc`:

   ```bash
   # Option 1: Source the file
   echo "source ~/path/to/wplink.sh" >> ~/.zshrc

   # Option 2: Copy the function directly into ~/.zshrc
   cat wplink.sh >> ~/.zshrc
   ```

4. Reload your shell:
   ```bash
   source ~/.zshrc
   ```

### Usage

Simply run the command:
```bash
wplink
```

The script will ask you three questions:
1. **What is the project name?** - This will be used for both the local folder and the Local by Flywheel site name
2. **Is this a theme or plugin?** - Choose 1 for theme, 2 for plugin
3. **What is the name of the repo in GitHub?** - Just the repo name, not the full URL

#### Example

```bash
wplink

🔗 WordPress Project Symlink Helper
==================================

What is the project name?
> my-awesome-site

📁 Creating project folder: /Users/you/Projects/my-awesome-site

Is this:
  1. A theme
  2. A plugin
> 1

📁 Creating theme folder: /Users/you/Projects/my-awesome-site/theme

What is the name of the repo in GitHub?
> my-theme

📦 Cloning repository from: git@github.com:your-username/my-theme.git
...
✅ Repository cloned successfully!

📋 This command will be executed:
   ln -s "/Users/you/Projects/my-awesome-site/theme/my-theme" "/Users/you/Local Sites/my-awesome-site/app/public/wp-content/themes/my-theme"

✅ Create this symlink? (y/n)
> y

✨ Symlink created successfully!
```

### Folder Structure

After running the script, your folder structure will look like this:

```
~/Projects/
  └── my-awesome-site/
      └── theme/  (or plugin/)
          └── my-theme/  (cloned from GitHub)

~/Local Sites/
  └── my-awesome-site/
      └── app/
          └── public/
              └── wp-content/
                  └── themes/  (or plugins/)
                      └── my-theme/  (symlinked to ~/Projects)
```

### How to Check if Symlink Worked

Run this command to see if the symlink was created:

```bash
ls -la ~/Local\ Sites/[your-project]/app/public/wp-content/themes/
```

You should see an arrow (`->`) pointing to your Projects folder:
```
my-theme -> /Users/you/Projects/my-awesome-site/theme/my-theme
```

### Benefits

- Work in your Git-tracked project folder while Local thinks files are in its own folder
- No more manual file copying or syncing
- Clean separation between source code and Local installations
- Easy to track changes and commit to Git

### Troubleshooting

**The repo failed to clone:**
- Make sure your SSH key is added to GitHub
- Verify the repo name is correct
- Check that you have access to the repository

**The symlink failed:**
- Ensure the Local by Flywheel site exists and matches the project name exactly
- Check that you have write permissions in the Local Sites folder

**"Command not found" when running wplink:**
- Make sure you've sourced your `.zshrc`: `source ~/.zshrc`
- Verify the function was added correctly to `.zshrc`

### Credits

Created with help from Claude (Anthropic) during a conversation about improving WordPress development workflows.

### License

Feel free to use, modify, and share!
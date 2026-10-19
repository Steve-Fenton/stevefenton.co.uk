---
title: "Stop automatic file tracking in VS Code's Explorer tab"
subtitle: "For those who want to look at a folder while viewing a file from somewhere else!"
pubDate: 2026-10-21
description: "Find out how to stop automatic file tracking in VS Code's Explorer tab."
keywords: "work,ai,easy"
navMenu: false
bannerImage:
  src: /img/topic/nature/dandelion-seed-pod.jpg
  alt: Photo by Steve Fenton. The intricate structure of dandelion seeds waiting for the wind to take them into the air. Complex and beautiful.
authors:
  - steve-fenton
categories:
  - Programming
tags:
  - VSCode
---

Here's something I do fairly often in VSCode when I'm editing a markdown file in Astro. I have the markdown file open, and I want to put an image into it. In the Explorer tab I open up the `/public/img` folder and find the image I want. Then I switch back to the markdown file to add the image.

If you do this with the default settings, the Explorer view will have tossed away your little browsing session and you'll see your markdown file highlighted and scrolled into view. But I wanted to type in the image name and now it's gone.

There's a two-step fix.

## Flip the setting to stop Explorer tracking current files

First, we eject the helpful pain into the abyss. It's trying to be helpful, but it has this paper-cut side effect of high frustration. Thankfully, there's a setting for this.

Open **Code -> Preferences** and paste in the setting name: `explorer:autoReveal`.

Set that to `false`.

:::figure

:img{ src="/img/2026/vs-code-explorer-settings.png" alt="The explorer.autoReveal setting in VS Code preferences, set to false." loading="lazy" }

:::

Advanced users may just want to set this in the JSON:

```json
"explorer.autoReveal": false
```

## Keyboard shortcut

Sometimes, you do want to highlight the current file, rather than go tree hunting. For this, we create a keyboard shortcut.

Open **Code -> Preferences -> Keyboard shortcuts**. The command you want to set up is `workbench.files.action.showActiveFileInExplorer`. Paste that name in to filter the list.

Hit the edit button and choose the keyboard combination that suits you. It will tell you if there are existing bindings. I used `CMD` + `e` and deleted the binding that was already placed there by an extension for something I never used.

:::figure

:img{ src="/img/2026/vs-code-explorer-key-binding.png" alt="The VS Code key binding for showActiveFileInExplorer set to Command + e." loading="lazy" }

:::

Advanced users may want to edit the JSON file directly:

```json
{ "key": "cmd+e", "command": "workbench.files.action.showActiveFileInExplorer" }
```

## That feels better

You'll now have an Explorer tree that doesn't bounce around when you change active file tabs. When you need to highlight your current file, you just flick the `CMD` + `e` keys to jump through the tree.

This has been such a quality of life improvement, I thought I'd better write it down.

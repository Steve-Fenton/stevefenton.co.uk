---
layout: src/layouts/Default.astro
title: 'Hide JavaScript files in Visual Studio Code'
navMenu: false
pubDate: 2015-07-26T07:30:40+01:00
authors:
    - steve-fenton
categories:
    - 'Visual Studio'
tags:
    - TypeScript
    - VSCode
---

I have an updated version of this post available here: [Exclude Files from Visual Studio Code’s File Explorer](/blog/2018/02/exclude-files-visual-studio-code-file-explorer/), with updates based on some very nice UI changes that make this just a little bit easier than it was in 2015 when I wrote this.

The Visual Studio Code team are definitely listening to their users. Just a few weeks back, a request went in asking for the ability to hide files – like the JavaScript files in a TypeScript project. Having become accustomed to this in Visual Studio Pro, I up-voted this suggestion. It is already available.

To hide any files (not just JavaScript files) you add the following to your settings.json file.

```json
{
    "files.exclude": {
        "**/*.js": true
    }
}
```
If you hit File > Preferences > Workspace Settings it will open this file for you (and create it if it doesn’t yet exist).

You can adjust the rule to hide anything you like and you can add as many exclusions as you like.
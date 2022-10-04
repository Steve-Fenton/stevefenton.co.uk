---
layout: src/layouts/Default.astro
title: 'Tabs vs spaces in Visual Studio Code'
navMenu: false
pubDate: 2015-07-30T07:30:00+01:00
authors:
    - steve-fenton
categories:
    - 'Visual Studio'
tags:
    - VSCode
---

This isn’t actually another source of ignition for the endless flame war.

Whichever side of the eternal flaming pit of tabs vs spaces you find yourself, Visual Studio Code will live by your decision. By default, it runs on “auto” mode, which means your code is like a box of chocolates… but you can fix this by adding the following setting to your settings.json file.

```json
{
    "editor.insertSpaces": true
}
```

If you hit File > Preferences > Workspace Settings it will open this file for you (and create it if it doesn’t yet exist).

You would obviously use false if you’re a rookie who still uses tabs, rather than an expert craftsman who uses spaces.
---
layout: src/layouts/Default.astro
title: 'Visual Studio Code keyboard shortcuts'
navMenu: false
pubDate: 2015-05-03T00:08:00+01:00
authors:
    - steve-fenton
categories:
    - 'Visual Studio'
tags:
    - JSON
    - VSCode
---

Visual Studio Code as a whole bunch of keyboard short-cuts, but it is inevitable that you will want to customise them. Luckily, it is quite easy to do.

You can create a keybindings.json to store overrides. This file must be placed in the Users folder inside the Code directory (see below for a quick way to avoid having to find out this path!)

A typical path would be something like this:

```
c:\Users\YourName\AppData\Roaming\Code\User
```

My personal machine-action is using the F12 key to “Go To Definition”, so I have added a customisation for this short-cut. (In the current version, this still triggers the default F12 action, which isn’t in the default key bindings file – but I can live with this for now).

```json
// Place your key bindings in this file to overwrite the defaults
[{
    "key": "f12",
    "command": "editor.action.goToDeclaration",
    "when": "editorTextFocus"
}]
```

You can add as many customisations as you like – and you can use File -> Preferences -> Keyboard Shortcuts to view the defaults (and this will also create your custom file in the correct location if you don’t have one there).
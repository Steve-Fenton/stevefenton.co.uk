---
layout: src/layouts/Default.astro
title: 'Add Visual Studio Command Prompt to Visual Studio 2015'
navMenu: false
pubDate: 2015-06-16T23:34:39+01:00
authors:
    - steve-fenton
categories:
    - 'Visual Studio'
tags:
    - 'Visual Studio'
---

If you need to add Visual Studio Command Prompt (essentially just a command window, but pre-prepared with all your Visual Studio paths), this is how you add it to Visual Studio 2015.

- Open Tools > “External Tools…”
- Click “Add”

Enter the following information into the new tool screen:

| Field              | Value                                                                                 |
|--------------------|---------------------------------------------------------------------------------------|
| Title              | VS Command Prompt                                                                     |
| Command:           | C:\\Windows\\System32\\cmd.exe                                                        |
| Arguments:         | ```/k "C:\Program Files (x86)\Microsoft Visual Studio 14.0\Common7\Tools\VsDevCmd.bat"``` |
| Initial Directory: | $(SolutionDir)                                                                        |

Save your changes (and re-order your tools to suit your preferences). The “VS Command Prompt” will now be available in:

- Tools > VS Command Prompt
---
id: 4432
layout: src/layouts/Default.astro
title: 'Visual Studio Code IntelliCode extension preview'
pubDate: 2018-12-06T09:50:27+00:00
author:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=4432'
permalink: /2018/12/visual-studio-code-intellicode-extension-preview/
medium_post:
    - 'O:11:"Medium_Post":11:{s:16:"author_image_url";s:75:"https://cdn-images-1.medium.com/fit/c/400/400/1*eXkhfEuF41g5W_xnc_ydLA.jpeg";s:10:"author_url";s:38:"https://medium.com/@steve.fenton.co.uk";s:11:"byline_name";N;s:12:"byline_email";N;s:10:"cross_link";s:3:"yes";s:2:"id";s:12:"8db8efca452d";s:21:"follower_notification";s:3:"yes";s:7:"license";s:19:"all-rights-reserved";s:14:"publication_id";s:2:"-1";s:6:"status";s:5:"draft";s:3:"url";s:51:"https://medium.com/@steve.fenton.co.uk/8db8efca452d";}'
classic-editor-remember:
    - classic-editor
categories:
    - Programming
    - 'Visual Studio'
tags:
    - typescript
---

IntelliCode brings AI-assisted power-ups to your auto-completion. It has been in preview within Visual Studio for some time (you can [read about Visual Studio IntelliCode here](https://www.stevefenton.co.uk/2018/05/visual-studio-intellicode/)) – but it has now landed in Visual Studio Code, which is exceptionally handy if you’re a TypeScript programmer like me.

So what is IntelliCode? It’s a simple VSCode extension that you add to your editor to add a smart list of suggestions to the top of your otherwise plain alphabetical auto-completion suggestions. To get started, search for *IntelliCode* from the Visual Studio Code extension panel.

![](https://www.stevefenton.co.uk/wp-content/uploads/2018/12/vscode-intellicode-extension.png)

This will instantly transform your auto-completion list from `charAt, charCodeAt, concat, indexOf, lastIndexOf, length...` to `* replace, * split, * length, *, toLowerCase, * match, charAt, charCodeAt...`. The top of the list now contains special super-star elements that are the most likely members that you want to access. Here’s the screenshot equivalents of this example:

### Before – Plain TypeScript

![](https://www.stevefenton.co.uk/wp-content/uploads/2018/12/string-typescript.png)

### After – TypeScript plus IntelliCode

![](https://www.stevefenton.co.uk/wp-content/uploads/2018/12/string-typescript-plus-intellicode.png)

The IntelliCode suggestions are marked with stars, so you can tell what suggestions come specifically from the extension. The adjust as you type and are downgraded to lower positions intelligently as it works out what your intentions are.

The intention behind this toolset is for the AI to learn from your existing code, which will make the suggestions even more useful. In the long run, you might be able to generate your coding standards by analysing your code and extracting the rules and using them to improve consistency in your projects.
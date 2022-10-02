---
layout: src/layouts/Default.astro
navMenu: false
title: 'Web Essentials style side-by-side editing of TypeScript files'
pubDate: 2013-12-16T09:34:16+00:00
author:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=461'
interface_sidebarlayout:
    - default
categories:
    - 'Visual Studio'
tags:
    - typescript
---

When Web Essentials dropped TypeScript support to avoid clashing with TypeScript extension improvements, the big feature that people missed was side-by-side editing of TypeScript files, so they could see the JavaScript as they went along.

The great news is, you’ve always been able to to this in Visual Studio (more or less) using side-by-side docked editor windows. It won’t recompile on every key press – it will do it on save (if you’ve set the “compile on save” option) – and there are a few other disclaimers – like “it isn’t automatic, you have to do this each time” and “it doesn’t work if you are compiling to a single output file” – but it might just work for you.

To start off, open your TypeScript file in Visual Studio – then show your hidden files (JavaScript files aren’t included in your project any more) and open the JavaScript file in Visual Studio.

Then grab the tab-header and drag it to sit alongside the TypeScript file using the hover-target panel that opens when you are dragging.

![Side by Side TypeScript](https://www.stevefenton.co.uk/wp-content/uploads/2015/07/ts-side-by-side.png)

When you let go over the side-by-side docking option, you’ll have the TypeScript and JavaScript files both running and when you save the TypeScript file, the JavaScript will magically update… almost. There is just one thing you’ll want to adjust.

![Side by Side TypeScript Result](https://www.stevefenton.co.uk/wp-content/uploads/2015/07/ts-side-by-side-result.png)

When the JavaScript file changes, Visual Studio will helpfully pop up a message telling you it has changed and asking if you want to re-load the file. Of course you want to re-load the file – so head to Tools &gt; Options &gt; Environment &gt; Documents and select the “Auto-load changes, if saved” option.

![Auto-Load Changes](https://www.stevefenton.co.uk/wp-content/uploads/2015/07/ts-auto-load-changes.png)
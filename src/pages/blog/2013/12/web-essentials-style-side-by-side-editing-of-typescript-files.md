---
layout: src/layouts/Default.astro
title: 'Web Essentials style side-by-side editing of TypeScript files'
navMenu: false
pubDate: 2013-12-16T09:34:16+00:00
authors:
    - steve-fenton
categories:
    - 'Visual Studio'
tags:
    - TypeScript
---

When Web Essentials dropped TypeScript support to avoid clashing with TypeScript extension improvements, the big feature that people missed was side-by-side editing of TypeScript files, so they could see the JavaScript as they went along.

The great news is, you’ve always been able to to this in Visual Studio (more or less) using side-by-side docked editor windows. It won’t recompile on every key press – it will do it on save (if you’ve set the “compile on save” option) – and there are a few other disclaimers – like “it isn’t automatic, you have to do this each time” and “it doesn’t work if you are compiling to a single output file” – but it might just work for you.

To start off, open your TypeScript file in Visual Studio – then show your hidden files (JavaScript files aren’t included in your project any more) and open the JavaScript file in Visual Studio.

Then grab the tab-header and drag it to sit alongside the TypeScript file using the hover-target panel that opens when you are dragging.

:img{src="/img/2015/07/ts-side-by-side.png" alt="Side by Side TypeScript" loading="lazy"}

When you let go over the side-by-side docking option, you’ll have the TypeScript and JavaScript files both running and when you save the TypeScript file, the JavaScript will magically update… almost. There is just one thing you’ll want to adjust.

:img{src="/img/2015/07/ts-side-by-side-result.png" alt="Side by Side TypeScript Result" loading="lazy"}

When the JavaScript file changes, Visual Studio will helpfully pop up a message telling you it has changed and asking if you want to re-load the file. Of course you want to re-load the file – so head to Tools > Options > Environment > Documents and select the “Auto-load changes, if saved” option.

:img{src="/img/2015/07/ts-auto-load-changes.png" alt="Auto-Load Changes" loading="lazy"}
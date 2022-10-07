---
layout: src/layouts/Default.astro
title: 'Visual Studio layout and option changes'
navMenu: false
pubDate: 2019-07-03T22:32:18+01:00
authors:
    - steve-fenton
categories:
    - 'Visual Studio'
tags:
    - Productivity
---

Inspired by the short video by Mads Kristensen (part of a series conceived by Microsoft’s [Misty Madonna](https://twitter.com/mistymadonna))… I was inspired to update my Visual Studio layout for the first time in over ten years. What?! Ten years? Yes, for ten years I have installed Visual Studio, selected “Dark Theme”, and used it without adjustments. This was the result of the previous era of customising fonts, colours, layouts, and short-cut keys thinking I was the boss.

I still think that your tweaks should be minimal and focussed. If you’re going to pair/mob/riot program with other people the UI needs to look somewhat familiar. So, what did Mads do that caught my attention?

## Properties panel

The properties panel has irritated me for a long time. I keep it closed and use F4 to open it, at which point it steals half of my Solution Explorer. Once I’ve checked or changed the properties, I kill the panel and forget the annoyance. Mads, though, has come up with a neat way to make this process less annoying. Dock the properties panel to the left of Solution Explorer. As soon as I did this, I fell in love with this tweak.

:::div{.inset}
:img{src="/img/2019/07/visual-studio-layout.jpg" alt="Visual Studio Layout with Docked Properties Panel" loading="lazy"}
:::

I still kill the properties panel when I’m done, but giving it some space of its own makes it much easier to use and I’m no longer annoyed.

You may have noticed that I’ve also moved my Test Explorer over to the right, which is another neat idea from Mads that I’ll come back to shortly.

:::div{.inset}
:img{src="/img/2019/07/visual-studio-layout-properties-closed.jpg" alt="Visual Studio Layout with Properties Closed" loading="lazy"}
:::

Just look at all that space for code. Yum.

## Test explorer

I was initially skeptical about moving the Test Explorer panel into the Solution / Team Explorer zone. Not after working with it there for a while. I switch a lot from triple-massive screen development, to on-the-move Surface Book screen development. Every time I switch between the two I end up collapsing something. After moving the Test Explorer into the zone used by Solution Explorer and Team Explorer, I no longer need to do this.

Additionally, using the test-on-build option means I depend less on keeping the panel visible.

Here’s my tests warning me that I’ve done something silly:

:::div{.inset}
:img{src="/img/2019/07/visual-studio-failing-test-status.jpg" alt="Failing Tests" loading="lazy"}
:::

And moments later, it’s all fine again:

:::div{.inset}
:img{src="/img/2019/07/visual-studio-passing-test-status.jpg" alt="Visual Studio Passing Tests" loading="lazy"}
:::

You can enable this setting by hitting the icon in Test Explorer that looks like a play-icon being whipped by its own devil-tail.

:::div{.inset}
:img{src="/img/2019/07/visual-studio-test-window.jpg" alt="Visual Studio Test Window" loading="lazy"}
:::

## Mindful opening mode

And finally, if you want to have the most minimal and refreshing experience opening Visual Studio – Mads has a couple of options to untick that will stop Visual Studio remembering what files you had open, and what your Solution Explorer was doing when you left. This is super useful if you work in small chunks as the files you worked on yesterday aren’t relevant today. As Mads says, it also makes Visual Studio open faster.

:::div{.inset}
:img{src="/img/2019/07/visual-studio-restore-reopen-options.jpg" alt="Restore and Reopen Options" loading="lazy"}
:::

Switch off “Reopen documents on solution load” and “Restore Solution Explorer project hierarchy state on solution load” to enable this mindfulness mode of opening Visual Studio.

Don’t do this if you depend on this remembered state as a mental reminder of what you were up to. I tend to write and commit little chunks, so I don’t need these visual prompts.

## Summary

I think Mads knows what he’s talking about (duh, yeah). I’ve tried all of the ideas he shared and they have all stuck. Watch the video below for a six-minute run-through of these tweaks and for a couple of interesting extension recommendations.

[Visual Studio with Mads](https://www.youtube.com/watch?v=M2HViJ2zVOE)
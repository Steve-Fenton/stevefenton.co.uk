---
layout: src/layouts/Default.astro
title: 'Visual Studio IntelliCode'
navMenu: false
pubDate: 2018-05-09T07:15:04+01:00
authors:
    - steve-fenton
bannerImage:
    src: /img/2018/05/intellicode-with-real-code.png
    alt: Visual Studio Intellicode
categories:
    - Programming
    - 'Visual Studio'
tags:
    - Productivity
---

I have been writing C# code in Visual Studio since 2003. One of the big attractions of C# is the tooling. Visual Studio is awesome. Over the years I have worked in lots of IDEs and editors, but my go-to tools are Visual Studio and Visual Studio Code. I don’t know who writes these tools, but they know what they are doing.

For the past six years I have been using Visual Studio without *the famous extension[\*](#famous-extension)*. That means I have seen the continuous improvements to Visual Studio’s own auto-completion (IntelliSense) and refactoring tools. This week, though, we saw the release of a big leap in improvements; IntelliCode.

## What is IntelliCode?

IntelliCode is the AI version of IntelliSense. Instead of showing auto-completion members alphabetically, it orders them by *relevance*. That means it will use the context to order the suggestions; it will suggest the most likely overloads for method and it will show members most relevant to the current expression when providing suggestions.

Here’s Visual Studio before IntelliCode:

:::div{.inset}
:img{src="/img/2018/05/before-intellicode-001.png" alt="Before IntelliCode" loading="lazy"}
:::

And here is the same thing with IntelliCode added:

:::div{.inset}
:img{src="/img/2018/05/with-intellicode-001.png" alt="With IntelliCode" loading="lazy"}
:::

You can see that the suggestions have been re-ordered, with more relevant suggestions at the top and marked with a star. These will change over time, becoming more relevant as the intelligence is trained.

But does it work on real code? Here is an example from an open source project. The “correct” answer is now right near the top. You can see the old alphabetical suggestions in red that would have been shown before the intelligence was added.

:::div{.inset}
:img{src="/img/2018/05/intellicode-with-real-code.png" alt="IntelliCode with Real Code" loading="lazy"}
:::

## Coding style rules

IntelliCode can also automatically infer your in-house coding style and generate your editor config file (.editorconfig). Once you have this file, you can apply your team’s style to a file automatically. This will help the survivors of the *explicit types vs var war* will be able to automatically clean up all their code.

Just add a new item to your project using the `editorconfig` template. Instead of getting a blank file, you get an inferred set of rules based on your existing code. You can still change it, but you don’t need to start from nothing.

:::div{.inset}
:img{src="/img/2018/05/editorconfig.png" alt="Editor config" loading="lazy"}
:::

You’ll now be warned about any style issues and be supplied with instant fixes with the lightbulb icon.

:::div{.inset}
:img{src="/img/2018/05/code-violations.png" alt="Code Violations" loading="lazy"}
:::

## Summay

IntelliCode is going to be a killer productivity tool. It’s in preview now if you have Visual Studio 2017 v15.7.0 or higher and you can download the [IntelliCode Visual Studio Extension from the marketplace](https://marketplace.visualstudio.com/items?itemName=VisualStudioExptTeam.VSIntelliCode).

<small id="famous-extension">\* Resharper!</small>
---
title: Writing in Visual Studio Code
navMenu: false
pubDate: 2022-03-23
modDate: 2025-01-09
keywords: writing,visual studio code
description: My writing set-up for Visual Studio Code is different to my programming set-up.
authors:
    - steve-fenton
bannerImage:
    src: /img/2022/03/markdown-all-in-one.jpg
    alt: Markdown all in one
categories:
    - Programming
tags:
    - VSCode
---

Despite coding and writing in Visual Studio Code, my set-ups for these two activities are very different. I'm using this post to track my writing mode setup, and I expect to revisit it later.

Although writing work is very different to programming, the writing workflow used by my team is not dissimilar to a typical software team's setup. We use version control, pull requests, and an automated deployment pipeline.

My current setup includes a few extensions.

- [Markdown All in One](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one) by Yu Zhang
- [Word Count](https://marketplace.visualstudio.com/items?itemName=ms-vscode.wordcount) by Microsoft
- [Markdown Table Prettifier](https://marketplace.visualstudio.com/items?itemName=darkriszty.markdown-table-prettify) by Krisztian Daroczi
- [Markdownlint](https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint) by David Anson
- [learn-markdown] by Microsoft (it doesn't teach you Markdown, it was written to help focus writing content for Microsoft Learn - it has a feature that lets you auto-replace smart quotes that often get copied in)
- [VSCode Speech](https://marketplace.visualstudio.com/items?itemName=bierner.speech) by Matt Bierner
- [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker) by Street Side Software

And a little preferences fix in my **user**-level `settings.json` as I like to edit with a larger font size:

```json
{
    "editor.fontSize": 18,
    "editor.fontFamily": "Consolas, 'Courier New', monospace"
}
```

## Markdown all in one

The all-in-one markdown extension provides editor support for `.md` files and a preview tool. You can use a side-by-side view to see the parsed markdown while you write.

:::figure{.inset}
:img{src="/img/2022/03/markdown-all-in-one.jpg" alt="Markdown all-in-one with syntax highlighting and preview pane" loading="lazy"}
::figcaption[Markdown editing]
:::

You can also specify a stylesheet to be used to render the preview. This is best done as a **workspace** setting, so you can have different styles for different stuff. When you open a folder as a project, the path for this setting is relative to the top-level folder. Otherwise, you'll need to use a full path.

Custom styles are merged with preview settings, so you may need to force some overrides to give the stylesheet complete control.

:::figure{.inset}
:img{src="/img/2022/03/markdown-styles.jpg" alt="Markdown styles setting to add a stylesheet" loading="lazy"}
::figcaption[Styled output window]
:::

## Word count

The word count extension adds the number of words in your document to the editor status bar. Here's a zoomed-in version showing the bottom left of the editor.

:::figure{.inset}
:img{src="/img/2022/03/word-count.jpg" alt="Status bar reads 24 words" loading="lazy"}
:figcaption[Word count]
:::

## Markdown Table Prettifier

Select a table and "format selection" to fix up your tables and make them readable.

```markdown
# Before

| Left | Right |
|--|--|
|A|B|
|C|D|

# After

| Left | Right |
|------|-------|
| A    | B     |
| C    | D     |
```

## Markdownlint

This currently works with `.md` files only, but it helps you be more consistent with your markdown syntax in a whole bunch of ways.

There are many situations where you "copy as markdown" from another tool and it will use different bullet markdown, or different emphasis markdown, etc. This plugin highlights issues and has some auto-resolve options to fix them. It also notices if your headings aren't nested correctly, like if you skip from an level two heading to a level four heading.

## learn-markdown

Similar to Markdownlint, the learn-markdown extension happens to have an automated fix that will replace smart quotes with simple quotes.

If you copy content from other tools, this solves a _really_ common problem!

## VSCode Speech

VSCode Speech lets you select a text block and right-click to "speak selection". It then reads it out.

This is a super-useful tool for editing when you want to hear the text rather than read it. Your brain makes a lot of automatic corrections during reading, so ingesting it through another sense can help you detect errors.

:::figure{.inset}
:img{src="/img/2022/03/vscode-speech.jpg" alt="VSCode has an option to speak selection from the context menu" loading="lazy"}
::figcaption[Speak selection]
:::

## Code Spell Checker

Code Spell Checker can check all kinds of files for spelling issues. It works excellently in markdown and within code blocks in markdown.

You can maintain a custom dictionary of terms you want to accept and you can add a build step to [check the spelling of all changed files](/blog/2023/10/spellcheck-changed-files/).

## Summary

You can easily set up Visual Studio Code for technical writing. Classic programming tools are great for writing. Text editors provide a distraction-free writing experience, and version control is just as valuable for content as it is for code.

These Visual Studio Code extensions make the writing experience even better.

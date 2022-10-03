---
layout: src/layouts/Default.astro
title: Writing in Visual Studio Code
navMenu: false
pubDate: 2022-03-23T13:51:28+00:00
authors:
    - steve-fenton
image: /wp-content/uploads/2022/03/markdown-all-in-one.jpg
categories:
    - Programming
tags:
    - VSCode
---

Despite coding and writing in Visual Studio Code, the set-ups for these two activities are quite different. I’m using this post to track my writing-mode set-up and I expect to revisit it later.

Although the work is very different to programming, the writing workflow used by my team is not unlike a typical software team’s set-up. We use version control, pull requests, and many other familiar build and deployment steps.

My current setup includes a few extensions.

- [Markdown All in One](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one) by Yu Zhang
- [Auto Markdown TOC](https://marketplace.visualstudio.com/items?itemName=huntertran.auto-markdown-toc) by Hunter Tran
- [Word Count](https://marketplace.visualstudio.com/items?itemName=ms-vscode.wordcount) by Microsoft
- [Markdown Table Prettifier](https://marketplace.visualstudio.com/items?itemName=darkriszty.markdown-table-prettify) by Krisztian Daroczi
- [VSCode Speech](https://marketplace.visualstudio.com/items?itemName=bierner.speech) by Matt Bierner

And a little preferences fix in my **user**-level `settings.json` as I like to edit with a larger font size:

```json
{
    "editor.fontSize": 18,
    "editor.fontFamily": "Consolas, 'Courier New', monospace"
}
```

## Markdown all in one

The all-in-one markdown extension provides editor support for `.md` files and a preview tool that you can use side-by-side to get a view of your work as you write.

:img{src="/img/2022/03/markdown-all-in-one.jpg" alt="Markdown all-in-one with syntax highlighting and preview pane" loading="lazy"}

You can also specify a stylesheet to be used to render the preview. This is best done as a **workspace** setting, so you can have different styles for different stuff. The path is relative to the folder, when you open the folder as a project. Otherwise, you’ll need to use a full path. This merges into the preview settings, so you may need to force some overrides on your body style to give the stylesheet full control.

:img{src="/img/2022/03/markdown-styles.jpg" alt="Markdown styles setting to add a stylesheet" loading="lazy"}

## Auto markdown TOC

The auto markdown TOC extension inserts and manages a table of contents in your file. After right-clicking and selecting “Auto markdown TOC: Insert/Update” a list of links to headings is added to the file. It gets updated each time you save.

:img{src="/img/2022/03/markdown-toc.jpg" alt="An automatically managed table of contents" loading="lazy"}

## Word count

The word count extension simply adds the number of words to the editor status bar. Here’s a zoomed-in version so you can it in the bottom left.

:img{src="/img/2022/03/word-count.jpg" alt="Status bar reads 24 words" loading="lazy"}

## Markdown Table Prettifier

Select a table and “format selection” to fix up your tables and make them readable.

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

## VSCode Speech

VSCode Speech let’s you select a block of text and right-click to “speak selection”. It then reads it out. This is a super-useful tool for the editing process, when you want to hear the text rather than reading it (your brain makes a lot of automatic corrections during reading, so ingesting it through another sense can help detect errors).

:img{src="/img/2022/03/vscode-speech.jpg" alt="VSCode has an option to speak selection from the context menu" loading="lazy"}

## Wish list!

Although there are some partial community-driven integrations with Grammarly, I’d love an official Grammarly extension that allows me to use my pro account (the community one uses the free-tier API). I’d love it to work with markdown files, too!
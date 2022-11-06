---
layout: src/layouts/Default.astro
title: 'How to RegEx replace in Visual Studio Code'
navMenu: false
pubDate: 2022-10-07
modDate: 2022-10-08
keywords: regex,visual studio code,vscode,replace
description: Find out how to perform a complex search and replace in Visual Studio Code using a RegEx.
bannerImage:
    src: /img/2022/10/vscode-regex.png
    alt: Visual Studio Code providing a preview of RegEx replacements
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - VSCode
    - Regular Expressions
---

Markdown files are an excellent place for content when you need to make large-scale updates. You can open your text editor and use the search and replace tool to fix lots of content quickly. This article shows you how to perform an advanced search and replace in Visual Studio Code using :abbr[RegEx]{title="Regular Expressions"}.

To demonstrate how to use RegEx search and replace to do an advanced replacement, you will convert a markdown image into an HTML image wrapped in a containing element. This isn't exactly what I used it for, but my use case was a little esoteric.

Before

```markdown
![Alt text](/img/my-image.jpg)
```

Desired result

```markdown
<div class="image">
<img src="Alt text" alt="/img/my-image.jpg" />
</div>
```

This is interesting because you need to replace content at the start, middle, and end. You also need to preserve the content in the middle.

The mental map of this is:

- Find all images that occupy a line of their own
- Add `<div class="image">` *before* the image, **and**
- Turn the image into an HTML `img` tag, **and**
- Add `</div>` *after* the image

Yikes, this seems daunting, but with some version-control-backed RegEx confidence, you can do this!

## Before you start

Before you race off and start replacing large swathes of text, let's Create a safety net. If you aren't already doing this, make sure your content is version controlled, and you're all checked in.

You'll commonly find the following dream setup for managing content:

- A static site generator (Hugo, Jekyll) or modern mixed-mode site generator like Astro
- All the content is stored in version control (like GitHub)
- A text editor to write and manage content (like Visual Studio Code)
  
This is a good setup; if something goes terribly wrong during a find and replace session, you just discard your changes and return to a known good state.

So, make sure:

- All your content is in version control
- You have no outstanding changes to commit

Now you're ready to go big on find and replace.

## Using find to write a RegEx

It's best to craft your search RegEx in Visual Studio Code's "find mode". Hit <kbd>CTRL</kbd> + <kbd>SHIFT</kbd> + <kbd>F</kbd> to open the "search all" box.

:::figure{.inset}
:img{src="/img/2022/10/vscode-search-all-mode.png" alt="Visual Studio Code search all box"}
::figcaption[The search all box]
:::

You need to enable the RegEx mode, which has the dot-star icon: `.*` on the search all box. It's highlighted in the above image.

You now need to write your RegEx. Visual Studio Code will highlight matches as you type. It is safe to experiment in this area.

Start by typing `\n` into the search field. This just matches line breaks. Then add the markdown for the start of an image, so you have `\n![`.

Here you'll get an error because `[` is a special RegEx character. That's fine. You can escape it with a backslash '\`.

Your search should now be `\n!\[`, which you can pronounce as "newline (`\n`), literal bang (`!`), escaped square bracket (`\[`)". It's always best to think of a RegEx in small parts.

This matches the start, but the middle bit will differ per image. You'll need to match "any stuff" but also capture the value to use later. Our capture group will be `(.+?)`, and you'll end it by closing your open square bracket `\]`.

Your complete RegEx is taking shape. You now have:

```
\n!\[(.+?)\]
```

Visual Studio Code should highlight at least some of your images:

:::figure
:img{src="/img/2022/10/vs-code-regex-highlighting.png" alt="Visual Studio Code RegEx highlighting" loading="lazy"}
::figcaption[An example of highlighting]
:::

This is working, so keep going. You've now got the start of the image, with the alt-text captured. Now you need the rest, which is just a case of repeating what you did for the square brackets, but for normal parentheses. You need to match an escaped bracket `\(` then capture the contents with `(.+?)` until your closing bracket `\)`.

Finally, because you want to only consider images on their own line, you need to make sure there's a line break next, using another `\n`.

Here's the final RegEx:

```
\n!\[(.+?)\]\((.+?)\)\n
```

Out loud, it's:

- Newline (`\n`)
- Literal bang (`!`)
- Escaped square bracket (`\[`)
- Capture group `(.+?)`
- Escaped closing bracket `\]`
- Escaped bracket `\(`
- Capture group `(.+?)`
- Escaped closing bracket `\)`
- Newline `\n`

You should see the whole image highlighted but not any inline images in your markdown.

:::figure
:img{src="/img/2022/10/vscode-complete-regex-example.png" alt="Example of highlighting for the complete RegEx" loading="lazy"}
::figcaption[Highlighting for the complete example]
:::

Now you must leave the safety of your search box and execute a replace operation, so have version control ready just in case things go wrong.

## Pre-flight checks

If you open up the find and replace box using <kbd>CTRL</kbd> + <kbd>SHIFT</kbd> + <kbd>F</kbd>, you'll find the RegEx already populated, but now there's an additional box beneath.

You're now in the danger zone and will start changing files, so here are a couple of tips.

Double-check your version control state. You should be all version controlled, with no other changes waiting to be committed.

Check you have Visual Studio Code open on a folder where you want to replace everything. If you're going to change one specific area, you can safety-net the operation by opening the sub-folder in Visual Studio Code rather than the project folder.

The next limiting action you can take is to expand the additional options and limit replacements by file type. For example, you only want to do this against markdown files, so add `**/*.md` to this option.

Finally, review the matches listed in the panel as this is an excellent place to spot trouble brewing.

## Using capture groups in replace

Now you can write your replacement, using some tokens to pull in the information you capture in the search. The tokens are numbered, so `$1` and `$2` contain the alt text and image source in this example.

You will still need to use linebreaks in your replace field, but *you don't need to escape characters* as it's not a RegEx field.

As you want to wrap your image in a `div` element, use the following replacement:

```
\n<div class="image">\n<img src="$1" alt="$2" />\n</div>\n
```

Before you hit the replace-all button, you can click through the find results to preview what the change looks like. Because the first thing you look for is a blank line, the list of changes seems a little empty, so I've highlighted where to click with a green box.

:::figure
:img{src="/img/2022/10/preview-replacements.png" alt="Preview the replacements" loading="lazy"}
::figcaption[Preview a replacement by selecting it]
:::

If things look as you expect, proceed with the change.

## Review your changes

Now you've replaced a whole load of content, it is worth opening the version control tab in Visual Studio Code and reviewing the changes. It is well worth checking things before you commit, so approach it like an audit.

Remember:

- You just saved hours of work using a bit of automation, so invest some minutes back into the review process
- This is the moment when it will be fastest to recover from the unexpected

When you finish your review, you can commit your changes (or discard them if something goes awry).

## Summing up

Although RegEx makes some people feel sick and nervous, using a speak-aloud process of reading a RegEx makes it less scary.

Using a RegEx with capture groups and tokens, you can completely transform content in ways you can't do with a simple search and replace.

Because automation amplifies actions, you can make something better *or* worse much faster with automation than you could manually. In my case, I fixed up more than five hundred images using this technique (though I wasn't converting the image into an HTML `img` tag - that was just a way to show what is possible).

Don't skip those pre-flight checks or the post-change review. The super-power of this technique is discarding bad changes at the click of a button.
---
layout: src/layouts/Default.astro
navMenu: false
title: 'How to RegEx replace in Visual Studio Code'
pubDate: 2022-10-07
bannerImage:
  src: /img/2022/10/preview-replacements.png
  alt: Visual Studio Code providing a preview of regex replacements
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - Visual Studio
    - VSCode
    - Regex
---

A major benefit of keeping your content in markdown files is the ability to find and replace across all your content at once. This post covers an advanced use case for this, where you want to replace wrapping content while keeping the middle the same.

To demonstrate how to use regex search and replace to do an advanced replacement, we're going to convert a markdown image into an HTML image wrapped in a containing element. This isn't what I used it for, but my use case was a little esoteric.

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

The reason this is interesting is we need to replace some parts of the original content, but also preserve some of the content from the middle.

The mental map of this is:

- Find all images that occupy a line of their own
- Add `<div class="image">` *before* the image, **and**
- Turn the image into an HTML `img` tag, **and**
- Add `</div>` *after* the image

Yikes, this seems daunting, but with some version-control-backed regex confidence you can do this!

## Before you start

Before you race off an start replace large swathes of text, let's put a good safety net in place. If you aren't already doing this, make sure your content is version controlled and you're all checked in.

You'll commonly find the following dream setup for managing content:

- A static site generator (Hugo, Jekyll), or modern mixed-mode site generator like Astro
- All the content stored in version control (like GitHub)
- A text editor to write and manage content (like Visual Studio Code)

This is a good setup as if something goes terribly wrong during a find and replace session, you just discard your changes and go back to a known good state.

So, make sure:

- All you content is in version control
- You have no outstanding changes you need commit

Now you're ready to go big on find and replace.

## Find

It's best to craft your search RegEx in Visual Studio Code's find-mode. Hit <kbd>CTRL</kbd> + <kbd>SHIFT</kbd> + <kbd>F</kbd> to open the "search all" box.

:::div{.inset}
:img{src="/img/2022/10/vscode-search-all-mode.png" alt="Visual Studio Code search all box"}
:::

You need to enable the RegEx mode, which has the dot-star icon: `.*` on the search all box. It's highlighted in the above image.

Now we need to write our RegEx, and Visual Studio Code will highlight matches as we type. We can experiment safely here.

Start by typing `\n` into the search field. This just matches line breaks. Then add the markdown for the start of an image, so you have `\n![`.

Here you'll get an error because `[` is a special RegEx character. That's find, we can escape it with a back-slash '\`.

Your search should now be `\n!\[`, which you can pronounce as "newline (`\n`), literal bang (`!`), escaped square bracket (`\[`)". It's always best to think of a RegEx in small parts.

This matches the start, but the middle bit will change for each image. We'll need to match "any stuff" but also capture the value to use later. Our capture group will be `(.+?)` and we'll end it by closing our open square bracket `\]`.

Your complete RegEx is taking shape. We now have:

```
\n!\[(.+?)\]
```

And Visual Studio Code should be highlighting at least some of your images:

:::div{.inset}
:img{src="/img/2022/10/vs-code-regex-highlighting.png" alt="Visual Studio Code search all box" loading="lazy"}
:::

This is working, so keep going. We've now got the start of the image, with the alt-text captured. You just need the rest, which is just a case of repeating what you did for the square brackets, but for normal parantheses. We need to match an escaped bracket `\(` then capture the contents with `(.+?)` until our closing bracket `\)`.

Finally, because we want to only consider images on their own line, we need to make sure there's a line break next, using another `\n`.

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

You should see the whole image highlighted, but not any inline images in your markdown.

:::div{.inset}
:img{src="/img/2022/10/vscode-complete-regex-example.png" alt="Example of highlighting for the complte regex" loading="lazy"}
:::

Now we leave the safety of our search box and execute a replace, so have version control at the ready for those times when things go wrong.

## Pre-flight checks

If you open up the find and replace box using <kbd>CTRL</kbd> + <kbd>SHIFT</kbd> + <kbd>F</kbd>, you'll find the regex already populated, but now there's an additional box beneath.

You are now in the danger zone and are going to start changing files, so here's a couple of tips.

Double check your version control state. You should be all version controlled and with no other changes waiting to be committed.

Check you have Visual Studio Code open on a folder where you want to replace everything. If you want to change one specific area, you can safety-net the operation by opening the sub-folder in Visual Studio Code, rather than the top-level folder.

The next limiting action you can take is to expand the additional options and limit replacements by file type. For example, you only want to do this against markdown files, so add `**/*.md` to this option.

Finally, review the matches shown below your search and replace options as this is a good place to spot trouble breweing.

:::div{.inset}
:img{src="/img/2022/10/pre-flight-checks.png" alt="Example of highlighting for the complte regex" loading="lazy"}
:::

## Replace

Now you can write your replacement, using some tokens to pull in the information you captures in the search. The tokens are numbered, so `$1` and `$2` contain the alt text and image source in this example.

You will still need to use linebreaks in your replace field, but *you don't need to escape characters* as it's not a regex field.

As you want to wrap your image in a `div` element, use the following replacement:

```
\n<div class="image">\n<img src="$1" alt="$2" />\n</div>\n
```

Before you hit the replace-all button, you can click through the find results to preview what the change looks like. Because the first thing we look for is a blank line, the list of changes looks a little empty, so I've highlighted where to click with a green box.

:::div{.inset}
:img{src="/img/2022/10/preview-replacements.png" alt="Example of highlighting for the complte regex" loading="lazy"}
:::

If things look as you expect, proceed with the change.

## Review

Now you've replaced a whole load of content, it is worth opening the version control tab in Visual Studio Code and reviewing the changes. It is well worth checking things before you commit, so approach it like an audit.

Remember:

- You just saved hours of work using a bit of automation, so invest some minutes back into the review process
- This is the moment where it will be fastest to recover from the unexpected

When you finish your review, you can commit your changes (or discard them if something went terribly wrong).

## Summary

Although regex makes some people feel a bit sick and nervous, using a speak-aloud process of reading a regex makes it less scary.

Using a regex with capture groups and tokens, you can completely transform content in ways that you can't do with simple search and replace.

Because automation amplifies actions, you can make something better *or* worse much faster with automation than you could manually. In my case, I fixed up more than five-hundred images using this technique (though I wasn't converting the image into an HTML `img` tag - that was just a way to show what is possible).

Don't skip those pre-flight checks or the post-change review, the super-power of this technique is discarding bad changes at the click of a button.
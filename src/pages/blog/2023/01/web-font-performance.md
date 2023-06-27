---
title: CSS web font performance
navMenu: false
pubDate: 2023-01-15
keywords: css,web,font,performance
description: Find out how I'm loading fonts on my website to try and give the best user experience.
bannerImage:
    src: /img/2022/10/vscode-regex.png
    alt: Visual Studio Code providing a preview of RegEx replacements
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - CSS
---

I've been quietly experimenting with different fonts and font-handling strategies on my website. I'll explain why I've been doing this and then provide the solution I've landed on that works best for me.

## Web font problems

An almost constant experiment for me on this site is performance. I'm really interested in how I can make things fast - not just for users in wealthy countries with premium devices, but for everyone. This has basically involved moving to a static site generator, writing a script to generate sets of images, and writing my own HTML, CSS, and (a sprinkling of) JavaScript with no frameworks to ruin my results.

The one thing that took longer than expected was web fonts.

Here's some examples of the problems...

### External stylesheet

A common way to load web fonts is via an external stylesheet. You add an import to your own CSS that points to a stylesheet maintained by someone else. This external stylesheet has all the font information, so you can just add the font name to your style rules.

The problem with this approach is the loading chain is just too long.

1. Your web page is downloading
2. The browser finds your stylesheet, i.e. 'style.css'
3. Your stylesheet is downloading
4. The browser finds the import for the font stylesheet, i.e. 'font.css'
5. The font stylesheet is downloading
6. The browser finds the reference to the font file, i.e. 'font.woff2'

This might not seem like much, but this is a long time to wait before the browser even starts downloading the font - so it's going to cause a problem.

Reducing this chain is vital to having good performance - so you'll see this being solved in the solution.

### Largest contentful paint

Imagine your website just has text. If that text can't load because it's waiting for a font, your largest contentful paint can't happen until the font is loaded.

The recommended solution to this issue is to use `font-display: swap`. This allows the browser to show the text with a fallback font while the files are downloaded. Once the font is available it swaps it.

I dislike this swap as no matter what you do to make your fallback look similar in size to the "final" font, it will never be close enough to stop the visual refresh that happens when the font loads.

This causes a distracting update to the page and is likely to cause a layout shift.

### Layout shift

When a font swaps out, it almost always changes geometry. It will either be a little wider or a little taller, than the font it replaces. Although this is often a small difference, it means *everything* on the page moves. As the difference accumulates, some things move quite a bit.

For example, a tiny 1px difference in the height of the font will mean something like a 20px move by the bottom of the viewport (on a modest laptop). It will push things like images down and might be even more pronounced for relative units, such as `em` units if the width of the `m` character has changed in the swap.

## Bin all the fonts

My initial solution was to bin all the fonts and use a couple of *classic* font stacks for my styles. Something like this:

```
:root {
    --heading-font: Impact, Haettenschweiler, 'Franklin Gothic Bold', Charcoal, 'Helvetica Inserat', 'Bitstream Vera Sans Bold', 'Arial Black', sans-serif;
    --content-font: Verdana, Geneva, sans-serif;
}
```

This is *fast*, but it's not *nice*. However, it's what any final solution needs to compete with.

## CSS font loading solution

The general properties of the solution are as follows.

1. You need to pick lightweight fonts, i.e. less than 40kb in total (that's 20kb each if you using a heading font and body font).
2. Serve your own fonts! Don't depend on a third party for your font files.
3. Don't `swap`! Use `font-display: block;`. This is why you need small fonts - you're going to hold out until they have been downloaded to avoid nasty layout shifts.
4. Pre-load fonts. Don't surprise your browser with the font that's in your CSS. Tell it early using a `<link rel="preload" ...>` tag on your page.

### Lightweight fonts

I'm using the [Atkinson Hyperlegible font](https://brailleinstitute.org/freefont) from the Braille Institute. It is both a nice-looking font and a highly readable font. I'm using a bold variant for headings, and a regular one for body text. It comes in at 33kb for the pair.

- Atkinson Hyperlegible Bold (WOFF2) is 17kb
- Atkinson Hyperlegible Regular (WOFF2) is 16kb


### Preloading fonts

```html
<link rel="preload" href="/css/Atkinson-Hyperlegible-Bold-102a.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/css/Atkinson-Hyperlegible-Regular-102a.woff2" as="font" type="font/woff2" crossorigin>
```

These `link` tags give the browser advance warning of the fonts, so it can start retrieving them straight away. This reduces the chain from the web page, to the CSS, to the font files.

The `crossorigin` attribute is needed, even though the fonts are not loaded from a different origin. It's there to make the preload request match the way fonts are loaded (fonts are loaded using anonymous-mode CORS event from the same origin).

### CSS font face

I'm adding the `@font-face` blocks to my variables stylesheet, using `font-display: block` to avoid swapping.

I've left out all the other variables and just shown my two font family variables, `--heading-font` and `--content-font`.

```css
@font-face {
    font-family: "hyper-reg";
    font-weight: normal;
    font-style: normal;
    src: url("Atkinson-Hyperlegible-Regular-102a.woff2");
    font-display: block;
}

@font-face {
    font-family: "hyper-bold";
    font-weight: bold;
    font-style: normal;
    src: url("Atkinson-Hyperlegible-Bold-102a.woff2");
    font-display: block;
}

:root {
    --heading-font: 'hyper-bold', sans-serif;
    --content-font: 'hyper-reg', Verdana, Geneva, sans-serif;
}
```

In my CSS files, I can refer to this using the variable, for example:

```css
body {
    font-family: var(--content-font);
}
```

## Summary

You don't have to give up on web fonts. In many cases, you can supply a font that enhances your website for users without the horrible side effects. Just make sure you:

1. Use lightweight fonts
2. Serve them locally
3. Use `font-display: block;`.
4. Pre-load fonts. with `<link rel="preload" ...>`

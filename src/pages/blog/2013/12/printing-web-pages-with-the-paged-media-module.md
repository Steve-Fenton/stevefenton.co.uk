---
layout: src/layouts/Default.astro
title: 'Printing web pages with the Paged Media module'
navMenu: false
pubDate: 2013-12-02T09:58:37+00:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - CSS
    - pagedmedia
---

One of the first questions I answered on a JavaScript forum when I first start programming was about printing web pages. The stock answer for a long time has been “you can’t do” whatever it was you wanted to do. Whether it was having some control over page breaks or customising headers and footers or adjusting margins – you just had no way of hinting to the browser what to do.

Enter the “CSS Paged Media Module” (specifically for this article Level 3). When this module is supported in all browsers, it will give you exactly the kind of control you need to help your document print sensibly.

A quick aside on browser support – as of today it is pretty limited in all browsers, but the specification is still a draft dated 14th November and with a couple of issues still to resolve.

So let’s deal with the fundamental bits in turn.

## Page Fragmentation

This is all about page breaks, either forcing them in or asking for content to be immune from them. To take control of page breaks, target an element and use one of the page-break style rules to force or inhibit breaks:

```css
@media print {
    .on-new-page {
        display: block;
        page-break-before: always;
    }
    .keep-together {
        page-break-before: avoid;
    }
    .keep-intact {
        page-break-inside: avoid;
    }
}
```

You can set “page-break-before”, “page-break-after” and “page-break-inside” and you’ll most likely want to use either “always” to force the page-break or “avoid” to ask for your content to be kept on a single page (if that is possible).

With “page-break-before” you are asking for the element to stick to its predecessor, and with “page-break-after” you are asking the following element to stick with the selected one.

## The Page

Working with pages opens up a lot of opportunities, but one simple one is to set your margins. This can be handy for duplex-printing where you don’t want to print too close to the binding (be it stables, comb-binder or some other grip or clip). This is why it is possible to select left-side and right-side facing pages individually using pseudo-selectors.

```css
@page {
    margin: 2.54cm;
    size: portrait;
}
@page :left {
    margin-right: 3.18cm;
}
@page :right {
    margin-left: 3.18cm;
}
@page :first {
    margin-top: 10cm;
}
```

In this example, we use “:left” and “:right” to set a wider margin on the inner-edge of the page. We also use the “:first” selector to nudge the title further down the page on the front page.

## Content

The possibilities for content and many and varied, but an almost certain use for content is to drop page numbers onto your paper. Here is an updated version of the previous example with the page count added to the outside-edge of each page.

```css
@page :left {
    margin-right: 3.18cm;
    @bottom-left {
        content: counter(page);
    }
}
@page :right {
    margin-left: 3.18cm;
    @bottom-right {
        content: counter(page);
    }
}
```

## But Why?

Okay, so just as we stop printing stuff we invent something to help us printing stuff. Is this just crazy?

Actually it isn’t. One of the best applications of this will be to deliver content direct to e-books. You will be able to write page-able versions of content that will work as continuous content in a web-browser and as paged content on a e-reader. Maybe we won’t need specific formats to work on these fantastic devices. Maybe people will opt to read content in a paged style on The Web rather than as a big scrolling flow.

I’m sure that many applications of these techniques will actually still result in wood-pulp being splattered with ink – but the future of the CSS Paged Media Module is a different way of delivering content to the ever-diversifying range of gadgets.
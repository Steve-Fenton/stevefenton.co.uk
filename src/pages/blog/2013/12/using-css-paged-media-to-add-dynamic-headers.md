---
layout: src/layouts/Default.astro
title: 'Using CSS paged media to add dynamic headers'
navMenu: false
pubDate: 2013-12-04T09:52:35+00:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - CSS
    - pagedmedia
---

In my previous [introduction to the CSS Paged Media Module](/blog/2013/12/printing-web-pages-with-the-paged-media-module/), I briefly talked about adding page numbers to your footers. I’m going to nudge that concept on a little further by showing you how to grab content from the HTML page and inject it into the header.

This is a top trick for the following reasons:

- If you translate your content, your header gets translated
- It avoids hard-coded headers
- Your header can change for each “chapter” or “section”

For example, if you designated your “h2” elements as chapter or section titles, you can show that title on your page with the following two chunks of CSS.

```css
h2 {
    string-set: title content();
}
@page {
    @top-left {
        content: string(title);
    }
}
```

The “h2” rule places the content of the h2 element into a variable named “title”. You don’t have to call it “title”, you can use whatever name you like.

The “@page” rule then uses the “title” variable to put the content into the top-left header.

You can make this more complex to suit your needs, for example you might decide to only show the title on the left-side of your facing pages if you are printing in duplex:

```css
h2 {
    string-set: title content();
}
@page :left {
    @top-left {
        content: string(title);
    }
}
```

The principle is the same, but we have specified the pseudo “:left” selector to only apply the title to left-side pages.
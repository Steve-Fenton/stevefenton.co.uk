---
layout: src/layouts/Default.astro
title: How to return non-HTML responses from Astro
navMenu: false
pubDate: 2022-09-19
modDate: 2022-10-08
keywords: astro,xml,json,sitemap,feed
description: How to generate non-HTML output in Astro for sitemaps, feeds, and more
bannerImage:
    src: /img/2022/09/xml-atom-feed.png
    alt: Entries in an XML Atom feed
authors:
    - steve-fenton
categories:
    - 'Content Management'
tags:
    - Astro
    - JavaScript
---

There are many cases in [Astro](https://astro.build) where you need to return a non-HTML response. For example, for sitemaps, RSS, and Atom feeds you have to return XML, and for search or other APIs you'll want a format such as JSON.

You can use JavaScript files in Astro to create non-HTML responses. For example, to get a file named `search.json` add a file named `search.json.js` to the `/src/pages/` folder.

The file's contents must include an exported `get` function that returns the contents of the output file. You can obtain the information with `Astro.glob` or from another source, like your headless CMS.

Here's a simplified example to show the `get` function.

```javascript
export const get = () => {
    return {
        body: '[1, 2, 3, 4]'
    };
};
```
When you save this file and navigate to `/search.json` in your browser, you’ll see the JSON response: `[1, 2, 3, 4]`.
---
layout: src/layouts/Default.astro
navMenu: false
title: 'How to return non-HTML responses from Astro'
pubDate: 2022-09-19T18:18:25+01:00
author:
    - steve-fenton
categories:
    - Programming
tags:
    - astro
    - javascript
---

There are some cases in [Astro](https://astro.build) where you need to return a non-HTML response. For example, and XML or JSON file.

To do this, create a file with the appropriate name, but add `.js` on the end. For example, if you want `search.json` place the file in the `pages` directory with the name `search.json.js`.

Inside the file, you need to export a getter that returns a response with a body, for example:

```
<pre class="prettyprint lang-javascript">
export const get = () => {
    return {
        body: '[1, 2, 3, 4]'
    };
};
```
When you save this file and navigate to `/search.json` in your browser, you’ll see the JSON response, `[1, 2, 3, 4]`.
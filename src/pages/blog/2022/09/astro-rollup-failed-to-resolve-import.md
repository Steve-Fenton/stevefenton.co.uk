---
layout: src/layouts/Default.astro
navMenu: false
title: 'Astro: Rollup failed to resolve import'
pubDate: 2022-09-20T13:19:20+01:00
author:
    - steve-fenton
categories:
    - Programming
tags:
    - astro
    - typescript
---

This is short reminder to my future self about an error I found in Astro, which defied explanation. This ran find on a local `npm run build`, but inside of GitHub actions it failed.

```
<pre class="prettyprint">
Rollup failed to resolve import "../components/Head/Head.astro"
```
For better or worse, I solved this by renaming `Head.astro` to `HtmlHead.astro`.

Either the term `Head` conflicts with something, or it doesn’t like the folder and file having the same name, i.e. `/Head/Head.astro`.

Know more about this than me? Let me know!
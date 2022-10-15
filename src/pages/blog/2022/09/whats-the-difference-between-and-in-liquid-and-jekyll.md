---
layout: src/layouts/Default.astro
title: What's the difference between {%- and {% in Liquid and Jekyll
navMenu: false
pubDate: 2022-09-07
modDate: 2022-10-08
keywords: jekyll,liquid,template,{%,{%-
description: Find out the difference between Liquid template blocks with dashes {%-, and those without {%.
bannerImage:
    src: /i/x/2022/09/water-droplet.png
    alt: Water droplet by Jayashree Shankar
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - Jekyll
    - Liquid
---

If you are looking at Jekyll templates, you may wonder what the difference is between `{%- -%}` and `{% %}` template blocks.

Luckily, the answer isn’t too tricky. Adding dashes, such as `{%- -%}`, requests that white space surrounding the block is stripped.

You can use it for whitespace before the block: `{%- %}`.

Or, for whitespace after the block: `{% -%}`.

And, of course, neither or both! Just put the dash on the side you want to strip whitespace from. This lets you keep the output super clean, especially when you have multiple lines for readability.

Here’s some code to generate a simple XML sitemap:

```xml
---
layout: null
---
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
{% assign pages = site.pages | where: 'nav-sitemap','true' %}
{% for page in pages %}  <url>
    <loc>{{ site.url }}{{ page.url }}</loc>
    <lastmod>{{ page.date }}</lastmod>
  </url>
{% endfor %}
{% assign posts = site.posts | where: 'nav-sitemap','true' %}
{% for post in posts %}  <url>
    <loc>{{ site.url }}{{ post.url }}</loc>
    <lastmod>{{ post.date }}</lastmod>
  </url>
{% endfor %}
</urlset>
```

This results in a gappy output file!

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

  <url>
    <loc>http://localhost:4000/</loc>
    <lastmod>2022-09-07</lastmod>
  </url>
  <url>
    <loc>http://localhost:4000/sample-page/</loc>
    <lastmod>2022-09-06</lastmod>
  </url>
  <url>
    <loc>http://localhost:4000/sample-sub-page/</loc>
    <lastmod>2022-09-06</lastmod>
  </url>


  <url>
    <loc>http://localhost:4000/articles/2022/09/07/sample-post.html</loc>
    <lastmod>2022-09-07 00:00:00 +0100</lastmod>
  </url>

</urlset>
```

But this can be solved using the whitespace stripping syntax, in this case, just stripping left-hand whitespace in a few locations:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
{%- assign pages = site.pages | where: 'nav-sitemap','true' %}
{%- assign posts = site.posts | where: 'nav-sitemap','true' %}
{% for page in pages %}  <url>
    <loc>{{ site.url }}{{ page.url }}</loc>
    <lastmod>{{ page.date }}</lastmod>
  </url>
{% endfor %}
{%- for post in posts %}  <url>
    <loc>{{ site.url }}{{ post.url }}</loc>
    <lastmod>{{ post.date }}</lastmod>
  </url>
{%- endfor %}
</urlset>
```

This results in a tidy output file:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>http://localhost:4000/</loc>
    <lastmod>2022-09-07</lastmod>
  </url>
  <url>
    <loc>http://localhost:4000/sample-page/</loc>
    <lastmod>2022-09-06</lastmod>
  </url>
  <url>
    <loc>http://localhost:4000/sample-sub-page/</loc>
    <lastmod>2022-09-06</lastmod>
  </url>
  <url>
    <loc>http://localhost:4000/articles/2022/09/07/sample-post.html</loc>
    <lastmod>2022-09-07 00:00:00 +0100</lastmod>
  </url>
</urlset>
```

<small>Liquid drop image by [Jayashree Shankar](https://www.flickr.com/photos/jayashree-shankar/) [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/)</small>
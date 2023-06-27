---
title: Adding a sitemap to Jekyll
navMenu: false
pubDate: 2022-07-21
modDate: 2022-10-08
keywords: jekyll,sitemaps
description: A simple sitemap for Jekyll without a plugin.
bannerImage:
    src: /img/topic/jekyll/jekyll-and-hyde-1931.png
    alt: Promotional for Jekyll and Hyde (1931)
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - Jekyll
---

You don’t need a plugin to add a sitemap to your Jekyll site. You can use this basic template and extend it as required.

## Supporting frontmatter

You may want to control which pages appear in the sitemap. You can add a frontmatter item to control this, such as a `sitemap` flag.

You'll also want a date to add to the sitemap if you don't already have one. If you are working with posts, you might want to keep a separate "modified date" so you can signal that pages have been updated.

```ruby
---
layout: page
layout: src/layouts/Default.astro
navMenu: false
title: My Page Title 
date: 2022-07-20
sitemap: true
---
```

## Sitemap code

You can loop `site.pages` in Jekyll, filtering out pages that aren't flagged to be shown in the sitemap. The `<loc>` needs to be absolute.

```xml
---
layout: null
---
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
{% assign pages = site.pages | where:"sitemap","true" %}{% for page in pages %}  <url>
    <loc>https://example.com/{{ page.url }}</loc>
    <lastmod>{{ page.date }}</lastmod>
  </url>
{% endfor %}
</urlset>
```

This solution works for small, medium, and most larger sites. A website with 2,000 pages will only have a 30 kilobyte sitemap. Because Jekyll generates static files, this is an efficient way to provide a sitemap.

When you imagine a typical image is three to ten times larger than this, you can see why a plugin isn't required for most cases.
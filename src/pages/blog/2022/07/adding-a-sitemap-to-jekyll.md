---
layout: src/layouts/Default.astro
navMenu: false
title: 'Adding a sitemap to Jekyll'
pubDate: 2022-07-21T14:42:35+01:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - jekyll
---

You don’t really need a plugin to add a sitemap to your Jekyll site. You can use this basic template and extend as required.

To give you control over whether a page appears in the sitemap, I’ve used an additional header in the front-yaml on each page. You can see below the additional `date` and `sitemap` properties that we’re going to use…

```
<pre class="prettyprint lang-ruby">
---
layout: page
layout: src/layouts/Default.astro
navMenu: false
title: My Page Title 
date: 2022-07-20
sitemap: true
---
```
This means we can just list relevant pages in a `sitemap.xml` file, like this. It’s just a basic example with the minimal required fields.

```
<pre class="prettyprint lang-xml">
---
layout: null
---
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
{% assign pages = site.pages | where:"sitemap","true" %}{% for page in pages %}  <url>
    <loc>https://octopus.com/devops{{ page.url }}</loc>
    <lastmod>{{ page.date }}</lastmod>
  </url>
{% endfor %}
</urlset>
```
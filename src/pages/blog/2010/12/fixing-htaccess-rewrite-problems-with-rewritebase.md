---
layout: src/layouts/Default.astro
navMenu: false
title: 'Fixing .htaccess rewrite problems with RewriteBase'
pubDate: 2010-12-06T20:07:52+00:00
authors:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=990'
interface_sidebarlayout:
    - default
categories:
    - Programming
tags:
    - PHP
---

I recently encountered an issue on an otherwise perfectly functioning .htaccess file, which contained mod\_rewrite rules. The rules had been working for several years (since 2008 to be precise) but some patch or change on the web server suddenly caused all pages except for the home page to be unavailable.

The error suggested that the rewrite rule was working, but it was reporting the actual PHP page as being missing. Here is an example of the rule:

```apache_conf
RewriteEngine on
RewriteRule ^Site/([^/.]+)/?$ site.php?page=$1 [L,NC,QSA]
```

Which as I mentioned worked fine (and is indeed correct) – but suddenly resulted in a 404 error message:

```
/Site/About-Us/  
404: Page not found site/root/site.php
```

From the error message, I could determine that the URL `/Site/About-Us/` was being correctly redirected to the `site.php` page, which suggested that it was the `site.php` page that was missing. A quick check told me that it was still there – so it was back to the error message for a second look.

The clue is actually in the error message. If this was a genuine problem, I wouldn’t expect to see `site/root/site.php`. I would expect to see `/site.php` – as the underlying folder structure of the web server should be irrelevant to the domain.

The net outcome of the issue is that by specifying the `RewriteBase` address as simply, “/”, the problem goes away and everything runs happily once again.

```apache_conf
RewriteEngine on
RewriteBase /
RewriteRule ^Site/([^/.]+)/?$ site.php?page=$1 [L,NC,QSA]
```
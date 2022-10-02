---
layout: src/layouts/Default.astro
navMenu: false
title: 'Example test MIME message'
pubDate: 2014-11-21T20:03:15+00:00
authors:
    - steve-fenton
interface_sidebarlayout:
    - default
categories:
    - Programming
tags:
    - mime
    - smtp
---

If you have ever performed exploratory testing of an SMTP server, you’ll have gotten bored of typing out MIME messages when sending data. If so, you’ll enjoy pasting this example message instead:

```
<pre class="prettyprint lang-plain_text">
MIME-Version: 1.0
To: <sender@example.com>
From: <recipient@example.com>
Subject: This is an example
Content-Type: text/plain

You can put your plain text content here
if you want to change it.
```
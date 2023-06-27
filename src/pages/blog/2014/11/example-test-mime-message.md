---
title: 'Example test MIME message'
navMenu: false
pubDate: 2014-11-21T20:03:15+00:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - MIME
    - SMTP
---

If you have ever performed exploratory testing of an SMTP server, you’ll have gotten bored of typing out MIME messages when sending data. If so, you’ll enjoy pasting this example message instead:

```
MIME-Version: 1.0
To: <sender@example.com>
From: <recipient@example.com>
Subject: This is an example
Content-Type: text/plain

You can put your plain text content here
if you want to change it.
```
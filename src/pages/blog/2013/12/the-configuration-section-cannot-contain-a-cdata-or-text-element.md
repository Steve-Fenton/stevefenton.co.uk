---
id: 466
title: 'The configuration section cannot contain a CDATA or text element'
pubDate: '2013-12-13T09:38:44+00:00'
author: 'Steve Fenton'
layout: post
guid: 'https://www.stevefenton.co.uk/?p=466'
permalink: /2013/12/the-configuration-section-cannot-contain-a-cdata-or-text-element/
interface_sidebarlayout:
    - default
categories:
    - Programming
tags:
    - xml
---

If you have a quick trawl for the error message “The configuration section cannot contain a CDATA or text element” you’ll find that currently there isn’t much solid advice for this error message.

The good news is, it is usually quite simple.

The most likely cause for this error message is that a rogue key-press has made its way into your config file outside of an element or attribute.

For example:

```
<pre class="prettyprint lang-xml">
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <appSettings>
    <add key="SomeKey" value="Some Value"/>s
  </appSettings>
</configuration>
```

In this example, someone meant to press “CTRL + S” to save the file, but missed the CTRL key, so the “s” is a hanging piece of text that makes the config file invalid.
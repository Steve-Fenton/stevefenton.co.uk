---
title: 'The configuration section cannot contain a CDATA or text element'
navMenu: false
pubDate: 2013-12-13T09:38:44+00:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - XML
---

If you have a quick trawl for the error message “The configuration section cannot contain a CDATA or text element” you’ll find that currently there isn’t much solid advice for this error message.

The good news is, it is usually quite simple.

The most likely cause for this error message is that a rogue key-press has made its way into your config file outside of an element or attribute.

For example:

```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <appSettings>
    <add key="SomeKey" value="Some Value"/>s
  </appSettings>
</configuration>
```

In this example, someone meant to press “CTRL + S” to save the file, but missed the CTRL key, so the “s” is a hanging piece of text that makes the config file invalid.
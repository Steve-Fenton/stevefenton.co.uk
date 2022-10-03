---
layout: src/layouts/Default.astro
title: 'Conditionally apply IIS URLRewrite rules'
navMenu: false
pubDate: 2017-10-15T05:00:51+01:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - ASP.NET
    - Routing
---

If you are using the IIS URLRewrite module to fix up your request URLs, you may well come across the need to conditionally apply rules.

For example, the following rule redirects all “.aspx” pages in the root of the web application to an extensionless URL:

 ```xml
<rule name="Redirect .aspx to Extensionless" stopProcessing="true">
  <match url="^([_0-9a-z-,]+).aspx" ignoreCase="true" />
  <action type="Redirect" url="/{R:1}" redirectType="Permanent" />
</rule>
```

In this rule, the name is preserved, but the extension is dropped, so “/home.aspx” would be redirected to “/home”.

## Except…

The problem arises when you have specific cases where you need to keep your “.aspx” extension. You don’t want to expand your rule into a list of files to redirect, so you need to add “except when” conditions, or *negations*.

Here is a simple negation that says “if the file name starts with *api* then don’t appy this rule”. This means “apicall.aspx”, “apiaction.aspx”, or any other file starting with “api” will all be left alone. Everything else will have the extension removed.

 ```xml
<rule name="Redirect .aspx to Extensionless" stopProcessing="true">
  <match url="^([_0-9a-z-,]+).aspx" ignoreCase="true" />
  <conditions trackAllCaptures="true">
    <add input="{R:1}" pattern="api(.*)" negate="true" />
  </conditions>
  <action type="Redirect" url="/{R:1}" redirectType="Permanent" />
</rule>
```

 A more realistic example would be the below rule, which allows certain sub-folders to be excluded when using URLRewrite rules to perform some action.

 ```xml
<rule name="Redirect .aspx to Extensionless" stopProcessing="true">
  <match url="^([_0-9a-z-,]+)/([_0-9a-z-,]+).aspx" ignoreCase="true" />
  <conditions trackAllCaptures="true">
    <add input="{R:1}" pattern="api" negate="true" />
  </conditions>
  <action type="Redirect" url="/{R:1}" redirectType="Permanent" />
</rule>
```

In this case, the whole “api” folder is ignored.

## Summary

Instead of exploding your rules into large lists of “included” rewrites, you may be able to use negations to exclude sets of URLs from a single rule.
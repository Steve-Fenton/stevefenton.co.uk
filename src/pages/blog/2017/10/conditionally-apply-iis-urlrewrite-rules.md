---
layout: src/layouts/Default.astro
navMenu: false
title: 'Conditionally apply IIS URLRewrite rules'
pubDate: 2017-10-15T05:00:51+01:00
authors:
    - steve-fenton
medium_post:
    - 'O:11:"Medium_Post":11:{s:16:"author_image_url";s:75:"https://cdn-images-1.medium.com/fit/c/400/400/1*eXkhfEuF41g5W_xnc_ydLA.jpeg";s:10:"author_url";s:38:"https://medium.com/@steve.fenton.co.uk";s:11:"byline_name";N;s:12:"byline_email";N;s:10:"cross_link";s:3:"yes";s:2:"id";s:12:"abacd1ef0a29";s:21:"follower_notification";s:3:"yes";s:7:"license";s:19:"all-rights-reserved";s:14:"publication_id";s:2:"-1";s:6:"status";s:5:"draft";s:3:"url";s:51:"https://medium.com/@steve.fenton.co.uk/abacd1ef0a29";}'
categories:
    - Programming
tags:
    - asp.net
    - routing
---

If you are using the IIS URLRewrite module to fix up your request URLs, you may well come across the need to conditionally apply rules.

For example, the following rule redirects all “.aspx” pages in the root of the web application to an extensionless URL:

 ```
<pre class="wp-block-code prettyprint lang-xml">```
    &lt;rule name="Redirect .aspx to Extensionless" stopProcessing="true">
      &lt;match url="^([_0-9a-z-,]+).aspx" ignoreCase="true" />
      &lt;action type="Redirect" url="/{R:1}" redirectType="Permanent" />
    &lt;/rule>
```
```
In this rule, the name is preserved, but the extension is dropped, so “/home.aspx” would be redirected to “/home”.

### Except…

The problem arises when you have specific cases where you need to keep your “.aspx” extension. You don’t want to expand your rule into a list of files to redirect, so you need to add “except when” conditions, or *negations*.

Here is a simple negation that says “if the file name starts with *api* then don’t appy this rule”. This means “apicall.aspx”, “apiaction.aspx”, or any other file starting with “api” will all be left alone. Everything else will have the extension removed.

 ```
<pre class="wp-block-code prettyprint lang-xml">```
    &lt;rule name="Redirect .aspx to Extensionless" stopProcessing="true">
      &lt;match url="^([_0-9a-z-,]+).aspx" ignoreCase="true" />
      &lt;conditions trackAllCaptures="true">
        &lt;add input="{R:1}" pattern="api(.*)" negate="true" />
      &lt;/conditions>
      &lt;action type="Redirect" url="/{R:1}" redirectType="Permanent" />
    &lt;/rule>
```
```
 A more realistic example would be the below rule, which allows certain sub-folders to be excluded when using URLRewrite rules to perform some action.

 ```
<pre class="wp-block-code prettyprint lang-xml">```
    &lt;rule name="Redirect .aspx to Extensionless" stopProcessing="true">
      &lt;match url="^([_0-9a-z-,]+)/([_0-9a-z-,]+).aspx" ignoreCase="true" />
      &lt;conditions trackAllCaptures="true">
        &lt;add input="{R:1}" pattern="api" negate="true" />
      &lt;/conditions>
      &lt;action type="Redirect" url="/{R:1}" redirectType="Permanent" />
    &lt;/rule>
```
```
In this case, the whole “api” folder is ignored.

### Summary

Instead of exploding your rules into large lists of “included” rewrites, you may be able to use negations to exclude sets of URLs from a single rule.
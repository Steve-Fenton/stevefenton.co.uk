---
layout: src/layouts/Default.astro
navMenu: false
title: 'Using Katelyn Crawler to find all domain references'
pubDate: 2017-11-01T05:00:41+00:00
authors:
    - steve-fenton
categories:
    - Automation
tags:
    - Crawler
    - Katelyn
---

You can use the [Katelyn Crawler](https://github.com/Steve-Fenton/Katelyn/wiki/Katelyn-UI) to crawl a website looking for references to a particular domain. I have an example below, which will report back not just each instance of the domain, but the actual full URL that was found, but don’t limit your imagination.

![Katelyn Crawler](/img/2017/10/katelyn-crawler.png)

You could search for any HTTP references that should be HTTPS, or all links to a domain that you have retired, or to find links that use an old scheme that you have replaced with a new scheme.

### Find links by domain

The following regular expression can be placed in the “Search Exp” field in Katelyn UI, and will find all fully qualified references to www.example.com. The matches will be output as errors and will include the full URL that was found, for example “At 1356 – https://www.example.com/images/photo.jpg”. The results are organised by the page they were found on, making it super easy to find the reference.

```
<pre class="prettyprint lang-regex">
(?:http:\/\/?|https:\/\/?)(www\.example\.com\/.*?)"
```
You could also completly ignore the http / https part (for example if you were using scheme-relative links that start “//”):

```
<pre class="prettyprint lang-regex">
(www\.example\.com\/.*?)"
```
And you could make further adjustements if you didn’t care about the “www” subdomain in particular, or if you wanted to check some other subdomain.

### Find all non-HTTPS resources

Here’s a practical example… find all non-HTTPS resources (images, links, scripts, CSS) using the following:

```
<pre class="prettyprint lang-regex">
(?:http:\/\/?)(www\.example\.com\/.*?)"
```
This will tell you the full address of each resource that is being requested over HTTP on the website – so you can update the references to HTTPS and avoid a redirect for each one.

### Highly flexible

The Search Expression input is highly flexible, if you can write (or find) a regular expression that uses the C# syntax – you can ask Katelyn to find things for you. Because Katelyn is a slow crawler, it won’t destroy your server in the process. You can use a [regex tester online](https://regex101.com/r/LLNkgL/1) to try out your changes before running a crawl.
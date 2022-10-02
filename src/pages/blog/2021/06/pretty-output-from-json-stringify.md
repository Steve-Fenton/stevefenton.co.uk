---
layout: src/layouts/Default.astro
navMenu: false
title: 'Pretty output from JSON.stringify'
pubDate: 2021-06-03T13:59:39+01:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - javascript
    - typescript
---

We all like to log stuff out sometimes and it would be nice if it were as readable as possible when we do. If you are using `JSON.stringify` to drop out some values and are tired of getting a long line of text, here’s a simple way to get pretty printed output without adding any external libraries to prettify it.

When you call stringify, like below, you get a long string of data.

```
<pre class="prettyprint lang-javascript">
JSON.stringify(event.detail);

/*
{"name":"Eifel Tower","dimensions":{"height":357.5,"width":124.9}}
*/
```
But there are actually two other parameters on stringify: `JSON.stringify(value, replacer, space)`. That last one is the interesting one here, as it allows you to specify the indentation for a pretty output.

```
<pre class="prettyprint lang-javascript">
JSON.stringify(event.detail, null, 4);

/*
{
    "name": "Eifel Tower",
    "dimensions": {
        "height": 357.5,
        "width": 124.9
    }
}
*/
```
Now we have the same output, but formatted with new lines and indentation.
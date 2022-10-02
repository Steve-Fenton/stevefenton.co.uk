---
layout: src/layouts/Default.astro
navMenu: false
title: 'Using Log Parser Studio to find guilty IP addresses from X-Forwarded-For'
pubDate: 2016-08-08T16:57:58+01:00
author:
    - steve-fenton
categories:
    - Programming
    - Windows
tags:
    - iis
    - 'log parser studio'
    - logs
    - 'web log importer'
---

You may have seen how to find guilty IP addresses in my post [Using Log Parser Studio to Find Guilty IP Addresses](/2016/03/using-log-parser-studio-to-find-guilty-ip-addresses/), but if you have [enabled the logging of X-Forwarded-For IP addresses in IIS](/2016/08/add-x-forwarded-for-ip-address-to-iis-logs/) you may want to use this updated version, which gets the top offending IP addresses based on the X-Forwarded-For header:

```
<pre class="prettyprint lang-sql">
SELECT
    X-Forwarded-For,
    count(X-Forwarded-For) as requestcount
FROM
    '[LOGFILEPATH]'
WHERE
    date = '2016-08-08' 
GROUP BY
    X-Forwarded-For
ORDER BY
    count(X-Forwarded-For) DESC
```
Don’t forget to change the date when you run this query.

### Web Log Importer

If you are using [Web Log Importer](/tag/web-log-importer/), you can get the same information using the following query:

```
<pre class="prettyprint lang-sql">
SELECT
    [X_Forwarded_For],
    COUNT(1) AS RequestCount
FROM
    LogEntry
WHERE
    [date] = '2020-03-10' 
GROUP BY
    [X_Forwarded_For]
ORDER BY
    COUNT(1) DESC
```
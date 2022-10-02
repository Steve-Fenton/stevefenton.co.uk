---
layout: src/layouts/Default.astro
navMenu: false
title: 'Using Log Parser Studio to get requests per hour or minute'
pubDate: 2016-04-23T11:42:05+01:00
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

After a load test of some web servers, I needed to have a look through the IIS logs to find out how many requests per minute were being generated on a specific web farm server.

The following Log Parser Studio query will group the results by minute, but you can adjust the QUANTIZE call to pass in 3600 rather than 60 if you wanted per-hour numbers.

```
<pre class="prettyprint lang-sql">
SELECT
    QUANTIZE(TO_TIMESTAMP(date, time), 60) AS M, 
    COUNT(*) AS Total,  
    SUM(sc-bytes) AS TotBytesSent 
FROM
    '[LOGFILEPATH]'
WHERE
    date > '2016-04-23'
GROUP BY M 
ORDER BY M
```
### Web Log Importer

If you are using [Web Log Importer](/tag/web-log-importer/), you can get the same information using the following query (the function will move dates to the nearest minute, the last argument is how many minutes – so in this case every “1” minute):

```
<pre class="prettyprint lang-sql">
SELECT
    dbo.RoundToMinutes([date], [time], 1) AS M,
    COUNT(1) AS Total 
FROM
    LogEntry
WHERE
    [date] = '2020-03-10'
GROUP BY
    dbo.RoundToMinutes([date], [time], 1)
ORDER BY
    dbo.RoundToMinutes([date], [time], 1)
```
And it’s easy to switch from minutes to hours by changing the size of the round call, like so (rounds to “60” minute chunks):

```
<pre class="prettyprint lang-sql">
SELECT
    dbo.RoundToMinutes([date], [time], 60) AS H,
    COUNT(1) AS Total 
FROM
    LogEntry
WHERE
    [date] = '2020-03-10'
GROUP BY
    dbo.RoundToMinutes([date], [time], 60)
ORDER BY
    dbo.RoundToMinutes([date], [time], 60)
```
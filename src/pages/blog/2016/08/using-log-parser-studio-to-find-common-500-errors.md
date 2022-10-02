---
id: 1925
title: 'Using Log Parser Studio to find common 500 errors'
pubDate: '2016-08-25T19:15:17+01:00'
author: 'Steve Fenton'
layout: post
guid: 'https://www.stevefenton.co.uk/?p=1925'
permalink: /2016/08/using-log-parser-studio-to-find-common-500-errors/
categories:
    - Programming
    - Windows
tags:
    - iis
    - 'log parser studio'
    - logs
---

The following Log Parser Studio query will find common erroring URLs. You could adapt this to find common addresses for other status codes too.

```
<pre class="prettyprint lang-sql">
SELECT TOP 20
    cs-uri-stem, 
    COUNT(*) AS Total, 
    MAX(time-taken) AS MaxTime, 
    AVG(time-taken) AS AvgTime
FROM
    '[LOGFILEPATH]'
WHERE
    date > SUB(TO_LOCALTIME(SYSTEM_TIMESTAMP()), TIMESTAMP('0000-01-02 00:00', 'yyyy-MM-dd HH:mm'))
AND
    sc-status = '500'
GROUP BY
    cs-uri-stem
ORDER BY
    Total DESC
```

### Web Log Importer

If you are using [Web Log Importer](https://www.stevefenton.co.uk/tag/web-log-importer/), you can get the same information using the following query:

```
<pre class="prettyprint lang-sql">
SELECT TOP 20
    cs_uri_stem, 
    COUNT(1) AS Total, 
    MAX([time_taken]) AS MaxTime, 
    AVG([time_taken]) AS AvgTime
FROM
    LogEntry
WHERE
    [date] = '2020-03-10'
AND
    [sc_status] >= 500
GROUP BY
    [cs_uri_stem]
ORDER BY
    COUNT(1) DESC
```
---
layout: src/layouts/Default.astro
navMenu: false
title: 'Using Log Parser Studio to get request by host name'
pubDate: 2016-04-19T06:00:21+01:00
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

I am working on an application that accepts request for many different domain names, and sends back different content for each one. This means there is one log file for multiple logical sites, because they all run within the same instance of the web application.

To make diagnostics easier, I have enabled the “cs-host” column in IIS to log the host name in the log files.

The following log parser studio query will get you the number of requests for a given host name in log parser studio:

```
<pre class="prettyprint lang-sql">
SELECT TOP 20
    cs-host, 
    COUNT(*) AS Total
FROM
    '[LOGFILEPATH]' 
GROUP BY
    cs-host
ORDER BY
    Total DESC
```

And this log parser studio query will get you the top URLs for that host:

```
<pre class="prettyprint lang-sql">
SELECT TOP 20
    cs-uri-stem, 
    COUNT(*) AS Total, 
    MAX(time-taken) AS MaxTime, 
    AVG(time-taken) AS AvgTime,
    AVG(sc-bytes) AS AvgBytes
FROM
    '[LOGFILEPATH]' 
WHERE
    cs-host = 'example.com'
GROUP BY
    cs-uri-stem
ORDER BY
    Total DESC
```

### Web Log Importer

If you are using [Web Log Importer](https://www.stevefenton.co.uk/tag/web-log-importer/), you can get the same information using the following query for host names:

```
<pre class="prettyprint lang-sql">
SELECT TOP 20
    [cs_host], 
    COUNT(1) AS Total
FROM
    LogEntry
GROUP BY
    [cs_host]
ORDER BY
    COUNT(1) DESC
```

And the following query to get top URLs by host:

```
<pre class="prettyprint lang-sql">
SELECT TOP 20
    [cs_uri_stem], 
    COUNT(1) AS Total, 
    MAX([time_taken]) AS MaxTime, 
    AVG([time_taken]) AS AvgTime,
    AVG([sc_bytes]) AS AvgBytes
FROM
    LogEntry
WHERE
    [cs_host] = 'example.com'
GROUP BY
    [cs_uri_stem]
ORDER BY
    COUNT(1) DESC
```

Note: to use sc\_bytes you have to have enabled it in your IIS logs. Web Log Importer won’t create columns for fields that are not present in your log files.
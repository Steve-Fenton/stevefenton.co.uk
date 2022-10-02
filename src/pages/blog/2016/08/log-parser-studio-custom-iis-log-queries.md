---
layout: src/layouts/Default.astro
navMenu: false
title: 'Log Parser Studio custom IIS log queries'
pubDate: 2016-08-09T06:00:58+01:00
author:
    - steve-fenton
categories:
    - Programming
    - Windows
tags:
    - iis
    - 'log parser studio'
    - logs
---

If you want to add my set of Log Parser Studio custom queries to your LPS library, follow these instructions…

Note: if you want to merge these with your existing queries, just copy the inner nodes into your LPS library file – if you just want to use my custom set without searching through the huge list of standard queries, you can overwrite your LPS library file.

You can find the LPS library file next to the LPS.exe file. It is called “LPSV2Library.XML”.

Many of these queries are adapted from the standard versions, and others will be particularly helpful if you…

- Use a load balancer and use X-Forwarded-For
- Run multiple hosts from a single IIS website

```
<pre class="prettyprint lang-xml"><?xml version="1.0" encoding="utf-8"?>
<ArrayOfLPQuery xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
  <LPQuery>
    <QueryName>CUSTOM: List of User Agents</QueryName>
    <QueryDescription>List of user agents and popularity. See https://www.stevefenton.co.uk/2016/08/using-log-parser-studio-to-find-user-agents/</QueryDescription>
    <QueryData>
SELECT
    cs(User-Agent),
    COUNT(cs(User-Agent)) AS requestcount
FROM
	'[LOGFILEPATH]'
WHERE
    date &gt; SUB(TO_LOCALTIME(SYSTEM_TIMESTAMP()), TIMESTAMP('0000-01-02 00:00', 'yyyy-MM-dd HH:mm'))
GROUP BY cs(User-Agent)
ORDER BY COUNT(cs(User-Agent)) DESC</QueryData>
    <QueryID>248e5a40-bb08-452a-9839-87bda2118791</QueryID>
    <LogType>W3CLOG</LogType>
    <QueryCategory>ALL</QueryCategory>
    <IsFavorite>true</IsFavorite>
    <DateModified>2016-08-08T18:37:54.2642531+00:00</DateModified>
  </LPQuery>
  <LPQuery>
    <QueryName>CUSTOM: Requests Per Day</QueryName>
    <QueryDescription>Count of requests per day. See https://www.stevefenton.co.uk/2016/04/using-log-parser-studio-to-get-requests-per-hour-or-minute/</QueryDescription>
    <QueryData>
SELECT
    date, 
    COUNT(*) AS Total,  
    SUM(sc-bytes) AS TotBytesSent 
FROM
	'[LOGFILEPATH]'
WHERE
    date &gt; SUB(TO_LOCALTIME(SYSTEM_TIMESTAMP()), TIMESTAMP('0000-01-02 00:00', 'yyyy-MM-dd HH:mm'))
GROUP BY date
ORDER BY date
</QueryData>
    <QueryID>59965b72-929a-4434-a579-8890c60d8069</QueryID>
    <LogType>W3CLOG</LogType>
    <QueryCategory>ALL</QueryCategory>
    <IsFavorite>true</IsFavorite>
    <DateModified>2016-08-08T18:36:41.2720729+00:00</DateModified>
  </LPQuery>
  <LPQuery>
    <QueryName>CUSTOM: Requests Per Hour</QueryName>
    <QueryDescription>Count of requests per hour. See https://www.stevefenton.co.uk/2016/04/using-log-parser-studio-to-get-requests-per-hour-or-minute/</QueryDescription>
    <QueryData>
SELECT
    QUANTIZE(TO_TIMESTAMP(date, time), 3600) AS H, 
    COUNT(*) AS Total,  
    SUM(sc-bytes) AS TotBytesSent 
FROM
	'[LOGFILEPATH]'
WHERE
    date &gt; SUB(TO_LOCALTIME(SYSTEM_TIMESTAMP()), TIMESTAMP('0000-01-02 00:00', 'yyyy-MM-dd HH:mm'))
GROUP BY H
ORDER BY H</QueryData>
    <QueryID>b0917339-8acd-4b5c-ab58-d6198fe10de0</QueryID>
    <LogType>W3CLOG</LogType>
    <QueryCategory>ALL</QueryCategory>
    <IsFavorite>true</IsFavorite>
    <DateModified>2016-08-08T18:34:26.8383854+00:00</DateModified>
  </LPQuery>
  <LPQuery>
    <QueryName>CUSTOM: Requests Per Minute</QueryName>
    <QueryDescription>Count of requests per minute. See https://www.stevefenton.co.uk/2016/04/using-log-parser-studio-to-get-requests-per-hour-or-minute/</QueryDescription>
    <QueryData>
SELECT
    QUANTIZE(TO_TIMESTAMP(date, time), 60) AS M, 
    COUNT(*) AS Total,  
    SUM(sc-bytes) AS TotBytesSent 
FROM
    '[LOGFILEPATH]'
WHERE
    date &gt; SUB(TO_LOCALTIME(SYSTEM_TIMESTAMP()), TIMESTAMP('0000-01-02 00:00', 'yyyy-MM-dd HH:mm'))
GROUP BY M 
ORDER BY M</QueryData>
    <QueryID>d1cc5a6a-a4b5-484a-81fb-5902126aabcf</QueryID>
    <LogType>W3CLOG</LogType>
    <QueryCategory>ALL</QueryCategory>
    <IsFavorite>true</IsFavorite>
    <DateModified>2016-08-08T18:33:45.1749898+00:00</DateModified>
  </LPQuery>
  <LPQuery>
    <QueryName>CUSTOM: Top 20 URIs</QueryName>
    <QueryDescription>Top list of URIs.</QueryDescription>
    <QueryData>
SELECT TOP 20
   	cs-uri-stem, 
	COUNT(*) AS Total, 
	MAX(time-taken) AS MaxTime, 
	AVG(time-taken) AS AvgTime
FROM
	'[LOGFILEPATH]'
WHERE
    date &gt; SUB(TO_LOCALTIME(SYSTEM_TIMESTAMP()), TIMESTAMP('0000-01-02 00:00', 'yyyy-MM-dd HH:mm'))
GROUP BY cs-uri-stem
ORDER BY Total DESC
</QueryData>
    <QueryID>2818b23a-5cbe-4e8d-b629-0263313bc4eb</QueryID>
    <LogType>W3CLOG</LogType>
    <QueryCategory>ALL</QueryCategory>
    <IsFavorite>true</IsFavorite>
    <DateModified>2016-08-08T18:37:54.2642531+00:00</DateModified>
  </LPQuery>
  <LPQuery>
    <QueryName>CUSTOM: Top Addresses For Host Name</QueryName>
    <QueryDescription>Top list of addresses for a host name. See https://www.stevefenton.co.uk/2016/04/using-log-parser-studio-to-get-request-by-host-name/</QueryDescription>
    <QueryData>
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
AND
    date &gt; SUB(TO_LOCALTIME(SYSTEM_TIMESTAMP()), TIMESTAMP('0000-01-02 00:00', 'yyyy-MM-dd HH:mm'))
GROUP BY cs-uri-stem
ORDER BY Total DESC</QueryData>
    <QueryID>0cfaa086-b529-4d19-b58b-ccae9de0f4b9</QueryID>
    <LogType>W3CLOG</LogType>
    <QueryCategory>ALL</QueryCategory>
    <IsFavorite>true</IsFavorite>
    <DateModified>2016-08-08T18:32:12.3246746+00:00</DateModified>
  </LPQuery>
  <LPQuery>
    <QueryName>CUSTOM: Top Host Names</QueryName>
    <QueryDescription>Top list of host names. See https://www.stevefenton.co.uk/2016/04/using-log-parser-studio-to-get-request-by-host-name/</QueryDescription>
    <QueryData>
SELECT TOP 20
    cs-host, 
    COUNT(*) AS Total
FROM
	'[LOGFILEPATH]' 
WHERE
    date &gt; SUB(TO_LOCALTIME(SYSTEM_TIMESTAMP()), TIMESTAMP('0000-01-02 00:00', 'yyyy-MM-dd HH:mm'))
GROUP BY cs-host
ORDER BY Total DESC</QueryData>
    <QueryID>41d7033d-8570-48e1-85ba-679755483d58</QueryID>
    <LogType>W3CLOG</LogType>
    <QueryCategory>ALL</QueryCategory>
    <IsFavorite>true</IsFavorite>
    <DateModified>2016-08-08T18:30:25.5495609+00:00</DateModified>
  </LPQuery>
  <LPQuery>
    <QueryName>CUSTOM: Top IP Rangers</QueryName>
    <QueryDescription>Top list of first three octets of IP addresses.</QueryDescription>
    <QueryData>SELECT
    EXTRACT_PREFIX(c-ip, 2, '.') AS ip-range,
    COUNT(ip-range) AS requestcount
FROM
	'[LOGFILEPATH]'
WHERE
    date &gt; SUB(TO_LOCALTIME(SYSTEM_TIMESTAMP()), TIMESTAMP('0000-01-02 00:00', 'yyyy-MM-dd HH:mm'))
GROUP BY ip-range
ORDER BY COUNT(ip-range) DESC</QueryData>
    <QueryID>25644ade-083a-4a6d-a326-0e23c56d9389</QueryID>
    <LogType>W3CLOG</LogType>
    <QueryCategory>ALL</QueryCategory>
    <IsFavorite>true</IsFavorite>
    <DateModified>2016-08-09T08:13:48.2146795+00:00</DateModified>
  </LPQuery>
  <LPQuery>
    <QueryName>CUSTOM: Top IPs</QueryName>
    <QueryDescription>Top list of IP addresses. See https://www.stevefenton.co.uk/2016/03/using-log-parser-studio-to-find-guilty-ip-addresses/</QueryDescription>
    <QueryData>
SELECT
    c-ip,
    count(c-ip) AS requestcount
FROM
	'[LOGFILEPATH]'
WHERE
    date &gt; SUB(TO_LOCALTIME(SYSTEM_TIMESTAMP()), TIMESTAMP('0000-01-02 00:00', 'yyyy-MM-dd HH:mm'))
GROUP BY c-ip 
ORDER BY count(c-ip) DESC</QueryData>
    <QueryID>08e43a1e-10b5-44e8-8841-569fc7343c02</QueryID>
    <LogType>W3CLOG</LogType>
    <QueryCategory>ALL</QueryCategory>
    <IsFavorite>true</IsFavorite>
    <DateModified>2016-08-08T18:28:53.8463084+00:00</DateModified>
  </LPQuery>
  <LPQuery>
    <QueryName>CUSTOM: Top Requests From IP Range</QueryName>
    <QueryDescription>Top list of IP addresses from a given range.</QueryDescription>
    <QueryData>SELECT
    c-ip,
    EXTRACT_PREFIX(c-ip, 2, '.') AS ip-range,
    COUNT(c-ip) AS requestcount
FROM
	'[LOGFILEPATH]'
WHERE
    date &gt; SUB(TO_LOCALTIME(SYSTEM_TIMESTAMP()), TIMESTAMP('0000-01-02 00:00', 'yyyy-MM-dd HH:mm'))
AND
    ip-range = '192.168.2'
GROUP BY c-ip, ip-range
ORDER BY COUNT(c-ip) DESC</QueryData>
    <QueryID>05962ae7-84de-414c-95cd-2e95d7d0e8a0</QueryID>
    <LogType>W3CLOG</LogType>
    <QueryCategory>ALL</QueryCategory>
    <IsFavorite>true</IsFavorite>
    <DateModified>2016-08-09T08:22:44.2563766+00:00</DateModified>
  </LPQuery>
  <LPQuery>
    <QueryName>CUSTOM: Top Slow URLs</QueryName>
    <QueryDescription>Top list of slow URLs</QueryDescription>
    <QueryData>
SELECT TOP 25  
    cs-uri-stem AS URL,  
    MAX(time-taken) AS Max,  
    MIN(time-taken) AS Min,  
    Avg(time-taken) AS Average  
FROM
	'[LOGFILEPATH]'
WHERE
    date &gt; SUB(TO_LOCALTIME(SYSTEM_TIMESTAMP()), TIMESTAMP('0000-01-02 00:00', 'yyyy-MM-dd HH:mm'))
GROUP BY URL  
ORDER BY Average DESC </QueryData>
    <QueryID>8cf173d8-ba44-4aed-ba8c-eaf7f7ce0559</QueryID>
    <LogType>W3CLOG</LogType>
    <QueryCategory>ALL</QueryCategory>
    <IsFavorite>true</IsFavorite>
    <DateModified>2016-08-08T18:37:54.2642531+00:00</DateModified>
  </LPQuery>
  <LPQuery>
    <QueryName>CUSTOM: Top Status Codes</QueryName>
    <QueryDescription>Top list of status codes.</QueryDescription>
    <QueryData>
SELECT TOP 25  
    sc-status,
    COUNT(*) AS Hits  
FROM
	'[LOGFILEPATH]'
WHERE
    date &gt; SUB(TO_LOCALTIME(SYSTEM_TIMESTAMP()), TIMESTAMP('0000-01-02 00:00', 'yyyy-MM-dd HH:mm'))	
GROUP BY sc-status  
ORDER BY Hits DESC </QueryData>
    <QueryID>e80a8693-c0be-49fd-bcab-7e8f6512cfd7</QueryID>
    <LogType>W3CLOG</LogType>
    <QueryCategory>ALL</QueryCategory>
    <IsFavorite>true</IsFavorite>
    <DateModified>2016-08-08T18:37:54.2642531+00:00</DateModified>
  </LPQuery>
  <LPQuery>
    <QueryName>CUSTOM: Top Verbs</QueryName>
    <QueryDescription>Top list of HTTP verbs.</QueryDescription>
    <QueryData>
SELECT TOP 20
 	cs-method, 
	COUNT(*) AS Total, 
	MAX(time-taken) AS MaxTime, 
	AVG(time-taken) AS AvgTime, 
	AVG(sc-bytes) AS AvgBytesSent 
FROM
	'[LOGFILEPATH]' 
WHERE
    date &gt; SUB(TO_LOCALTIME(SYSTEM_TIMESTAMP()), TIMESTAMP('0000-01-02 00:00', 'yyyy-MM-dd HH:mm'))
GROUP BY cs-method 
ORDER BY Total DESC
</QueryData>
    <QueryID>4c13c624-8d15-43b9-b94b-123283467941</QueryID>
    <LogType>W3CLOG</LogType>
    <QueryCategory>ALL</QueryCategory>
    <IsFavorite>true</IsFavorite>
    <DateModified>2016-08-08T18:37:54.2642531+00:00</DateModified>
  </LPQuery>
  <LPQuery>
    <QueryName>CUSTOM: Top X-Forwarded-For Ranges</QueryName>
    <QueryDescription>Top list of first three octets of X-Forwarded-For IP addresses.</QueryDescription>
    <QueryData>
SELECT
    EXTRACT_PREFIX(X-Forwarded-For, 2, '.') AS ip-range,
    COUNT(ip-range) AS requestcount
FROM
	'[LOGFILEPATH]'
WHERE
    date &gt; SUB(TO_LOCALTIME(SYSTEM_TIMESTAMP()), TIMESTAMP('0000-01-02 00:00', 'yyyy-MM-dd HH:mm'))
GROUP BY ip-range
ORDER BY COUNT(ip-range) DESC</QueryData>
    <QueryID>a3d3722b-5c28-4f72-85f9-8c5c988cfaf9</QueryID>
    <LogType>W3CLOG</LogType>
    <QueryCategory>ALL</QueryCategory>
    <IsFavorite>true</IsFavorite>
    <DateModified>2016-08-09T08:06:39.306117+00:00</DateModified>
  </LPQuery>
  <LPQuery>
    <QueryName>CUSTOM: Top X-Forwarded-For Top IPs</QueryName>
    <QueryDescription>Top list of IP addresses from the X-Forwarded-For header. See https://www.stevefenton.co.uk/2016/08/using-log-parser-studio-to-find-guilty-ip-addresses-from-x-forwarded-for/</QueryDescription>
    <QueryData>
SELECT
    X-Forwarded-For,
    COUNT(X-Forwarded-For) AS requestcount
FROM
	'[LOGFILEPATH]'
WHERE
    date &gt; SUB(TO_LOCALTIME(SYSTEM_TIMESTAMP()), TIMESTAMP('0000-01-02 00:00', 'yyyy-MM-dd HH:mm'))
GROUP BY X-Forwarded-For
ORDER BY COUNT(X-Forwarded-For) DESC</QueryData>
    <QueryID>1c89edfa-df41-4bbf-af90-0eefcd15ab2e</QueryID>
    <LogType>W3CLOG</LogType>
    <QueryCategory>ALL</QueryCategory>
    <IsFavorite>true</IsFavorite>
    <DateModified>2016-08-08T18:21:01.0952345+00:00</DateModified>
  </LPQuery>
  <LPQuery>
    <QueryName>CUSTOM: Top Requests From X-Forwarded-For Range</QueryName>
    <QueryDescription>Top list of requests from a given X-Forwarded-For Range.</QueryDescription>
    <QueryData>
SELECT
    X-Forwarded-For,
    EXTRACT_PREFIX(X-Forwarded-For, 2, '.') AS ip-range,
    COUNT(X-Forwarded-For) AS requestcount
FROM
	'[LOGFILEPATH]'
WHERE
    date &gt; SUB(TO_LOCALTIME(SYSTEM_TIMESTAMP()), TIMESTAMP('0000-01-02 00:00', 'yyyy-MM-dd HH:mm'))
AND
    ip-range = '192.168.0'
GROUP BY X-Forwarded-For, ip-range
ORDER BY COUNT(X-Forwarded-For) DESC</QueryData>
    <QueryID>b27f14fe-9c24-44a5-bcd5-1402da6317a0</QueryID>
    <LogType>W3CLOG</LogType>
    <QueryCategory>ALL</QueryCategory>
    <IsFavorite>true</IsFavorite>
    <DateModified>2016-08-09T08:23:24.5436842+00:00</DateModified>
  </LPQuery>
</ArrayOfLPQuery>
```
---
id: 1900
title: 'Use Log Parser Studio to get a list of top IP ranges'
pubDate: '2016-08-12T06:00:08+01:00'
author: 'Steve Fenton'
layout: post
guid: 'https://www.stevefenton.co.uk/?p=1900'
permalink: /2016/08/use-log-parser-studio-to-get-list-of-top-ip-ranges/
categories:
    - Programming
    - Windows
tags:
    - iis
    - 'log parser studio'
    - logs
    - 'web log importer'
---

If you are getting suspicious traffic, it often comes from a range of IP addresses. The below queries get the count using the first three octets of an IP address, so for “192.168.0.1” it will return “192.168.0” and a count of all traffic for the 192.168.0.1/24 range (192.168.0.1 – 192.168.0.255).

To get the first three octets of the **IP address**, and the count of hits use:

```
<pre class="prettyprint lang-sql">SELECT
    EXTRACT_PREFIX(c-ip, 2, '.') as ip-range,
    COUNT(ip-range) as requestcount
FROM
    '[LOGFILEPATH]'
WHERE
    date > SUB(TO_LOCALTIME(SYSTEM_TIMESTAMP()), TIMESTAMP('0000-01-02 00:00', 'yyyy-MM-dd HH:mm'))
GROUP BY ip-range
ORDER BY COUNT(ip-range) DESC
```

To get the first three octets of the **X-Forwarded-For** IP address ([see how to add the X-Forwarded-For address to your log file](https://www.stevefenton.co.uk/2016/08/add-x-forwarded-for-ip-address-to-iis-logs/)), and the count of hits use:

```
<pre class="prettyprint lang-sql">SELECT
    EXTRACT_PREFIX(X-Forwarded-For, 2, '.') as ip-range,
    COUNT(ip-range) as requestcount
FROM
    '[LOGFILEPATH]'
WHERE
    date > SUB(TO_LOCALTIME(SYSTEM_TIMESTAMP()), TIMESTAMP('0000-01-02 00:00', 'yyyy-MM-dd HH:mm'))
GROUP BY ip-range
ORDER BY COUNT(ip-range) DESC
```

### Web Log Importer

If you are using [Web Log Importer](https://www.stevefenton.co.uk/tag/web-log-importer/), you can get the same information using the following query:

```
<pre class="prettyprint lang-sql">
SELECT
    LEFT([X_Forwarded_For], LEN([X_Forwarded_For]) - CHARINDEX('.',REVERSE ([X_Forwarded_For]))) AS IpRange,
    COUNT(1) AS RequestCount
FROM
    LogEntry
WHERE
    [date] = '2020-03-10'
GROUP BY
    LEFT([X_Forwarded_For], LEN([X_Forwarded_For]) - CHARINDEX('.',REVERSE ([X_Forwarded_For])))
ORDER BY
    COUNT(1) DESC
```

### Digging deeper

You can then obtain more detailed lists of IP addresses using this query – just update the ip-range in the WHERE-clause based on what you find in the above queries:

```
<pre class="prettyprint lang-sql">SELECT
    c-ip,
    EXTRACT_PREFIX(c-ip, 2, '.') as ip-range,
    COUNT(c-ip) as requestcount
FROM
    '[LOGFILEPATH]'
WHERE
    date > SUB(TO_LOCALTIME(SYSTEM_TIMESTAMP()), TIMESTAMP('0000-01-02 00:00', 'yyyy-MM-dd HH:mm'))
AND
    ip-range = '192.168.0'
GROUP BY c-ip, ip-range
ORDER BY COUNT(c-ip) DESC
```

And once again, for X-Forwarded-For IP addresses:

```
<pre class="prettyprint lang-sql">SELECT
    X-Forwarded-For,
    EXTRACT_PREFIX(X-Forwarded-For, 2, '.') as ip-range,
    COUNT(X-Forwarded-For) as requestcount
FROM
    '[LOGFILEPATH]'
WHERE
    date > SUB(TO_LOCALTIME(SYSTEM_TIMESTAMP()), TIMESTAMP('0000-01-02 00:00', 'yyyy-MM-dd HH:mm'))
AND
    ip-range = '192.168.0'
GROUP BY X-Forwarded-For, ip-range
ORDER BY COUNT(X-Forwarded-For) DESC
```
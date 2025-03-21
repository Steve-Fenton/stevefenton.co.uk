---
title: 'Using Log Parser Studio to find user agents'
navMenu: false
pubDate: 2016-08-02T12:18:52+01:00
authors:
    - steve-fenton
categories:
    - Programming
    - Windows
tags:
    - IIS
    - 'Log Parser Studio'
    - Logs
    - 'Web Log Importer'
---

If you want to find out which user agents are used to visit your site, you can use the below query. You can use this to find out about browsers, and honest-ish robots (i.e. ones that identify themselves via the user agent).

```sql
SELECT
    cs(User-Agent),
    count(cs(User-Agent)) as requestcount
FROM
    '[LOGFILEPATH]'
WHERE
    date = '2016-08-02' 
GROUP BY
    cs(User-Agent)
ORDER BY
    count(cs(User-Agent)) DESC
```

Remember to change the date when you run it.

## Web Log Importer

If you are using [Web Log Importer](/tag/web-log-importer/1/), you can get the same information using the following query:

```sql
SELECT
    [cs_user_agent],
    COUNT(1) as RequestCount
FROM
    LogEntry
WHERE
    [date] = '2020-03-10' 
GROUP BY
    [cs_user_agent]
ORDER BY
    COUNT(1) DESC
```
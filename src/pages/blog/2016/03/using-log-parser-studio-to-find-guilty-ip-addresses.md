---
title: 'Using Log Parser Studio to find guilty IP addresses'
navMenu: false
pubDate: 2016-03-30T06:00:20+01:00
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

If you are getting hammered by a robot, you'll probably want to find out the IP Address of the robot to see if it is a friendly one, or just someone playing with Kali Linux in a far off land.

The following Log Parser Studio query will get you a list of your top offenders:

```sql
SELECT
    c-ip,
    count(c-ip) as requestcount
FROM
    '[LOGFILEPATH]'
WHERE
    date = '2016-03-29' 
GROUP BY
    c-ip
ORDER BY
    count(c-ip) DESC
```

Just change the date as you need.

## Web Log Importer

If you are using [Web Log Importer](/tag/web-log-importer/1/), you can get the same information using the following query:

```sql
SELECT
    [c_ip],
    COUNT(1)
FROM
    LogEntry
WHERE
    [date] = '2016-03-29' 
GROUP BY
    [c_ip]
ORDER BY
    COUNT(1) DESC
```
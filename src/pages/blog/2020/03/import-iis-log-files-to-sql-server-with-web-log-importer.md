---
layout: src/layouts/Default.astro
title: Import IIS log files to SQL Server with Web Log Importer
navMenu: false
pubDate: 2020-03-10T16:52:01+00:00
authors:
    - steve-fenton
bannerImage:
    src: /img/2020/03/importing-containers.jpg
    alt: A literal version of importing, containers at a port
categories:
    - Programming
tags:
    - .net
    - C-Sharp
    - Core
    - IIS
    - 'Web Log Importer'
---

In the past I have used [Log Parser Studio](/tag/log-parser-studio/) to run SQL style queries against IIS logs, but it can take a fair bit of time to do this. Sometimes you just want to run a quick SQL query against the log data that IIS has collected. SQL Server is a super quick way of running queries to discover what is going on in your log files, but you need to import your IIS log files first to be able to take advantage of the speed and familiarity of your SQL queries.

This calls for a quick .net Core Console App, which I’ve written and placed on GitHub, called [Web Log Importer](https://github.com/Steve-Fenton/WebLogImporter).

## How does it work

Web Log Importer will take a bunch of files that you place in a folder and prepare them for import. There are a few lines that need to be dropped out and we want to combine them into a single file to pass to SQL.

Once the file is ready, we use SQL bulk import to fill a table with the log entries.

All of this is done by running the console app.

## How fast / efficient is it

Using a sample from a web server with one day of traffic, the whole process took under eleven seconds. This imported 274,434 log entries from 19 files, approximately 90 MB of source data.

> Elapsed time 10,875 ms

During a debug run, the memory and CPU used by the application is low/stable.

:img{src="/img/2020/03/web-log-importer.jpg" alt="Web Log Importer Diagnostics" loading="lazy"}

Because the data is created from scratch during the process, [SQL index fragmentation]\(/blog/2018/05/sql-server-index-fragmentation/) will always be zero.

```
DatabaseName    TableName           IndexName    IndexType          AverageFragmentationPercent
WebLogs         [dbo].[LogEntry]    cci          CLUSTERED INDEX    0
```

## Running SQL Queries Over IIS log files

Now the data has been imported, you can just run plain-old, super-quick, lovely SQL queries to see what’s going on.

Here’s a complete example that creates a league table of client IP addresses ranked by number of log entries. It filters the logs by date, and time.

```sql
SELECT
    [c_ip],
    COUNT(1)
FROM
    LogEntry
WHERE
    [date] = '2020-03-10'
AND
    [time] BETWEEN '12:20' AND '12:40'
GROUP BY
    [c_ip]
ORDER BY
    COUNT(1) DESC
```

As the date and time are split between different columns, you can query them independently… i.e. you can look across the 4pm to 5pm time without choosing a date to see early-evening trends across multiple dates, and you can use “date =” to select a single day (which you can’t do when there is a time component to the date).

## Column names

Because you already know IIS log files, and you already know SQL, I’ve tried not to fiddle too much with things.

The column names reflect the headers within standard IIS log files, although I’ve incorporated the X-Forwarded-For header, which is a pretty common addition these days.

Where a header contains a hyphen `-` it has to be an underscore in the table `_`; so `c-ip` becomes `c_ip`.

The IIS log files follow a convention where “s-” is a server value, “c-” is a client value. Where things are passed from client to server, you’ll see “cs-” and when the reverse is true you’ll see “sc-“. For example, the query string is passed by the client and used by the server, so it’s `cs-uri-query` and the response code is passed from the server and used by the client, so it’s `sc-status`.

## Speeding it up

The best way to speed up your import process is to configure IIS to rollover log files when they hit a particular size.

Go to IIS, hit the “Logging” tile and set “Log File Rollover” to be based on “Maximum file size (in bytes): 10000000”. You can play with different sizes, but between 5-10 megabytes tends to be reasonable.

There are two benefits in terms of speed here.

1. Each file is small
2. You can just import files from the time period you are interested in

## Why it’s useful

The benefits of running SQL queries against your data are pretty obvious, but there are also benefits to the loading process. Because it will merge and load IIS log files, you can drop in logs from several different servers and have them all loaded into a single view. If you have a web farm, you can quickly get a view across all your web farm servers using this tool.

Although other tools are available, this is a simple and neat way to pull in data into a familiar tool to analyse it fast.

Full instructions on how to set up a small database and run the tool are in the README file on GitHub.
---
layout: src/layouts/Default.astro
title: 'Get the command text for a SQL Query based on its SPID'
navMenu: false
pubDate: 2016-12-06T08:55:05+00:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - SQL
---

A lot of SQL troubleshooting starts like this:

```sql
sp_who2
```

The “spootoo” procedure brings back a list of SPIDs and includes information on which SPIDs are blocking. You can quickly track back to a problem SPID by following the information in the “BlkBy” column, which shows the SPID blocking a row.

Once you have the SPID, you probably want to know what query is executing, in order to work out why things are blocked. You can do that by passing the SPID into the following query:

```sql
DBCC INPUTBUFFER(50)
```

This is a step I often recommend people add to their troubleshooting process (rather than running a KILL against the SPID, which can be a little rash!)

I also have a useful script for [filtering and sorting sp\_who2 queries]\(/blog/2018/07/sql-server-filter-and-sort-records-from-sp_who2/).
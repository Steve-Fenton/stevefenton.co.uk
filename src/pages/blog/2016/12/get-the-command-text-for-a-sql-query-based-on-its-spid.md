---
id: 1972
layout: src/layouts/Default.astro
title: 'Get the command text for a SQL Query based on its SPID'
pubDate: 2016-12-06T08:55:05+00:00
author:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=1972'
permalink: /2016/12/get-the-command-text-for-a-sql-query-based-on-its-spid/
medium_post:
    - 'O:11:"Medium_Post":11:{s:16:"author_image_url";s:75:"https://cdn-images-1.medium.com/fit/c/400/400/1*eXkhfEuF41g5W_xnc_ydLA.jpeg";s:10:"author_url";s:38:"https://medium.com/@steve.fenton.co.uk";s:11:"byline_name";N;s:12:"byline_email";N;s:10:"cross_link";s:3:"yes";s:2:"id";s:12:"d2c97cdc5efa";s:21:"follower_notification";s:3:"yes";s:7:"license";s:19:"all-rights-reserved";s:14:"publication_id";s:2:"-1";s:6:"status";s:5:"draft";s:3:"url";s:51:"https://medium.com/@steve.fenton.co.uk/d2c97cdc5efa";}'
categories:
    - Programming
tags:
    - sql
---

A lot of SQL troubleshooting starts like this:

```
<pre class="prettyprint lang-sql">sp_who2
```

The “spootoo” procedure brings back a list of SPIDs and includes information on which SPIDs are blocking. You can quickly track back to a problem SPID by following the information in the “BlkBy” column, which shows the SPID blocking a row.

Once you have the SPID, you probably want to know what query is executing, in order to work out why things are blocked. You can do that by passing the SPID into the following query:

```
<pre class="prettyprint lang-sql">DBCC INPUTBUFFER(50)
```

This is a step I often recommend people add to their troubleshooting process (rather than running a KILL against the SPID, which can be a little rash!)

I also have a useful script for [filtering and sorting sp\_who2 queries](https://www.stevefenton.co.uk/2018/07/sql-server-filter-and-sort-records-from-sp_who2/).
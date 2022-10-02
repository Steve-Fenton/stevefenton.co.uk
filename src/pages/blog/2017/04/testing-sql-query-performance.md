---
id: 2044
layout: src/layouts/Default.astro
title: 'Testing SQL query performance'
pubDate: 2017-04-13T16:25:09+01:00
author:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=2044'
permalink: /2017/04/testing-sql-query-performance/
categories:
    - Programming
tags:
    - sql
---

I was asked about how to test a query without all of the clever caching that SQL performs, this is how you do it… but read on for important information.

```
<pre class="prettyprint lang-sql">DBCC DROPCLEANBUFFERS
DBCC FREEPROCCACHE 
GO

SELECT * FROM MyTable
```

### Very important notes

There are some very important things to consider before you use these commands.

- You almost certainly don’t want to run this on a live server as you’ll force everything to be read from disk and things will be slow
- You almost certainly don’t want to test your queries in this way if you are opimizing them… see below

### How To *really* test queries

Queries run in “cached mode” more than they run on an empty cache, so you ought to be testing them cached as this is “real life”. Emptying the cache every time is a useful test of disk access, but not a useful test of a SQL query. So here is how I test my queries…

```
<pre class="prettyprint lang-sql">SET STATISTICS TIME ON
GO

SELECT * FROM MyTable
GO

SET STATISTICS TIME OFF
GO
```

Basically, it is just the plain query, with statistics supplied in the “Messages” window.
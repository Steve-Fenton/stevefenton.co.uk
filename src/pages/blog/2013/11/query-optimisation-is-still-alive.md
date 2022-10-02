---
layout: src/layouts/Default.astro
navMenu: false
title: 'Query optimisation is still alive'
pubDate: 2013-11-29T10:02:00+00:00
author:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=483'
interface_sidebarlayout:
    - default
categories:
    - Programming
tags:
    - optimization
    - sql
---

When I was working on SQL 2000 databases back in the day, the ordering of your joins and where clauses could make an insane difference to query performance. I was working on a reconciliation system that grew by a million records a month – so a simple re-order of a where clause would blast a five-minute query into a sub-second query.

With the advancements in the technology, this old fashioned art of query optimisation is popularly considered obsolete – except it isn’t.

I was working on a query that was taking five minutes to run and nothing looked particularly terrible in the query. I had a read-through of the query and my old SQL 2000 days sprung to mind. The where-clause contained a sub-query on the first condition. Hmmm. I re-ordered the conditions to put the restrictive and simple key-based condition first and moved the sub-query condition to last. Upon a re-run the query took 16 seconds.

That’s odd. I thought we didn’t have to worry about this stuff any more – well I guess we do. In most cases, I presume SQL Server is good at guessing the most efficient execution plan (it can even guess that adding a temporary index may make a query faster) – but there are still scenarios where keeping things ordered neatly can make a big difference.

I had to re-run the query many times (and, yes, when I’m optimising I blast the caches in between each test) and the new query kept its speed – 284 seconds shaved off and 16 to go!

So don’t be put off of re-ordering your conditions or joins if you are trying to optimise a query as it seems that even now it can still make a difference. I have checked this on SQL 2008 and SQL 2012 and in both cases the order made a difference to execution time.
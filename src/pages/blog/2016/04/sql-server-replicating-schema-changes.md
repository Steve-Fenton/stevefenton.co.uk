---
layout: src/layouts/Default.astro
navMenu: false
title: 'SQL Server replicating schema changes'
pubDate: 2016-04-28T20:06:28+01:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - replication
    - snapshot
    - sql
---

If you have read the documentation, you will have found that in modern versions of SQL Server you can run schema changes (with a small number of exceptions) and have them replicated out to subscribers. This applies to multiple kinds of replication, but this article is about transactional replication in particular.

So armed with your ALTER TABLE script, you attempt to update your publication database, but end up with a message such as:

> Cannot alter column ‘YourColumn’ because it is ‘REPLICATED’.

This is basically caused by attempting to run a schema update during a snapshot job… wait a second… why are there snapshot jobs running? Good question.

By default, even though you have chosen transactional replication you are likely to find the snapshot agent has a schedule and is running once an hour. You can view this in Replication Monitor.

If you are using transactional replication, you don’t want any schedule for the snapshot agent, so disable it. You should then find you can run your schema updates just fine.
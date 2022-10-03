---
layout: src/layouts/Default.astro
navMenu: false
title: 'SQL Server replication and non-clustered indexes'
pubDate: 2017-08-21T15:12:43+01:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - Indexes
    - Replication
    - SQL
---

If you want non-clustered indexes to be copied to your replication slaves (you probably do) you simply adjust the setting that you’ll find here…

`SQL -> Replication -> Local Publications -> Publication Name -> Properties -> Articles -> Article Properties -> Copy nonclustered indexes`

When you set this to “True”, the indexes will be copied.

Watch out for the following surprise that SQL Server has in store though!

If you select “Set Properties of All Table Articles” when opening up the properties for an article:

![Article Properties](/img/2017/08/article-properties.png)

You may see that the “Copy nonclustered indexes” property is shown as “False”, like this:

![Properties of All Tables](/img/2017/08/all-tables.png)

But if you check each table laboriously individually, you’ll find that they are actually all “True”…

![Highlighted Table Properties](/img/2017/08/highlighted-tables-1.png)

So before you go all snapshotting, double-check whether your setting may already be true.
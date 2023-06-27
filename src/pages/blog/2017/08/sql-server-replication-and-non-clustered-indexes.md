---
title: 'SQL Server replication and non-clustered indexes'
navMenu: false
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

```
SQL -> Replication -> Local Publications -> Publication Name -> Properties -> Articles -> Article Properties -> Copy nonclustered indexes
```

When you set this to “True”, the indexes will be copied.

Watch out for the following surprise that SQL Server has in store though!

If you select “Set Properties of All Table Articles” when opening up the properties for an article:

:::div{.inset}
:img{src="/img/2017/08/article-properties.png" alt="Article Properties" loading="lazy"}
:::

You may see that the “Copy nonclustered indexes” property is shown as “False”, like this:

:::div{.inset}
:img{src="/img/2017/08/all-tables.png" alt="Properties of All Tables" loading="lazy"}
:::

But if you check each table laboriously individually, you’ll find that they are actually all “True”…

:::div{.inset}
:img{src="/img/2017/08/highlighted-tables-1.png" alt="Highlighted Table Properties" loading="lazy"}
:::

So before you go all snapshotting, double-check whether your setting may already be true.
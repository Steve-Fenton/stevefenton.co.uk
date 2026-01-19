---
title: 'SQL Server: Quickly find row counts and table size'
navMenu: false
pubDate: 2018-07-04T13:53:10+01:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - SQL
description: Shows how to use `sp_spaceused` to quickly retrieve row counts and storage usage for large SQL Server tables.
---

I have a [script I use to find table sizes in SQL server](/blog/2016/05/finding-table-sizes-in-sql-server/). Sometimes, though, I need to find the rough table size of a massive table without the need for absolute precision.

SQL server has a procedure for finding out the number of rows, space, and index size of a table; and it can run very quickly even for massive tables. It retrieves summary information, so it won’t give you a perfect and precise number.

Here is an example:

```sql
sp_spaceused MyMassiveTable
```

And the output is similar to the below made up result:

```
name               rows                 reserved           data               index_size         unused
------------------ -------------------- ------------------ ------------------ ------------------ ------------------
MyMassiveTable     113572103            477067904 KB       672320720 KB       5505568 KB         841616 KB
```

This mechanism will return a result in under one second, whereas a “proper” `COUNT` could take much longer.
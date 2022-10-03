---
layout: src/layouts/Default.astro
title: 'Simple modern paging in SQL Server: Like Skip and Take'
navMenu: false
pubDate: 2019-10-02T08:08:20+01:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - sql
---

If you have been developing SQL Server databases for a while, you may remember performing *neat tricks* to implement paging. If you haven’t found it yet, there is a simple modern way to do paging in SQL Server that doesn’t require any tricks.

For those who have used Linq in C#, you will have come across the “Skip(n)” and “Take(n)” methods. In SQL Server, you have “OFFSET n” and “FETCH NEXT n ONLY”. This has been available since SQL Server 2012, but I still sometimes find the old TOP N FROM (TOP (PAGE \* N)) trick.

```sql
SELECT ExampleColumn
FROM ExampleTable
WHERE ExampleKey = '9BA32ABE-B0CB-4D24-4951-08D741A88769'
AND ExampeOtherKey = '67847409-B1BF-4AF8-EBC1-08D741D68306'
ORDER BY UpdatedUTC DESC
OFFSET 0 ROWS
FETCH NEXT 10 ROWS ONLY
```
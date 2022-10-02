---
id: 55
title: 'Getting a list of tables and row counts in SQL Server'
pubDate: '2015-05-09T00:01:42+01:00'
author: 'Steve Fenton'
layout: post
guid: 'https://www.stevefenton.co.uk/?p=55'
permalink: /2015/05/getting-a-list-of-tables-and-row-counts-in-sql-server/
interface_sidebarlayout:
    - default
categories:
    - Programming
tags:
    - sql
---

I found myself needing to grab a list of all tables and their associated row counts from a SQL Server database. This can be done using a pretty simply query, but I suspect that sharing the query will save somebody some time in the future (possibly me).

So here is a query that you run against any database to get all of the tables and the count of rows (remember, if you are running this in SQL Management Studio and get strange looking results – you probably have “Master” selected!)

```
<pre class="prettyprint lang-sql">
SELECT
    SCHEMA_NAME(ST.schema_id) AS [Schema],
    ST.name AS [Name],
    '[' + SCHEMA_NAME(ST.schema_id) + '].[' + ST.name + ']' AS [FullName],
    SI.rows AS [RowCount]
FROM
    sys.tables AS ST
INNER JOIN
    sys.sysindexes AS SI
    ON ST.object_id = SI.id AND SI.indid < 2
```
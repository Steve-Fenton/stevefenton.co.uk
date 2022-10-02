---
layout: src/layouts/Default.astro
navMenu: false
title: 'Finding table sizes in SQL Server'
pubDate: 2016-05-10T10:56:22+01:00
author:
    - steve-fenton
medium_post:
    - 'O:11:"Medium_Post":11:{s:16:"author_image_url";s:75:"https://cdn-images-1.medium.com/fit/c/400/400/1*eXkhfEuF41g5W_xnc_ydLA.jpeg";s:10:"author_url";s:38:"https://medium.com/@steve.fenton.co.uk";s:11:"byline_name";N;s:12:"byline_email";N;s:10:"cross_link";s:3:"yes";s:2:"id";s:12:"c7f2b77839a1";s:21:"follower_notification";s:3:"yes";s:7:"license";s:19:"all-rights-reserved";s:14:"publication_id";s:2:"-1";s:6:"status";s:5:"draft";s:3:"url";s:51:"https://medium.com/@steve.fenton.co.uk/c7f2b77839a1";}'
categories:
    - Programming
tags:
    - sql
---

As your database grows, you’ll start becoming highly interested in finding out where your data is. This SQL script grabs a list of tables, with their size (total and used) along with a quick calculation of an average size per row.

Just point it at your database and run it to get some numbers out.

Note: in one case that I used this query to find out why a database way 50 GB instead of 2 GB, it turned out to be [SQL Server Index Fragmentation](https://www.stevefenton.co.uk/2018/05/sql-server-index-fragmentation/). You can solve it with another script, but you can also solve it long term with a [good SQL Server maintenance plan](https://www.stevefenton.co.uk/2017/05/sql-maintenance-plan-optimization/).

```
<pre class="prettyprint lang-sql">SELECT 
    TABLES.NAME AS TableName,
    SCHEMAS.Name AS SchemaName,
    PARTITIONS.rows AS [RowCount],
    CAST(ROUND(((SUM(ALLOC.total_pages) * 8) / 1024.00), 2) AS NUMERIC(36, 2)) AS TotalMB,
    CAST(ROUND(((SUM(ALLOC.used_pages) * 8) / 1024.00), 2) AS NUMERIC(36, 2)) AS UsedMB,
    CAST(ROUND(((SUM(ALLOC.total_pages) * 8) / 1024.00), 2) - ROUND(((SUM(ALLOC.used_pages) * 8) / 1024.00), 2) AS NUMERIC(36, 2)) AS FreeMB,
    CASE
        WHEN PARTITIONS.rows > 0 THEN CAST(ROUND(((SUM(ALLOC.used_pages) * 8) / 1024.00), 2) AS NUMERIC(36, 2)) / PARTITIONS.rows
        ELSE 0
    END AS AverageRowMB
FROM 
    sys.tables TABLES
INNER JOIN      
    sys.indexes INDEXES ON TABLES.OBJECT_ID = INDEXES.object_id
INNER JOIN 
    sys.partitions PARTITIONS ON INDEXES.object_id = PARTITIONS.OBJECT_ID AND INDEXES.index_id = PARTITIONS.index_id
INNER JOIN 
    sys.allocation_units ALLOC ON PARTITIONS.partition_id = ALLOC.container_id
LEFT OUTER JOIN 
    sys.schemas SCHEMAS ON TABLES.schema_id = SCHEMAS.schema_id
GROUP BY 
    TABLES.Name,
    SCHEMAS.Name,
    PARTITIONS.Rows
ORDER BY 
    CAST(ROUND(((SUM(ALLOC.total_pages) * 8) / 1024.00), 2) AS NUMERIC(36, 2)) DESC
```
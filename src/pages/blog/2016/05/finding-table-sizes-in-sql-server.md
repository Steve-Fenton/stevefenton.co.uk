---
layout: src/layouts/Default.astro
title: 'Finding table sizes in SQL Server'
navMenu: false
pubDate: 2016-05-10T10:56:22+01:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - SQL
---

As your database grows, you’ll start becoming highly interested in finding out where your data is. This SQL script grabs a list of tables, with their size (total and used) along with a quick calculation of an average size per row.

Just point it at your database and run it to get some numbers out.

Note: in one case that I used this query to find out why a database way 50 GB instead of 2 GB, it turned out to be [SQL Server Index Fragmentation]\(/blog/2018/05/sql-server-index-fragmentation/). You can solve it with another script, but you can also solve it long term with a [good SQL Server maintenance plan]\(/blog/2017/05/sql-maintenance-plan-optimization/).

```sql
SELECT 
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
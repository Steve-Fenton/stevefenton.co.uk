---
layout: src/layouts/Default.astro
title: 'SQL Server: Get the size of all databases on a server'
navMenu: false
pubDate: 2018-09-04T08:34:33+01:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - SQL
---

The following query will get you the database size and log file size for all databases on a SQL Server instance.

 ```sql
WITH mf AS
(
    SELECT
        database_id,
        [type],
        CAST((size * 8.0 / 1024) AS INT) AS size
    FROM
        sys.master_files
)
SELECT 
    [name] AS DatabaseName,
    (
        SELECT
            SUM(size)
        FROM
            mf
        WHERE
            [type] = 0
        AND
            mf.database_id = db.database_id
    ) DataFileSizeMB,
    (
        SELECT
            SUM(size)
        FROM
            mf
        WHERE
            [type] = 1
        AND
            mf.database_id = db.database_id
    ) LogFileSizeMB
FROM
    sys.databases db
ORDER BY
    DataFileSizeMB DESC
```

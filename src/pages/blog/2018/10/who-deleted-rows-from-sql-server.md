---
layout: src/layouts/Default.astro
title: 'Who deleted rows from SQL Server'
navMenu: false
pubDate: 2018-10-09T06:00:56+01:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - SQL
---

Want to know who deleted rows from your SQL database? The script below joins up delete transactions with users in order to find out who just deleted something. Because this comes from the transaction log, you’ll only find stuff that is still available in there. This means it will be affected by retention/recovery modes. If you know something just got deleted, it can be pretty useful.

If you get the result you are after, save it in case it is missing when you run it again!

 ```sql
SELECT TOP 10
    U.[name] AS UserName,
    LG.Operation,
    LG.AllocUnitName,
    LG.[RowLog Contents 0],
    LG.[RowLog Contents 1],
    LG.[RowLog Contents 2],
    LG.[RowLog Contents 3],
    LG.[RowLog Contents 4],
    LG.[RowLog Contents 5],
    LG.[Log Record]
FROM 
    fn_dblog(NULL, NULL) LG
LEFT JOIN
    sysusers U ON U.[sid] = (
        SELECT
            ILOG.[Transaction SID]
        FROM
            fn_dblog(NULL, NULL) AS ILOG
        WHERE
            ILOG.[Transaction ID] = LG.[Transaction ID]
        AND
            ILOG.[Operation] = 'LOP_BEGIN_XACT'
    )
WHERE
    LG.Operation = 'LOP_DELETE_ROWS'

-- For a particular user
AND
    U.[name] = 'John.Doe'

-- For a particular table
AND
    LG.AllocUnitName LIKE '%dbo.TableName%'
```
---
layout: src/layouts/Default.astro
title: 'SQL Server: Filter and sort records from sp_who2'
navMenu: false
pubDate: 2018-07-19T14:36:44+01:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - SQL
---

Sometimes you need to filter and sort the records you get from `sp_who2`. You can’t do this directly, but you can use a temporary table to do it.

```sql
-- Create an intermediate table to put all the results
CREATE TABLE #spootoo
(
    SPID INT,  
    Status VARCHAR(1000) NULL,  
    Login SYSNAME NULL,  
    HostName SYSNAME NULL,  
    BlkBy SYSNAME NULL,  
    DBName SYSNAME NULL,  
    Command VARCHAR(1000) NULL,  
    CPUTime INT NULL,  
    DiskIO VARCHAR(1000) NULL,  
    LastBatch VARCHAR(1000) NULL,  
    ProgramName VARCHAR(1000) NULL,  
    SPID2 INT,
    REQUESTID INT
)
GO

-- Fill the table with the sp_who2 procedure
INSERT INTO #spootoo
EXEC sp_who2
GO

-- Select the data from the intermediate table, filtering and sorting however you like
SELECT *
FROM #spootoo
WHERE HostName = 'DT-IDSAPP01'
ORDER BY Login ASC
GO

-- Drop the intermediate table
DROP TABLE #spootoo
GO
```

If you are looking at blocking, in particular, you might find it useful to grab both a filtered view and the whole lot:

```sql
-- Create an intermediate table to put all the results
CREATE TABLE #spootoo
(
    SPID INT,  
    Status VARCHAR(1000) NULL,  
    Login SYSNAME NULL,  
    HostName SYSNAME NULL,  
    BlkBy SYSNAME NULL,  
    DBName SYSNAME NULL,  
    Command VARCHAR(1000) NULL,  
    CPUTime INT NULL,  
    DiskIO VARCHAR(1000) NULL,  
    LastBatch VARCHAR(1000) NULL,  
    ProgramName VARCHAR(1000) NULL,  
    SPID2 INT,
    REQUESTID INT
)
GO

-- Fill the table with the sp_who2 procedure
INSERT INTO #spootoo
EXEC sp_who2
GO

-- Select the data from the intermediate table, filtering and sorting however you like
SELECT *
FROM #spootoo
WHERE HostName = 'DT-IDSAPP01'
ORDER BY Login ASC
GO

-- Select everything from the intermediate table
SELECT *
FROM #spootoo

-- Drop the intermediate table
DROP TABLE #spootoo
GO
```

By selecting both result sets from the temporary table, you’ll be looking at the same point in time. This prevents confusion that might be caused if you made a second call to `sp_who2`.
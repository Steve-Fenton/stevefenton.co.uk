---
layout: src/layouts/Default.astro
title: 'SQL Server: Get blocking query command text'
navMenu: false
pubDate: 2018-07-23T15:40:25+01:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - SQL
---

If you have a blocking query, you probably follow a set of manual steps a bit like this…

1. Run `sp_who2`.
2. Follow the “blocked by” SPIDs until you find a root-SPID (one that is blocking, but not blocked).
3. Run `DBCC INPUTBUFFER` with the SPID to see what query is being run

After doing this twice in the same day, I wrote a query that can perform all of these tasks in one step. This is a variation of the query to [filter and sort the sp\_who2 query](/2018/07/sql-server-filter-and-sort-records-from-sp_who2/). With this command, we narrow down the list to find blocking queries, looking in particular for those that are not blocked by another query (as these are more likely, but not necessarily, the problem ones). We then grab the command text for those queries using the `DBCC INPUTBUFFER` command.

This results in three output tables. Blocked queries, blocking queries, and input buffers for the blocking queries that may be the root cause of the blockage.

```sql
-- Create temp tables

CREATE TABLE #spootoo
(
    SPID INT,
    [Status] VARCHAR(1000) NULL,
    [Login] SYSNAME NULL,
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

CREATE TABLE #blockers
(
    SPID INT,
    [Status] VARCHAR(1000) NULL,
    [Login] SYSNAME NULL,
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

CREATE TABLE #inputbuffer
(
    EventType NVARCHAR(100) NULL,
    [Parameters] INT NULL,
    EventInfo NVARCHAR(MAX) NULL
)
GO

-- Get data

INSERT INTO #spootoo
EXEC sp_who2
GO

INSERT INTO #blockers
SELECT * FROM #spootoo
WHERE SPID IN (SELECT DISTINCT BlkBy FROM #spootoo WHERE BlkBy <> '  .')
GO

-- Output

SELECT 'Blocked', *
FROM #spootoo
WHERE BlkBy <> '  .'

SELECT 'Blocking', *
FROM #blockers ORDER BY BlkBy

DECLARE @spid INT = 0

DECLARE spid_cursor CURSOR FOR
    SELECT SPID FROM #blockers WHERE BlkBy <> '  .'
OPEN spid_cursor  

FETCH NEXT FROM spid_cursor INTO @spid

WHILE @@FETCH_STATUS = 0  
BEGIN
    INSERT INTO #inputbuffer
    EXEC('DBCC INPUTBUFFER(' + @spid + ') WITH NO_INFOMSGS')
    FETCH NEXT FROM spid_cursor INTO @spid
END

CLOSE spid_cursor;  
DEALLOCATE spid_cursor;

SELECT * FROM #inputbuffer

-- Drop temp tables

DROP TABLE #spootoo
GO

DROP TABLE #blockers
GO

DROP TABLE #inputbuffer
GO
```
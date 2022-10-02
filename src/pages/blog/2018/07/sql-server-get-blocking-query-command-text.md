---
id: 3921
title: 'SQL Server: Get blocking query command text'
pubDate: '2018-07-23T15:40:25+01:00'
author: 'Steve Fenton'
layout: post
guid: 'https://www.stevefenton.co.uk/?p=3921'
permalink: /2018/07/sql-server-get-blocking-query-command-text/
medium_post:
    - 'O:11:"Medium_Post":11:{s:16:"author_image_url";s:75:"https://cdn-images-1.medium.com/fit/c/400/400/1*eXkhfEuF41g5W_xnc_ydLA.jpeg";s:10:"author_url";s:38:"https://medium.com/@steve.fenton.co.uk";s:11:"byline_name";N;s:12:"byline_email";N;s:10:"cross_link";s:3:"yes";s:2:"id";s:12:"f95f156ad3b0";s:21:"follower_notification";s:3:"yes";s:7:"license";s:19:"all-rights-reserved";s:14:"publication_id";s:2:"-1";s:6:"status";s:5:"draft";s:3:"url";s:51:"https://medium.com/@steve.fenton.co.uk/f95f156ad3b0";}'
categories:
    - Programming
tags:
    - sql
---

If you have a blocking query, you probably follow a set of manual steps a bit like this…

1. Run `sp_who2`.
2. Follow the “blocked by” SPIDs until you find a root-SPID (one that is blocking, but not blocked).
3. Run `DBCC INPUTBUFFER` with the SPID to see what query is being run

After doing this twice in the same day, I wrote a query that can perform all of these tasks in one step. This is a variation of the query to [filter and sort the sp\_who2 query](https://www.stevefenton.co.uk/2018/07/sql-server-filter-and-sort-records-from-sp_who2/). With this command, we narrow down the list to find blocking queries, looking in particular for those that are not blocked by another query (as these are more likely, but not necessarily, the problem ones). We then grab the command text for those queries using the `DBCC INPUTBUFFER` command.

This results in three output tables. Blocked queries, blocking queries, and input buffers for the blocking queries that may be the root cause of the blockage.

```
<pre class="prettyprint lang-sql">
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
---
id: 3916
layout: src/layouts/Default.astro
title: 'SQL Server: Filter and sort records from sp_who2'
pubDate: 2018-07-19T14:36:44+01:00
author:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=3916'
permalink: /2018/07/sql-server-filter-and-sort-records-from-sp_who2/
medium_post:
    - 'O:11:"Medium_Post":11:{s:16:"author_image_url";s:75:"https://cdn-images-1.medium.com/fit/c/400/400/1*eXkhfEuF41g5W_xnc_ydLA.jpeg";s:10:"author_url";s:38:"https://medium.com/@steve.fenton.co.uk";s:11:"byline_name";N;s:12:"byline_email";N;s:10:"cross_link";s:3:"yes";s:2:"id";s:11:"1561bba8775";s:21:"follower_notification";s:3:"yes";s:7:"license";s:19:"all-rights-reserved";s:14:"publication_id";s:2:"-1";s:6:"status";s:5:"draft";s:3:"url";s:50:"https://medium.com/@steve.fenton.co.uk/1561bba8775";}'
categories:
    - Programming
tags:
    - sql
---

Sometimes you need to filter and sort the records you get from `sp_who2`. You can’t do this directly, but you can use a temporary table to do it.

```
<pre class="prettyprint lang-sql">-- Create an intermediate table to put all the results
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

```
<pre class="prettyprint lang-sql">-- Create an intermediate table to put all the results
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
---
id: 2171
layout: src/layouts/Default.astro
title: 'SQL Server: Find expensive queries by running one'
pubDate: 2017-08-07T16:10:08+01:00
author:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=2171'
permalink: /2017/08/sql-server-find-expensive-queries-by-running-one/
categories:
    - Programming
tags:
    - optimization
    - sql
---

I have found that Activity Monitor can have a habit of bugging out on you when you try to get recent expensive queries. If you also get this, you may want to try the following query instead.

You can adjust the query purposefully by changing the ordering, based on what you are looking for. There are examples for total worker time and average worker time – but you may be looking for queries that are reading/writing too much.

There are also other stats available, just look inside the QUERYSTATS alias in SQL Management Studio for some auto-completion.

```
<pre class="prettyprint lang-sql">SELECT TOP 10
    SUBSTRING(
        SQLTEXT.TEXT,
        (QUERYSTATS.statement_start_offset / 2) + 1,
        ((CASE QUERYSTATS.statement_end_offset WHEN -1 THEN DATALENGTH(SQLTEXT.TEXT) ELSE QUERYSTATS.statement_end_offset END - QUERYSTATS.statement_start_offset) / 2) + 1
    ) AS sql_query,
    QUERYSTATS.execution_count,

    QUERYSTATS.total_worker_time / QUERYSTATS.execution_count AS avg_worker_time,
    QUERYSTATS.total_worker_time,
    QUERYSTATS.last_worker_time,

    QUERYSTATS.total_logical_reads,
    QUERYSTATS.last_logical_reads,
    QUERYSTATS.total_logical_writes,
    QUERYSTATS.last_logical_writes,
    QUERYSTATS.total_physical_reads,
    QUERYSTATS.last_physical_reads,

    QUERYSTATS.total_elapsed_time / QUERYSTATS.execution_count AS avg_elapsed_time,
    QUERYSTATS.total_elapsed_time / 1000000 AS total_elapsed_time_in_S,
    QUERYSTATS.last_elapsed_time / 1000000 AS last_elapsed_time_in_S,
    QUERYSTATS.last_execution_time,
    QUERYPLAN.query_plan
FROM
    sys.dm_exec_query_stats QUERYSTATS
CROSS APPLY
    sys.dm_exec_sql_text(QUERYSTATS.sql_handle) SQLTEXT
CROSS APPLY
    sys.dm_exec_query_plan(QUERYSTATS.plan_handle) QUERYPLAN
WHERE
    last_execution_time > GETUTCDATE() - 1 -- Must have run in the past day, for example
ORDER BY
    -- Order by Total Worker Time
    --QUERYSTATS.total_worker_time DESC
    -- Order by Average Worker Time
    --QUERYSTATS.total_worker_time / QUERYSTATS.execution_count DESC
    -- My favourite: runs often, takes quite some time...
    QUERYSTATS.execution_count * (QUERYSTATS.total_worker_time / QUERYSTATS.execution_count) DESC
```

The ordering I have left “commented-in” is my personal favourite. Your mileage may vary.
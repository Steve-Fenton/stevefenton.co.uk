---
layout: src/layouts/Default.astro
navMenu: false
title: 'Get a list of gaps in a sequence in SQL Server'
pubDate: 2017-02-22T10:50:28+00:00
author:
    - steve-fenton
categories:
    - Programming
tags:
    - sql
---

If you need to find gaps in a sequence (for example, gaps in an ID column, or in a sort order column, etc) you can use the below query.

It uses a series of Common Table Expressions to slice up the gaps between islands in the range and presents a list of each gap.

I am using this to find gaps in id numbers in a table.

The list is inclusive, so all of the ids presented are “IN THE GAP” and ids that DO exist NEVER appear in the list. It also shows the number of ids “IN THE GAP”.

```
<pre class="prettyprint lang-sql">-- Uses a number of common table expressions to obtain gaps in a sequence
-- There are only two changes you need to make, annotated in the first CTE
-- 1. The column containing the sequence
-- 2. The table containing the column

WITH SourceData AS
(
    SELECT
        YourIdColumn AS ID, -- 1. The column containing the sequence
        RowNum = ROW_NUMBER() OVER (ORDER BY OrgId) 
    FROM
        dbo.YourTableName -- 2. The table containing the column
),
Ranked AS
(
    SELECT
        *,
        DENSE_RANK() OVER (ORDER BY ID - RowNum) As Series 
    FROM SourceData
),
Counted AS
(
    SELECT
        *,
        COUNT(*) OVER (PARTITION BY Series) AS SCount
    FROM Ranked
),
Gaps AS
(
    SELECT
        MinID = MIN(ID), 
        MaxID = MAX(ID), 
        Series
    FROM
        Counted
    GROUP BY Series
)

SELECT
    FirstNumberInGap = (a.MaxID + 1),
    LastNumberInGap = (b.MinID - 1),
    GapSize = ((b.MinID - 1) - a.MaxID)
FROM
    Gaps a
INNER JOIN
    Gaps b ON a.Series + 1 = b.Series
ORDER BY
    FirstNumberInGap
```
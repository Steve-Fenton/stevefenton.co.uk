---
layout: src/layouts/Default.astro
navMenu: false
title: 'SQL Server index fragmentation'
pubDate: 2018-05-18T07:00:52+01:00
author:
    - steve-fenton
medium_post:
    - 'O:11:"Medium_Post":11:{s:16:"author_image_url";s:75:"https://cdn-images-1.medium.com/fit/c/400/400/1*eXkhfEuF41g5W_xnc_ydLA.jpeg";s:10:"author_url";s:38:"https://medium.com/@steve.fenton.co.uk";s:11:"byline_name";N;s:12:"byline_email";N;s:10:"cross_link";s:3:"yes";s:2:"id";s:11:"3af181dccac";s:21:"follower_notification";s:3:"yes";s:7:"license";s:19:"all-rights-reserved";s:14:"publication_id";s:2:"-1";s:6:"status";s:5:"draft";s:3:"url";s:50:"https://medium.com/@steve.fenton.co.uk/3af181dccac";}'
image: /wp-content/uploads/2018/05/fragments.jpg
categories:
    - Programming
tags:
    - sql
---

![Shattering Glass Containing Buttons](/wp-content/uploads/2018/05/fragments.jpg)

I was investigating an issue with am Azure SQL Server database that was much bigger than it ought to be. It was around 50 GB, but should really have been about 15 GB. I ran an old query I keep lying around that [finds the size of tables in a SQL database](https://www.stevefenton.co.uk/2016/05/finding-table-sizes-in-sql-server/) and there was a lot of unused space. Usually shrinking the database solves this issue, but it turns out I was experiencing a slightly different problem: SQL server index fragmentation.

There are a couple of nasty side effects to index fragmentation. It makes your indexes less efficient, but it can also result in a great deal of storage being used up unnecessarily.

### Finding index fragmentation

If you want to know if you have a problem with SQL Server index fragmentation, here is the script that tells you how much fragmentation you have as a percentage.

```
<pre class="prettyprint lang-sql">
SELECT
    DB_NAME() AS DatabaseName,
    '[' + OBJECT_SCHEMA_NAME(STAT.object_id) + '].[' + OBJECT_NAME(STAT.object_id) + ']' AS TableName,
    IDX.name AS IndexName,
    IPS.index_type_desc AS IndexType,
    IPS.avg_fragmentation_in_percent AS AverageFragmentationPercent
 FROM
    sys.dm_db_partition_stats STAT
 INNER JOIN
    sys.indexes IDX ON STAT.object_id = IDX.object_id AND STAT.index_id = IDX.index_id
 CROSS APPLY
    sys.dm_db_index_physical_stats(DB_ID(), STAT.object_id, STAT.index_id, NULL, 'LIMITED') IPS
 ORDER BY
    IPS.avg_fragmentation_in_percent DESC
```
### Fixing fragmented indexes

If you have too much fragmentation (more than 30%), you can fix it by running:

```
<pre class="prettyprint lang-sql">
ALTER INDEX ALL ON dbo.MyTableName REBUILD WITH (ONLINE=ON)
```
Certain data types prevent you using `ONLINE=ON` (like big text fields). In these cases, you can’t do it with this option enabled, so you have to use:

```
<pre class="prettyprint lang-sql">
ALTER INDEX ALL ON dbo.MyTableName REBUILD
```
If you have index with less than 30% fragmentation, you can reorganise them by running:

```
<pre class="prettyprint lang-sql">
ALTER INDEX [PK_MyTableName] ON dbo.MyTableName REORGANIZE;
```
You can also fix them all by pulling the table names into a cursor and running it for each one, as shown below. Note that there is a `MinPercentage` parameter that you can use to set the level at which you want to rebuild and index. You can use this to reduce the number of indexes you rebuild. Use a higher number if you are running this for the first time, and lower it for subsequent runs. Ideally, you shouldn’t have more than 10% fragmentation on any index.

```
<pre class="prettyprint lang-sql">
DECLARE @MinPercentage INT = 50
DECLARE @TableName VARCHAR(255)
DECLARE @Message VARCHAR(255)
DECLARE TableCursor CURSOR FOR
(
    SELECT
        '[' + TBLS.TABLE_SCHEMA + '].[' + TBLS.TABLE_NAME + ']' AS [TableName]
    FROM
        INFORMATION_SCHEMA.TABLES TBLS
    WHERE
        TBLS.TABLE_TYPE = 'BASE TABLE'
    AND
        '[' + TBLS.TABLE_SCHEMA + '].[' + TBLS.TABLE_NAME + ']' IN
        (
            SELECT
                '[' + OBJECT_SCHEMA_NAME(STAT.object_id) + '].[' + OBJECT_NAME(STAT.object_id) + ']' AS TableName
                FROM
                sys.dm_db_partition_stats STAT
                INNER JOIN
                    sys.indexes IDX ON STAT.object_id = IDX.object_id AND STAT.index_id = IDX.index_id
                CROSS APPLY
                    sys.dm_db_index_physical_stats(DB_ID(), STAT.object_id, STAT.index_id, NULL, 'LIMITED') IPS
            GROUP BY
                '[' + OBJECT_SCHEMA_NAME(STAT.object_id) + '].[' + OBJECT_NAME(STAT.object_id) + ']'
            HAVING
                MAX(IPS.avg_fragmentation_in_percent) > @MinPercentage
        )
)
 
OPEN TableCursor
FETCH NEXT FROM TableCursor INTO @TableName
WHILE @@FETCH_STATUS = 0
BEGIN
    SELECT @Message = 'Rebuilding index for table: ' + @TableName
    RAISERROR (@Message, 10, 1) WITH NOWAIT
    BEGIN TRY
        EXEC('ALTER INDEX ALL ON ' + @TableName + ' REBUILD WITH (ONLINE=ON)')
    END TRY
    BEGIN CATCH
        SELECT @Message = 'Failed to rebuild index for table "' + @TableName + '" - trying again without (ONLINE=ON).'
        RAISERROR (@Message, 10, 1) WITH NOWAIT
        EXEC('ALTER INDEX ALL ON ' + @TableName + ' REBUILD')
    END CATCH

    FETCH NEXT FROM TableCursor INTO @TableName
END
 
CLOSE TableCursor
DEALLOCATE TableCursor
```
### Results

Before running the script to fix fragmentation:

```
<pre class="prettyprint">
Index Fragmentation
Average 16.48567749
Max     99.99346917

Database Size
Total Size  45.73765625
Used Size   15.30108398
Free Size   30.43657227
```
After running the script to fix fragmentation:

```
<pre class="prettyprint">
Index Fragmentation
Average 4.67736307       (-11.80831442)
Max     91.32310642      (-8.67036275)

Database Size
Total Size  16.76264648  (-28.97500977)
Used Size   15.22998047  (-0.07110351)
Free Size   1.532666016  (-28.90390625)
```
The key here is that the database has dropped to 35% of its original size – just from defragging the indexes. There are still some badly fragmented indexes, but the average fragmentation is massively improved. For best results, rebuild your indexes as part of a healthy maintenance plan.

### Maintenance plan

If you are running a SQL instance with a SQL agent available, you can set up a traditional maintenance plan. If you are running on Azure, you may want to add the [Azure SQL Maintenance Plan procedure](https://raw.githubusercontent.com/yochananrachamim/AzureSQL/master/AzureSQLMaintenance.txt) by Yochanan Rachamim – and run it with some regularity. This is a pretty smart proc that determines the best actions to resolve issues such as fragmentation of indexes.

<small>Fragments image from [pxhere](https://pxhere.com/en/photo/760407). [CC0 Public Domain](https://creativecommons.org/publicdomain/zero/1.0/).</small>
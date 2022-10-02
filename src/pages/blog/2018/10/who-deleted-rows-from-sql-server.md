---
layout: src/layouts/Default.astro
navMenu: false
title: 'Who deleted rows from SQL Server'
pubDate: 2018-10-09T06:00:56+01:00
author:
    - steve-fenton
medium_post:
    - 'O:11:"Medium_Post":11:{s:16:"author_image_url";s:75:"https://cdn-images-1.medium.com/fit/c/400/400/1*eXkhfEuF41g5W_xnc_ydLA.jpeg";s:10:"author_url";s:38:"https://medium.com/@steve.fenton.co.uk";s:11:"byline_name";N;s:12:"byline_email";N;s:10:"cross_link";s:3:"yes";s:2:"id";s:12:"151f15002ab0";s:21:"follower_notification";s:3:"yes";s:7:"license";s:19:"all-rights-reserved";s:14:"publication_id";s:2:"-1";s:6:"status";s:5:"draft";s:3:"url";s:51:"https://medium.com/@steve.fenton.co.uk/151f15002ab0";}'
categories:
    - Programming
tags:
    - sql
---

Want to know who deleted rows from your SQL database? The script below joins up delete transactions with users in order to find out who just deleted something. Because this comes from the transaction log, you’ll only find stuff that is still available in there. This means it will be affected by retention/recovery modes. If you know something just got deleted, it can be pretty useful.

If you get the result you are after, save it in case it is missing when you run it again!

 ```
<pre class="wp-block-code prettyprint lang-sql">```
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
```
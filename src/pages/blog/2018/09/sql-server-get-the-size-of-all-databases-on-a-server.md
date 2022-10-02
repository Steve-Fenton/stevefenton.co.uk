---
layout: src/layouts/Default.astro
navMenu: false
title: 'SQL Server: Get the size of all databases on a server'
pubDate: 2018-09-04T08:34:33+01:00
authors:
    - steve-fenton
medium_post:
    - 'O:11:"Medium_Post":11:{s:16:"author_image_url";s:75:"https://cdn-images-1.medium.com/fit/c/400/400/1*eXkhfEuF41g5W_xnc_ydLA.jpeg";s:10:"author_url";s:38:"https://medium.com/@steve.fenton.co.uk";s:11:"byline_name";N;s:12:"byline_email";N;s:10:"cross_link";s:3:"yes";s:2:"id";s:12:"d06cc773954d";s:21:"follower_notification";s:3:"yes";s:7:"license";s:19:"all-rights-reserved";s:14:"publication_id";s:2:"-1";s:6:"status";s:5:"draft";s:3:"url";s:51:"https://medium.com/@steve.fenton.co.uk/d06cc773954d";}'
categories:
    - Programming
tags:
    - sql
---

The following query will get you the database size and log file size for all databases on a SQL Server instance.

 ```
<pre class="wp-block-code prettyprint lang-sql">```
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
```
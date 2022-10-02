---
id: 1782
layout: src/layouts/Default.astro
title: 'Performing really big deletes in SQL Server'
pubDate: 2016-05-01T15:25:29+01:00
author:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=1782'
permalink: /2016/05/performing-really-big-deletes-in-sql-server/
medium_post:
    - 'O:11:"Medium_Post":11:{s:16:"author_image_url";s:75:"https://cdn-images-1.medium.com/fit/c/400/400/1*eXkhfEuF41g5W_xnc_ydLA.jpeg";s:10:"author_url";s:38:"https://medium.com/@steve.fenton.co.uk";s:11:"byline_name";N;s:12:"byline_email";N;s:10:"cross_link";s:3:"yes";s:2:"id";s:12:"ae7a4ee3eaea";s:21:"follower_notification";s:3:"yes";s:7:"license";s:19:"all-rights-reserved";s:14:"publication_id";s:2:"-1";s:6:"status";s:5:"draft";s:3:"url";s:51:"https://medium.com/@steve.fenton.co.uk/ae7a4ee3eaea";}'
categories:
    - Programming
tags:
    - sql
---

I am working on a database with a really big table. In total it contains something in the region of 50GB of data. This was a rare occasion where we wanted to re-generate the data in this table and wanted to completely clear down the table in a master database that has seven subscribers.

There are benefits to running one big DELETE statement to do this – it is likely to be the fastest way in this situation. However, there are a couple of drawbacks. If you have to “bin out” halfway through, you end up having achieved no deletions even after running a script for two hours. You also get a really big transaction log with everything in it… and have no visible progress to work out whether you have time to eat a pizza before the deletion will complete.

The following script chunks the delete into lots of 1,000 row transactions. This might take longer overall than just running a simple delete, but gives you a visible indication of progress and it limits the sudden and explosive growth of your transaction log in many cases. It also lets other commands get a turn, which would otherwise become blocked by your mega deletion. If you have to cancel the script, you’d get the benefit of having the already-committed transactions left alone, and a shorter cancellation time on the current smaller transaction.

```
<pre class="prettyprint lang-sql">SET NOCOUNT ON;
DECLARE @rows INT = 1
DECLARE @total BIGINT = 0

WHILE @rows > 0
BEGIN
    BEGIN TRANSACTION;
        DELETE TOP (1000)
        FROM MyBigTable
        SET @rows = @@ROWCOUNT;
    COMMIT TRANSACTION;
 
    SET @total = @total + @rows
    RAISERROR('Deleted %I64d', 0, 1, @total) WITH NOWAIT
END
```

You can tweak the number of rows per transaction if you want to. The error messages are just informational and let you know how many rows you have binned in total.

The RAISERROR call is used because it flushes the output immediately. Using PRINT doesn’t give you the feedback you need in this case (you’d need a GO statement in there to make it flush and that would ruin everything).
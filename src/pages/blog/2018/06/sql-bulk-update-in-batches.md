---
layout: src/layouts/Default.astro
navMenu: false
title: 'SQL bulk update in batches'
pubDate: 2018-06-29T17:12:18+01:00
author:
    - steve-fenton
medium_post:
    - 'O:11:"Medium_Post":11:{s:16:"author_image_url";s:75:"https://cdn-images-1.medium.com/fit/c/400/400/1*eXkhfEuF41g5W_xnc_ydLA.jpeg";s:10:"author_url";s:38:"https://medium.com/@steve.fenton.co.uk";s:11:"byline_name";N;s:12:"byline_email";N;s:10:"cross_link";s:3:"yes";s:2:"id";s:12:"7eb41a014af6";s:21:"follower_notification";s:3:"yes";s:7:"license";s:19:"all-rights-reserved";s:14:"publication_id";s:2:"-1";s:6:"status";s:5:"draft";s:3:"url";s:51:"https://medium.com/@steve.fenton.co.uk/7eb41a014af6";}'
image: /wp-content/uploads/2018/06/a-pile-of-ram.jpg
categories:
    - Programming
tags:
    - sql
---

![A Pile of RAM](/wp-content/uploads/2018/06/a-pile-of-ram-1024x587.jpg)

When you perform a SQL bulk update, you *can* just press go and wait. Most humans, though, get an increasing feeling of impending doom when the clock ticks up towards several hours with no visible progress.

If you are running a transaction and have other things competing for the table, you’ll start hearing about slow downs as everyone competes for the rows.

You can solve this with the following SQL bulk update script. This script updates in small transaction batches of 1000 rows at a time. You can use the general idea for any bulk update as long as you are okay with having the change committed in batches, and possibly being partially applied.

You can also apply the pattern of update shown in this example to make the change continue from where it left off if you have to stop it at any point, such as when you lose a connection.

```
<pre class="prettyprint lang-sql">
SET NOCOUNT ON;
DECLARE @rows INT, @count INT, @message VARCHAR(100);
SET @rows = 1;
SET @count = 0;

WHILE @rows > 0
BEGIN
    BEGIN TRAN
        UPDATE TOP (1000) MyBigTable
        SET MyColumn = MyColumn + 42
        WHERE MyColumn < 10
 
        SET @rows = @@ROWCOUNT
        SET @count = @count + @rows
        RAISERROR('COUNT %d', 0, 1, @count) WITH NOWAIT
    COMMIT TRAN
END
```

The output in the messages window will show you how you are getting on:

```
<pre class="prettyprint">
...
COUNT 265000
COUNT 266000
COUNT 267000
COUNT 268000
COUNT 269000
```

### Countdown

If you prefer a countdown to zero, you might prefer this version.

```
<pre class="prettyprint lang-sql">
SET NOCOUNT ON;
DECLARE @rows INT, @count INT, @message VARCHAR(100);
SET @rows = 1;
SET @count = 0;

WHILE @rows > 0
BEGIN
    BEGIN TRAN
        UPDATE TOP (1000) MyBigTable
        SET MyColumn = MyColumn + 42
        WHERE MyColumn < 10
 
        SET @rows = @@ROWCOUNT
        SELECT @count = COUNT(1) FROM MyBigTable WHERE MyColumn < 10
        RAISERROR('COUNT %d', 0, 1, @count) WITH NOWAIT
    COMMIT TRAN
END
```

```
<pre class="prettyprint">
...
COUNT 4400
COUNT 4300
COUNT 4200
COUNT 4100
COUNT 4000
```

<small>Photo: [“a pile of RAM” by Blake Patterson](https://www.flickr.com/photos/blakespot/6173837649). [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/)</small>
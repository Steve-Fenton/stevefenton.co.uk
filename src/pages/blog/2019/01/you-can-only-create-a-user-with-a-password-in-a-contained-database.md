---
id: 4755
title: 'You can only create a user with a password in a contained database'
pubDate: '2019-01-04T07:00:34+00:00'
author: 'Steve Fenton'
layout: post
guid: 'https://www.stevefenton.co.uk/?p=4755'
permalink: /2019/01/you-can-only-create-a-user-with-a-password-in-a-contained-database/
categories:
    - Programming
tags:
    - sql
---

If you attempt to create a user in SQL Server and get the following error:

> You can only create a user with a password in a contained database

You probably didn’t quite configure your database as you intended. You can use the script below to fix it up (substitute `DatabaseNameHere` with your actual database name.

```
<pre class="prettyprint lang-sql">
EXEC sp_configure 'contained database authentication', 1
GO

RECONFIGURE
GO

ALTER DATABASE DatabaseNameHere
SET containment = PARTIAL
GO
```
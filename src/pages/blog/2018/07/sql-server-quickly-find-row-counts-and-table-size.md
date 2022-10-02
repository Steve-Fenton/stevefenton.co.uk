---
id: 3867
title: 'SQL Server: Quickly find row counts and table size'
pubDate: '2018-07-04T13:53:10+01:00'
author: 'Steve Fenton'
layout: post
guid: 'https://www.stevefenton.co.uk/?p=3867'
permalink: /2018/07/sql-server-quickly-find-row-counts-and-table-size/
medium_post:
    - 'O:11:"Medium_Post":11:{s:16:"author_image_url";s:75:"https://cdn-images-1.medium.com/fit/c/400/400/1*eXkhfEuF41g5W_xnc_ydLA.jpeg";s:10:"author_url";s:38:"https://medium.com/@steve.fenton.co.uk";s:11:"byline_name";N;s:12:"byline_email";N;s:10:"cross_link";s:3:"yes";s:2:"id";s:12:"ee586b9ff833";s:21:"follower_notification";s:3:"yes";s:7:"license";s:19:"all-rights-reserved";s:14:"publication_id";s:2:"-1";s:6:"status";s:5:"draft";s:3:"url";s:51:"https://medium.com/@steve.fenton.co.uk/ee586b9ff833";}'
categories:
    - Programming
tags:
    - sql
---

I have a [script I use to find table sizes in SQL server](https://www.stevefenton.co.uk/2016/05/finding-table-sizes-in-sql-server/). Sometimes, though, I need to find the rough table size of a massive table without the need for absolute precision.

SQL server has a procedure for finding out the number of rows, space, and index size of a table; and it can run very quickly even for massive tables. It retrieves summary information, so it won’t give you a perfect and precise number.

Here is an example:

```
<pre class="prettyprint lang-sql">
sp_spaceused MyMassiveTable
```

And the output is similar to the below made up result:

```
<pre class="prettyprint">
name               rows                 reserved           data               index_size         unused
------------------ -------------------- ------------------ ------------------ ------------------ ------------------
MyMassiveTable     113572103            477067904 KB       672320720 KB       5505568 KB         841616 KB
```

This mechanism will return a result in under one second, whereas a “proper” `COUNT` could take much longer.
---
layout: src/layouts/Default.astro
navMenu: false
title: 'Find the current identity of all tables in SQL'
pubDate: 2017-02-20T08:10:06+00:00
authors:
    - steve-fenton
medium_post:
    - 'O:11:"Medium_Post":11:{s:16:"author_image_url";s:75:"https://cdn-images-1.medium.com/fit/c/400/400/1*eXkhfEuF41g5W_xnc_ydLA.jpeg";s:10:"author_url";s:38:"https://medium.com/@steve.fenton.co.uk";s:11:"byline_name";N;s:12:"byline_email";N;s:10:"cross_link";s:3:"yes";s:2:"id";s:12:"a97cc8c5b1a1";s:21:"follower_notification";s:3:"yes";s:7:"license";s:19:"all-rights-reserved";s:14:"publication_id";s:2:"-1";s:6:"status";s:5:"draft";s:3:"url";s:51:"https://medium.com/@steve.fenton.co.uk/a97cc8c5b1a1";}'
categories:
    - Programming
tags:
    - SQL
---

If you ever need to get a list of all your tables and their current identity value (i.e. you want to know `CHECKIDENT NORESEED` for all your things) you can run this query. It returns the identity and associated information for all your tables.

The query should be executed against the database you are interested in:

```
<pre class="prettyprint lang-sql">
SELECT
    TABLE_NAME AS [Table],
    IDENT_CURRENT(TABLE_SCHEMA + '.' + TABLE_NAME) AS Id,
    IDENT_SEED(TABLE_SCHEMA + '.' + TABLE_NAME) AS Seed,
    IDENT_INCR(TABLE_SCHEMA + '.' + TABLE_NAME) AS Increment
FROM
    INFORMATION_SCHEMA.TABLES
WHERE
    OBJECTPROPERTY(OBJECT_ID(TABLE_SCHEMA + '.' + TABLE_NAME), 'TableHasIdentity') = 1
AND
    TABLE_TYPE = 'BASE TABLE'
```
The “Id” column shows the current value.

Thanks to Chris Bailiss for the improvement suggestions, which are included in the above script.
---
layout: src/layouts/Default.astro
title: 'Find the current identity of all tables in SQL'
navMenu: false
pubDate: 2017-02-20T08:10:06+00:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - SQL
---

If you ever need to get a list of all your tables and their current identity value (i.e. you want to know `CHECKIDENT NORESEED` for all your things) you can run this query. It returns the identity and associated information for all your tables.

The query should be executed against the database you are interested in:

```sql
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
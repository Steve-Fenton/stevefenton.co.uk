---
layout: src/layouts/Default.astro
title: 'Find stored procedures that reference a table'
navMenu: false
pubDate: 2017-01-24T10:45:36+00:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - SQL
---

If you need to find stored procedures that reference a table in a SQL database, you can use this script. Just update the table name in the script. The script returns all objects that reference the table, including stored procedures.

```sql
SELECT DISTINCT so.name, so.xtype
FROM syscomments sc
INNER JOIN sysobjects so ON sc.id = so.id
WHERE sc.TEXT LIKE '%tblExample%'
```
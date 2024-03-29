---
title: How to drop a SQL Server constraint when you don't know its name
navMenu: false
pubDate: 2020-05-15T11:21:59+01:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - SQL
---

If you are looking after a database that has been haphazardly maintained in the past, you might come across inconsistent naming of things such as constraints. When you come to delete the existing one, it might be tricky if it doesn’t have the same name across environments.

That’s when you need to do a lookup to get the name, so you can drop the constraint. You can use this to target constraints by column and table names. In the future, never let anyone except a human name your constraints.

```sql
DECLARE
    @constraint NVARCHAR(200),
    @command NVARCHAR(300)

SELECT
    @constraint = default_constraints.name
FROM 
    sys.all_columns
INNER JOIN
    sys.tables ON all_columns.object_id = tables.object_id
INNER JOIN 
    sys.schemas ON tables.schema_id = schemas.schema_id
INNER JOIN
    sys.default_constraints ON all_columns.default_object_id = default_constraints.object_id
WHERE 
    schemas.name = 'dbo'
AND
    tables.name = 'MyTableName'
AND
    all_columns.name = 'MyFieldName'

IF @constraint IS NOT NULL
BEGIN
    SELECT @command = 'ALTER TABLE MyTableName DROP CONSTRAINT ' + @constraint;
    EXECUTE(@command)
END
GO
```
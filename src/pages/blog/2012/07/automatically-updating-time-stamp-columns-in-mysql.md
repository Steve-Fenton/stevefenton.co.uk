---
layout: src/layouts/Default.astro
title: 'Automatically updating time stamp columns in MySql'
navMenu: false
pubDate: 2012-07-23T15:34:41+01:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - MySql
---

It is often useful to have a column that indicated the last update date of a record on a table. It is also useful to update this column automatically, rather than having to rely on the application updating the value.

There is a really simple way to do this in MySql, using a column defined like this:

```sql
LastUpdate TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
```

You can see this in action in the following example.

Firstly, let’s create a table that includes our LastUpdate column.

```sql
CREATE TABLE t1 (
    a VARCHAR(50),
    b VARCHAR(50),
    c VARCHAR(50),
    LastUpdate TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

And we’ll add a row to the table.

```sql
INSERT INTO t1 (a, b, c) VALUES ('a', 'b', 'c');
```

We haven’t specified a value for LastUpdate in our query, so it will use the default value, which is CURRENT\_TIMESTAMP. We can see this by looking at the row.

```sql
SELECT * FROM t1;
```

Now let’s update any column except our LastUpdate column and see what happens.

```sql
UPDATE t1 SET a = 'd' WHERE a = 'a';
```

If we look again at our row, we’ll see the LastUpdate has been moved on.

```sql
SELECT * FROM t1;
```

The only downside is that you can’t have two columns for this information. My preference would be to have a “Created” column with a default value of CURRENT\_TIMESTAMP and a “LastUpdated” column with an ON UPDATE CURRENT\_TIMESTAMP value, but according to the [MySql documentation](http://dev.mysql.com/doc/refman/5.0/en/timestamp-initialization.html):

> It is not possible to have the current timestamp be the default value for one column and the auto-update value for another column.

And I even tested this to make sure it was true – if you try and add a table with two columns using CURRENT\_TIMESTAMP, you get an error.
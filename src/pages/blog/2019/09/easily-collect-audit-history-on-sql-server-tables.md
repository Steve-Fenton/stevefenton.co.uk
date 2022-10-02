---
id: 6528
title: 'Easily collect audit history on SQL Server tables'
pubDate: '2019-09-26T07:50:22+01:00'
author: 'Steve Fenton'
layout: post
guid: 'https://www.stevefenton.co.uk/?p=6528'
permalink: /2019/09/easily-collect-audit-history-on-sql-server-tables/
categories:
    - Programming
tags:
    - sql
---

These notes will help you to easily collect an audit history on SQL Server tables. There are lots of ways to do this, including options that let you specify the exact table schema you want to use to track the history of changes, but this option is a neat way to get some robust tracking of all changes made to your data.

A big thanks to Dave Beaumont for the code review for the samples in this article.

For the purposes of the example, we’ll use the following table definition. It’s just a Tenant table. Each Tenant record has an Id, Title, Updated date and time (UTC), and an author.

```
<pre class="prettyprint lang-sql">
CREATE TABLE [dbo].[tblTenant] (
    -- Fields you want in your table
    [TenantId] UNIQUEIDENTIFIER NOT NULL DEFAULT (newid()),
    [Title] NVARCHAR (500) NOT NULL,
    [UpdatedUTC] DATETIME2 NOT NULL DEFAULT (GETUTCDATE()), 
    [Author] NVARCHAR(256) NOT NULL, 
    -- Primary Key
    CONSTRAINT [PK_tblTenant] PRIMARY KEY CLUSTERED ([TenantId] ASC)
)
GO
```

### Optional but sensible columns

You should already have columns on your table that contain the data you would look for in the audit history. For example, the user who made the change is almost always needed. So, although you won’t be forced to add this data it’s up to you to ensure the history row is useful when you finally need to use it.

### Mandatory start and end time columns

We can have our history table generated for us, but there is one condition… you have to have two columns that are used for the history information.

In the example below, we have added SysStartTime, SysEndTime, and linked them together into a period.

Here’s the addition…

```
<pre class="prettyprint lang-sql">
[SysStartTime] DATETIME2 GENERATED ALWAYS AS ROW START NOT NULL, 
[SysEndTime] DATETIME2 GENERATED ALWAYS AS ROW END NOT NULL,
PERIOD FOR SYSTEM_TIME (SysStartTime, SysEndTime),
```

And where it fits into our script so far…

```
<pre class="prettyprint lang-sql">
CREATE TABLE [dbo].[tblTenant] (
    -- Fields you want in your table
    [TenantId] UNIQUEIDENTIFIER NOT NULL DEFAULT (newid()),
    [Title] NVARCHAR (500) NOT NULL,
    [UpdatedUTC] DATETIME2 NOT NULL DEFAULT (GETUTCDATE()), 
    [Author] NVARCHAR(256) NOT NULL, 
    -- Fields you need for temporal tracking
    [SysStartTime] DATETIME2 GENERATED ALWAYS AS ROW START NOT NULL, 
    [SysEndTime] DATETIME2 GENERATED ALWAYS AS ROW END NOT NULL,
    PERIOD FOR SYSTEM_TIME (SysStartTime, SysEndTime),
    -- Primary Key
    CONSTRAINT [PK_tblTenant] PRIMARY KEY CLUSTERED ([TenantId] ASC)
)
GO
```

### Automatic history table

Now you have the right columns, you can ask SQL Server to add an automatic *temporal version history table*. Sounds cool, and can be done using one additional line in your table definition. The only part to change is the name of the table. I call all my temporal history tables “tblHistoryOf…” – followed by the table name. So in our case “tblHistoryOfTenant”. You’ll thank yourself for using this convention later on as it makes it super-clear which tables are “data” and which tables are “history”.

The additional line is…

```
<pre class="prettyprint lang-sql">
WITH (SYSTEM_VERSIONING = ON (HISTORY_TABLE = dbo.tblHistoryOfTenant));
```

And it fits into your tables script here…

```
<pre class="prettyprint lang-sql">
CREATE TABLE [dbo].[tblTenant] (
    -- Fields you want in your table
    [TenantId] UNIQUEIDENTIFIER NOT NULL DEFAULT (newid()),
    [Title] NVARCHAR (500) NOT NULL,
    [UpdatedUTC] DATETIME2 NOT NULL DEFAULT (GETUTCDATE()), 
    [Author] NVARCHAR(256) NOT NULL, 
    -- Fields you need for temporal tracking
    [SysStartTime] DATETIME2 GENERATED ALWAYS AS ROW START NOT NULL, 
    [SysEndTime] DATETIME2 GENERATED ALWAYS AS ROW END NOT NULL,
    PERIOD FOR SYSTEM_TIME (SysStartTime, SysEndTime),
    -- Primary Key
    CONSTRAINT [PK_tblTenant] PRIMARY KEY CLUSTERED ([TenantId] ASC)
)
-- Automatic Versioning Table
WITH (SYSTEM_VERSIONING = ON (HISTORY_TABLE = dbo.tblHistoryOfTenant));
GO
```

You will see your table get a new icon, and a nested temporal history table with the audit history:

![Temporal Audit History Table Icon and Nested Table](https://www.stevefenton.co.uk/wp-content/uploads/2019/09/temporal-audit-history-sql-server.jpg)

### Entity Framework

As of EF Core 6.0 you can have these temporal tables configured for you, by asking the model builder to set it up.

```
<pre class="prettyprint lang-csharp">
modelBuilder
    .Entity<Tenant>()
    .ToTable("Tenant", b => b.IsTemporal());
```

When using EF Core to do this, you’ll get a `TenantHistory` table with automatic `PeriodStart` and `PeriodEnd` columns. You can override these defaults if you need to:

```
<pre class="prettyprint lang-csharp">
modelBuilder
    .Entity<Tenant>()
    .ToTable("Tenant", b => b.IsTemporal(
        b.HasPeriodStart("SysStartTime");
        b.HasPeriodEnd("SysEndTime");
        b.UseHistoryTable("HistoryOfTenant");
    ));
```

Neat!
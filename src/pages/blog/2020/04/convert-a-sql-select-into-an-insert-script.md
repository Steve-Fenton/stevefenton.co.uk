---
layout: src/layouts/Default.astro
title: Convert a SQL SELECT into an INSERT script
navMenu: false
pubDate: 2020-04-05T13:11:14+01:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - data
    - sql
---

Sometimes you want to generate an INSERT script from existing data, perhaps with one or two values tweaked. It’s a pain to hand-crank the INSERT when you can see exactly what you want using a SELECT statement. It’s also a bit long-winded to use SQL import/export wizards or other tools. Sometimes, you just want to convert a SQL SELECT into an INSERT script. Here’s how.

Change the three user variables at the top to say

- Whether the primary key field should be included or not
- Which table you want to operate against
- What filter you want to apply to the data, for example `WHERE Id = 1`

```sql
DECLARE 
     @includePK BIT = 1,
     @table VARCHAR(MAX) = 'LogEntry',
     @dataFilter VARCHAR(MAX) = 'WHERE date = ''2020-03-10'' '

DECLARE 
     @columnNames VARCHAR(MAX) = '',
     @getDataColumnScript VARCHAR(MAX),
     @queryToGenerateScript VARCHAR(MAX)

-- Get a list of all colmuns
SELECT @columnNames = STUFF
(
    (
     SELECT ',['+ NAME +']' FROM sys.all_columns 
     WHERE OBJECT_ID = OBJECT_ID(@table)
     AND (is_identity != 1 OR @includePK = 1)
     FOR XML PATH('')
    ),
     1,
     1,
     ''
)

-- Create a the column part of the select using the column names
SELECT @getDataColumnScript = STUFF
(
    (
     SELECT ' ISNULL(QUOTENAME(' + NAME + ',' + QUOTENAME('''','''''') + '),' + '''NULL''' + ')+'',''' + '+' FROM sys.all_columns 
     WHERE OBJECT_ID = OBJECT_ID(@table)
     AND (is_identity != 1 OR @includePK = 1)
     FOR XML PATH('')
    ),
     1,
     1,
     ''
)

SELECT @queryToGenerateScript = 'SELECT ''' +
     'INSERT INTO ' + @table + '(' + @columnNames + ')' + 
     'VALUES(''' + '+' + SUBSTRING(@getDataColumnScript, 1, LEN(@getDataColumnScript) -5) + '+' + ''')''' + ' OutputScript ' +
     'FROM ' + @table + ' ' + @dataFilter

EXECUTE (@queryToGenerateScript)
```

Result (it doesn’t come out looking “pretty”, but I made it readable here by adding whitespace).

```sql
INSERT INTO LogEntry(
    [date],
    [time],
    [s_ip],
    [cs_method],
    [cs_uri_stem],
    [cs_uri_query],
    [s_port],
    [cs_username],
    [c_ip],
    [cs_User_Agent],
    [cs_Referer],
    [cs_host],
    [sc_status],
    [sc_substatus],
    [sc_win32_status],
    [time_taken],
    [X_Forwarded_For]
)
VALUES(
    '2020-03-10 00:00:00.0000000',
    '1900-01-01 09:40:09.0000000',
    '10.150.101.104',
    'GET',
    '/some-page-name',
    '-',
    '80',
    '-',
    '0.0.0.0',
    'Mozilla/5.0+(Windows+NT+10.0;+Win64;+x64)+AppleWebKit/537.36+(KHTML,+like+Gecko)+Chrome/80.0.3987.132+Safari/537.36',
    'https://www.example.com/',
    'www.example.com',
    '200',
    '0',
    '0',
    '0',
    '1.1.1.1'
)
```

There are some limitations. This script isn’t going to check your column types, so everything is gonna be a string. SQL usually does alright with this, but you might find some loss of precision in datetime fields. It also doesn’t append the additional code to set identity insert on. I might add this later.
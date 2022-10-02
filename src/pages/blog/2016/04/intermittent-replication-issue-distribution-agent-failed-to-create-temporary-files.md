---
layout: src/layouts/Default.astro
navMenu: false
title: 'Intermittent replication issue &#8211; Distribution agent failed to create temporary files'
pubDate: 2016-04-20T06:00:12+01:00
authors:
    - steve-fenton
categories:
    - Automation
    - Programming
    - Windows
tags:
    - powershell
    - replication
    - sql
---

This will seem like a strange issue, because everything will work perfectly well for a period of time – but then it will all go wrong and you’ll get an error such as:

> Error messages: The distribution agent failed to create temporary files in ‘C:\\Program Files\\Microsoft SQL Server\\110\\COM’ directory. System returned errorcode 5. (Source: MSSQL\_REPL, Error number: MSSQL\_REPL21100) Get help: http://help/MSSQL\_REPL21100

If you re-initialize the subscription, everything will work again and you’ll wonder what happened!

The fix for this is to grant write permissions to the folder to the distribution user. Things to bear in mind…

1. You need to grant access on the machine acting as the distributor (often this is the publishing machine, but you can configure a different machine to perform distribution).
2. You need to grant access to your replication distribution user (you are likely to have set up different users for distribution, log reader, merge, and snapshot tasks).

If you are scripting your permissions, here is the PowerShell…

```
<pre class="prettyprint lang-powershell">

# Special permission for repl_distribution_user
$accessControlList = Get-Acl "C:\Program Files\Microsoft SQL Server\110\COM"
$accessRule = New-Object system.security.accesscontrol.filesystemaccessrule("repl_distribution_user", "FullControl", "ContainerInherit, ObjectInherit", "None", "Allow")
$accessControlList.SetAccessRule($accessRule)
```
---
id: 1832
title: 'Script SQL Server backup with batch files and PowerShell'
pubDate: '2016-06-15T15:51:59+01:00'
author: 'Steve Fenton'
layout: post
guid: 'https://www.stevefenton.co.uk/?p=1832'
permalink: /2016/06/script-sql-server-backup-with-batch-files-and-powershell/
categories:
    - Automation
    - Programming
tags:
    - backup
    - bash
    - deployments
    - powershell
    - sql
---

This is not our preferred method of deployment, but we have some batch-file based deployments still in active use (most of our deployments are executed via Octopus Deploy, but some of the concepts below are re-usable there too). One of the tasks we perform during a deployment is a database backup prior to schema changes.

The batch file for this is shown below. It simply calls the PowerShell script, bypassing the normal execution policy (so you don’t have to set the global execution policy to be more permissive).

```
<pre class="prettyprint">echo Backup Database Starting
explorer "E:\Program Files\Microsoft SQL Server\MSSQL10_50.MSSQLSERVER\MSSQL\Backup"
powershell.exe -ExecutionPolicy Bypass -file "E:\Deployments\db-backup.ps1"
echo Backup Database Done
pause
```

The contents of “db-backup.ps1” are shown below. There is a simple SQL Script to execute the backup, which is executed by importing the SQLPS module and using the “Invoke-Sqlcmd” cmdlet. (You may need to [install the tools to run sql scripts using PowerShell on your server](https://www.stevefenton.co.uk/2015/08/run-custom-database-scripts-with-powershell-and-octopus-deploy/#running-sql-with-powershell)).

```
<pre class="prettyprint lang-powershell">Import-Module "C:\Program Files (x86)\Microsoft SQL Server\110\Tools\PowerShell\Modules\SQLPS\sqlps"

$script = @"
DECLARE @script nvarchar(max), @sprint nvarchar(3), @timestamp nvarchar(10), @backuppath nvarchar(250 )

SET @timestamp = CONVERT(char(10), GETUTCDATE(), 126)
SET @backuppath = 'E:\Program Files\Microsoft SQL Server\MSSQL10_50.MSSQLSERVER\MSSQL'

SET @script = 'BACKUP DATABASE YOUR_DB
    TO DISK = ''' + @backuppath + '\Backup\Your_DB_' + @timestamp + '_Auto.bak'' 
    WITH FORMAT'
PRINT @script
EXECUTE sp_executesql @script

"@

Invoke-Sqlcmd -ServerInstance "." -Database "master" -Username "user" -Password "pw" -Query $script -QueryTimeout 65334
```
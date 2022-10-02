---
layout: src/layouts/Default.astro
navMenu: false
title: 'Run custom database scripts with PowerShell and Octopus Deploy'
pubDate: 2015-08-08T07:30:53+01:00
authors:
    - steve-fenton
categories:
    - Automation
    - Programming
tags:
    - octopus
    - powershell
    - sql
---

We are using [model-based deployments using Visual Studio database projects and Octopus Deploy](/2015/06/packaging-visual-studio-database-project-with-octopack/). One of the things you can’t do when performing DacPac deployments is include a pre-deployment scrip to disable replication prior to running the deployment (although you can re-enable it in a post-deployment script).

The solution is to change the “disable replication” script to a plain “copy always” script in Visual Studio (so it will be packaged by Octopack and deployed to the server) and then run it on the server using a PowerShell command prior to the DacPac deployment.

[![PowerShell Steps in Octopus Deploy](/img/2015/08/powershell-steps.png)](/img/2015/08/powershell-steps.png)

### Running SQL Scripts With Powershell

The following pre-requisites must be installed on the target server in both x86 and x64 versions (so six small installs in total). They are all in the “*Microsoft® SQL Server® Feature Pack*” ([SQL 2012](http://www.microsoft.com/en-us/download/details.aspx?id=29065), [SQL 2014](http://www.microsoft.com/en-us/download/details.aspx?id=42295)), which looks like a download, but if you expand the “Install Instructions” you’ll find lots of individual downloads.

Once downloaded, install them in this order…

1. SQLSysCLRTypes
2. SharedManagementObjects
3. PowerShellTools

You can test that you have everything you need by running the following PowerShell command.

```
<pre class="prettyprint lang-powershell">Import-Module sqlps
```
If you have any trouble with this, you can check and try the full path (using “110” in your path for 2012 and “120” for 2014 etc).

```
<pre class="prettyprint lang-powershell">
Import-Module "C:\Program Files (x86)\Microsoft SQL Server\110\Tools\PowerShell\Modules\SQLPS\sqlps"
```
You will get a warning, which is aimed at the module developer. You can ignore this – and when we call this from Octopus we will specifically ask for it to be ignored so it doesn’t stop the deployment.

> WARNING: The names of some imported commands from the module ‘sqlps’ include unapproved verbs that might make them less discoverable. To find the commands with unapproved verbs, run the Import-Module command again with the Verbose parameter. For a list of approved verbs, type Get-Verb.

Here is a basic script to run a SQL query:

```
<pre class="prettyprint lang-powershell">
Import-Module sqlps
Invoke-Sqlcmd -ServerInstance "." -Database MyDb -Username usr1 -Password pwd -Query "SELECT GETUTCDATE() AS Example"
```
And you can also run a SQL script file:

```
<pre class="prettyprint lang-powershell">
Import-Module sqlps
Invoke-Sqlcmd -ServerInstance "." -Database MyDb -Username usr1 -Password pwd  -InputFile "C:\SQL\Script.sql"
```
### The Octopus Version

Now we can add a PowerShell step to the deployment process to run our custom SQL script.

```
<pre class="prettyprint lang-powershell">
$FileName = $OctopusParameters['Octopus.Action[Database Deployment].Output.Package.InstallationDirectoryPath'] + "\Data\DisableReplication.sql"
Import-Module "C:\Program Files (x86)\Microsoft SQL Server\110\Tools\PowerShell\Modules\SQLPS\sqlps" -WarningAction SilentlyContinue
Invoke-Sqlcmd -ServerInstance "." -Database $DatabaseName -Username $UserName -Password $Password -InputFile $FileName
```
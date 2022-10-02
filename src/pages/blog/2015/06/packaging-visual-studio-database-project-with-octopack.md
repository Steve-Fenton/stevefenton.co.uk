---
layout: src/layouts/Default.astro
navMenu: false
title: 'Packaging and deploying a Visual Studio database project with OctoPack and Octopus Deploy'
pubDate: 2015-06-24T18:21:57+01:00
authors:
    - steve-fenton

categories:
    - Automation
tags:
    - octopus
    - powershell
    - sql
---

[![Exploring Octopus Deploy](/img/2015/07/exploring-octopus-deploy.jpg)](/publications/exploring-octopus-deploy/)The prevalent method of packaging databases for Octopus Deploy is to use update scripts, along with a tool such as DbUp or ReadyRoll to perform the upgrade and manage which scripts have been run on each environment.

If you are using Visual Studio Database projects, though, you’ll be interested in how to perform a model-based upgrade using your dacpac file. There are a few examples out there, but they seem a little over-complicated.

So here is perhaps the simplest way to package your database project using OctoPack.

### Assembly Information

Add an AssemblyInfo file (then drag it into the “Properties” folder). This is where you’ll control your version number and metadata.

The most important part is the version numbers, which exist by default in your assembly information. You’ll need to change this each time you want to publish a package.

### Edit Project File

You can’t add NuGet packages to your database project. Because you are almost certainly already using it for another project in your solution (the application the consumes the database, for example) you can piggy-back on it.

Edit your project file by inserting the following just before the closing “&lt;/Project&gt;” tag.

```
<pre class="prettyprint lang-xml">
<Import Project="$(SolutionDir)\packages\OctoPack.3.0.42\tools\OctoPack.targets" 
        Condition="Exists('$(SolutionDir)\packages\OctoPack.3.0.42\tools\OctoPack.targets')" />
<Target Name="EnsureOctoPackImported" 
        BeforeTargets="BeforeBuild" 
        Condition="'$(OctoPackImported)' == ''">
    <Error Condition="!Exists('$(SolutionDir)\packages\OctoPack.3.0.42\tools\OctoPack.targets') And ('$(RunOctoPack)' != '' And $(RunOctoPack))" 
           Text="Please update the OctoPack path in the database project." />
    <Error Condition="Exists('$(SolutionDir)\packages\OctoPack.3.0.42\tools\OctoPack.targets') And ('$(RunOctoPack)' != '' And $(RunOctoPack))" 
           Text="OctoPack couldn't run." />
</Target>
```
Save your project and re-load it.

### Try It Out

You can now test that a package is created using the normal Visual Studio command window MSBuild command:

```
<pre class="prettyprint lang-powershell">
msbuild YourSolution.sln /p:RunOctoPack=true
```
The package will be placed in the database project directory:

“\\obj\\octopacked\\Your.Database.1.0.0.0.nupkg”

### Add Deployment Script

&gt;Add a deployment step to your project on the Octopus Deploy web portal, just after the database deployment step. Choose “Run PowerShell Script” and enter the following script. This will run your DacPac against the target database.

```
<pre class="prettyprint lang-powershell">
Write-Output "About to run PowerShell"

# Database Details
$projectName = "MyProject.Database"
$dacServicesServer = "server=" + $DatabaseServer

# Dac Runner
Add-Type -path "C:\Program Files (x86)\Microsoft SQL Server\110\DAC\bin\Microsoft.SqlServer.Dac.dll"

# Connection string
$d = New-Object Microsoft.SqlServer.Dac.DacServices $dacServicesServer

$dacpac = $OctopusParameters['Octopus.Action[Database Deployment].Output.Package.InstallationDirectoryPath'] + "\" + $projectName + ".dacpac"
Write-Output $dacpac
$dp = [Microsoft.SqlServer.Dac.DacPackage]::Load($dacpac)

$options = New-Object Microsoft.SqlServer.Dac.DacDeployOptions -Property @{
 'BlockOnPossibleDataLoss' = $true;
 'DropObjectsNotInSource' = $false;
 'ScriptDatabaseOptions' = $true;
 'IgnorePermissions' = $true;
 'IgnoreRoleMembership' = $true
}

# Listen to messages
Register-ObjectEvent -InputObject $d -EventName "Message" -Action { Write-Host $EventArgs.Message.Message } | out-null

# Dacpac deployment
$d.Deploy($dp, $DatabaseName, $true, $options)
```
This script assumes you have set up the following Octopus Variables in your project.

- DatabaseServer: i.e. MyServer\\MyInstance.
- DatabaseName i.e. MyDatabase (as in MyDatabase.dbo.MyTable).

### Troubleshooting

To deploy a dacpac, you need to ensure the Data-Tier Application Framework is installed, this can be done by downloading the [DACFramework.msi installer](http://www.microsoft.com/en-us/download/details.aspx?id=38818) from Microsoft – if you have an x64 machine, **install both the x64 and x86** version. The Data-Tier Application Framework relies on the SQL ScriptDom, so you’ll need to install that too if it isn’t present. You can find them amongst the massive list on [Microsoft’s SQL Server Feature Pack page](https://www.microsoft.com/en-us/download/confirmation.aspx?id=29065).

When deploying the database, you may get the error “This assembly is built by a runtime newer than the currently loaded runtime and cannot be loaded.” – this is because PowerShell is attempting to run using .NET 2.0. You can update this by running the following two lines on the server.

```
<pre class="prettyprint lang-powershell">
reg add hklm\software\microsoft\.netframework /v OnlyUseLatestCLR /t REG_DWORD /d 1
reg add hklm\software\wow6432node\microsoft\.netframework /v OnlyUseLatestCLR /t REG_DWORD /d 1
```
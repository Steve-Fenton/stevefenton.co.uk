---
id: 1523
layout: src/layouts/Default.astro
title: 'Restore private NuGet feed packages during Visual Studio Team Services builds'
pubDate: 2015-11-20T06:30:32+00:00
author:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=1523'
permalink: /2015/11/restore-private-nuget-feed-packages-during-visual-studio-team-services-build/
categories:
    - Automation
    - Programming
    - 'Visual Studio'
tags:
    - nuget
    - powershell
---

Update! As of February 2016, you should be able to use the standard “NuGet Installer” vNext build task.

### The new way

Add the Nuget Installer build task, which can be found under “Add build step” -&gt; “Package”. You will need to supply a NuGet.config file with the address of your custom feed:

```
<pre class="prettyprint lang-xml"><?xml version="1.0" encoding="utf-8"?>
<configuration>
  <packageRestore>
    <add key="enabled" value="True" />
    <add key="automatic" value="True" />
  </packageRestore>
  <packageSources>
    <add key="account-name" value="https://account-name.pkgs.visualstudio.com/DefaultCollection/_packaging/account-name/nuget/v3/index.json" />
    <add key="api.nuget.org" value="https://api.nuget.org/v3/index.json" />
  </packageSources>
  <disabledPackageSources />
  <activePackageSource>
    <add key="api.nuget.org" value="https://api.nuget.org/v3/index.json" />
  </activePackageSource>
</configuration>
```

Simply supply the path to the solution and the path to this NuGet.config file to the vNext build task and it will do everything without neededing the PowerShell script I wrote below.

### The old way

If you need to restore packages from a private NuGet feed during your Visual Studio Team Services build, you can use this script as part of a PowerShell Build Step.

```
<pre class="prettyprint lang-powershell">
[CmdletBinding()]
param(
	[Parameter(Mandatory)][string] $SourceName,	# The name to be used to store credentials
	[Parameter(Mandatory)][string] $FeedUrl,	# The full path to the NuGet feed
	[Parameter(Mandatory)][string] $ProjectFolders, # Comma-separated list of project sub-folders that contain a packages.config file.
	[Parameter(Mandatory)][string] $Username,       # The user name to access the private feed
	[Parameter(Mandatory)][string] $Password        # The password to access the private feed
)

$LocalPath = $ENV:BUILD_REPOSITORY_LOCALPATH

try {
	Write-Output "Adding package Source"
	$addSourceCommand = $LocalPath + "\nuget sources add -name """ + $SourceName + """ -source " + $FeedUrl + " -username """ + $Username + """ -password """ + $Password + """ "
	$er = (Invoke-Expression -Command $addSourceCommand) 2>&1
} catch {
	$Error.Clear();
	Write-Output "Skipping package source add"
}

$projectPaths = $ProjectFolders.Split(",")

Foreach ($path in $projectPaths) {
	Write-Output "Installing NuGet packages in $LocalPath $path"
	$installCommand =  $LocalPath + "\nuget install " + $LocalPath + $path + "packages.config -Source " + $FeedUrl + " -SolutionDirectory " + $LocalPath + " "
	Invoke-Expression -Command $installCommand
}
```

The script is entirely controlled via the list of paramters, which you can supply in the “arguments” field in the PowerShell Build Step:

```
<pre class="prettyprint lang-powershell">-SourceName "example" -FeedUrl "https://example.pkgs.visualstudio.com/DefaultCollection/_packaging/example/nuget/v3/index.json" -ProjectFolders "\Networking\,\Networking.Tests\" -Username "steve.fenton" -Password "secret-magic-word"
```
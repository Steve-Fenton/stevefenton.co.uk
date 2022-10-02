---
layout: src/layouts/Default.astro
navMenu: false
title: 'Using Visual Studio Online PowerShell build steps to publish NuGet packages'
pubDate: 2015-11-18T07:00:45+00:00
author:
    - steve-fenton
categories:
    - Automation
    - Programming
    - 'Visual Studio'
tags:
    - nuget
    - powershell
---

Update! As of February 2016, you can now use the ready-made vNext NuGet Publisher step to do this and it is even easier.

### The new way

Add a new vNext build step using “Add build step…” -&gt; Package -&gt; NuGet Publisher. Select “Internal NuGet Feed” and paste in your feed url – job done. With internal feeds you don’t need to set up a service endpoint.

One word of caution though, the default “Path/Pattern to nupkg” will cause all packages to be uploaded to your private feed (i.e. everything in the /packages/ folder for your solution). You can use a more specific pattern to limit this, for example: `**\YourOrganisation.*.nupkg`

### The old way

One of the forthcoming features in Visual Studio <del datetime="2015-11-19T16:28:32+00:00">Online</del> Team Services is package management. This will begin with NuGet packages, but will eventually work with many other kinds of package. By integrating a package server with Visual Studio Online it will be a breeze to create packages as part of the build and publish them to the package server – and also to restore the packages from the package server as part of the build.

There are already build steps in private preview for:

- NuGet Installer (restores packages from your package server prior to build)
- NuGet Packager (creates NuGet packages from projects, or from nuspec files)
- NuGet Publish (publishes packages to the integrated package server)

I am currently having issues with the NuGet Publish build step and wrote the following PowerShell script to plug the hole while I wait for the issues to be resolved.

```
<pre class="prettyprint lang-powershell">
[CmdletBinding()]
param(
	[Parameter(Mandatory)][string] $SourceName,		# The name to be used to store credentials
	[Parameter(Mandatory)][string] $FeedUrl,		# The full path to the NuGet feed
	[Parameter(Mandatory)][string] $PackageName,    # The name of the package, excluding version, i.e. Namespace.ProjectName (will end up as Namespace.ProjectName.1.5.0.nupkg)
	[Parameter(Mandatory)][string] $Username,       # The user name to access the private feed
	[Parameter(Mandatory)][string] $Password        # The password to access the private feed
)

$LocalPath = $ENV:BUILD_REPOSITORY_LOCALPATH
$BuildNumber = $ENV:BUILD_BUILDNUMBER

try {
	Write-Output "Adding package Source"
	$addSourceCommand = $LocalPath + "\nuget sources add -name """ + $SourceName + """ -source " + $FeedUrl + " -username """ + $Username + """ -password """ + $Password + """ "
	$er = (Invoke-Expression -Command $addSourceCommand) 2>&1
} catch {
	$Error.Clear();
	Write-Output "Skipping package source add"
}

# The path to the package
$packagePath =  $LocalPath + "\" + $PackageName + "." + $BuildNumber + ".nupkg"

Write-Output "Pushing package to NuGet " $packagePath
$pushCommand =  $LocalPath + "\nuget push $packagePath -Source " + $FeedUrl + " -ApiKey " + $SourceName + " "
Invoke-Expression -Command $pushCommand
```

The idea behind this script is that it slots in nicely after a NuGet Packager step (with default values – if you specify a Package Folder in this build step, you’ll need to adjust the path used in this PowerShell step).

The script uses the build environment variables `$ENV:BUILD_REPOSITORY_LOCALPATH` and `$ENV:BUILD_BUILDNUMBER` to get the information it needs about the package location.

To use the script, pass the arguments in the PowerShell Build Step:

```
<pre class="prettyprint lang-powershell">-SourceName "example" -FeedUrl "https://example.pkgs.visualstudio.com/DefaultCollection/_packaging/example/nuget/v3/index.json" -PackageName "Example.Networking" -Username "steve.fenton" -Password "secret-magic-word"
```

The feed url is displayed on the package configuration screen along with the other information you need in the above script (the information used to add the package source and publish the package).
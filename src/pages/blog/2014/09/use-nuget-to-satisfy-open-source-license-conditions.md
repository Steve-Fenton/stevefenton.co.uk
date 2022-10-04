---
layout: src/layouts/Default.astro
title: 'Use NuGet to satisfy open-source license conditions'
navMenu: false
pubDate: 2014-09-09T20:52:21+01:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - Nuget
---

If you haven’t started grabbing useful stuff via NuGet, you’re missing out. It is rare these days to find a .NET project that doesn’t have a bunch of NuGet packages to provide useful features such as JSON parsing or JavaScript frameworks or some other productivity enhancing library. And it is all mostly free and open-source!

The only problem is, many of the licenses for these NuGet packages contain the all important clause:

> “The above copyright notice and this permission notice *shall be included* in all copies or substantial portions of the Software.”

So you have to include the copyright notice and sometimes the license notice when you distribute software that includes the software… but you probably aren’t doing this because the license itself is rarely included in the NuGet package – and when it is included, it isn’t set to copy to your output directory to help you to comply with the terms of the license.

## Current Solution

I have solved this sticky issue by creating a NuGet package to be used internally that contains all of the licenses and copyright notices for each NuGet package used in the software.

The NuGet package is created using the pithily-named utility:

> Create New NuGet Package From Project After Each Build

This is itself available as a NuGet package.

Each license is in a text file named using the exact NuGet identifier for each package.

To get everything to work exactly how I want (i.e. I want it to add the license files to the destination project and set them to copy to the bin folder so they end up being packaged and distributed with the software), I had to add:

1. A PowerShell script to set them to “Copy if Newer” in the destination project.
2. A nuspec file to include the PowerShell script in the package.

Here is the PowerShell script, named Install.ps1 (a special name that means it will run when the package is installed):

```powershell
param($installPath, $toolsPath, $package, $project)
function MarkDirectoryAsCopyToOutputRecursive($item)
{
    $item.ProjectItems | ForEach-Object { MarkFileASCopyToOutputDirectory($_) }
}
function MarkFileASCopyToOutputDirectory($item)
{
    Try
    {
        Write-Host Try set $item.Name
        $item.Properties.Item("CopyToOutputDirectory").Value = 2
    }
    Catch
    {
        Write-Host RecurseOn $item.Name
        MarkDirectoryAsCopyToOutputRecursive($item)
    }
}
#Now mark everything in the a directory as "Copy if newer"
MarkDirectoryAsCopyToOutputRecursive($project.ProjectItems.Item("Licenses"))
```

This marks everything in the “Licenses” folder as “Copy if newer”.

And this script is added to the package by specifying it in the nuspec file:

```xml
<?xml version="1.0" encoding="utf-8"?>
<!--
  For more info on this file format visit http://docs.nuget.org/docs/reference/nuspec-reference.
-->
<package xmlns="http://schemas.microsoft.com/packaging/2010/07/nuspec.xsd">  
  <metadata>
    <id>ThirdPartyLicenses</id>
    <version>0.0.0.8</version>
    <authors>The Fantastic Mr Fenton</authors>
    <description>Contains license files for third party packages.</description>
    <language>en-GB</language>
    <projectUrl>http://url/</projectUrl>
    <licenseUrl>http://www.wtfpl.net/about/</licenseUrl>
  </metadata>
  <files>
    <file src="bin\$configuration$\Licenses\*.txt" target="Content\Licenses\" />
    <file src="bin\$configuration$\*.ps1" target="Tools\" />
  </files>
</package>
```

In particular, you’ll notice that I’m adding all PowerShell scripts to the “Tools” directory in the package – this is important as it won’t run unless it is in this folder.

Now you simply add this NuGet package to any software that your are distributing and it will ensure all of your licenses are dropped in a “Licenses” folder alongside the software. If you start using new software, you just add the license to the NuGet package project.
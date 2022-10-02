---
id: 255
layout: src/layouts/Default.astro
title: 'NuGet Packager Visual Studio extension'
pubDate: 2014-11-03T20:17:38+00:00
author:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=255'
permalink: /2014/11/nuget-packager-visual-studio-extension/
interface_sidebarlayout:
    - default
categories:
    - Programming
    - 'Visual Studio'
tags:
    - nuget
---

This is a quick article that describes how to use the ace [NuGet Packager](https://visualstudiogallery.msdn.microsoft.com/daf5c6db-386b-4994-bdd7-b6cd52f11b72) Visual Studio Extension.

### Step One

Download *NuGet Packager using Tools &gt; Extensions and Updates &gt; Online* (search for “NuGet Packager”).

### Step Two

Add a new project to your solution, ideally name it exactly as you want your package to appear on NuGet, for example “tsUnit” if you want your package to end up at *https://www.nuget.org/packages/tsUnit/*. You don’t have to name it exactly like this, but it will mean you need to edit more of the settings that will be created for you.

Choose the NuGet Packager project type (just search for it in the new project dialog).

![NuGet Packager Project](https://www.stevefenton.co.uk/wp-content/uploads/2015/07/nuget-packager-project.png)

### Step Three

Add your content. Use build events to push your libraries and content into the folders pre-added to your NuGet Packager project. There is a content, lib, src and tools folder waiting for you to add your cool stuff.

### Step Four

Update NuGet.config… unless you are planning on publishing to the most likely place, NuGet (you can also add your organisation’s repository or any other NuGet repository).

```
<pre class="prettyprint lang-xml">
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <apikeys>
  </apikeys>
  <packageSources>
    <add key="NuGet official package source" value="https://www.nuget.org" />
  </packageSources>
</configuration>
```

### Step Five

Update Package.nuspec… especially if you couldn’t name your project exactly as you wanted the package to be named.

```
<pre class="prettyprint lang-xml">
<?xml version="1.0"?>
<package >
  <metadata>
    <id>tsUnit</id>
    <version>1.5.1</version>
    
    <authors>Steve Fenton</authors>
    <owners>Steve Fenton</owners>
    <description>
      An xUnit style framework for TypeScript with auto-discovery and assertions.
    </description>
    <releaseNotes>
    </releaseNotes>
    <summary>
      An xUnit style framework for TypeScript with auto-discovery and assertions.
    </summary>
    <language>en-US</language>
    <projectUrl>https://github.com/Steve-Fenton/tsUnit</projectUrl>
    <iconUrl>https://nuget.org/Content/Images/packageDefaultIcon-50x50.png</iconUrl>
    <requireLicenseAcceptance>false</requireLicenseAcceptance>
    <licenseUrl>http://opensource.org/licenses/Apache-2.0</licenseUrl>
    <copyright>Copyright Steve Fenton 2012-2014</copyright>
    <dependencies>
    </dependencies>
    <references></references>
    <tags>unit testing framework typescript</tags>
  </metadata>
  <files>
    <file src="lib\" target="lib" />
    <file src="tools\" target="tools" />
    <file src="content\Scripts\tsUnit\tsUnit.ts" target="content\Scripts\tsUnit\tsUnit.ts" />
  </files>
</package>
```

### Done

When you build in Debug mode, you’ll get a “.nupkg” file in the root folder of your NuGet Packager project. Rename it to be a “.zip” file and have a check through it to see if contains everything you’d expect.

Double check your NuSpec file to make sure the id and title are spot on and that your project URL points to the most useful introduction to your project.

When you build in Release mode, it will automatically publish to NuGet. You’ll need your NuGet API key handy as it will prompt you to enter it. You only need to do this once.
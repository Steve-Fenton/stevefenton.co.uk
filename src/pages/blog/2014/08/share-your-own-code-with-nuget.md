---
layout: src/layouts/Default.astro
navMenu: false
title: 'Share your own code with NuGet'
pubDate: 2014-08-29T21:16:29+01:00
authors:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=298'
interface_sidebarlayout:
    - default
categories:
    - Programming
    - 'Visual Studio'
tags:
    - nuget
---

Update: you can also use the [NuGet Package Visual Studio Extension](/Content/Blog/Date/201411/Blog/NuGet-Packager-Visual-Studio-Extension/) – it works similarly to the New-NuGet Package code described in this article, but keeps all of the NuGet stuff in a separate project (which is supplied as a project template type of NuGet Package). On release build, it will publish to your preferred NuGet repository. For class libraries, I actually prefer the “it just works” style described in this article.

This article is just a technical dump of an end-to-end solution for sharing code between many solutions within the organisation using NuGet. I have worked in teams that have checked in “shared DLLs” to source control and shared common code that way, but it can be painful when a change is made that breaks lots of solutions.

Using NuGet allows code to be shared with minimal pain and allows each solution to upgrade when ready, rather than getting updated DLLs thrust upon it.

### NuGet

You will need to [download the latest version of NuGet](http://nuget.codeplex.com/releases/view/58939) in order to create your package. Ideally, you install this on any machine that will be used to create NuGet packages and add it to the paths so you can use “nuget” without the full path each time.

### Powershell Scripts

There are some handy PowerShell scripts you can use to do all of the hard work. For the purpose of this example, you can dump the files in a subfolder of your solution named “PowerShell”.

You can grab these PowerShell scripts from the snappily titled [New-NuGetPackage PowerShell Scripts NuGet package](https://newnugetpackage.codeplex.com/)!

The example code in this article assumes a folder structure of:

- Project Folder
- PowerShell 
    - Config.ps1
    - NuGet 
        - CreateNuGetPackage.ps1
        - New-NuGetPackage.ps1
        - NuGet.exe

You don’t need NuGet.exe to be in the same path as the Powershell scripts, this is just for convenience for the example. As long as NuGet is installed on your machine and is in your paths it can be anywhere you like.

### Post-Build Event

With the PowerShell scripts and NuGet.exe ready to go, all you need to do is add a post-build event to your project to run it all and generate a package file. The post-build event script is shown below:

```
<pre class="prettyprint lang-powershell">
REM Create a NuGet package for this project and place the .nupkg file in the project's output directory.
REM If you see this in Visual Studio's Error List window, check the Output window's Build tab for the actual error.
ECHO Creating NuGet package in Post-Build event...
PowerShell -NoProfile -ExecutionPolicy Bypass -Command "& '$(ProjectDir)PowerShell\NuGet\CreateNuGetPackage.ps1' -ProjectFilePath '$(ProjectPath)' -OutputDirectory '$(TargetDir)' -BuildConfiguration '$(ConfigurationName)' -BuildPlatform '$(PlatformName)'"
```
he package will be saved in your bin folder (with the version number in your AssemblyInfo file), for example it will be called:

NorthWind.Logging.0.1.0.4.nupkg

### Package Server

To serve up your packages, you’ll need a package server. [Pro Get](http://inedo.com/proget/pricing) is a great package server with all the features you need, such as users, uploading packages, package feeds and so on. You can start with Pro Get free edition and upgrade as your needs grow.

Pro Get knows when you are uploading a new version of a package and handles all of those details for you. You can upload the packages via the web UI or you can script the package uploads from your build server (i.e. only upload them once all the tests pass).

### Configure Visual Studio

To see your feed in Visual Studio, open up NuGet Package Manager and hit the “Settings” button. You can then add the name and URL of your package source:

![NuGet Add Package Source](/img/2015/07/nuget-add-package-source.png)

Once you save this configuration, your package feed will appear right next to the nuget.org package feed in Visual Studio and you can install any of the packages you have uploaded.

![NuGet Use Package Source](/img/2015/07/nuget-use-package-source.png)

And that’s all there is to it. Creating, publishing and consuming your own NuGet packages to share your code within your organisation – or even further afield.
---
layout: src/layouts/Default.astro
navMenu: false
title: 'Sync your Visual Studio Online and Octopus Deploy version numbers'
pubDate: 2015-09-17T16:55:53+01:00
author:
    - steve-fenton
categories:
    - Automation
tags:
    - octopus
---

I am using a [batch file to update the version number in an AssemblyInfo file](/2012/11/automatically-updating-your-assemblyinfo-with-a-batch-file/) based on the Visual Studio Online build number. It overwrites a file named GloabalAssemblyInfo.cs that is linked to all of the projects in the set. This means the version automatically updates each time the software is built, and it means the components that are built together have the same version number.

Once the packages are built, the packages are uploaded to the Octopus Deploy library, which kicks off a release that is automatically deployed to the Edge Environment. By default, a release will get a version number assigned by Octopus.

If you want to avoid some confusion, you’ll want the Octopus release version number and your Visual Studio Online version number to match. Here is how you can make that happen.

![Sync Visual Studio and Octopus Version Numbers](/img/2015/09/sync-version-numbers.png)

This screen can be found under the project settings tab.

Change the selection from the default (Generate version numbers using a variable template) to the synchronised “Use the version number from an included NuGet package”.

Now select the step that includes the package you want to match. If you aren’t using the same version for all components, you may want this to be the UI version number so the release in Octopus matches whatever version you may show to end users.
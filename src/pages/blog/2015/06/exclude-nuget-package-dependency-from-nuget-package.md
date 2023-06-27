---
title: 'Exclude NuGet package dependency from a NuGet package'
navMenu: false
pubDate: 2015-06-23T18:26:09+01:00
authors:
    - steve-fenton

categories:
    - Programming
tags:
    - Nuget
---

I have been using the [Create New NuGet Package](/blog/2014/08/Share-Your-Own-Code-With-NuGet/) utility for auto-generating NuGet packages for some time. You add this as a NuGet package to your project and It Just Works™. It uses your assembly information to generate the metadata so you don’t even need a nuspec file.

The one thing you will want to ensure is that the “Create New…” package itself is not bundled into the NuGet package you create… otherwise you’ll be turning all your consumers into NuGet packages in some kind of strange copy-left packaging cascade.

To prevent this, you just need to add the development dependency attribute in your packages.config file:

```xml
<?xml version="1.0" encoding="utf-8"?>
<packages>
<package
    id="CreateNewNuGetPackageFromProjectAfterEachBuild"
    developmentDependency="true"
    version="1.8.7"
    targetFramework="net452"
    userInstalled="true"
/>
</packages>
```
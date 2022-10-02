---
layout: src/layouts/Default.astro
navMenu: false
title: 'Cannot compile external modules unless the module flag is provided'
pubDate: 2014-09-05T21:02:12+01:00
author:
    - steve-fenton
interface_sidebarlayout:
    - default
categories:
    - Programming
    - 'Visual Studio'
tags:
    - typescript
---

This is quite a common error when using TypeScript in Visual Studio and there is a little history surrounding this error message:

> “Build: Cannot compile external modules unless the ‘–module’ flag is provided.”

This article describes how to fix this error in several scenarios:

- Using the TypeScript compiler on the command line
- Using Visual Studio 2013 settings
- When it works on your machine, but fails on the build server

If you see this when using the TypeScript compiler on the command line, you can solve it by following the instructions in the error message…

```
<pre class="prettyprint lang-powershell">
tsc --module amd app.ts
```
You can specify either AMD or CommonJS module styles and the compiler will generate the appropriate code for importing modules.

### Visual Studio 2013

The history here is that there were a bunch of settings added to Tools &gt; Options in Visual Studio 2012 – but that meant the settings applied globally, which isn’t desirable.

To solve this, the settings were moved to project-level. Yay.

So if you right-click on your project and select “Properties”, you’ll be able to choose either AMD or CommonJS in the TypeScript build properties:

![TypeScript Build Properties](https://www.stevefenton.co.uk/wp-content/uploads/2015/07/typescript-compile-debug.png)

You can also inject these properties directly into the project file if you find that the “TypeScript Build” tab isn’t available:

```
<pre class="prettyprint lang-xml">
<PropertyGroup Condition="'$(Configuration)' == 'Debug'">
    <TypeScriptRemoveComments>false</TypeScriptRemoveComments>
    <TypeScriptSourceMap>true</TypeScriptSourceMap>
    <TypeScriptNoImplicitAny>True</TypeScriptNoImplicitAny>
    <TypeScriptModuleKind>amd</TypeScriptModuleKind>
</PropertyGroup>
```
### Works For Me… Breaks On The Build Server

It is possible to still encounter the error even after doing all of this (in fact, it is highly likely if you pasted into the project file…) the reason for this is that you can have different settings for Debug and Release mode… so go back to the project properties and use the drop down at the top of the TypeScript Build properties tab to check both Debug and Release settings have the module kind set correctly.

![TypeScript Release Mode Settings](https://www.stevefenton.co.uk/wp-content/uploads/2015/07/typescript-compile-release.png)

As you can see from this screenshot, the Debug settings that we set before correctly set the AMD module type, but the Release settings still show “None”.

By correcting the Release settings, everything will work correctly.
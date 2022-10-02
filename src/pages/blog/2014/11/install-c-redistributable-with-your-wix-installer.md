---
id: 258
layout: src/layouts/Default.astro
title: 'Install C++ redistributable with your WiX Installer'
pubDate: 2014-11-03T20:22:24+00:00
author:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=258'
permalink: /2014/11/install-c-redistributable-with-your-wix-installer/
interface_sidebarlayout:
    - default
categories:
    - Automation
tags:
    - wix
---

If you are installing something with a dependency that needs a C++ redistributable, your best bet is to make sure your installer supplies that dependency.

This is pretty simple to do as there are merge modules for the C++ redistributable (and they are likely to already be on your computer…)

You will find the merge modules in a folder such as:

C:\\Program Files (x86)\\Common Files\\Merge Modules

Follow these steps to add the C++ redistributable to your WiX installer.

### 1. Merge Modules

Get the merge modules and put them somewhere that WiX can reliably pick them up. In this example, we have added the merge module to a “MergeModules” folder in the source project and set it to “Copy if Newer”, which results it in being placed in the bin folder on build (bin\\MergeModules\\Microsoft\_VC110\_CRT\_x86.msm).

In this case, it is the 2010 version, but there are version for older and newer version of the C++ redistributable in the Merge Modules folder mention earlier.

### 2. DirectoryRef Merge Element

You add the Merge element to a DirectoryRef element in your WiX project. The example below is nested as Product &gt; DirectoryRef &gt; Merge.

```
<pre class="prettyprint lang-xml">
<DirectoryRef Id="TARGETDIR">
    <Merge Id="VCRedist" 
           SourceFile="$(var.MyProject.TargetDir)MergeModules\Microsoft_VC110_CRT_x86.msm" 
           DiskId="1" 
           Language="0"/>
</DirectoryRef>
```

### 3. Feature MergeRef Element

The feature element includes the merge module in your install (and in this case hides it from any feature list you present in the installation UI – it wouldn’t be good if it were to be de-selected!) Again, the nesting is Product &gt; Feature &gt; MergeRef.

```
<pre class="prettyprint lang-xml">
<Feature Id="VCRedist" 
         Title="Visual C++ 8.0 Runtime" 
         AllowAdvertise="no" 
         Display="hidden" 
         Level="1">
    <MergeRef Id="VCRedist"/>
</Feature>
```

### Notes

If you install the C++ redistributable manually, it will appear under Programs and Features (because you used an installer and can therefore uninstall it easily). This is not a good method of checking that your installer has correctly installed the C++ redistributable dependency, because it is actually a part of your installer and won’t be listed separately. You’ll notice this because your program will run fine even though it looks like C++ redistributable is not installed if you view the installed program list.
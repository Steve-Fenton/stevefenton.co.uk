---
layout: src/layouts/Default.astro
navMenu: false
title: 'Open Visual Studio with Source Control Explorer open'
pubDate: 2016-10-11T15:12:28+01:00
authors:
    - steve-fenton
categories:
    - 'Visual Studio'
tags:
    - .net
    - ide
---

If you find yourself constantly opening Source Control Explorer, you may want to use this handy shortcut to opening Visual Studio with the Source Control Explorer open, instead of the Start Page.

Open the properties for your Visual Studio shortcut and change this:

```
<pre class="prettyprint lang-bash">"C:\Program Files (x86)\Microsoft Visual Studio 14.0\Common7\IDE\devenv.exe"
```
And change it by adding the command flag shown below:

```
<pre class="prettyprint lang-bash">"C:\Program Files (x86)\Microsoft Visual Studio 14.0\Common7\IDE\devenv.exe" /Command View.TfsSourceControlExplorer
```
Now when you open Visual Studio you’ll be able to get straight to work.
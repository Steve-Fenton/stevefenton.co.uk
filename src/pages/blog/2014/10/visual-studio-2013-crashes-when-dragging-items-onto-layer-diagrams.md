---
layout: src/layouts/Default.astro
navMenu: false
title: 'Visual Studio 2013 crashes when dragging items onto layer diagrams'
pubDate: 2014-10-10T20:41:59+01:00
authors:
    - steve-fenton
interface_sidebarlayout:
    - default
categories:
    - 'Visual Studio'
tags:
    - vs2013
    - wix
---

This bug is a gateway to a whole load of [yak shaving](/Content/Blog/Date/201408/Blog/The-Many-Manifestations-of-Yak-Shaving/). You open a layer diagram in Visual Studio 2013, drag an item from your solution explorer (like you have done a hundred times before) and \*bang\* Visual Studio crashes. You retry and get exactly the same result.

![Visual Studio Crash](/img/2015/07/VisualStudioCrash.png)

This may not be the answer for everyone, but it was the answer for me – and I suspect will be the answer for a number of people in the future who would like to avoid the elongated process I undertook to discover it.

Layer diagrams and WiX projects won’t play nicely together.

If you have a WiX project in your solution, it is probably causing the crash when you drag items onto your layer diagram.

The fix is simple: *right-click on the WiX project and select “Unload project”*. You can now safely do your diagramming. Once you are done, you can reload the WiX project and carry on as normal.

You’re welcome.
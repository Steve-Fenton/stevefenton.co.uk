---
title: Automatically fix your namespaces
navMenu: false
pubDate: 2022-01-05
modDate: 2022-10-16
keywords: visual studio,namespaces,automated
description: 
authors:
    - steve-fenton
categories:
    - Programming
    - Visual Studio
tags:
    - C-Sharp
---

It is pretty common to clean up a project or solution to move the class files into a better-organised folder structure. When you do this, the namespaces often reflect their old location, not the better new location you moved them to. The task of manually updating the namespace and then fixing all of the callers to update using statements was a bit of a pain.

In Visual Studio 2022, a new feature will automatically fix this for you.

Right-click on a project or solution and select **Sync namesapces**. All of the namespaces will be updated to reflect the folder structure – and all of the references will be fixed as part of the process.

:::figure{.inset}
:img{src="/img/2022/01/sync-namespaces.jpg" alt="Sync namespaces" loading="lazy"}
::figcaption[Sync namespaces]
:::

This is the kind of change you’ll be committing after running this tool.

:::figure{.inset}
:img{src="/img/2022/01/updated-namespace.jpg" alt="Updated namesapces" loading="lazy"}
::figcaptionp[Updated namespaces]
:::

You may want to avoid using this feature on projects where you deliberately use namespaces that don’t match the folder structure or on MVC projects.

If in doubt, try it without any other local changes so you can just ditch your attempt if it causes any problems (they will manifest as build errors).
---
layout: src/layouts/Default.astro
title: 'Visual Studio 2015 diagnostic tools'
navMenu: false
pubDate: 2015-07-23T07:30:45+01:00
authors:
    - steve-fenton
categories:
    - 'Visual Studio'
tags:
    - 'Diagnostic Tools'
---

Before I get going on this… bear in mind that all of the screen shots below are from Visual Studio Professional (not Enterprise). One of the big changes in Visual Studio 2015 is that the Professional edition is now awesome. The only significant features you’ll miss are code coverage and architecture tools.

So when you debug now, you’ll see you have some diagnostic tools that show you memory usage and CPU usage.

:::div{.inset}
:img{src="/img/2015/07/diagnostic-tools.png" alt="Diagnostic Tools"}
:::

The memory graph will be overlaid with a yellow pin each time garbage collection runs. This lets you spot any strange behaviour in the GC department – especially as it lines up on the CPU graph too. It also marks snapshots, which I’ll explain in a moment:

:::div{.inset}
:img{src="/img/2015/07/memory-garbage-collection-and-snapshots.png" alt="Memory - Garbage Collection - Snapshots" loading="lazy"}
:::

At any point, you can hit the “Take Snapshot” button underneath the graphs in the Memory Usage tab. This will grab a whole bunch of information and supply a handy comparison with the previous snapshot.

:::div{.inset}
:img{src="/img/2015/07/memory-usage-snapshots.png" alt="Memory Usage - Snapshots" loading="lazy"}
:::

You can click on the snap shot and view the managed memory, which summarises size and counts. Select any item to drill into the information in the bottom half of the split view. You can click on the screenshot below if you would like to see a full-screen version.

:::div{.inset}
:img{src="/img/2015/07/heap-inspection.png" alt="Heap Inspection" loading="lazy"}
:::

These diagnostic tools take a lot of the guesswork and mystery out of memory usage in your application – it is worth making yourself familiar with these new tools so you can quickly track down problems using them later on.
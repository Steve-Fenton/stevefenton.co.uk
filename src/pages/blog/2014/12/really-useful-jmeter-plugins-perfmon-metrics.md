---
layout: src/layouts/Default.astro
navMenu: false
title: 'Really useful JMeter plugins: PerfMon metrics'
pubDate: 2014-12-24T18:37:07+00:00
authors:
    - steve-fenton

categories:
    - Automation
tags:
    - jmeter
---

If you are running JMeter tests against software running on a computer or server, the chances are you’ll be manually matching your JMeter results with a graph of CPU or Memory Usage from the server.

You can make this process a whole lot easier using the PerMon Metrics Collector, which is a listener that communicates with a small PerfMon service on each machine.

You need two things to make this work (over and above JMeter itself). The first is the jp@gc plugins for JMeter, which are part of the [“Extras with Libs” set of plugins on JMeter-Plugins](http://jmeter-plugins.org/downloads/all/). If you have read my JMeter posts before, you have probably already downloaded this. The second is the PerfMon Agent, which is a little Java service that runs on the machine you want information from – this is available as a zip file from the same link (currently titled “ServerAgent-2.2.1.zip”).

You start the PerfMon Agent by opening the “startAgent.bat” (or “startAgent.sh”) file that is included in the zip file. You need to run this on all servers you want to collect data from.

Once the PerfMon Agent is running, you can collect data using the PerMon Metrics Collector plugin.

![JMeter Perfmon Listener](/img/2015/07/jmeter-perfmon-listener.png)

You can use “Add Row” to create lines on the graph, using a row per server/metric. In the example above, I’m collecting the CPU data from localhost and the Memory data from localhost.

You can use the “Rows” tab to filter the collected data if you want to see, for example, just the CPU data on its own.

The available PerfMon metrics include:

- CPU
- Memory
- Swap
- Disks I/O
- Network I/O
- TCP
- JMX
- EXEC
- TAIL
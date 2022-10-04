---
layout: src/layouts/Default.astro
title: 'Performance data for this service will not be available'
navMenu: false
pubDate: 2015-12-29T11:01:35+00:00
authors:
    - steve-fenton
categories:
    - Windows
tags:
    - exctrlst
    - Monitoring
    - perflib
---

Here is a pretty common piece of static interference you may find in your event log. It is commonly reported against the background intelligent transfer service:

> Application/Microsoft-Windows-Perflib
> 
> The Open Procedure for service “BITS” in DLL “C:\Windows\System32\bitsperf.dll” failed. Performance data for this service will not be available. The first four bytes (DWORD) of the Data section contains the error code.

You can remove this noise from your logs by switching off performance counters for BITS (only a problem if you are genuinely interested in them!)

There is a graphical tool for managing performance counters called [Extensible Performance Counter List](https://technet.microsoft.com/en-us/library/cc737958%28v=ws.10%29.aspx)! The tool lists all available counters and allows you to tick or untick each one. As you change the tick box, it instantly updates the registry for you.

The tool can be found here: `%Program Files%\Resource Kit\exctrlst.exe` and if you don’t have it here, you can install it from the [Microsoft Extensible Performance Counter List download page](http://download.microsoft.com/download/win2000platform/exctrlst/1.00.0.1/nt5/en-us/exctrlst_setup.exe).

:img{src="/img/2015/12/exctrlst.png" alt="exctrlst.exe" loading="lazy"}
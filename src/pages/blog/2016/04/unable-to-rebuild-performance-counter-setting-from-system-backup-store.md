---
title: 'Unable to rebuild performance counter setting from System Backup Store'
navMenu: false
pubDate: 2016-04-16T10:20:41+01:00
authors:
    - steve-fenton
categories:
    - Programming
    - Windows
tags:
    - PowerShell
---

I was attempting to rebuild performance counters on a Windows Server 2012 machine, using the following command in PowerShell (with elevated rights):

```powershell
lodctr /r
```

But kept getting the error:

> Error: Unable to rebuild performance counter setting from system backup store, error code is 5PS

The simple answer… running the same command in an elevated command prompt worked just fine!

If you still have a problem, you may need to re-install .NET with the version reporting problems with performance counters (usually .NET 2 has this issue).

```
C:\Windows\system32>c:\Windows\Microsoft.NET\Framework\v2.0.50727\aspnet_regiis.exe -i
```

Then re-try the lodctr command – and you should see:

> Info: Successfully rebuilt performance counter setting from system backup store
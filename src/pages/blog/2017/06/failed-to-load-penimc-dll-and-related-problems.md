---
id: 2090
title: 'Failed to load penimc.dll and related problems'
pubDate: '2017-06-20T10:13:25+01:00'
author: 'Steve Fenton'
layout: post
guid: 'https://www.stevefenton.co.uk/?p=2090'
permalink: /2017/06/failed-to-load-penimc-dll-and-related-problems/
categories:
    - Windows
tags:
    - .net
    - 'windows server'
---

Following on from a series of recent Windows Updates, a couple of our servers had a problem running Server Manager (“Server Manager has stopped working”) and SQL Management Studio (“Failed to Load penimc.dll”).

The details of the Server Manager error were in the event log:

```
<pre class="prettyprint">
Application: ServerManager.exe
Framework Version: v4.0.30319
Description: The process was terminated due to an unhandled exception.
Exception Info: System.DllNotFoundException
   at MS.Win32.Penimc.UnsafeNativeMethods.CreateResetEvent(IntPtr ByRef)
   at System.Windows.Input.PenThreadWorker..ctor()
   at System.Windows.Input.PenThreadPool.GetPenThreadForPenContextHelper(System.Windows.Input.PenContext)
   ...
```

So the Server Manager error and the SQL Management Studio both appear to come from the same area within the world of WPF’s pen/touch/tablet space.

### The fix

Disclaimer: this may not be the only cause of this issue and you should only perform the steps below if you are willing to take on full responsibility for doing so. This is simply what worked in our specific case.

The root cause of this problem on our servers was KB3186539, or “[Microsoft .NET Framework 4.7…](https://support.microsoft.com/en-us/help/3186539/the-microsoft-net-framework-4-7-for-windows-8-1-windows-rt-8-1-and-win)“.

To fix the problem, simply uninstall the patch, then re-apply it using the offline installer.

Full steps below:

1. Open Windows Updates
2. Select “View Update History”
3. Select “To remove an update, see Installed Updated”
4. Locate “Update for Microsoft Windows (KB3186539)”
5. Open the context menu and select “Uninstall”
6. Say “Yes” you are sure you want to uninstall the update
7. When prompted, restart the server
8. [Download the offline installer for KB3186539](https://support.microsoft.com/en-us/help/3186539/the-microsoft-net-framework-4-7-for-windows-8-1-windows-rt-8-1-and-win)
9. Run the installer
10. When prompted, restart the server

You should now find that Server Manager and SQL Management Studio (and any other apps that rely on the correct registration of penimc.dll) are now working.
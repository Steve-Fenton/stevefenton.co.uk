---
layout: src/layouts/Default.astro
navMenu: false
title: 'Logging to Windows Event Log'
pubDate: 2014-10-15T20:37:57+01:00
authors:
    - steve-fenton
interface_sidebarlayout:
    - default
categories:
    - Programming
tags:
    - .net
    - 'csharp'
---

This article is really just one of those snippets of code that you get bored or re-writing again and again! So I have left it here for my future self.

```
<pre class="prettyprint lang-csharp">
var eventLog = new System.Diagnostics.EventLog();
eventLog.Source = "My Awesome Windows Service";
eventLog.Log = "Application";

// Make sure it knows about our event source
((ISupportInitialize)(eventLog)).BeginInit();
if (!EventLog.SourceExists(eventLog.Source))
{
    EventLog.CreateEventSource(eventLog.Source, eventLog.Log);
}

((ISupportInitialize)(eventLog)).EndInit();

// You can now write to the event log
eventLog.WriteEntry("Error message goes here", EventLogEntryType.Error);
```
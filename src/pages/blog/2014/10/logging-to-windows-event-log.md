---
layout: src/layouts/Default.astro
title: 'Logging to Windows Event Log'
navMenu: false
pubDate: 2014-10-15T20:37:57+01:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - .net
    - C-Sharp
---

This article is really just one of those snippets of code that you get bored or re-writing again and again! So I have left it here for my future self.

```csharp
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
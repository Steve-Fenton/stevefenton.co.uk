---
title: 'Debugging your Fitnesse tests'
navMenu: false
pubDate: 2013-10-23T10:42:22+01:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - .net
    - C-Sharp
    - Fitnesse
---

I have been [using Fitnesse with FitSharp to run C# integration tests](/blog/2013/10/using-fitnesse-for-dot-net/) and I can happily state that it took a long time for me to find a scenario where I needed to debug a Fitnesse test. When a test fails it is abundantly clear why so you don’t need to spark up a debugger to tell you the information.

However, I had an instance where it really looked like a collection should contain the value that was being checked and I wanted to see what was in the collection before it was tested.

I’m using Fitnesse with FitSharp (a version of FitSharp I built myself so it could run .NET 4.5 assemblies – but otherwise standard) and there are only a few simple steps to debugging:

- Add a remote\_debug value to the query string
- Attach your debugger to the RunnerW process (FitSharp)
- Press “Go” in the FitSharp window

Here are the details…

First, you add the following query string to your Fitnesse page to start a debugging session: `?responder=test&remote_debug=true`

This will kick off a little FitSharp test window with a “Go” button. This means you can attach your Visual Studio debugger to the “RunnerW” process before the test starts. You can also do this remotely if Fitnesse is running on a server.

Once you have attached the debugger, hit “Go” in the FitSharp window and the test will proceed.
---
id: 495
title: 'Debugging your Fitnesse tests'
pubDate: '2013-10-23T10:42:22+01:00'
author: 'Steve Fenton'
layout: post
guid: 'https://www.stevefenton.co.uk/?p=495'
permalink: /2013/10/debugging-your-fitnesse-tests/
interface_sidebarlayout:
    - default
categories:
    - Programming
tags:
    - .net
    - 'c#'
    - fitnesse
---

I have been [using Fitnesse with FitSharp to run C# integration tests](https://www.stevefenton.co.uk/2013/10/Using-Fitnesse-For-Dot-Net/) and I can happily state that it took a long time for me to find a scenario where I needed to debug a Fitnesse test. When a test fails it is abundantly clear why so you don’t need to spark up a debugger to tell you the information.

However, I had an instance where it really looked like a collection should contain the value that was being checked and I wanted to see what was in the collection before it was tested.

I’m using Fitnesse with FitSharp (a version of FitSharp I built myself so it could run .NET 4.5 assemblies – but otherwise standard) and there are only a few simple steps to debugging:

- Add a remote\_debug value to the query string
- Attach your debugger to the RunnerW process (FitSharp)
- Press “Go” in the FitSharp window

Here are the details…

First, you add the following query string to your Fitnesse page to start a debugging session: `?responder=test&remote_debug=true`

This will kick off a little FitSharp test window with a “Go” button. This means you can attach your Visual Studio debugger to the “RunnerW” process before the test starts. You can also do this remotely if Fitnesse is running on a server.

Once you have attached the debugger, hit “Go” in the FitSharp window and the test will proceed.
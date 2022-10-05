---
layout: src/layouts/Default.astro
title: 'Find the process Id for an application pool'
navMenu: false
pubDate: 2011-03-24T19:44:39+00:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - IIS
---

If you have lots of web applications running under lots of different application pools, you might want to find out the particular W3WorkerProcess of one of these application pools. This is usually when you want to start a remote-debugging session against a particular application pool.

The great news is, you can find out the information really easily using command prompt (or even better, put this in a batch file on the server you want to find out the process ids for).

Here is the contents of my batch file, in case you need to do the same.

```powershell
cd c:\WINDOWS\system32\
iisapp.vbs
pause
```
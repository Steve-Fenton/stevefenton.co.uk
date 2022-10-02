---
id: 969
title: 'Find the process Id for an application pool'
pubDate: '2011-03-24T19:44:39+00:00'
author: 'Steve Fenton'
layout: post
guid: 'https://www.stevefenton.co.uk/?p=969'
permalink: /2011/03/find-the-process-id-for-an-application-pool/
interface_sidebarlayout:
    - default
categories:
    - Programming
tags:
    - iis
---

If you have lots of web applications running under lots of different application pools, you might want to find out the particular W3WorkerProcess of one of these application pools. This is usually when you want to start a remote-debugging session against a particular application pool.

The great news is, you can find out the information really easily using command prompt (or even better, put this in a batch file on the server you want to find out the process ids for).

Here is the contents of my batch file, in case you need to do the same.

```
<pre class="prettyprint lang-powershell">
cd c:\WINDOWS\system32\
iisapp.vbs
pause
```
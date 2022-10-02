---
id: 1945
layout: src/layouts/Default.astro
title: 'Run a console application with PowerShell'
pubDate: 2016-09-29T11:56:11+01:00
author:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=1945'
permalink: /2016/09/run-a-console-application-with-powershell/
categories:
    - Programming
tags:
    - console
    - octopus
    - powershell
---

I have a DbUp console application that needed to be executed with PowerShell (in my case via Octopus Deploy – but this works in any case), but I wanted to be able to get the result when executing it. By default, running the “Database.exe” from PowerShell will open a new console window for the application to run, return immediately, and leave you with no output or error codes.

To solve this, you can use Start-Process with a few flags in order to get the output written into your PowerShell window, and to wait for completion before getting the exit code:

```
<pre class="prettyprint lang-powershell">$databaseProcess = Start-Process Database.exe -PassThru -Wait -NoNewWindow

exit $databaseProcess.ExitCode
```
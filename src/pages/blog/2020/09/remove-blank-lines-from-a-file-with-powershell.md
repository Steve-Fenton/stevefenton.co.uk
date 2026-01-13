---
title: Remove blank lines from a file with PowerShell
navMenu: false
pubDate: 2020-09-11T08:14:11+01:00
authors:
    - steve-fenton
categories:
    - Automation
    - Programming
tags:
    - PowerShell
description: Quickly remove blank lines from files using a simple PowerShell one-liner to ensure data import compatibility.
---

When importing a file full of data into a test system, I discovered that the CSV library I was using to do all the work was stopping when it reached a blank line. That makes sense, it thinks the data has ended. On inspection, I found quite a lot of blank lines, so there was no way I was going to fix them all manually. Instead of spending five minutes manually removing lines, I spent five minutes writing this PowerShell to do it… and I’ve made it run each time the test file is created.

We have a pretty simple command-triplet here, `Get-Content` sends the lines into the `Where-Object` filter, which only returns non-blank lines for `Set-Content` to drop in the output file.

```powershell
(Get-Content $inputFile) | Where-Object {$_.trim() -ne "" } | Set-Content $outputFile
```
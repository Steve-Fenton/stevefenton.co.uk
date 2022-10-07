---
layout: src/layouts/Default.astro
title: Run multiple PowerShell scripts from a Co-ordinating PowerShell Script
navMenu: false
pubDate: 2020-04-12T07:50:45+01:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - PowerShell
---

Having put together some individual scripts that ripped data out of an Excel spreadsheet, I decided to co-ordinate them with a co-ordinating PowerShell script that would contain my variables and call out to neat little scripts to do work. PowerShell gets tricky to read when it gets big, so I prefer to have a couple of smaller files doing specific things.

Here is an example of the master script, which has the variables and makes all the co-ordinating calls.

```powershell
$sourceFile = "C:\Temp\data.xlsx"
$csvDestination = "C:\Temp\data.csv"
$textDestination = "C:\Temp\Selenium\Domains.txt"
$katyleDestination = "C:\Temp\Katelyn\Domains.txt"

."./Create-Temp-File.ps1"

."./Export-To-Csv.ps1"

."./Export-Urls-For-Selenium.ps1"

."./Copy-Urls-For-Katelyn.ps1"
```

You’ll see that I’ve popped all the changeable stuff at the top of the file, then I make dot-sourcing calls out to each file, which brings them into scope – thus allowing them to use the variables I declared.

The files I call out to can then take care of a single thing, like [copying excel data to a CSV]\(/blog/2020/04/copy-excel-to-csv-with-powershell/), or [extracting data from a single column in Excel]\(/blog/2020/04/extract-an-excel-column-to-a-text-file-with-powershell/). These sub-files won’t need to change because I’ve pulled all the “changeable bits” up into my master file.
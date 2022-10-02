---
id: 12980
layout: src/layouts/Default.astro
title: 'Upload all files in a folder to FTP'
pubDate: 2022-06-08T21:06:33+01:00
author:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=12980'
permalink: /2022/06/upload-all-files-in-a-folder-to-ftp/
categories:
    - Programming
tags:
    - powershell
---

This is the second old-school post this week. Hey, I’m clearing the decks of some odd stuff that I had to do. Today, it’s uploading all files in a folder (but not sub-folders) to FTP, if they have been updated in the past 24 hours.

There’s not much to explain here. It’s a simple `System.Net.WebClient` doing the work, with a credential added for the username and password. The source folder is searched for non-directory entries using `Get-ChildItem` and passing into `Where-Object` to filter by last write time. Each match is moved up to the FTP folder with the same name.

```
<pre class="prettyprint lang-powershell">
$source = '../src'
$server = 'ftp://0.0.0.0'
$date = (Get-date).AddDays(-1)

Write-Host $date

# Create a web client with credentials
$webclient = New-Object System.Net.WebClient 
$webclient.Credentials = New-Object System.Net.NetworkCredential('MyUserName','MyPassword')  

# Find matching files (only files, not folders) | then filter by last write time
$files = Get-ChildItem $source -Attributes !Directory | Where-Object { $_.LastWriteTime -ge $date }

# Upload 'em all
foreach ($file in $files)
{
    $path = "$server/www/destinationfolder/$file"

    Write-Host $file.FullName $path

    $webclient.UploadFile($path, $file.FullName)
} 

$webclient.Dispose()
```
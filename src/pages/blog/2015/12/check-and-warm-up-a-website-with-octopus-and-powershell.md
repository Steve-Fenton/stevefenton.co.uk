---
id: 1546
title: 'Check and warm up a website with Octopus Deploy and PowerShell'
pubDate: '2015-12-02T06:00:59+00:00'
author: 'Steve Fenton'
layout: post
guid: 'https://www.stevefenton.co.uk/?p=1546'
permalink: /2015/12/check-and-warm-up-a-website-with-octopus-and-powershell/
categories:
    - Automation
    - Programming
tags:
    - octopus
    - powershell
---

There are two reasons you might want to add this step to your Octopus Deploy project. The first is to perform a basic check that your newly deployed website or API is working and the second is to warm it up (although there are built-in IIS utilities for this too).

I have defined a variable in my Octopus Deploy project called TestUrl, which stores the appropriate address to test for each website (in many cases, this may be per-environment, but in my case I have specific URLs for each machine in a web farm… I want to know the machine I just deployed to is working, not just *a* machine in the farm is working!)

```
<pre class="prettyprint lang-powershell">Write-Output "Starting"

$MaxAttempts = 5

If (![string]::IsNullOrWhiteSpace($TestUrl)) {
    Write-Output "Making request to $TestUrl"
    
    Try {
        $stopwatch = [Diagnostics.Stopwatch]::StartNew()
        # Allow redirections on the warm up
        $response = Invoke-WebRequest -UseBasicParsing $TestUrl -MaximumRedirection 10
        $stopwatch.Stop()
        $statusCode = [int]$response.StatusCode
        Write-Output "$statusCode Warmed Up Site $TestUrl in $($stopwatch.ElapsedMilliseconds)s ms"
    } catch {
        $_.Exception|format-list -force
    }
    
    For ($i = 0; $i -lt $MaxAttempts; $i++) {
        try {
            Write-Output "Checking Site"
            $stopwatch = [Diagnostics.Stopwatch]::StartNew()
            # Don't allow redirections on the check
            $response = Invoke-WebRequest -UseBasicParsing $TestUrl -MaximumRedirection 0
            $stopwatch.Stop()
            
            $statusCode = [int]$response.StatusCode
            
            Write-Output "$statusCode Second request took $($stopwatch.ElapsedMilliseconds)s ms"
            
            If ($statusCode -ge 200 -And $statusCode -lt 400) {
                break;
            }
            
            Start-Sleep -s 2
        } catch {
            $_.Exception|format-list -force
        }
    }

    If ($statusCode -ge 200 -And $statusCode -lt 400) {
        # Hooray, it worked
    } Else {
        throw "Warm up failed for " + $TestUrl
    }
} Else {
    Write-Output "No TestUrl configured for this machine."
}

Write-Output "Done"
```

I have placed this script in an Execute Script step at the end of the deployment, and the deployment will be marked as “failed” if the website cannot be reached.

You can extend the call to [Invoke-WebRequest to include certificates, credentials, and even data](https://technet.microsoft.com/en-us/library/hh849901.aspx).
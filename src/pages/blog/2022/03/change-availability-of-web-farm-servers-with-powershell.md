---
title: Change availability of web farm servers with PowerShell
navMenu: false
pubDate: 2022-03-02
modDate: 2022-10-15
keywords: web farm,servers,availability,powershell
description: Find out how to use PowerShell to control IIS and ARR load-balanced web farms.
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - ARR
    - IIS
    - PowerShell
---

I’m running an [IIS site with ARR as a load balancer](/blog/2022/02/load-balancing-with-iis-and-application-request-routing/). When load-balancing requests between servers, you often want to take them in and out of balance. For example, during your deployment process.

A PowerShell script can let you manage load-balancing as part of your deployment automation.

## PowerShell script for ARR

The below script takes the first server out of balance by setting `enabled = $false`. The other servers are left in. You could make this more complex by making the script conditional rather than hard-coding the values. A tool like Octopus Deploy will let you substitute these values dynamically.

```powershell
$serverFarm = 'Sample'

Set-WebConfiguration -PSPath 'MACHINE/WEBROOT/APPHOST' `
    -Filter "webFarms/webFarm[@name='$serverFarm']" `
    -Value @(
        @{ address = '192.168.236.121'; enabled = $false },
        @{ address = '192.168.236.122'; enabled = $true },
        @{ address = '192.168.236.123'; enabled = $true },
        @{ address = '192.168.236.124'; enabled = $true },
        @{ address = '192.168.236.125'; enabled = $true }
    )
```

You need to provide the complete list of servers each time, with just the `enabled` flag updated.

## Changing other servers

You can change which servers are in or out of balance by repeating the script with the appropriate flags set. The script below sets all servers active, except the second one:

```powershell
$serverFarm = 'Sample'

Set-WebConfiguration -PSPath 'MACHINE/WEBROOT/APPHOST' `
    -Filter "webFarms/webFarm[@name='$serverFarm']" `
    -Value @(
        @{ address = '192.168.236.121'; enabled = $true },
        @{ address = '192.168.236.122'; enabled = $false },
        @{ address = '192.168.236.123'; enabled = $true },
        @{ address = '192.168.236.124'; enabled = $true },
        @{ address = '192.168.236.125'; enabled = $true }
    )
```

And we can put everything back in balance with the below script:

```powershell
$serverFarm = 'Sample'

Set-WebConfiguration -PSPath 'MACHINE/WEBROOT/APPHOST' `
    -Filter "webFarms/webFarm[@name='$serverFarm']" `
    -Value @(
        @{ address = '192.168.236.121'; enabled = $true },
        @{ address = '192.168.236.122'; enabled = $true },
        @{ address = '192.168.236.123'; enabled = $true },
        @{ address = '192.168.236.124'; enabled = $true },
        @{ address = '192.168.236.125'; enabled = $true }
    )
```

## Summary

Explicitly setting the status of servers is better than depending on automatic failover. You can take a server out of balance and provide a short delay to allow in-flight requests to complete, and no requests will fail or re-dispatch.
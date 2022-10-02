---
layout: src/layouts/Default.astro
navMenu: false
title: 'Change availability of web farm servers with PowerShell'
pubDate: 2022-03-02T20:20:08+00:00
author:
    - steve-fenton
categories:
    - Programming
tags:
    - arr
    - iis
    - powershell
---

I’m running an [IIS site with ARR as a load balancer](/2022/02/load-balancing-with-iis-and-application-request-routing/). It’s pretty common to want to take a server out of balance or to put it back in using a script. The below script takes the first server out of balance by setting `enabled = $false`. The other servers are left in. You could make this more complex by making the script conditional rather than hard-coding the values.

```
<pre class="prettyprint lang-powershell">
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
You need to provide the complete list of servers each time, with just the `enabled` flag updated. So, to put the first server back into balance and remove the second one, it just needs to be changed to:

```
<pre class="prettyprint lang-powershell">
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
And we can put everything back in balance with:

```
<pre class="prettyprint lang-powershell">
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
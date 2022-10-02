---
layout: src/layouts/Default.astro
navMenu: false
title: 'Reconfigure Octopus Deploy on a cloned VM'
pubDate: 2016-02-22T09:24:21+00:00
authors:
    - steve-fenton
categories:
    - Automation
tags:
    - octopus
    - powershell
---

[![Exploring Octopus Deploy](/img/2015/07/exploring-octopus-deploy.jpg)](/publications/exploring-octopus-deploy/)If you clone a VM that has an existing Octopus Deploy tentacle running, you’ll find that you’ll have a problem with a thumbprint clash.

All you need to do is generate a new thumprint using tentacle.exe. You can do this using a command window, or PowerShell…

```
<pre class="prettyprint lang-powershell">cd "c:\Program Files\Octopus Deploy\Tentacle"
.\tentacle.exe new-certificate
```
This command will output a message saying “A new certificate has been generated and installed”, and will tell you the thumbprint. You can verify this change by opening the Tentacle Manager to see the new thumbprint.

Restart the tentacle to ensure it is using the new thumbprint before you pair it with your Octopus Server.
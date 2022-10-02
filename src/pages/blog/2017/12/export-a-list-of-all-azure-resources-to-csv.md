---
layout: src/layouts/Default.astro
navMenu: false
title: 'Export a list of all Azure resources to CSV'
pubDate: 2017-12-04T13:43:33+00:00
authors:
    - steve-fenton
categories:
    - Azure
---

There’s a handy PowerShell command that you can use to export a list of all Azure resources to a CSV. It is part of the [AzureRM PowerShell](https://docs.microsoft.com/en-gb/powershell/module/azurerm.resources/?WT.mc_id=DT-MVP-5002938) module, which you can [find on GitHub along with installers](https://github.com/Azure/azure-powershell/releases) to get you on the latest version.

### Azure login

There’s a two-step process for exporting the data, the first step is to login to Azure:

```
<pre class="prettyprint lang-ps">
Login-AzureRmAccount
```
### Get Azure resources

And the second step is to get the resources and pipe them into a CSV in the location of your choice:

```
<pre class="prettyprint lang-ps">
Get-AzureRmResource | Export-CSV C:\temp\azure-resources.csv
```
This gives you a big list of everything you have, including names, types, resource groups, locations.
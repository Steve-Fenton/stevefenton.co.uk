---
layout: src/layouts/Default.astro
title: Query pull request history in Azure DevOps with PowerShell and the REST API
navMenu: false
pubDate: 2021-11-30T20:27:29+00:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - PowerShell
---

I needed to get a history of completed pull requests from Azure DevOps and the simplest way to do this was to call the Azure DevOps REST API from a PowerShell script. The examples below assume you have already created a Personal Access Token, which you can get from the User Settings menu in Azure DevOps.

:img{src="/img/2021/11/personal-access-token.jpg" alt="Obtain a Personal Access Token from the User Settings / Personal access tokens menu"}

## Get your repository ID

You’ll need your repository ID, which you can look up using the REST API as shown below. This will output a list of repositories, so you can choose the appropriate one.

```powershell
$AzureDevOpsPAT = "*********************"
$OrganizationName = "fabricam"

$AzureDevOpsAuthenicationHeader = @{Authorization = 'Basic ' + [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes(":$($AzureDevOpsPAT)")) }

$OrgUri = "https://dev.azure.com/$($OrganizationName)/" 
$FullUri = $OrgUri + '_apis/git/repositories/?api-version=6.1-preview'

(Invoke-RestMethod -Uri $FullUri -Method get -Headers $AzureDevOpsAuthenicationHeader).value | ConvertTo-Json | Write-Host
```

## Get your pull requests

We’ll assume we found the repository ID and it was `a00a0000-00aa-000a-a0aa-000aa0a00000`. We can now query the pull requests using the below script. In the example I have set the `searchCriteria.status` query parameter to look only at “completed” pull requests. I am also using the `$top` query parameter to grab the last 500 pull requests. You can use both `$skip` and `$top` to effectively page through results, for example: `&$skip=100&$top=50`.

You might see the below error, which can be solved by the PowerShell tip that follows…

> TF401019: The Git repository with name or identifier 500 does not exist or you do not have permissions  
> for the operation you are attempting

PowerShell Tip! When using `$skip` and `$top` you need to do so inside single-quoted strings in PowerShell; if you use double-quoted strings, PowerShell will think these are variables that needs to be substituted in the string.

```powershell
$AzureDevOpsPAT = "*********************"
$OrganizationName = "fabricam"
$RepositoryId = 'a00a0000-00aa-000a-a0aa-000aa0a00000'

$AzureDevOpsAuthenicationHeader = @{Authorization = 'Basic ' + [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes(":$($AzureDevOpsPAT)")) }

$OrgUri = "https://dev.azure.com/$($OrganizationName)/" 
$FullUri = $OrgUri + '_apis/git/repositories/' + $RepositoryId + '/pullrequests/?searchCriteria.status=completed&api-version=6.1-preview&$top=500'

(Invoke-RestMethod -Uri $FullUri -Method get -Headers $AzureDevOpsAuthenicationHeader).value | ConvertTo-csv -NoTypeInformation -Delimiter "`t" | Out-File C:\Temp\PRs.csv
```

The result of this script is a CSV file with all of the pull request data.
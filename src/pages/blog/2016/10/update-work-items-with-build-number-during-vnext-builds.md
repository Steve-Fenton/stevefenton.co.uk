---
id: 1950
title: 'Update work items with build number during vNext builds'
pubDate: '2016-10-13T12:23:49+01:00'
author: 'Steve Fenton'
layout: post
guid: 'https://www.stevefenton.co.uk/?p=1950'
permalink: /2016/10/update-work-items-with-build-number-during-vnext-builds/
categories:
    - Automation
    - 'Visual Studio'
tags:
    - builds
    - powershell
    - vsts
---

In the days of XAML Builds in TFS, the build would rather handily update the work item with the appropriate “Integration Build” value… so you knew which release would include your fix. Happy days.

Along came vNext builds in TFS / Visual Studio Online / Visual Studio Team Services, which solved all of the pain of setting up and maintaining builds, but which also didn’t update the “Integration Build” value on the work items.

The good news is, we can handle this in vNext builds using the [Team Services REST API for Work Items](https://www.visualstudio.com/en-us/docs/integrate/api/wit/work-items).

Here’s how…

### Security

You can generate a special token to use for this – so you don’t need to use your actual account.

- Click your name when logged into the VSTS
- Choose “Security”
- Select “Personal Access Tokens”
- Select “Add”
- Call it “Update Integration Build” and select the Build (read) and Work items (read and write) scopes
- Click “Create Token”

You’ll use this token to talk to the REST API.

### PowerShell script

You can either add the following PowerShell script into your code repository, on use the inline option to add it directly to the build task.

NOTE: If your work items are not in the same collection as your code and build, you can still follow along using [this alternate PowerShell script](#alternate-powershell-script).

```
<pre class="prettyprint lang-powershell">
param(
    $Username,
    $Password
)

$token = ("{0}:{1}" -f $Username, $Password)
$tokenBytes = [System.Text.Encoding]::UTF8.GetBytes($token)
$authorization = [System.Convert]::ToBase64String($tokenBytes)
$headers = @{Authorization=("Basic {0}" -f $authorization)}

[String] $collectionAddress = "$env:SYSTEM_TEAMFOUNDATIONCOLLECTIONURI"
[String] $project = "$env:SYSTEM_TEAMPROJECT"
[String] $buildId = "$env:BUILD_BUILDID"
[String] $buildNumber = "$env:BUILD_BUILDNUMBER"

Try
{
    $WorkItemAddress = $collectionAddress + $project + "/_apis/build/builds/" + $buildId + "/workitems?api-version=2.0"
    Write-Output "Getting Work Items from $WorkItemAddress"

    $Response = Invoke-RestMethod -Uri $WorkItemAddress -ContentType "application/json" -Headers $headers -Method GET

    $workItemCount = $Response.count
    $workitemUrlArray = $Response.value

    Write-Output "$workItemCount work items are available to update"

    for($i = 0; $i -lt $workItemCount ; $i++)
    {
        Write-Output "Updating item $i with build $buildNumber"  $workitemUrlArray[$i].url
        $body = '[{ "op": "add", "path": "/fields/Microsoft.VSTS.Build.IntegrationBuild", "value":"' + $buildNumber + '"}]'
        Write-Output $body
        $workItemUpdateAddress = $workitemUrlArray[$i].url + "?api-version=1.0"

        Invoke-RestMethod -Uri $workItemUpdateAddress -Body $body -ContentType "application/json-patch+json" -Headers $headers -Method PATCH
    }
}
Catch
{
    Write-Output $_.Exception | format-list -force
}
```

This script will dynamically obtain the base addresses of your team collection and will get the work items related to the build, and then update the “Integration Build” value.

### Build variables

Edit your vNext build and choose the “Variables” section.

Add a variable named “VstsUsername” with your username and a variable named “VstsPassword” with your newly minted token.

![vNext Build Variables](https://www.stevefenton.co.uk/wp-content/uploads/2016/10/vnext-build-variables.png)

### PowerShell build step

Now you can add a PowerShell build step to your vNext build, calling the PowerShell script and passing the VSTS Username and Password.

![vNext PowerShell Step](https://www.stevefenton.co.uk/wp-content/uploads/2016/10/vnext-powershell-step.png)

### Magic

The next time a build triggers for a changeset that has associated work items, those work items will be updated with the build number…

![vNext Automatic Build Number](https://www.stevefenton.co.uk/wp-content/uploads/2016/10/vnext-automatic-build-number.png)

You can make that visible on your board, it appears in the work item details, and you can also use it in your queries and reports.

#### Code and Work Items in Different Collections

This slightly more looping example will traverse collections to update the work item even when the code and build are in another collections – as long as they are part of the same account.

```
<pre class="prettyprint lang-powershell">
param(
    $Username,
    $Password
)

$token = ("{0}:{1}" -f $Username, $Password)
$tokenBytes = [System.Text.Encoding]::UTF8.GetBytes($token)
$authorization = [System.Convert]::ToBase64String($tokenBytes)
$headers = @{Authorization=("Basic {0}" -f $authorization)}

[String] $collectionAddress = "$env:SYSTEM_TEAMFOUNDATIONCOLLECTIONURI"
[String] $project = "$env:SYSTEM_TEAMPROJECT"
[String] $buildId = "$env:BUILD_BUILDID"
[String] $buildNumber = "$env:BUILD_BUILDNUMBER"

Try {
    $changesetAddress = $collectionAddress + $project + "/_apis/build/builds/" + $buildId + "/changes?api-version=2.0"
    Write-Output "Getting Changes from $changesetAddress"

    $changesetResponse = Invoke-RestMethod -Uri $changesetAddress -ContentType "application/json" -Headers $headers -Method GET
    $changesetCount = $changesetResponse.count
    Write-Output "$changesetCount Changes found"

    for ($i = 0; $i -lt $changesetCount; $i++) {
        $changeId = $changesetResponse.value[$i].id;

        if ($changeId.ToLower().StartsWith("c")) {
            $changeId = $changeId.Substring(1);
        }

        $workItemsAddress = $collectionAddress + "_apis/tfvc/changesets/" + $changeId + "/workItems"
        Write-Output "Getting Work Items from $workItemsAddress"

        $workItemsResponse = Invoke-RestMethod -Uri $workItemsAddress -ContentType "application/json" -Headers $headers -Method GET
        $workItemsCount = $workItemsResponse.count
        Write-Output "$workItemsCount Work Items found"

        for ($j = 0; $j -lt $workItemsCount; $j++) {
            $workItemId = $workItemsResponse.value[$j].id;
            $body = '[{ "op": "add", "path": "/fields/Microsoft.VSTS.Build.IntegrationBuild", "value":"' + $buildNumber + '"}]'
            $workItemUpdateAddress = $collectionAddress + "_apis/wit/workItems/" + $workItemId + "?api-version=1.0"
            Write-Output "Patching $body to $workItemUpdateAddress for $workItemId"

            Invoke-RestMethod -Uri $workItemUpdateAddress -Body $body -ContentType "application/json-patch+json" -Headers $headers -Method PATCH
        }
    }
}
Catch {
    Write-Output $_.Exception | format-list -force
}
```
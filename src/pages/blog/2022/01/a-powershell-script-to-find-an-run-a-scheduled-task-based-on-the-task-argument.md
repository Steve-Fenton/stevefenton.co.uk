---
id: 12645
title: 'A PowerShell script to find an run a scheduled task based on the task argument'
pubDate: '2022-01-19T12:43:52+00:00'
author: 'Steve Fenton'
layout: post
guid: 'https://www.stevefenton.co.uk/?p=12645'
permalink: /2022/01/a-powershell-script-to-find-an-run-a-scheduled-task-based-on-the-task-argument/
categories:
    - Programming
tags:
    - octopus
    - powershell
---

This is a pretty specific example about finding and running a task in Task Scheduler based on the task’s action argument (the argument passed to the action executed when the task runs). However, the same script could be adjusted to filter the task based on other properties.

This task is written as an Octopus Deploy runbook, so you’ll notice the variable `#{TaskArgument}` contains the name of the argument we are searching for. The script has been designed to run all tasks that match (as opposed to the first one, for example). If you aren’t running within Octopus Deploy, you can simply use the string for your filter, such as `'myargumentstring'`.

```
<pre class="prettyprint lang-powershell">
$found = $False;

Write-Host 'Looking for #{TaskArgument}'

Get-ScheduledTask -TaskPath "\" | ForEach-Object {
    if ($_.Actions.Arguments -eq '#{TaskArgument}') {
    	Write-Host 'Found', $_.TaskName
        $found = $True

        $taskState = $_.State
        
        if ($taskState -eq 'Ready') {  
            Write-Host 'Starting', $_.TaskName
            Start-ScheduledTask -TaskName $_.TaskName
            Write-Host 'The feed task has started. Please use the "View All Feed Run History" view in Feed Manager to see results as the feed may take some time.'
        } else {
            Write-Warning "Cannot start #{TaskArgument} as state is $taskState"
        }
    }
}

if ($found) {

} else {
    Write-Warning 'No task found on this server for #{TaskArgument}'
}
```

### PowerShell stuff used

Breaking this down into it’s parts, we perform the following:

`Get-ScheduledTask`: this is where we can get a list of tasks. In this case, we are only looking at tasks in the root (Task Scheduler allows you to organise tasks into “folders”). This gives us all matching tasks in the desired path. We pipe this ` | ` into…

`ForEach-Object`: this is PowerShell 101, it allows us to loop through each of the matching tasks.

`$_.Actions.Arguments`: this is the property that contains the argument we set against the task action. We just want to find the tasks that have the argument we are interested in.

`$_.State`: here we check to make sure the task is ready – we don’t want to run it otherwise, for example if it is already running. If it isn’t ready we log the state for review.

`Start-ScheduledTask`: if it is ready, we start the task using the task name.

### Summary

This is mainly an interesting expansion of interacting with Task Scheduler with PowerShell, that expands upon the previous article on [automating Windows Task Scheduler with PowerShell](https://www.stevefenton.co.uk/2021/11/automating-windows-task-scheduler-with-powershell/).
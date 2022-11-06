---
layout: src/layouts/Default.astro
title: A PowerShell script to find and run a scheduled task based on the task argument
navMenu: false
pubDate: 2022-01-19
modDate: 2022-10-16
keywords: powershell,scheduled,task,argument
description: See how to use PowerShell to find and run a Task Scheduler task based on the task argument.
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - 'Octopus Deploy'
    - PowerShell
---

This is a pretty specific example. It uses PowerShell to find and run a task in Task Scheduler based on the task’s action argument (the argument passed to the action executed when the task runs). However, you could adjust the script to filter the task based on another property.

This task is written as an [Octopus Deploy runbook](https://octopus.com/docs/runbooks), so you’ll notice the variable `#{TaskArgument}` contains the name of the argument we are searching for. The script has been designed to run all tasks that match (as opposed to only the first one). If you aren’t running within Octopus Deploy, you can use the string for your filter, such as `'myargumentstring'`.

```powershell
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

## PowerShell stuff used

Breaking this down into its parts, you perform the following:

`Get-ScheduledTask`: this is where you can get a list of tasks. In this case, only look at tasks in the root (Task Scheduler allows you to organise tasks into “folders”). This gives us all matching tasks in the desired path. You then pipe (` | `) the result into…

`ForEach-Object`: this is PowerShell 101, which allows us to loop through each matching task.

`$_.Actions.Arguments`: this is the property that contains the argument set against the task action. You only want to find tasks with the specified argument.

`$_.State`: here you check to ensure the task is ready – you don’t want to run it otherwise,. For example, it may already be running. If it isn’t ready we log the state for review.

`Start-ScheduledTask`: if it is ready, we start the task using the task name.

## Summary

This is mainly an interesting expansion of interacting with Task Scheduler with PowerShell, which expands upon the previous article on [automating Windows Task Scheduler with PowerShell](/blog/2021/11/automating-windows-task-scheduler-with-powershell/).
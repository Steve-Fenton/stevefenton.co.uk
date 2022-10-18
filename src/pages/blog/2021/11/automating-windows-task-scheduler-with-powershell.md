---
layout: src/layouts/Default.astro
title: Automate Windows Task Scheduler with PowerShell
navMenu: false
pubDate: 2021-11-02
keywords: automate,windows,taskscheduler,powershell
description: See how to use PowerShell to automate Windows Task Scheduler.
authors:
    - steve-fenton
categories:
    - Automation
    - Programming
tags:
    - PowerShell
---

If you are dealing with Windows Task Scheduler, you will almost certainly benefit from being able to automate tasks using PowerShell. Here are some helpful tricks to get you started. Imagine you want to re-create a Task Schedule automatically. This involves:

1. Stopping the task if it exists
2. Removing the task if it exists
3. Creating the task with the appropriate trigger and action
4. Updating the task settings
5. Starting the task

## Does the task exist?

The simplest way to check if the task exists in Task Scheduler is to pipe all tasks into a filter. You'll need two commands for this:

- `Get-ScheduledTask` gets all the tasks.
- `Where-Object` allows us to filter the list of tasks. For example, by task name.

Here’s the script…

```powershell
$taskName = 'Example'
$taskExists = Get-ScheduledTask | Where-Object {$_.TaskName -like $taskName }

if($taskExists) {
    Write-Host 'The task exists!'
}
```

## Stopping and deleting the task

We can use our `$taskExists` condition to run our stop and delete commands. For this, we will use these two commands:

- `Stop-ScheduledTask` with our task name will end the task.
- `Unregister-ScheduledTask` deletes the task from Task Scheduler.

Here’s the updated script…

```powershell
$taskName = 'Example'
$taskExists = Get-ScheduledTask | Where-Object {$_.TaskName -like $taskName }

if($taskExists) {
    Write-Host 'Stopping Task'
    Stop-ScheduledTask -TaskName $taskName

    Write-Host 'Unregistering Task'
    Unregister-ScheduledTask -TaskName $taskName -Confirm:$false
}
```

## Creating the task

Creating the task is a little more involved because we want to set lots of information. Most often we need a user, a trigger, and an action.

```powershell
$taskName = 'Example'

$filePath = 'c:\Temp\'
$exePath =  "$filePath\Example.exe"

$user= "NT AUTHORITY\SYSTEM"
$trigger = New-ScheduledTaskTrigger -AtStartup
$action = New-ScheduledTaskAction -Execute $exePath

Register-ScheduledTask `
    -TaskName $taskName `
    -User $user `
    -Action $action `
    -Trigger $trigger `
    -RunLevel Highest -Force
```

This gives us a boilerplate task that starts when the system starts and *does something* (calls an executable in our case). You can adjust the trigger to use a schedule by changing `-AtStartup` to a time-based schedule such as `-Daily -At 12:00` to run each day at lunch or something more complex, like `-Weekly -WeeksInterval 1 -DaysOfWeek Sunday -At 6am`, which almost reads like a sentence.

## Update task settings

The example in my head uses startup-based triggers, and just sits in the background doing stuff as long as the machine is switched on. The default settings for a task will mean this task is killed after three hours, so we need to change the settings to let it run infinitely. We can do this by updating the `ExecutionTimeLimit`, but the example shows you how you can change any setting for a task.

```powershell
$taskName = 'Example'
$task = Get-ScheduledTask -TaskName $taskName
$task.Settings.ExecutionTimeLimit = 'PT0H'
Set-ScheduledTask $task
```

## Start the task

The final step is to kick the task off. For a time-based schedule, you could wait until the schedule fires, but for a startup-based task you would be waiting until the machine restarted. It makes sense to kick it off straight away.

We can use `Start-ScheduledTask` to run the task.

```powershell
$taskName = 'Example'
Start-ScheduledTask -TaskName $taskName
```

## Summary

I’ve made each code sample stand-alone, but you can combine them all by removing all but the first task name variable: `$taskName = 'Example'`.

If you have a more complex schedule or settings, you can extend those parts of the example.

By first stopping and removing the task before you re-create it, you can run this script as often as you like knowing you'll end up with the correct settings at the end of the process. This means you can use it as part of a deployment pipeline.
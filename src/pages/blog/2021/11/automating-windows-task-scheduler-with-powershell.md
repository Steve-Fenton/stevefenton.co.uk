---
layout: src/layouts/Default.astro
navMenu: false
title: 'Automating Windows Task Scheduler with PowerShell'
pubDate: 2021-11-02T14:51:24+00:00
author:
    - steve-fenton
categories:
    - Automation
    - Programming
tags:
    - powershell
---

If you are dealing with Windows Task Scheduler, you will almost certainly benefit from being able to automate tasks using PowerShell. Here are some useful tricks to get you started. We’ll use a scenario where we want to re-create a Task Schedule automatically, which will involve:

1. Stopping the task if it exists
2. Removing the task if it exists
3. Creating the task with the appropriate trigger and action
4. Updating the task settings
5. Starting the task

### Does the task exist?

The simplest way to check with the task exists in Task Scheduler is to pipe all tasks into a filter. We’ll use two commands for this:

- `Get-ScheduledTask` simply gets all the tasks.
- `Where-Object` allows us to filter the list of tasks, for example by task name.

Here’s the script…

```
<pre class="prettyprint lang-powershell">
$taskName = 'Example'
$taskExists = Get-ScheduledTask | Where-Object {$_.TaskName -like $taskName }

if($taskExists) {
    Write-Host 'The task exists!'
}
```
### Stopping and deleting the task

We can use our `$taskExists` condition to run our stop and delete commands. For this we will use these two commands:

- `Stop-ScheduledTask` with our task name will end the task.
- `Unregister-ScheduledTask` deletes the task from Task Scheduler.

Here’s the updated script…

```
<pre class="prettyprint lang-powershell">
$taskName = 'Example'
$taskExists = Get-ScheduledTask | Where-Object {$_.TaskName -like $taskName }

if($taskExists) {
    Write-Host 'Stopping Task'
    Stop-ScheduledTask -TaskName $taskName

    Write-Host 'Unregistering Task'
    Unregister-ScheduledTask -TaskName $taskName -Confirm:$false
}
```
### Creating the task

Creating the task is a little more involved, because we want to set lots of information. Most commonly, we need a user, a trigger, and an action.

```
<pre class="prettyprint lang-powershell">
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
This gives us a pretty boilerplate task that starts when the system starts and *does something* (calls an executable in our case). You can adjust the trigger to use a schedule by changing `-AtStartup` to a time-based schedule such as `-Daily -At 12:00` to run each day at lunch or something more complex, like `-Weekly -WeeksInterval 1 -DaysOfWeek Sunday -At 6am`, which almost reads like a sentence.

### Update task settings

The example in my head is using startup-based running, and just sits in the background doing stuff as long as the machine is switched on. The default settings for a task will actually mean this task is killed after three hours, so we need to change the settings to let it run infinitely. We can do this by updating the `ExecutionTimeLimit`, but the example shows you how you can change any of the settings for a task.

```
<pre class="prettyprint lang-powershell">
$taskName = 'Example'
$task = Get-ScheduledTask -TaskName $taskName
$task.Settings.ExecutionTimeLimit = 'PT0H'
Set-ScheduledTask $task
```
### Start the task

The final step is to kick the task off. For a time-based schedule we could just wait until the schedule fires, but for our startup-based task we would be waiting until the machine restarted. It makes sense to kick it off straight away.

We can use `Start-ScheduledTask` to run the task.

```
<pre class="prettyprint lang-powershell">
$taskName = 'Example'
Start-ScheduledTask -TaskName $taskName
```
### Summary

I’ve made each of the code samples stand-alone, but you can combine them all by removing all but the first task name variable: `$taskName = 'Example'`.

If you have a more complex schedule or settings, you can extend those parts of the example.

By first stopping and removing the task before we re-create it, we can run this script as often as we like knowing we will end up with the correct settings at the end of the process. This means we can use it as part of a deployment pipeline, for example.
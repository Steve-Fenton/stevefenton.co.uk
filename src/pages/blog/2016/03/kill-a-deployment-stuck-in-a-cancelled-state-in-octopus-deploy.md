---
title: 'Kill a deployment stuck in a cancelled state in Octopus Deploy'
navMenu: false
pubDate: 2016-03-09T06:00:01+00:00
authors:
    - steve-fenton
categories:
    - Automation
    - Programming
tags:
    - Deployments
    - 'Octopus Deploy'
    - SQL
---

This very rarely happens in Octopus Deploy, but if something catastrophic happens you may find it useful. I discovered this when the SQL Database server that has the OctopusDeploy database on was switched off during a deployment.

Due to the loss of connectivity, the deployment got stuck, and cancelling it caused the deployment to get stuck in the “Cancelling” state.

So here is how you fix it. This is the long version, so everything will become clear – but you can see how you’d create your short version by fast-forwarding through it.

## Deployment ID

If you visit the stuck deployment in the Octopus Web Portal you will see you have an address such as:

```
https://octoserver/app#/projects/Projects-1/releases/1.2.3.4/deployments/Deployments-2000
```

The important part here is that the deployment has an Id of `Deployments-2000`

## Task ID

The task id for the task that is stuck can be found by querying the Deployment table in the OctopusDeploy database. Use the Deployment id from the address bar:

```sql
SELECT * 
FROM [OctopusDeploy].[dbo].[Deployment] 
WHERE Id = 'Deployments-2000'
```

## Server task

You can now take a look at that task by querying the ServerTask table with the TaskId you found in the Deployment table:

```sql
SELECT * 
FROM [OctopusDeploy].[dbo].[ServerTask] 
WHERE Id = 'ServerTasks-8000'
```

And you can un-stick it by setting its state to “Canceled” (just one “l”):

```sql
UPDATE [OctopusDeploy].[dbo].[ServerTask] 
SET [State] = 'Canceled' 
WHERE Id = 'ServerTasks-8000'
```

## Short version

You can do all of the SQL bits in one hit using:

```sql
UPDATE [OctopusDeploy].[dbo].[ServerTask]
SET [State] = 'Canceled'
WHERE Id IN (
    SELECT TaskId
    FROM [OctopusDeploy].[dbo].[Deployment]
    WHERE Id = 'Deployments-2006'
)
```

## Doing the unstuck

Once you have updated this, the task will get binned and any queued deployments should get their turn.
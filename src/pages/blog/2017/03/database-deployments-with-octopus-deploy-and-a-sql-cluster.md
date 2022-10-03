---
layout: src/layouts/Default.astro
title: 'Database deployments with Octopus Deploy and a SQL Cluster'
navMenu: false
pubDate: 2017-03-23T09:41:07+00:00
authors:
    - steve-fenton
categories:
    - Automation
tags:
    - Deployments
    - Octopus
    - SQL
---

So you have a SQL Cluster and you want to run a database upgrade using Octopus Deploy… where do you start?

There are actually two strategies you can employ to do this, and you can choose the most appropriate one based on how you have things set up. Octopus Deploy is cluster-agnoistic, but you can make it work in a way that is cluster aware, or you can make it work in a way that totally ignores the fact there is a cluster.

## Cluster aware

You’ll need to choose this option in the following circumstances:

- Your deployments are not replayable
- You need to only run against the active server as the inactive one(s) isn’t reachable

To run cluster aware, or clustaware™, install the tentacle on one machine normally, and then on all of the others [using the same certificate](https://octopus.com/docs/how-to/export-and-import-tentacle-certificates-without-a-profile).

You can then make the service available via the cluster as a general service and configure Octopus using the cluster’s IP address. The deployment will be performed by whichever server is active at the time of the deployment. Because they all look alike to the Octopus Server (i.e. the same key) they are all treated like a single machine.

## Like multiple machines

If the machines are all reachable, and your database scripts are re-runnable (for example, if you use DbUp, it registers the scripts that have run to ensure they are only executed once) – you can treat the machines like individual deployment targets.

Install a tentacle on each machine and add each one to your environment in the Octopus Web Portal.

The first machine will actually perform the deployment. Other machines will follow, but take no action (depending on your deployment technique).

It is worth configuring your deployment to be a rolling deployment with a window size of one, so the deployments are not happening simultaneously on all the machines.
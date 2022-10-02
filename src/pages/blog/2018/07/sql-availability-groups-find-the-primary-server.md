---
layout: src/layouts/Default.astro
navMenu: false
title: 'SQL Availability Groups: Find the primary server'
pubDate: 2018-07-06T17:10:49+01:00
authors:
    - steve-fenton
medium_post:
    - 'O:11:"Medium_Post":11:{s:16:"author_image_url";s:75:"https://cdn-images-1.medium.com/fit/c/400/400/1*eXkhfEuF41g5W_xnc_ydLA.jpeg";s:10:"author_url";s:38:"https://medium.com/@steve.fenton.co.uk";s:11:"byline_name";N;s:12:"byline_email";N;s:10:"cross_link";s:3:"yes";s:2:"id";s:12:"6f741835ad3a";s:21:"follower_notification";s:3:"yes";s:7:"license";s:19:"all-rights-reserved";s:14:"publication_id";s:2:"-1";s:6:"status";s:5:"draft";s:3:"url";s:51:"https://medium.com/@steve.fenton.co.uk/6f741835ad3a";}'
categories:
    - Programming
tags:
    - sql
---

Here is a quick SQL script that will get back information on SQL availability groups, including the role of each server. This can help you find the primary server in an availability group.

```
<pre class="prettyprint lang-sql">
IF SERVERPROPERTY ('IsHadrEnabled') = 1
BEGIN
    SELECT
        AvailabilityGroup.name AS AvailabilityGroupName,
        ReplicaClusterStates.replica_server_name as ServerName,
        ReplicaStates.role_desc as ReplicaRole,
        Listeners.dns_name as DnsName
    FROM
        sys.availability_groups_cluster AS AvailabilityGroup
    INNER JOIN
        sys.dm_hadr_availability_replica_cluster_states AS ReplicaClusterStates ON ReplicaClusterStates.group_id = AvailabilityGroup.group_id
    INNER JOIN
        sys.dm_hadr_availability_replica_states AS ReplicaStates ON ReplicaStates.replica_id = ReplicaClusterStates.replica_id
    INNER JOIN
        sys.availability_group_listeners AS Listeners ON Listeners.group_id = ReplicaStates.group_id
    ORDER BY
        ReplicaStates.role_desc
END
```
The primary server for each availability group will be listed with a replica role of `PRIMARY`.
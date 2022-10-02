---
id: 1960
layout: src/layouts/Default.astro
title: 'Load balancing Microsoft SQL Server with HAProxy'
pubDate: 2016-11-04T13:03:17+00:00
author:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=1960'
permalink: /2016/11/load-balancing-microsoft-sql-server-with-haproxy/
categories:
    - Programming
tags:
    - haproxy;sql
---

In case you are told it isn’t possible, I can confirm that it is in fact possible to load balance requests to databases using HAProxy. Here are the specifics.

First, the databases in question are SQL 2012 Web Edition databases. They get populated by replication from a SQL 2012 Standard Edition publisher. Reads are sent to these replicated databases, but all writes go to the master database.

Here is the entire HAProxy config for a basic database load balancing listener, taking connections from a list of approved addresses and distributing them to three servers, depending on whether they appear to be up.

```
<pre class="prettyprint">listen sql-db
    bind *:1433
    mode tcp
    balance leastconn
    acl db_white_list src 0.0.0.0 1.1.1.1 2.2.2.2 3.3.3.3
    tcp-request connection reject if !db_white_list
    option log-health-checks
    server DB-1 4.4.4.1:1433 check port 1433 inter 1000
    server DB-2 4.4.4.2:1433 check port 1433 inter 1000
    server DB-3 4.4.4.3:1433 check port 1433 inter 1000
```

You can get more advanced here – you could perform more advanced checks using SQL to make sure you have more than just a connection to a port – but you get the idea.

What does this cost?

Unlike HTTP load balancing, you will actually start to see CPU usage on your HAProxy server. You will also see a big jump in network traffic, as web pages are usually smaller than the data you might query to generate them. You’ll need to make sure this isn’t a major problem. You’ll also see a little latency as it will take slightly longer to get your data as there is something else in the middle.
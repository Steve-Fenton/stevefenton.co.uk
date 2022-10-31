---
layout: src/layouts/Default.astro
navMenu: false
title: Load balancing with IIS and Application Request Routing
pubDate: 2022-02-28
modDate: 2022-10-15
keywords: load balancing,iis,application request routing,web farm
description: 
authors:
    - steve-fenton
bannerImage:
    src: /img/2022/02/load-balancing.png
    alt: Traffic routed between servers using application request routing
categories:
    - Programming
tags:
    - ARR
    - IIS
    - Load Balancing
---

Application Request Routing (ARR) is a feature in :abbr[IIS]{title="Internet Information Services"} that allows you to set up a web farm and load balance the requests. ARR sits within IIS Manager and provides load balancing, caching, and health monitoring features.

In this article, a single-server web app will be updated to run on two web servers with an ARR server sitting in front of them to distribute the traffic.

:::figure{.inset}
:img{src="/img/2022/02/load-balancing-with-arr.png" alt="Before: DNS points at a single web server. After: DNS points to an ARR server, with in turn points to two web servers"}
::figcaption[Load balancing]
:::

## Installing ARR

If you have a server with IIS installed, you can [use the Web Platform Installer to add ARR](https://www.iis.net/downloads/microsoft/application-request-routing).

Once installed, you will have a new node in IIS Manager called **Server Farms**.

:::figure{.inset}
:img{src="/img/2022/02/iis-manager-server-farms.jpg" alt="Server farms node in IIS Manager" loading="lazy"}
::figcaption[Server farms]
:::

## Creating a server farm

In IIS Manager, expand the machine and right-click on **Server Farms**, which should appear alongside **Application Pools** and **Sites**.

Select **Create Server Farm…** to start the wizard.

Enter the name of the server farm and click **Next**.

You will now be asked to add a server to the farm. You can enter the server's IP address (i.e. `192.168.236.128`) or network name (i.e. `win-dev-web-01`).

Repeat this step for each machine, then select **Finish**. The wizard will offer to automatically create the routing rules for you, which usually does what you want.

## Update your DNS

You will need to change your DNS to point at the load-balancing server rather than the individual web server. For the example, you would change the IP address from `192.168.236.128` (the original web server) to `192.168.236.130` (our IIS ARR load balancer).

You can also update the firewalls on the two web servers so they only accept web traffic from the load balancer.

Once you have updated the DNS, you can make a request, and you should see the same web app as before, except served via the load balancer and cached. You’ll notice an additional header on responses made by the load balancer: `X-Powered-By: ARR/3.0`.

## Exploring the features

IIS Manager has specific sections to configure and monitor your server farm.

- **Caching** lets you control the duration of the in-memory cache and enable disk caching. The most important setting in here is **Query string support**. This should usually be set to “Include query string”. You should adjust and test this based on your application.
- **Health Test** defines how live traffic is used to detect an unhealthy web server. You can also set up a specific health check address to be tested periodically for you.
- **Load Balance** lets you change how ARR decides which server to send to traffic to.
- **Monitoring and Management** shows information about requests, response types, and response times, as well as the actual distribution of requests between servers. You can also gracefully take a server out of balance from this screen.
- **Proxy** gives you control over the type of HTTP proxy to use and the timeouts and request limits. It also gives you control of certain HTTP headers, such as where the original client IP address should be forwarded.
- **Routing Rules** allow you to avoid forwarding of certain types of traffic. For example, you could choose to serve all image files from the ARR server and only offload other requests to the web farm (this makes sense as you will be caching all the images on the ARR server anyway, so why not just serve them directly rather than asking another server for them!) You can set up file extensions (`*.jpg`) or specific application paths (`/images/*`) to exclude from forwarding.
- **Server Affinity** lets you pin a user to a specific server. You only need to use this if your web servers maintain state independently, for example, a session in memory. Ideally, it would help if you made your application stateless or maintained the state in a shared state store like Memcached or Redis.

The example below shows a configuration where routing rules allow all “\*.jpg” files to be served from the load balancer, with all other requests forwarded to the web farm.

:::figure{.inset}
:img{src="/img/2022/02/arr-selective-routing.png" alt="Shows requests for a .jpg file being server from the load balancer and other requests being load balanced to the web farm servers" loading="lazy"}
::figcaption[Images served from the load balancer]
:::

## Summary

Adding ARR to IIS is a straightforward way to introduce load balancing. It may not have as many options as a dedicated offering, but it is a production-ready solution with a simple set of options.

If you are developing an application that will be load-balanced, using ARR in your development environment is a great way to ensure you don’t paint yourself into a corner.

More documentation on Application Request Routing is available on [Microsoft Learn ARR Docs](https://docs.microsoft.com/en-us/iis/extensions/planning-for-arr/using-the-application-request-routing-module?WT.mc_id=DT-MVP-5002938)
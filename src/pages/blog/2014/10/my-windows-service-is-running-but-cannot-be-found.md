---
layout: src/layouts/Default.astro
navMenu: false
title: 'My Windows Service is running but cannot be found'
pubDate: 2014-10-17T20:33:58+01:00
authors:
    - steve-fenton
interface_sidebarlayout:
    - default
categories:
    - Programming
tags:
    - .net
    - 'c#'
---

I could hardly choose a title for this article, but I know I might see this again in the future and would probably look for it filed under a title such as this.

So here is the background.

I have a Windows service (it happens to be an SMTP server, but that isn’t particularly relevant here). It listens on port 25 and when testing it locally it works great. When I try to connect remotely in any way (even using the fully qualified name from the same machine the service runs on) no joy.

Most advice on this topic says check firewalls. This is good advice in many cases as firewalls are the most common problem – but I had done all of that. I had opened ports on firewalls, added endpoints to Azure VMs and basically done all of the common fixes.

So a friend ran a port-scanner against my machine and it didn’t find anything on port 25.

This caused me to run netstat:

```
<pre class="prettyprint lang-powershell">
netstat -an | find "25"
```
And the output showed that port 25 had an IPv6 address, not an IPv4 address.

```
<pre class="prettyprint lang-powershell">
TCP    [xx99::999x:xxx9:9999:99xx%4]:25  [::]:0                 LISTENING
```
As is the way in co-located teams, no sooner had I spoken this finding out loud – a solution was offered up.

And the solution was to replace this code:

```
<pre class="prettyprint lang-csharp">
var endpoint = new IPEndPoint(Dns.GetHostAddresses(Dns.GetHostName()).First(), listeningPort);
_tcpListener = new TcpListener(endpoint);
```
With this call to TcpListener.Create:

```
<pre class="prettyprint lang-csharp">
_tcpListener = TcpListener.Create(listeningPort);
```
Re-running netstat shows the service is now visible under both IPv4 and IPv6.
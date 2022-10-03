---
layout: src/layouts/Default.astro
title: 'Forwarding traffic in Brocade using host names'
navMenu: false
pubDate: 2017-05-03T12:34:12+01:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - Brocade
    - 'Load Balancing'
---

I’m a long time user of HAProxy, but I’m currently working on getting Brocade set up to do similar work in our Sydney data centre.

We send most of our traffic to a web farm, but there are one or two exceptions, which we detect by host name. To send traffic to different servers or ports using Brocade, you create a rule, a policy, and a server identity (which means server and port).

The rule links a criteria to a name, in the example below it will find requests where the host name is “www.example.com” and tag it with the name “rule-name-1”. The policy can then use the rule by name, in order to forward traffic to different servers based on whether the request matches the rule.

Here is the step-by-step version.

You first create a rule to match a host name (all requests to www.example.com will match “rule-name-1”, which you might call “host-www-example-com” instead):

```
csw-rule "rule-name-1" header "host" equals "WWW.EXAMPLE.COM" case-insensitive
```

Then you create a policy for forward matching requests to a server id (if the request matches the rule named “rule-name-1” forward the request to server id 2):

```
csw-policy "policy-name" case-insensitive
match "rule-name-1" forward 2
default forward 1
```

The server id is specified against the real server configuration, and identifies a port on a server:

```
server real server-name-1 1.2.3.4
port 80 server-id 2
```
---
layout: src/layouts/Default.astro
title: Lookup DNS on a specific nameserver with NSLOOKUP
navMenu: false
pubDate: 2020-11-10T16:06:11+00:00
authors:
    - steve-fenton
categories:
    - Windows
tags:
    - DNS
    - Nameservers
---

The `nslookup` command is really easy to use. You just type `nslookup [host-name]` and you get an answer. But what do you do when it looks like it is working, but your monitoring is detecting intermittent issues connecting to a website? The answer is, you check each nameserver individually to make sure they are all giving out the same answer.

## Find the nameservers with NSLOOKUP

Let’s look up the nameservers for our website. We’ll usually get back multiple answers. Two or three is pretty common. We can use `nslookup -querytype=ns [root domain]` to do this.

```cmd
nslookup -querytype=ns stevefenton.co.uk
Server:  UnKnown
Address:  1.1.1.1

Non-authoritative answer:
stevefenton.co.uk       nameserver = dane.ns.cloudflare.com
stevefenton.co.uk       nameserver = amy.ns.cloudflare.com
```

## Check each nameserver with NSLOOKUP

This is how you look up records from a specific name server. It uses the syntax `nslookup [host-name] [nameserver]`. You can supply the name of the nameserver: `nslookup www.stevefenton.co.uk amy.ns.cloudflare.com`, or its IP address: `nslookup www.stevefenton.co.uk 2a06:98c1:50::ac40:2065`.

```cmd
nslookup www.stevefenton.co.uk amy.ns.cloudflare.com
Server:  amy.ns.cloudflare.com
Address:  2a06:98c1:50::ac40:2065

Name:    www.stevefenton.co.uk
Addresses:  104.31.65.119
          104.31.64.119
          172.67.196.210
```

Repeat this for each nameserver and keep an eye out for any that are giving out bad answers.

## NSLOOKUP tips

And finally, some quick `nslookup` tips.

Simple DNS Check

```cmd
nslookup [host-name]
nslookup www.example.com
```

Specific Record Type Check

```cmd
nslookup -querytype=[record-type] [host-name]
nslookup -querytype=mx example.com
```

Nameserver Lookup

```cmd
nslookup -querytype=ns [host-name]
nslookup -querytype=ns example.com
```

DNS Check Against Specific Nameserver

```cmd
nslookup [host-name] [nameserver]
nslookup www.example.com a.iana-servers.net
```
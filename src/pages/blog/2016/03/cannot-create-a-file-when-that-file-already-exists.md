---
title: 'Cannot create a file when that file already exists'
navMenu: false
pubDate: 2016-03-21T14:12:57+00:00
authors:
    - steve-fenton
categories:
    - Automation
tags:
    - IIS
    - 'Octopus Deploy'
---

This is one of the few hitches you may come across when deploying to IIS from Octopus Deploy:

> Cannot create a file when that file already exists. (Exception from HRESULT: 0x800700B7)

This error simply means something is already running on the port number that you are planning on using (and that probably means the default website is already using a binding with port 80, and you are attempting to add another website or application with a binding to port 80).

You can choose from the following options…

- Stop and remove the default website
- Use a host header and port number for your bindings, rather than \*:80
- Use a different port number
- Use multiple IP addresses and bind different IP addresses to the two competing websites
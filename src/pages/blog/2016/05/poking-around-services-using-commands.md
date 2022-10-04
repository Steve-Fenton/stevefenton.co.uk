---
layout: src/layouts/Default.astro
title: 'Poking around services using commands'
navMenu: false
pubDate: 2016-05-13T07:00:13+01:00
authors:
    - steve-fenton
categories:
    - Programming
    - Windows
tags:
    - PowerShell
    - Services
---

Important Note! These commands for Windows Services work if you run **Command Prompt** as **Administrator**.

## List all services

```bash
SC QUERY state=all > "C:\Temp\Services.txt"
```

This will drop a text file (because you’re likely to have more information than your command buffer) into the temp folder for your perusal.

## Start / stop a service

Start a service…

```bash
SC START YourServiceName
```

Stop a service…

```bash
SC STOP YourServiceName
```

## Delete a service

This deletes the service…

```bash
SC DELETE YourServiceName
```
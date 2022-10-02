---
layout: src/layouts/Default.astro
navMenu: false
title: 'Poking around services using commands'
pubDate: 2016-05-13T07:00:13+01:00
author:
    - steve-fenton
categories:
    - Programming
    - Windows
tags:
    - powershell
    - services
---

Important Note! These commands for Windows Services work if you run **Command Prompt** as **Administrator**.

### List all services

```
<pre class="prettyprint lang-bash">SC QUERY state=all > "C:\Temp\Services.txt"
```
This will drop a text file (because you’re likely to have more information than your command buffer) into the temp folder for your perusal.

### Start / stop a service

Start a service…

```
<pre class="prettyprint lang-bash">SC START YourServiceName
```
Stop a service…

```
<pre class="prettyprint lang-bash">SC STOP YourServiceName
```
### Delete a service

This deletes the service…

```
<pre class="prettyprint lang-bash">SC DELETE YourServiceName
```
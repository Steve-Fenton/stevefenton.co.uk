---
layout: src/layouts/Default.astro
navMenu: false
title: 'Beware of @@SERVERNAME in Microsoft SQL Server'
pubDate: 2016-02-23T12:10:30+00:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - SQL
---

The special variable @@SERVERNAME crops up quite often on forums as the answer to the question “How do I get the name of the machine I am running on”. This is problematic, because this variable actually return the name of the SQL Server *instance*, which is not necessarily the same thing.

For example, if you are running on a named instance, you’ll get the following result…

```
<pre class="prettyprint lang-sql">SELECT @@SERVERNAME -- "YOUR-SERVER\INSTANCE"
```
So when you want the machine name, ask for it specifically and don’t rely on your SQL Server and machine having the same name:

```
<pre class="prettyprint lang-sql">SELECT SERVERPROPERTY('MACHINENAME') -- "YOUR-SERVER"
```
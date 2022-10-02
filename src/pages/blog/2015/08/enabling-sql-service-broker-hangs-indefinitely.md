---
layout: src/layouts/Default.astro
navMenu: false
title: 'Enabling SQL Service Broker hangs indefinitely'
pubDate: 2015-08-12T14:23:42+01:00
author:
    - steve-fenton
categories:
    - Programming
tags:
    - octopus
    - sql
---

We are [using Octopus Deploy to perform model-driven deployments](https://www.stevefenton.co.uk/2015/06/packaging-visual-studio-database-project-with-octopack/) to our SQL Server databases based on the DacPac created in a Visual Studio Database project. One of the post-deployment scripts was hanging indefinitely:

```
<pre class="prettyprint lang-sql">IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'MyDatabase' AND is_broker_enabled = 1)
    ALTER DATABASE [MyDatabase] SET ENABLE_BROKER
```

This is caused by the script essentially waiting for everyone else’s connection to end, which isn’t likely to happen by chance.

To solve this problem, the script needs to be run in single user mode:

```
<pre class="prettyprint lang-sql">ALTER DATABASE [MyDatabase] SET SINGLE_USER WITH ROLLBACK IMMEDIATE

IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'MyDatabase' AND is_broker_enabled = 1)
    ALTER DATABASE [MyDatabase] SET ENABLE_BROKER

ALTER DATABASE [MyDatabase] SET MULTI_USER
```

And here is the real version that takes the Ocotpus Deploy database name variable from our project variables page.

```
<pre class="prettyprint lang-sql">ALTER DATABASE [$(DatabaseName)] SET SINGLE_USER WITH ROLLBACK IMMEDIATE

IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = '$(DatabaseName)' AND is_broker_enabled = 1)
    ALTER DATABASE [$(DatabaseName)] SET ENABLE_BROKER

ALTER DATABASE [$(DatabaseName)] SET MULTI_USER
```
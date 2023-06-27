---
title: 'Configure allowed IP addresses with Azure SQL Firewall'
navMenu: false
pubDate: 2018-02-07T11:48:47+00:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - Azure
    - SQL
---

If you need to allow connections from a specific IP address to your Azure SQL database, you can do this using the Azure SQL firewall.

:::div{.inset}
:img{src="/img/2018/02/azure-sql-firewall.png" alt="Azure SQL Firewall"}
:::

The rule is set up at the SQL server level, so if you have the SQL database open in the Azure portal, navigate up a level to the server (the link under “Server name” in the overview will do this).

Against the SQL server, you’ll find “Firewall / Virtual Networks” under the “Settings” group of icons.

You’ll need to switch on “Allow access to Azure services”, then you can add a new IP address (or range) to the list of IP addresses allowed to connect. The screen even shows your current IP address, in case you are attempting to add yourself!
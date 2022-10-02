---
layout: src/layouts/Default.astro
navMenu: false
title: 'Pass Octopus Deploy variables to DacPac deployments via PowerShell'
pubDate: 2016-02-11T16:32:14+00:00
author:
    - steve-fenton
categories:
    - Automation
    - Programming
tags:
    - octopus
    - sql
---

[![Exploring Octopus Deploy](https://www.stevefenton.co.uk/wp-content/uploads/2015/07/exploring-octopus-deploy.jpg)](https://www.stevefenton.co.uk/publications/exploring-octopus-deploy/)This is the process for sending a variable from Octopus Deploy, all the way down to a SQL script that is hidden inside a DacPac, which is being called from PowerShell, which is being executed by Octopus Deploy. I have covered the end-to-end process of [how to package and deploy your Visual Studio database project using Octopus Deploy](https://www.stevefenton.co.uk/2015/06/packaging-visual-studio-database-project-with-octopack/) previously.

Octopus Variable. We will assume you have added a variable to your deployment project named “ImportantVariable”.

PowerShell. The variable is automatically available in PowerShell. It is called (rather conveniently)…

```
<pre class="prettyprint lang-powershell">$ImportantVariable
```
Visual Studio Database Project. When you add the variable to your Visual Studio Database Project, call it something sensible like:

```
<pre class="prettyprint lang-sql">$(ImportantVariable)
```
You can use this anywhere in your script, even inside of strings…

```
<pre class="prettyprint lang-sql">SET @example = N'The value is $(ImportantVariable)'
```
You’ll get a build error until you go to the project properties, SQLCMD Variables tab and add the variable to the list. You can associate a default value to it here too.

DacPac Deploy. All that is left is to pass the variable from PowerShell into the DacPac deployment. You can do this via a variables dictionary in the DacPac options (Microsoft.SqlServer.Dac.DacDeployOptions).

```
<pre class="prettyprint lang-powershell">$options.SqlCommandVariableValues.Add("ImportantVariable", $ImportantVariable)
```
So to recap, you’ll need to:

1. Add the variable to the Octopus Deploy project
2. Pass the variable to the SqlCommandVariableValues dictionary in your PowerShell script
3. Add the SQLCMD Variable to your SQL script, and to the Visual Studio database project
---
layout: src/layouts/Default.astro
navMenu: false
title: 'Send a notification when deployments fail'
pubDate: 2015-08-03T07:30:41+01:00
authors:
    - steve-fenton
categories:
    - Automation
tags:
    - Octopus
---

If you are using Octopus Deploy as part of a continuous delivery pipeline, you’ll probably find that deployments don’t fail very often. This means that when they do, people probably need to be told about it.

Here is a simple email notification step that tells you when a deployment fails, including a reasonable amount of information about the failure.

![Octopus Deploy Failed Deployment Email](/img/2015/07/failed-deployment-email.png)

The key parts of this email are the subject:

```
<pre class="prettyprint lang-plain_text">FAILURE! #{Octopus.Project.Name} - #{Octopus.Release.Number}
```
The body:

```
<pre class="prettyprint lang-plain_text">The following release has been created but FAILED TO DEPLOY to the #{Octopus.Environment.Name} environment:

#{Octopus.Project.Name} - #{Octopus.Release.Number}

Error details:

#{Octopus.Deployment.ErrorDetail}
```
And the Run Condition:

```
<pre class="prettyprint lang-plain_text">Failure: only run when a previous step failed
```
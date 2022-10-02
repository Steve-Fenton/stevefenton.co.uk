---
layout: src/layouts/Default.astro
navMenu: false
title: 'Octopus Deploy: Deployments are code'
pubDate: 2016-02-17T07:00:11+00:00
authors:
    - steve-fenton
categories:
    - Automation
tags:
    - octopus
---

[![Exploring Octopus Deploy](/img/2015/07/exploring-octopus-deploy.jpg)](/publications/exploring-octopus-deploy/)In the professional software development community, we use a disciplined approach to releasing our software. This is why many of us use tools such as Octopus Deploy to manage releases and deployments.

Because this post is specifically about Octopus Deploy, I will assume that you understand why a code change should flow through a continuous delivery pipeline that ensures the code change results in an application that compiles, passes the automated tests, deploys to an early environment (we call our “Edge”), flows through all of the pre-production environments (whether they are automated test environments, exploratory test environments, pre-production environments, or something else)… and lands safely on the live server in an uneventful fashion.

If you get this process right, you know that your deployment to live will work.

Recently, there has been an increase in this kind of question:

> How can I make a change to my deployment process without having to create a new release in Octopus Deploy?

This question doesn’t seem to fit with a team using Octopus Deploy. A change in your deployment process can cause a deployment to fail just as easily as a change to your code can. Why would you apply the discipline to your code, but not your deployment process?

Octopus Deploy does, of course, force you to *do the right thing*. You change the deployment process; it needs to flow through the deployment pipeline as defined by the lifecycle you have selected for the application. This means a bad change to your deployment process is caught early on.

So rest assured that Octopus Deploy will treat your deployment process like code.

The following items are fixed when a release is created:

- The deployment artefacts (i.e. the things you are going to deploy)
- The entire deployment process
- The deployment variables

Addendum: Octopus Deploy will now literally treat your deployment as code, with the new [Configuration as Code feature](/2021/10/how-to-enable-config-as-code-in-octopus-deploy/) (October 2021).
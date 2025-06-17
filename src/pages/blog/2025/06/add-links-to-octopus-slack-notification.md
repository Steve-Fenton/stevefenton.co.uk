---
title: Add links to Octopus notifications to Slack
navMenu: false
pubDate: 2025-06-17
keywords: octopus deploy, slack, notifications
description: How to add add links to Octopus notifications to Slack
bannerImage:
    src: /img/topic/octopus/exploring-octopus-banner.png
    alt: A banner featuring the book Exploring Octopus Deploy (second edition)
authors:
    - steve-fenton
categories:
    - Automation
tags:
    - Octopus Deploy
    - Slack
---

Add links to Octopus notifications to Slack

Today I wanted to make a tiny life enhancement to the notifications we generate when we finish a deployment. We have a set of microsites that all look like one big website. There's a single front door, but inside there are several statically generated sites, some server-side applications, and lots of changes to deploy.

## Slack notifications from Octopus

Octopus has a [built-in Slack integration](https://octopus.com/integrations/slack/slack-send-simple-notification) that we use to pop a notification in a Slack channel dedicated to deployments. It tells people which site was deployed and to which environment. It included the URL of the site to make it easy to open it up and poke around with the exciting new stuff.

What I didn't like was that the notification had the raw URL. This made the notification look messy, distracted from the key information, and stopped me from taking vanity screenshots of all the notifications to share on social media. This had to be fixed!

But how do you place a link inside the message, so it will be displayed as clickable friendly text?

Thankfully, it's pretty simple when you know how.

The syntax uses angle brackets and a pipe, like this: `<URL|Friendly text>`.

Here's my full notification message.

## Before

```
#{Octopus.Project.Name} release #{Octopus.Release.Number} to #{Octopus.Environment.Name} #{AWS.Website}
```

## After

```
#{Octopus.Project.Name} release #{Octopus.Release.Number} to <#{AWS.Website}|#{Octopus.Environment.Name} ↗️
```

And here's the result. I can share this on social without it looking messy, and without giving away my URLs.

:img{src="/img/2025/06/octopus-slack-notifications.png" alt="Simple helpful notifications"}

---
layout: src/layouts/Default.astro
title: 'Using ngrok to test localhost on your phone'
navMenu: false
pubDate: 2023-03-17
keywords: ngrok,testing,localhost,tunnel
description: Find out how to expose a localhost website or app with ngrok so you can test it on your phone.
bannerImage:
    src: /img/topic/ngrok/ngrok.png
    alt: A diagram of a crank mechanism
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - Git
---

I found out about [ngrok](https://ngrok.com/) during this week's DEPLOY on FRIDAY episode. I grabbed it out of curiosity and fired it up... and I got the joy of using something that *just works*.

There are more advanced use cases that their website covers, but a common pain point for me is running a website on localhost and testing it on a device like my phone or tablet. You can achieve this in [GitHub codespaces](https://www.stevefenton.co.uk/blog/2022/12/real-device-testing-github-codespaces/), but ngrok is a *really* easy way to do it from whatever machine you're on.

[DEPLOY on FRIDAY](https://www.youtube.com/watch?v=25_TJUi8EL8)

## Getting started with ngrok

1. Sign up for an account
2. Download the tiny stand-alone `ngrok` binary
3. Run the command ngrok supply after the download - it adds your API key to your local ngrok
4. Run you *thing*, for example a web app that runs as `localhost:8080`
5. Double click ngrok and type `ngrok http 8080`

That's literally it. If you remove the up-front installation tasks, your next debug session is as simple as:

1. Run you *thing*, for example a web app that runs as `localhost:8080`
2. Double click ngrok and type `ngrok http 8080`

## Opening localhost on your other devices

When you run ngrok, it provides the info you need to access the site. You'll see the following when you run ngrok:

```
Session Status                online
Account                       YOUR-EMAIL-ADDRESS (Plan: Free)
Version                       3.2.1
Region                        Europe (eu)
Latency                       33ms
Web Interface                 http://127.0.0.1:4040

Forwarding                    https://YOUR-RANDOM-VALUE.eu.ngrok.io -> http://localhost:3000

Connections                   ttl     opn     rt1     rt5     p50     p90
                              0       0       0.00    0.00    0.00    0.00
```

From the above, grab the URL listed under "Forwarding", which will be something like `https://YOUR-RANDOM-VALUE.eu.ngrok.io`. Just open this address on your device.

When you first open the forwarded site, you'll get an ngrok splash. Hit the button to proceed to the site.

## Summary

This is just the obvious first thing you'd do with ngrok, you can go deep with it as it can be ingress and load balancer for your cloud hosted apps... which is cool. There are also easy ways to quickly add things like OAUTH.

There's a [free tier](https://ngrok.com/pricing) you can use to try it out.

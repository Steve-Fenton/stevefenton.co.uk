---
title: 'Stand away from the edge: Thinking about edge workers'
navMenu: false
pubDate: 2019-06-24T12:27:14+01:00
authors:
    - steve-fenton
bannerImage:
    src: /img/2019/06/mind-the-gap.jpg
    alt: A mind the gap sign spray painted on a train station platform edge
categories:
    - Programming
description: Discusses the trade-offs of using edge workers like Cloudflare, noting that they increase dependency and reduce architectural flexibility.
---

As today’s Cloudflare outage rages on, with a multitude of services that depend on Cloudflare being knocked out of operation simultaneously, we are all reminded about resilience. In particular, it’s a good time to think again about edge workers.

Cloudflare is quite amazing. It handles huge amounts of traffic using just a [small number of retro lava lamps](https://www.cloudflare.com/learning/ssl/lava-lamp-encryption/)… like 30 terabytes per second across 180 data centers. It’s impressive and the twenty-dollar plan for professional websites is crazy cheap.

## Transparency

The very best thing about Cloudflare is how transparent it is. You can switch it on and off and nobody knows. I change my nameservers to Cloudflare and I get all the chops. I change them back to my own nameservers and I get directly exposed to the Internet. I can flick the switch on and off all day long. Literally, you don’t know I’m doing it. I’ve got it switched on right now… and now I have it switched off (there’s a global Cloudflare issue going on right now, so you wouldn’t be reading this if I didn’t switch it off).

## Edge workers and serverless compute

One of the big pushes from Cloudflare, and similar organisations, is to move compute to the edge. This basically means having micro-apps that can do things in addition to whatever your central web platform can do. For example, it can make alterations to your pages to add a feature that doesn’t otherwise exist.

So rather than your “big central server” doing all the work, you can offload some work to lightweight edge workers.

## It depends

Edge compute, flexible SSL, apps, workers… they’re all kinda nice. They break that transparency that I was talking about earlier, though. If I use edge workers and I switch off Cloudflare, the edge workers don’t run. If I use Cloudflare flexible SSL, where traffic is only encrypted between the users and Cloudflare, my site pops insecure site warnings if I switch it off. All these nice-to-have features start to increase my dependence on the platform being available. My total possible uptime is now (my uptime) \* (cloudflare uptime) with is *always* less than (my uptime) on its own. I can’t easily switch from Cloudflare to some other provider if they offer different options. I might have to rewrite my edge workers for the new platform, or it might simply not support that feature.

Most importantly, I can’t switch off Cloudflare if there’s a problem… so I would have to just wait for them to fix it.

:::div{.inset}
:img{src="/img/2019/06/mind-the-gap.jpg" alt="Mind The Gap Signs on a Railway Platform" loading="lazy"}
:::

## Stand away from the edge

This is why choosing to move compute to an edge worker on Cloudflare is an *architectural* decision. It impacts your SLOs. It impacts your ability to change. It glues your fingertips to the provider and you can’t detach without losing some skin. The same goes for any option the platform offers that makes them hard, or expensive, to replace.

We abstract our high-level policy from our user-interface because we want to be able to change it. We abstract the database implementation from our domain model because we want to be able to change it. So, we ensure our CDN and proxy choices are easy to change, especially when there is an emergency.
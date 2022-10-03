---
layout: src/layouts/Default.astro
title: Creating a goal template in Google Analytics v3
navMenu: false
pubDate: 2021-03-16T11:23:08+00:00
authors:
    - steve-fenton
categories:
    - Analytics
tags:
    - 'Google Analytics'
---

This is a tip for how to manage lots of Google Analytics accounts using version 3. Goals are a pain to set up when you manage hundreds of accounts, so here is a quick way to do it using Goal Template URLs in Google.

Google Analytics version 4 is on the way, but I have no news yet about how to share configuration items between properties (there are no views in the new world).

Go to your Google Analytics account and choose the property with your nicely configured goals.

Then open Admin > View > Goals

:img{src="/img/2021/03/goal-view-001.jpg" alt="Goal View in Google Analytics" loading="lazy"}

Either use the tick box to select all, or choose specific goals from the list. When you do this, a “Share” option appears in the toolbar.

:img{src="/img/2021/03/goal-view-002.jpg" alt="Goal Sharing Link" loading="lazy"}

Click on this share option and choose “Share template link”. This will create a shareable link that can be used to add goals to any other Google Analytics v3 view (by someone who has permissions to do so).

:img{src="/img/2021/03/share-template-link.jpg" alt="Share Template Link" loading="lazy"}

You’ll get a message containing a link that you need to copy and keep somewhere to re-use, like your favourites bar.

> Copy the URL below to share  
> You are only sharing the goal configuration. No traffic data is being shared.  
> \[[Link](https://analytics.google.com/analytics/web/template?uid=1rzch8lETnCeo7SQNairCQ)\]

Anyone using the link can choose which goals to import, and which “slot” to import them to.
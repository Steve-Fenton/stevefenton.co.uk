---
title: 'The best browser extensions for analytics and tag debugging'
navMenu: false
pubDate: 2019-10-16T14:53:51+01:00
authors:
    - steve-fenton
bannerImage:
    src: /img/2019/10/tag-assistant-by-google.jpg
    alt: Google tag assistant
categories:
    - Analytics
    - Browsers
tags:
    - Adobe
    - Google
    - Debugging
description: Recommends browser extensions like Google Analytics Debugger, Tag Assistant, and Omnibug for debugging analytics.
---

Recently, I wrote about [debugging Adobe Analytics](/blog/2019/09/debugging-adobe-analytics/), which uses the most widely-available tools that we all have; browser developer tools. It is possible to debug and test a whole host of analytics and tag manager scenarios using the Console and Network tabs of browsers tools if you are willing to scry the query parameters of the network requests that are sent for script files and the tracking calls they make.

When you want a bit more help than raw data, these are the best browser extensions for analytics and tag debugging… tools I have accumulated over time while working on data and analytics (many of these were recommended by my colleague and awesome Data Scientist, Ola Sofela).

## Google Analytics debugger

The [Google Analytics Debugger](https://chrome.google.com/webstore/detail/google-analytics-debugger/jnkmfdileelhofjcijamephohjechhna), when switched on, floods your browser console with useful information about what is being tracked. You’ll know it’s working when you see the ASCI-Art headings in your Console.

```
                         _                          _       _   _
                        | |                        | |     | | (_)
  __ _  ___   ___   __ _| | ___    __ _ _ __   __ _| |_   _| |_ _  ___ ___
 / _` |/ _ \ / _ \ / _` | |/ _ \  / _` | '_ \ / _` | | | | | __| |/ __/ __|
| (_| | (_) | (_) | (_| | |  __/ | (_| | | | | (_| | | |_| | |_| | (__\__ \
 \__, |\___/ \___/ \__, |_|\___|  \__,_|_| |_|\__,_|_|\__, |\__|_|\___|___/
  __/ |             __/ |                              __/ |
 |___/             |___/                              |___/
```

You’ll see an entry for each command and data layer event that occurs on the page. It’s similar in raw information goodness to the [Adobe Analytics debugging trick](/blog/2019/09/debugging-adobe-analytics/), but often this is the detailed view you need to understand your tracking.

## Tag Assistant

Notching things up a bit in terms of usability, [Tag Assistant by Google](https://get.google.com/tagassistant/) analyses your analytics and tags and displays information in a nice user interface, which also highlights problems and optimisations. You can drill into each tag to see more information, which is neatly organised for you.

:::div{.inset}
:img{src="/img/2019/10/tag-assistant-by-google.jpg" alt="The main screen of Tag Assistant by Google" loading="lazy"}
:::

When there is a problem, it is made obvious with colour coding and icons and although you’ll have to work out the exact source of the issue, the issue itself is typically very well described.

## Omnibug Tag Debugger

The [Omnibug Tag Debugger](https://chrome.google.com/webstore/detail/omnibug/bknpehncffejahipecakbfkomebjmokl) undertakes a similar role to the Tag Assistant, but in this case it is making each tracking event visible in a neat and tidy way. The results are shown as an additional tab in your browser tools. You can capture the information per-request, or across a visit and it’s easy to drill into a specific event to see the data.

I have found this extension to be particularly useful for Google Analytics and Adobe Analytics, though it works across analytics providers.

:::div{.inset}
:img{src="/img/2019/10/omnibug.jpg" alt="Omnibug" loading="lazy"}
:::

Apologies for the incredibly data-scrubbed screenshot, but hopefully you get the idea.

## Other extensions

There are myriad other extensions out there, but many of them overlap on what you can get from these reputable sources. If you think I’ve missed an analytics browser extension that offers something unique in this space, please [let me know so I can try it out](/contact/).
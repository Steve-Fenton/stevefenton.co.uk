---
layout: src/layouts/Default.astro
title: 'Browser Extension: Link Reporter'
navMenu: false
pubDate: 2022-03-07
modDate: 2022-10-15
keywords: browser extension,links reporter
description: 
authors:
    - steve-fenton
categories:
    - Browsers
tags:
    - Chrome
    - Edge
---

I needed to grab a report of all hyperlinks on a web page, so I wrote a browser extension to do it. The extension creates a CSV file containing links, link text, and page sections.

:::figure{.inset}
:img{src="/img/2022/03/link-reporter-edge-extension.jpg" alt="Link reporter in the extension store"}
:figcaption[Link Reporter extension]
:::

The extension is available for free in both Edge and Chrome marketplaces.

- [Get LinkReporter from the Edge store](https://microsoftedge.microsoft.com/addons/detail/linkreporter/fjcjpdljldimcgcinebaopphlnoegfng).
- [Get LinkReporter from the Chrome Store](https://chrome.google.com/webstore/detail/linkreporter/mkfnghikdmejcicolbcdmfdfbkbhmefl).

## How to use Link Reporter

:::figure{.inset}
:img{src="/img/2022/03/using-link-reporter.jpg" alt="Click on the LinkReporter icon in the browser toolbar and the report will download" loading="lazy"}
:figcaption[Link Reporter icon in the toolbar]
:::

Once you’ve installed the extension:

1. Open any web page that you want to get a link report for
2. Click the Link Reporter icon
3. A CSV file will download into your usual folder, open it to see the report

:::figure{.inset}
:img{src="/img/2022/03/example-report.png" alt="Example report from Link Reporter" loading="lazy"}
:figcaption[CSV report]
:::

The report contains the following information:

- Section Path – this is the path based on sectioning elements. This is used to help you group the links and filter out those that aren’t interesting for the report, for example, the primary navigation
- Link Text – this is the raw text for the link; if you have used an image there will be nothing here
- Destination – the destination address for the link

## Summary

Link Reporter is a quick way to get a list of links from any web page.
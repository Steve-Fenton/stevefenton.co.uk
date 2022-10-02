---
id: 12808
layout: src/layouts/Default.astro
title: 'Browser Extension: Link Reporter'
pubDate: 2022-03-07T16:13:36+00:00
author:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=12808'
permalink: /2022/03/browser-extension-link-reporter/
categories:
    - Browsers
tags:
    - chrome
    - edge
---

I needed to grab a report that listed all hyperlinks on a web page, so I wrote a browser extension to do it for me.

[![Link reporter in the extension store](https://www.stevefenton.co.uk/wp-content/uploads/2022/03/link-reporter-edge-extension-1024x158.jpg)](https://www.stevefenton.co.uk/2022/03/browser-extension-link-reporter/link-reporter-edge-extension/)

Get [LinkReporter in the Edge store](https://microsoftedge.microsoft.com/addons/detail/linkreporter/fjcjpdljldimcgcinebaopphlnoegfng).

Grab [LinkReporter in the Chrome Store](https://chrome.google.com/webstore/detail/linkreporter/mkfnghikdmejcicolbcdmfdfbkbhmefl).

### How to use Link Reporter

[![Click on the LinkReporter icon in the browser toolbar and the report will download.](https://www.stevefenton.co.uk/wp-content/uploads/2022/03/using-link-reporter-1024x236.jpg)](https://www.stevefenton.co.uk/2022/03/browser-extension-link-reporter/using-link-reporter/)

Once you’ve installed the extension:

1. Open any web page that you want to get a link report for
2. Click the Link Reporter icon
3. A CSV file will download into your usual folder, open it to see the report

[![Example report from Link Reporter](https://www.stevefenton.co.uk/wp-content/uploads/2022/03/example-report-1024x640.png)](https://www.stevefenton.co.uk/2022/03/browser-extension-link-reporter/example-report/)

The report contains the following information:

- Section Path – this is the path based on sectioning elements. This is used to help you group the links and filter out those that aren’t interesting for the report, for example, the primary navigation
- Link Text – this is the raw text for the link; if you have used an image there will be nothing here
- Destination – the destination address for the link

### Summary

This is a quick way to get a list of links from a web page, organised by section path.
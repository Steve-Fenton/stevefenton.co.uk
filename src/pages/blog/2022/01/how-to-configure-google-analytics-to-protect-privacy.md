---
layout: src/layouts/Default.astro
navMenu: false
title: 'How to configure Google Analytics to protect privacy'
pubDate: 2022-01-31T12:04:07+00:00
authors:
    - steve-fenton
categories:
    - Analytics
tags:
    - 'google analytics'
---

There are a couple of settings you can use in Google Analytics to help your users keep their data private. One of the issues currently affecting Google Analytics is the transfer of data to the US, where there are laws that permit state actors access to the information in ways that are not legal in respect of EU citizens. A recent court case in Austria made the headlines because the data being transferred was sufficient to identify an individual.

There are two features to be cautious about, not just for legal reasons, but also because you have reasonable moral and ethical standards. Even Google is switching on one of these by default in Google Analytics v4.

Here’s the settings, the description comes after.

```
<pre class="prettyprint lang-javascript">
gtag('config', 'UA-12345678-0', { 'anonymize_ip': true });
gtag('set', 'allow_ad_personalization_signals', false);
```
The first of these, `anonymize_ip` removes the final octet IPv4 addresses and the last 80 bits of IPv6 addresses. It does this in-memory before anything is written to disk. Following the court case, this has become a mandatory setting. In Google Analytics v4 it is switched on by default, which suggests Google are taking this seriously.

The second line, `allow_ad_personalization_signals` tells Google to omit the associated data from ad personalisation features. If you are performing this processing based on user consent, you should apply this setting until consent has been obtained.
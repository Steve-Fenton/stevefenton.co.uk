---
title: How to configure Google Analytics to protect privacy
navMenu: false
pubDate: 2022-01-31
modDate: 2022-10-16
keywords: google anlaytics,privacy
description: Find out how to set Google Analytics settings to protect user privacy.
authors:
    - steve-fenton
categories:
    - Analytics
tags:
    - Google
---

Since this article was written, several high-profile cases have brought us to an impasse with Google Analytics. Some courts have found the data transfer to the US to be untenable, given the nature of some of the data being collected. Google's additional privacy controls may not be enough to bring Google Analytics into compliance with privacy laws.

For this reason, double-check with your legal folks to ensure your analytics strategy is permitted in the territories you operate.

## Google Analytics settings

You can use a couple of settings in Google Analytics to help your users keep their data private. One of the issues currently affecting Google Analytics is the transfer of data to the US, where laws permit state actors access to the information in ways that are not legal in respect of EU citizens. A recent court case in Austria made headlines because the data being transferred was sufficient to identify an individual.

Here are the privacy controls you can set for Google Analytics:

```javascript
gtag('config', 'UA-12345678-0', { 'anonymize_ip': true });
gtag('set', 'allow_ad_personalization_signals', false);
```

The first of these, `anonymize_ip` removes the final octet from IPv4 addresses and the last 80 bits from IPv6 addresses. It does this in memory before anything is written to disk. Following the court case, this has become a mandatory setting. In Google Analytics v4 it is switched on by default.

The second line, `allow_ad_personalization_signals`, tells Google to omit the associated data from advertising personalisation features. If performing this processing based on user consent, you should apply this setting until consent has been obtained.

The Google Analytics situation in Europe is ongoing, with courts still not happy that Google's privacy options satisfy the privacy requirements set in EU law.
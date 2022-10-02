---
layout: src/layouts/Default.astro
navMenu: false
title: 'Rate-limiting Googlebot across many websites'
pubDate: 2020-12-31T06:00:32+00:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - 'rate limiting'
    - 'web crawlers'
---

Googlebot is one of the good guys. It will check your robots.txt file and respect any crawl delays you’ve asked it to use. However, if you run hundreds or thousands of websites across your infrastructure you can encounter waves of Googlebot traffic due to it coincidentally selecting many of your websites to crawl at the same time. While each website gets a small volume of traffic, your total traffic can spike massively.

[![Graph showing waves of Googlebot traffic](/img/2020/12/googlebot-traffic-waves.jpg)](/2020/12/rate-limiting-googlebot-across-many-websites/googlebot-traffic-waves/)

In the above graph, spikes of over 100k requests per hour were recorded from Googlebot in addition to all the normal website traffic. It looks like an attack, but it’s just coincidental concurrent crawls. If only there was a way to train Googlebot not to flood shared infrastucture when lots of websites run on it?

### HTTP 429: Too Many Requests

Enter the HTTP 429 status code. This is a mechanism to tell a requestor that they are making too many requests. You can keep track of Googlebot requests against the specific Googlebot user agent and give it 429 status codes when the rate gets too high.

When you respond with HTTP 429 status codes, the Googlebot peaks dimish out over time.

[![Chart showing Googlebot peaks diminishing over time](/img/2020/12/googlebot-responding-to-http-429-over-a-week.jpg)](/2020/12/rate-limiting-googlebot-across-many-websites/googlebot-responding-to-http-429-over-a-week/)
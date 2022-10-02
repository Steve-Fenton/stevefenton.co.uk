---
id: 501
layout: src/layouts/Default.astro
title: 'RDFa vs Microdata for SEO'
pubDate: 2013-10-09T10:46:56+01:00
author:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=501'
permalink: /2013/10/rdfa-verses-microdata-for-seo/
interface_sidebarlayout:
    - default
categories:
    - Programming
tags:
    - microdata
    - rdfa
---

I’m not a big fan of the <abbr title="Search Engine Optimisation">SEO</abbr> industry, mostly because of those utter crooks who constantly spam us all about it – but I do understand that any serious business will be concerned about being found online. I always try to steer people towards creating amazing content that real people will love, rather trying to play games with search engines. We all prefer a personal recommendation over a page of listings in the Yellow Pages when we need a plumber and real people sharing your content means a lot more than a search engine telling people you match a search.

So enough with the disclaimer. Ethical SEO is a real concern for people and so the question of RDFa verses Microdata is bound to come up. It actually did come up in a discussion I had with a friend who cranks out ace web front-ends.

The general opinion in respect to SEO was that Microdata would be better because Google support it – but I was concerned that, while RDFa is a W3C recommendation, Microdata is still a draft (and there is a lot of debate about whether it adds anything that RDFa cannot already do).

So I did the homework and found out the answer. Google supports both RDFa and Microdata. You can test it for yourself on [Google’s Stuctured Data Testing Tool (example using my Recommended Reading Page)](https://search.google.com/structured-data/testing-tool#url=https%3A%2F%2Fwww.stevefenton.co.uk%2Fpublications%2Frecommended-reading%2F).

So don’t base your decision on RDFa verses Microdata on Google support – it happily uses both (as it should as Google want to give search users the best possible results).

You can see examples of [how to add Microdata](https://www.stevefenton.co.uk/2012/11/How-To-Add-Microdata-To-Your-Website/) and [how to add RDFa](https://www.stevefenton.co.uk/2012/11/How-To-Add-RDFa-Lite-To-Your-Website/) in my previous blogs – they are both easy to use and you can use the same schemas for them both too.

My recommendation (as of today) would be to use RDFa as the specification is more mature and less at risk in terms of changes or indeed being dropped entirely. If the Microdata specification ends up in “W3C recommendation” state, it will become personal preference (perhaps depending on what other search engines implement, given Google allows both).
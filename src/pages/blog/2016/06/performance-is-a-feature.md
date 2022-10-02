---
layout: src/layouts/Default.astro
navMenu: false
title: 'Performance is a feature'
pubDate: 2016-06-18T21:36:52+01:00
author:
    - steve-fenton
medium_post:
    - 'O:11:"Medium_Post":11:{s:16:"author_image_url";s:75:"https://cdn-images-1.medium.com/fit/c/400/400/1*eXkhfEuF41g5W_xnc_ydLA.jpeg";s:10:"author_url";s:38:"https://medium.com/@steve.fenton.co.uk";s:11:"byline_name";N;s:12:"byline_email";N;s:10:"cross_link";s:3:"yes";s:2:"id";s:12:"7941dfe1f9e1";s:21:"follower_notification";s:3:"yes";s:7:"license";s:19:"all-rights-reserved";s:14:"publication_id";s:2:"-1";s:6:"status";s:5:"draft";s:3:"url";s:51:"https://medium.com/@steve.fenton.co.uk/7941dfe1f9e1";}'
categories:
    - Process
    - Programming
tags:
    - cranked
    - performance
---

The phrase “performance is a feature” is not new. If you get it, leave now and go read something new. I am certain nothing I’m about to type is novel.

So here is the thing. [Cranked](https://www.stevefenton.co.uk/publications/cranked/) was hugely influenced by [XP](https://www.amazon.co.uk/Extreme-Programming-Explained-Embrace-Change/dp/0201616416), it had major differences too – but one of the biggest headlines was Kent Beck’s idea that:

> …business people make business decisions and technical people make technical decisions…

There is something important in this statement; it creates an excellent symmetry to the messy business of software development.

The business ask for a feature. The business pay for the feature. The business feel the pain of their own decisions. The technical team are equally subject to the pleasure or pain of their technical decisions. If the business dictated a technical decision (for example, you *must not* use that new database technology because we are scared of it), they would breach the symmetry because the pain would primarily be felt by the technical team. Similarly, if the technical team made a business decision (we will deliver an awesome log in page, rather than the payment page the business want), they would be damaging the symmetry of decision making by hurting the business – who really need that payment page.

When it comes to performance, the business needs to work out what they need and how much they are willing to invest to get it. It should be their [Impact Map](https://www.impactmapping.org/) that says “Reduce Page Load Times by Two Seconds”. *How* this is achieved would be a technical decision (maybe we’ll throw more hardware at the problem, maybe we’ll solve it with code).

Performance is one of those areas that you could spend an infinite amount of time on, so failing to recognise it as a business interest could mean either chronic under-investment in it – or massive amounts of invisible over-spending if the technical team have placed too much emphasis on it.

Businesses like Stack Exchange, Google, and Amazon know that performance has immense business value – because they tested the outcomes caused by tiny differences in page load times. They know that speed is a competitive advantage. They are happy to invest money in speed to keep that advantage, but the cost and benefits need to be visible to ensure the level of funding is appropriate.
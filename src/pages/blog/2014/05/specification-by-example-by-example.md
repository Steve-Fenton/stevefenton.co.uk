---
layout: src/layouts/Default.astro
navMenu: false
title: 'Specification by example&#8230; by example'
pubDate: 2014-05-07T22:15:36+01:00
author:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=355'
interface_sidebarlayout:
    - default
medium_post:
    - 'O:11:"Medium_Post":11:{s:16:"author_image_url";s:75:"https://cdn-images-1.medium.com/fit/c/400/400/1*eXkhfEuF41g5W_xnc_ydLA.jpeg";s:10:"author_url";s:38:"https://medium.com/@steve.fenton.co.uk";s:11:"byline_name";N;s:12:"byline_email";N;s:10:"cross_link";s:3:"yes";s:2:"id";s:12:"d73ca3b4f507";s:21:"follower_notification";s:3:"yes";s:7:"license";s:19:"all-rights-reserved";s:14:"publication_id";s:2:"-1";s:6:"status";s:5:"draft";s:3:"url";s:51:"https://medium.com/@steve.fenton.co.uk/d73ca3b4f507";}'
categories:
    - Process
---

I was sat quietly, contemplating software development when I noticed a sign on the wall. The sign was instructional and probably placed after some problem had occurred. It was essentially a requirement for customers of the coffee shop, such as me.

The requirement was absolutely clear. It read:

> Please only put toilet tissue down the toilet.

![Specification by Example](/img/2015/07/specification-by-example-by-example.jpg)

The Original Requirement!

As far as I was concerned, this is an entirely unambiguous statement. I had read it just in time. After quietly using the unorthodox method that this required of squatting in the corner to do my business, I quietly placed only toilet tissue down the toilet and flushed.

Although it was uncomfortable and not a technique I would ever use at home, I had stuck faithfully to the requirement. Job done.

And this is why we need Specification by Example. Instead of stating “please only put toilet tissue down the toilet”, a specification workshop would almost certainly have resulted in the following examples:

| Item | Allowed Down The Toilet |
|---|---|
| Toilet Tissue | Yes |
| Number 1s | Yes |
| Number 2s | Yes |
| Kitchen Paper | No |
| Newspapers | No |
| Mobile Phones | No |

And suddenly all of the assumptions, errors and ambiguities in the original requirement are gone and we have a sensible concrete idea about what is really allowed or disallowed.

So this is my Specification by Example by Example.

If you aren’t already following Gojko Adzic, look him up or even buy his excellent book [Bridging the Communication Gap](https://www.amazon.co.uk/Bridging-Communication-Gap-Specification-Acceptance/dp/0955683610), which is all about this subject.
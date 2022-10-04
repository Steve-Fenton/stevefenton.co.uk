---
layout: src/layouts/Default.astro
title: 'Specification by example by example'
navMenu: false
pubDate: 2014-05-07T22:15:36+01:00
authors:
    - steve-fenton
categories:
    - Process
---

I was sat quietly, contemplating software development when I noticed a sign on the wall. The sign was instructional and probably placed after some problem had occurred. It was essentially a requirement for customers of the coffee shop, such as me.

The requirement was absolutely clear. It read:

> Please only put toilet tissue down the toilet.

:img{src="/img/2015/07/specification-by-example-by-example.jpg" alt="Specification by Example"}

The Original Requirement!

As far as I was concerned, this is an entirely unambiguous statement. I had read it just in time. After quietly using the unorthodox method that this required of squatting in the corner to do my business, I quietly placed only toilet tissue down the toilet and flushed.

Although it was uncomfortable and not a technique I would ever use at home, I had stuck faithfully to the requirement. Job done.

And this is why we need Specification by Example. Instead of stating “please only put toilet tissue down the toilet”, a specification workshop would almost certainly have resulted in the following examples:

| Item          | Allowed Down The Toilet |
|---------------|-------------------------|
| Toilet Tissue | Yes                     |
| Number 1s     | Yes                     |
| Number 2s     | Yes                     |
| Kitchen Paper | No                      |
| Newspapers    | No                      |
| Mobile Phones | No                      |

And suddenly all of the assumptions, errors and ambiguities in the original requirement are gone and we have a sensible concrete idea about what is really allowed or disallowed.

So this is my Specification by Example by Example.

If you aren’t already following Gojko Adzic, look him up or even buy his excellent book [Bridging the Communication Gap](https://www.amazon.co.uk/Bridging-Communication-Gap-Specification-Acceptance/dp/0955683610), which is all about this subject.
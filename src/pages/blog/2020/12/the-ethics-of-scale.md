---
layout: src/layouts/Default.astro
title: The ethics of scale
navMenu: false
pubDate: 2020-12-03T06:00:37+00:00
authors:
    - steve-fenton
categories:
    - Automation
tags:
    - ethics
    - scale
---

One of the tenets of automation is that while you can produce stuff faster, your mistakes will happen at the same speed. You might replace manually updating 100 files with a process that updates them all in the blink of an eye… but what if it updates more files than you intended. In developer terms, it’s a `DELETE FROM` with a missing `WHERE` clause. Errors happen at the speed of automation. But what about scale? Why does this become an ethical issue?

Let’s imagine you are a business-to-business company selling some tech product. You have 200 customers. You intend to notify a subset of about a quarter of these customers that they need to make a change to remain compatible with a new version of your system. By mistake, you inform all 200. You did a `SEND` without a `FILTER`. Oops.

We could calculate the human cost of this in terms of hours lost.

200 customers were contacted, but only 50 should have been. That’s 150 customers multiplied by the loss of time – let’s say an hour each. 150 hours burned. Bad, not terrible.

Now imagine this at scale. You’re a massive company. You could be contacting a million customers by mistake. That’s a million hours burned. That’s now a crime against humanity. This is where scale requires some additional controls or checks before you start burning through millions of hours of people’s time.
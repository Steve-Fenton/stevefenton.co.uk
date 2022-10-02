---
layout: src/layouts/Default.astro
navMenu: false
title: 'Analytics are lossy and that&#8217;s okay'
pubDate: 2019-06-12T07:50:13+01:00
author:
    - steve-fenton
categories:
    - Analytics
---

This is the latest in my flurry of articles on [analytics](https://www.stevefenton.co.uk/category/analytics/), which have all come from various questions and misconceptions about what analytics are, what they are for, and how they work. Today, I’m going to explain that analytics are lossy, what that means, and why it’s okay. Let’s define what we mean by “lossy”.

### Lossy

The term lossy comes from the world of compression. When you compress an image of a cat using lossy-compression, it will lose some fidelity. You can still tell it’s a cat, it’s just not as perfect as it once was. You can also compress your feline pictures using lossless compression, which means you preserve the fidelity. So, lossy just means it loses some detail.

Analytics is lossy. There are a whole host of reasons the transmission of analytics data might fail. Browsers can block tracking code. Analytics may depend on JavaScript, which can be disabled. The user may navigate away before analytics have been transmitted, or close their browser. They might be one of the 4.5% of people who have “do not track” enabled. Their battery might go flat. They might speed into a tunnel. There might be a problem over the network sending the data, or with the servers and applications that collect and record the data. Some analytics tools perform sampling, which means they don’t even attempt to store every single piece of data, just a percentage of it.

Importantly, many of the factors that will prevent your analytics from making it into your monthly report are outside of your control. Breath deeply. There is no analytics platform that will give you guaranteed delivery of analytics data, and you wouldn’t want to use any platform that did… because the provider misunderstands the purpose of analytics.

![Analytics are Lossy](https://www.stevefenton.co.uk/wp-content/uploads/2019/06/analytics-are-lossy.jpg)

### Lossy analytics in practice

Let’s take an example of a contact form on your website. When someone submits the form, you want to guarantee that the message reaches its destination, so you ensure the message is placed on a reliable queue before you confirm receipt to the user. The user will wait for 1,000 milliseconds to get this confirmation because they also want to guarantee the message will be delivered. There is an overhead in terms of architecture, cost, and time in this process.

You’ll also want to generate some kind of analytics event each time someone submits a form on your website. This will not be guaranteed, but that’s okay. Nobody wants to ask a user to retry the analytics transmission each time it fails, or prevent them navigating away or closing their browser.

You can add an event to the “submit” button click. You might find you register more click events than you get form submissions. Where the submission fails for some reason, and the user must re-try the submission, you’ll get two events for a single form submission.

So, a better option is to add an event to the “success” of the form submission. You are likely to find you gather less events than you get real submissions, but the number will be indicative of the truth. What I mean by that is this… when you look at the trends, they will give you the insights you need.

(An even better option is to record the attempts and the successes, you might be surprised at the difference!)

If you collect analytics across multiple platforms, you’ll find that their numbers don’t match… but, once again, the trends will align. This isn’t the only reason the numbers won’t match, because things like “unique visitor” and “visit” are all counted in subtly unique ways by each provider anyway.

### Big numbers

When you analyse your conversion rate across hundreds-of-thousands of visits, it doesn’t matter if a visit isn’t counted occasionally, or a conversion isn’t counted occasionally. The exact number at any single point in time is unimportant, you want to see the trends over longer periods of time. Let’s throw together a quick metaphor.

You are stood at the main entrance to a massive music venue. There are two bands on tour together and they are alternating the headline slot. You are tasked with finding out the split between fans of Greenday and fans of Deep Purple.

A simple way to do this would be to tick a check-sheet based on whether each fan is wearing a green t-shirt, or a purple t-shirt. For anyone smothered in a black turtle-neck, you can collect an unknown tick. It is a reasonable assumption that visible pride in your favorite band is felt equally by fans of both bands, so you don’t expect Greenday fans to be either more or less likely to wear a band tee than Deep Purple fans.

At the end of the night, you collected 600 Greendays and 400 Deep Purples. Are the fans split 60/40 in favour of Greenday? It is likely that they are… even though there were 1,500 people attending and you only measured 1,000 of them.

That’s why it’s okay that analytics are lossy. They were lossy before computers and they are lossy after computers… and it never stopped us learning valuable insights from the data we collected.
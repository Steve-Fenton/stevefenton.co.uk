---
title: 'Auto-reject data processing'
navMenu: false
pubDate: 2023-04-02
keywords: reject,data,processing
description: A little script to untick all those pesky legitimate interest tick boxes.
bannerImage:
    src: /img/topic/data/data-processing.jpg
    alt: Loads of tick boxes with no option to remove them all
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - JavaScript
---

Everyone should have a fundamental right to privacy. One of the best things about the European Union is the right to privacy is baked right into the [Charter of Fundamental Rights of the European Union](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:12012P/TXT) as part of the freedoms. We may regret losing this in the UK one day.

As annoying as you find those *consent notices* that now pop up on every website, just remember that:

1. A website only needs to show you that notice if they storing, processing, and sharing your personal data
2. Before the law, they just did this without telling you

## Consent notices (sometimes incorrectly called cookie consent)

When you open a web page, there really is no reason to be shown a consent notice. You should be able to read the page and move on with your life.

The reason this simple experience isn't possible is mostly advertising related. Advertising has always been targeted to some extent. If you advertised on television, you might pick a specific ITV region so the advertising would be shown to people who were in the right area to use your business. However, the ad business really now wants to advertise to you in highly specific ways.

To build a detailed profile of you to power precision-targeted ads, they want to track everything you do - even on websites that don't display adverts or buy advertising.

A single website couldn't create a police-style file on you, so they also want to share your information across many sources and match up files from different sources to create an ultra-file. If you have a detailed social network profile, people will pay to find out where you went to school, who your friends are, how much you earn... it's like a detective compiling a detailed account of your movements, except you haven't done anything wrong, they aren't detectives, and the information shouldn't be collected, stored, or shared.

Not all territories have laws to protect you. Europe does. Thank goodness for the GDPR.

This is why we have annoying consent notices, though they range from the by-the-book one-click Accept/Reject to a range of more shady attempts to hide what they are doing or to prevent you from rejecting the processing.

One technique, in particular, is very popular with shifty websites. The barrage of tick-boxes.

:img{ src="/img/topic/data/data-processing.jpg" alt="Loads of tick boxes with no option to remove them all" loading="lazy" }

It's not legal for the "consent" boxes to be auto-ticked, but the legitimate interest boxes often are. There *ought* to be an untick-all option. Often there isn't.

## Automatically unticking all the boxes

This one-line script can be copied and pasted into your browser tools to untick all the checkboxes on a page. It just unticks everything. This is a useful shortcut when faced with a shady consent tool.

```javascript
document
    .querySelectorAll('input[type=checkbox]')
    .forEach((tb) => tb.removeAttribute('checked'));
```

This isn't going to work in all cases. There are even darker patterns than the checkbox barrage. A consent notice may be coded to thwart scripts like this by making checkboxes using non-interactive elements. They might hide the legitimate interest processing in another tab that isn't loaded until you open it. In some cases, no matter what you select they will still process your information the same way.

At some future point, there will be a "PPI scandal" for consent and legitimate interest shenanigans, but for now, you have to be vigilant.

If you ever find yourself thinking of "giving up and hitting *accept all*" because the consent notice is *that* bad... I implore you to close the tab and look elsewhere instead.

## Summary

If you are in a location that has laws to protect your privacy, please don't complain about consent notices and red tape. The alternative is unfettered profile building. You know how your password for some website got leaked, and you had to change it? Well, imagine what will happen when these profiles get leaked.

If a site doesn't let you choose between *accept* and *reject all*, they are already shifting towards dark patterns. If you are forced to untick 50+ check boxes, they are a long way down the path to full shady behavior. Use the script, but consider taking more direct action... like closing the website down and heading elsewhere.
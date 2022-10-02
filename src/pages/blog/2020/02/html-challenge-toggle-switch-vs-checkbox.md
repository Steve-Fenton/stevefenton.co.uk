---
layout: src/layouts/Default.astro
navMenu: false
title: 'HTML Challenge: Toggle Switch vs Checkbox'
pubDate: 2020-02-16T19:39:45+00:00
author:
    - steve-fenton
categories:
    - Programming
tags:
    - html
    - usability
---

The toggle switch has very suddenly become a ubiquitous feature of web user interfaces. You can’t hardly fill in an HTML form these days without finding one; especially as 99% of forms we now fill in are concerned with “cookie consent”. Why isn’t the toggle switch a first-class citizen of HTML, you may ask… to which the only reply is that it kind-of-is and it’s called a checkbox.

So, should the humble checkbox be supplanted by a slidey-toggle switch? Let’s find out.

### Visuals

Let’s take a look at the toggle switch control:

![Toggle Switch Control](https://www.stevefenton.co.uk/wp-content/uploads/2020/02/toggle-example.jpg)

And the checkbox:

![Checkbox Control](https://www.stevefenton.co.uk/wp-content/uploads/2020/02/checkbox-example.jpg)

Both of these user interface elements sever the same purpose. They select on of two states. You can call it on and off, ticked and un-ticked, or yes and no.

### User perspective

Although both of these controls are seemingly identical in purpose, I uncovered an “it made me think” moment when looking at an example. The example was “on” when the switch was on the left and this felt wrong somehow. The creator must have thought this was the intuitive direction for \[on – off\], but a strange intuition told me \[off – on\] was more natural.

To find out, I asked The Internet via a poll and found out that things were mostly in favour of the latter.

![92.3 % of users say "on" is on the right](https://www.stevefenton.co.uk/wp-content/uploads/2020/02/toggle.jpg)

92.3% of respondents said that “on” was on the right.

This might be enough to make you conclude your experiment and fix your decision. It’s well past the point of a majority… but is that enough? Not for me. I’m about to implement this control on a web estate that gets well-over eight million visitors a year. Accepting a 7.7% failure rate would mean over 600,000 people being confused. Small percentages on big numbers can matter a great deal, as we discovered when we thought about [making websites work without JavaScript](https://www.stevefenton.co.uk/2011/08/why-it-is-still-important-for-a-page-to-work-without-javascript/).

To plan a course of action, we need to know how well a toggle switch performs relative to a checkbox; so I asked The Internet again.

![100% of people consider a ticked checkbox to be "on".](https://www.stevefenton.co.uk/wp-content/uploads/2020/02/checkbox.jpg)

100% of respondents said that “on” is ticked.

By using a checkbox instead of a toggle switch, I help over 600,000 users. When you consider that there are left-to-right and right-to-left languages, which might make the toggle even more confusing – we could be on to something with checkboxes.

### Technical perspective

The toggle switch was clearly worse than a checkbox when it comes to usability. Not everyone understood what state means “on”. We could add text-labels, instructions, or colours to try and assist users; but we could do this with a checkbox too. A toggle that turns from red to green doesn’t work in all cultures, or for colour-blind users, or for non-visual users.

While we’re on the subject, what other features of a toggle switch might be a problem? Well, it turns out that what you can do very well in two elements (an input and a label) is rather tricky to do well with a toggle. To make a toggle switch fully accessible, you need a reasonable chunk of HTML and CSS, with a little JavaScript to ensure it *properly* works for everyone. Making your own HTML form controls is a significant challenge.

Our solution was five-elements, a function, and a loop around a DOM query to add event handlers. We also needed four CSS blocks. It was a significant investment, but your screen-reader would handle it correctly and you could use a multitude of input devices to toggle it.

### Visual stimulation

Toggle switches tickle that same visual stimulation itch that causes so many people to use [pie charts, even though they are bad](https://www.stevefenton.co.uk/2009/04/pie-charts-are-bad/). As of 2020, I have a full three pages on the subject of [pie charts and similar visual stimulants](https://www.stevefenton.co.uk/category/pie-charts/) if you want to find out more about that issue.

The question is, why do we need to make form elements more appealing? It doesn’t make them easier to understand or easier to use, so who exactly is the trend of toggles serving? Perhaps it is just another case of someone trying to copy something they found on their mobile phone.

![Android Toggle Switch](https://www.stevefenton.co.uk/wp-content/uploads/2020/02/Screenshot_20200216-192733.png)

### And so…

Before you decide to seek a toggle switch implementation online, beware of charging lemming-like towards what seems to be clearly the wrong solution. Not only will a group of users find the control confusing, if you implement it poorly you will effectively exclude a whole host of users who don’t happen to have the same set of abilities you do.

Form controls are not an area that benefit much from novelty. Boring and predictable forms are just easier to use. That’s not to say you can’t style up your form elements beautifully to make the experience even better; just think it through before you chuck out all the years of thought that have gone into creating globally-recognisable widgets that work for everyone.
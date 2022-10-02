---
layout: src/layouts/Default.astro
navMenu: false
title: 'Column charts can lie too'
pubDate: 2012-03-11T16:29:09+00:00
author:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=827'
interface_sidebarlayout:
    - default
categories:
    - 'Pie Charts'
tags:
    - data
    - visualisation
---

My [views on pie charts](/2009/04/pie-charts-are-bad/) are well known, but that isn’t to say that all other charts are good. The problem with pie charts is that they make it hard to understand information, but with many other charts, the problem is how people use sneaky tricks to deceive you.

Whether it is a strange use of 3D perspective to distract your eye from a downturn in a stock price or a naughty use of a double-scaled axis to make things look more similar than they really are, the tricks are almost everywhere you look. It is strange really, because they are so prevalent you might think that they are perfectly acceptable.

Take, for example, the following column chart, which featured in a party political broadcast.

![Cheating Chart](/img/2015/07/cheating_chart1.jpg)

The message is clearly “look how much we are planning to invest in the NHS over the next few years”. And yes, the last column is 14 times bigger than the first column – so that must be a massive investment right?

Well, not quite. What we have here is a classic trick. The chart starts from £100 billion, which means that almost all of the values are hidden below the axis. This makes each increment look far bigger than it actually is. If the chart was being 100% honest, it would look more like this:

![Honest Chart](/img/2015/07/honest_chart1.jpg)

As you can see, the increase of NHS budget isn’t quite as big as you might have believed. As a summary, they are making less than a 2% increase each year and that isn’t very much – especially once inflation has reduced the value of this money.

So keep an eye out whenever someone presents you with information in graphical form. Try to spot any tricks or feints that might be designed to fool you.

As an aside, it isn’t always dishonest to start a chart above the zero-line. If the purpose of a chart is to highlight a small movement, the information would actually be hidden if the chart started at zero. So if the narrative is “look at this interesting trend that you can only see if we zoom in”, it is acceptable to start wherever you need to in order to make the blip visible.
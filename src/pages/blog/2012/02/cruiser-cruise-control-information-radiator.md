---
layout: src/layouts/Default.astro
navMenu: false
title: 'Cruiser: Cruise Control information radiator'
pubDate: 2012-02-22T16:51:14+00:00
author:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=851'
interface_sidebarlayout:
    - default
categories:
    - Programming
tags:
    - .net
    - 'c#'
    - html
    - javascript
---

![Cruise Control Radiator](https://www.stevefenton.co.uk/wp-content/uploads/2015/07/cctray_radiator-300x224.jpg)I work on a team that uses [CruiseControl.Net](http://cruisecontrolnet.org/) for Continuous Integration. There is a handy task-bar utility called CCTray that provides notifications and status messages when builds run, pass and fail. What it doesn’t have is a nice information radiator / visualisation for your team wall-board.

What you really need is a big display that makes it really obvious when a build breaks, so I sketched out a quick idea of some big square boxes to represent each project that change colour and display some kind of “epic fail” icon when something goes wrong.

I’m not a designer, but the main design considerations were to make something that worked at any size, made it really obvious when something was broken. With two people on the team with colour-blindness, colour choice was important – but it was also important to avoid solely using colour to denote a broken build.

So I have thrown together the first draft of [“Cruiser” a Cruise Control information radiator](https://github.com/Steve-Fenton/Cruiser), written in HTML and JavaScript and intended to be dropped into the CruiseControl web-dashboards folder. I have got loads of items on the to-do list for this mini-app, but the first draft is fully functional.

Feel free to use it, but please bear in mind that it is a work in progress. You only need a single file on your server, which contains all the HTML, JavaScript, CSS and images (it only loads once and then polls using AJAX) so its really easy to install.

The display fills the available screen, so it works at virtually any size from a small window on your developer machine to a massive plasma screen on the wall in the dev room, normal browser features like zoom and full-screen work just fine.

![Cruiser - CC.NET Build Status](https://www.stevefenton.co.uk/wp-content/uploads/2015/07/cruiser.jpg)

And if you can’t wait to get back to the office to check your build status, you can check it whilst down the pub using your mobile phone.

![Cruiser on Mobile](https://www.stevefenton.co.uk/wp-content/uploads/2015/07/cruiser_mobile.jpg)
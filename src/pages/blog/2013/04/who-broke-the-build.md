---
id: 606
layout: src/layouts/Default.astro
title: 'Who broke the build?'
pubDate: 2013-04-24T15:05:56+01:00
author:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=606'
permalink: /2013/04/who-broke-the-build/
interface_sidebarlayout:
    - default
medium_post:
    - 'O:11:"Medium_Post":11:{s:16:"author_image_url";s:75:"https://cdn-images-1.medium.com/fit/c/400/400/1*eXkhfEuF41g5W_xnc_ydLA.jpeg";s:10:"author_url";s:38:"https://medium.com/@steve.fenton.co.uk";s:11:"byline_name";N;s:12:"byline_email";N;s:10:"cross_link";s:3:"yes";s:2:"id";s:12:"59103801664f";s:21:"follower_notification";s:3:"yes";s:7:"license";s:19:"all-rights-reserved";s:14:"publication_id";s:2:"-1";s:6:"status";s:5:"draft";s:3:"url";s:51:"https://medium.com/@steve.fenton.co.uk/59103801664f";}'
categories:
    - Process
    - Programming
---

![Cruiser - CC.NET Build Status](https://www.stevefenton.co.uk/wp-content/uploads/2015/07/cruiser.jpg)In an Agile software development area you’ll usually find lots of information in prominent places about the status of builds and tests. Whether it is a big screen acting as an information radiator that highlights a problem as soon as a build breaks or whether it is a siren and flashing lights that alerts everyone of a problem – build and test information is important.

The reason it is important is that we like to know that at any given moment we could ship our products.

Given the prominence of this information, you would be forgiven for falling into the blame trap… “If the builds are so important, we need to make sure nobody ever breaks them”.

This sometimes manifests itself humorously, a humiliating desk ornament or funny hat for the programmer who broke the build. Other times it can be “managerial” – keeping statistics on the programmers who most break the build. Either way, beware of the consequences.

In Extreme Programming Explained, Kent Beck makes it clear that the team should be working in a safe environment. They should be free to make mistakes, which are used to learn and grow. Embarrassing or chastising someone for breaking the build violates the safe environment.

You need to consider also the behaviour you are encouraging. If you set a context within which the most important thing is not breaking the build, this will become the goal of programmers. Of course, the easiest way to avoid breaking the build is to never check in any code.

So the build monitors and dashboards are there to highlight a problem fast, but nobody should ever be afraid of breaking a build.
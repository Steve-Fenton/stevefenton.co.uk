---
layout: src/layouts/Default.astro
navMenu: false
title: 'Updated testing pyramid'
pubDate: 2015-03-21T15:56:48+00:00
author:
    - steve-fenton

medium_post:
    - 'O:11:"Medium_Post":11:{s:16:"author_image_url";s:75:"https://cdn-images-1.medium.com/fit/c/400/400/1*eXkhfEuF41g5W_xnc_ydLA.jpeg";s:10:"author_url";s:38:"https://medium.com/@steve.fenton.co.uk";s:11:"byline_name";N;s:12:"byline_email";N;s:10:"cross_link";s:3:"yes";s:2:"id";s:12:"5bbb027008c0";s:21:"follower_notification";s:3:"yes";s:7:"license";s:19:"all-rights-reserved";s:14:"publication_id";s:2:"-1";s:6:"status";s:5:"draft";s:3:"url";s:51:"https://medium.com/@steve.fenton.co.uk/5bbb027008c0";}'
categories:
    - Automation
    - Process
tags:
    - testing
---

You can hardly spend five minutes talking about test automation without someone bringing up the [testing pyramid](http://martinfowler.com/bliki/TestPyramid.html). The testing pyramid was devised by Mike Cohn and it is a good foundation for thinking of test automation. Here is the original version.

![Classic Testing Pyramid](https://www.stevefenton.co.uk/wp-content/uploads/2015/07/testing-pyramid-original.png)

The pyramid says, do plenty of unit testing, quite a bit less at the service level, and just a smattering of UI tests. There is nothing utterly wrong with this, except people have become too devout.

So the pyramid needs to be updated for current times. The actual idea behind the pyramid is sound, but people are applying it literally and it is time to confiscate the coconut headphones.

Here is the updated testing pyramid, which stays true to the intent of the original but is stated just slightly more abstractly.

![Updated Testing Pyramid](https://www.stevefenton.co.uk/wp-content/uploads/2015/07/testing-pyramid.png)

The updated version prefers faster execution and malleability. The term malleable describes metal that can be hammered into shape without cracking – and this is exactly the kind of test automation you need. If your test automation isn’t malleable it will either inhibit changes to the application, require expensive rework, or just get binned.

So if your tests are both instant and malleable – you can have as many as you like. You should have less tests that are only rated as fast (rather than blazingly fast) and these also must be easy to maintain. You should have only a few tests that are not fast *or* that aren’t easy to maintain – because they don’t earn their keep like the others do.

Importantly, this new pyramid allows for a plethora of UI tests *as long as they are fast and easy to maintain*. It also discourages unit tests that are slow, or unit tests that are hard to keep in good condition.

The kinds of testing are not important, but their speed and malleability are fundamentally important – so let’s make that clear with a testing pyramid that says what it really means.
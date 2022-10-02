---
id: 4218
title: 'Traits vs Mixins'
pubDate: '2018-11-16T19:16:52+00:00'
author: 'Steve Fenton'
layout: post
guid: 'https://www.stevefenton.co.uk/?p=4218'
permalink: /2018/11/traits-vs-mixins/
medium_post:
    - 'O:11:"Medium_Post":11:{s:16:"author_image_url";s:75:"https://cdn-images-1.medium.com/fit/c/400/400/1*eXkhfEuF41g5W_xnc_ydLA.jpeg";s:10:"author_url";s:38:"https://medium.com/@steve.fenton.co.uk";s:11:"byline_name";N;s:12:"byline_email";N;s:10:"cross_link";s:3:"yes";s:2:"id";s:12:"b5e3f0e19bb9";s:21:"follower_notification";s:3:"yes";s:7:"license";s:19:"all-rights-reserved";s:14:"publication_id";s:2:"-1";s:6:"status";s:5:"draft";s:3:"url";s:51:"https://medium.com/@steve.fenton.co.uk/b5e3f0e19bb9";}'
categories:
    - Programming
tags:
    - mixins
    - traits
---

Here is a quick disambiguation between Traits vs Mixins for programmers.

Mixins are now fairly well known. You can use mixins to add shared methods to your classes without inheriting from the class they live in. It’s an increasingly popular technique for sharing and extending code. Instead of inheriting from a single parent, you can include methods from many mixins.

So what are these Traits that everyone’s talking about since C# 8.0 was announced?

Traits are conceptually the same as mixins, allowing you to add shared methods to your class; but they are stateless. When you specify traits, you supply the behaviour and, optionally, any constraints you require the including class to satisfy.

Traits are a solution to the diamond problem of classic multiple inheritance. Where more than one include has a method with the same name, the including class must disambiguate the use.
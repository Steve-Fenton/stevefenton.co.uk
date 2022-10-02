---
id: 935
title: 'HTML5 URL input can be quite strict'
pubDate: '2011-06-04T18:11:59+01:00'
author: 'Steve Fenton'
layout: post
guid: 'https://www.stevefenton.co.uk/?p=935'
permalink: /2011/06/html-5-url-input-can-be-quite-strict/
interface_sidebarlayout:
    - default
categories:
    - Programming
tags:
    - html
---

Following on from my [articles on HTML5 Forms](https://www.stevefenton.co.uk/2011/05/HTML-5-Forms-Summary/), I have been busy trying things out in various browsers, old and new.

I have noticed that the input of type “url” in HTML5 is being validated pretty strictly by some browsers.

For example, the following is treated as valid input:

- http://www.stevefenton.co.uk/

But none of these are:

- www.stevefenton.co.uk
- stevefenton.co.uk

So you may want to help your users by giving them some appropriate place-holder text, a good label for the input field or by partly completing the field with”http://”.
---
title: 'HTML5 URL input can be quite strict'
navMenu: false
pubDate: 2011-06-04T18:11:59+01:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - HTML
---

Following on from my [articles on HTML5 Forms](/blog/2011/05/html-5-forms-summary/), I have been busy trying things out in various browsers, old and new.

I have noticed that the input of type "url" in HTML5 is being validated pretty strictly by some browsers.

For example, the following is treated as valid input:

- `http://stevefenton.co.uk/`

But none of these are:

- `www.stevefenton.co.uk`
- `stevefenton.co.uk`

So you may want to help your users by giving them some appropriate place-holder text, a good label for the input field or by partly completing the field with"http://". Alternatively, use a text input with a validation pattern to make users lives easier.

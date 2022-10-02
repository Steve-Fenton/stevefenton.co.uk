---
id: 491
layout: src/layouts/Default.astro
title: 'What to do about that line of code'
pubDate: 2013-10-28T10:37:45+00:00
author:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=491'
permalink: /2013/10/what-to-do-about-that-line-of-code/
interface_sidebarlayout:
    - default
categories:
    - Programming
tags:
    - 'clean code'
---

Every programmer is going to one day find a bit of code that they don’t like. There are many immediate reactions, such as swearing, laughing or pasting the code into an email to the Daily WTF – but what should you do once you’ve regained your composure? Not everyone can write clean code yet, so how do you get them on boad?

Well, here are some things to avoid:

- Laughing about the person who wrote it behind their back
- Implementing a 100% code review policy
- Summoning the deviant who wrote it for a dressing down
- Adding an item to the back log that says it must be changed

Why avoid these things? Because they aren’t constructive. They create an environment where people who check-in code, fix problems and add features get into trouble – but people who never check in code get away with a quiet life. Another reason to avoid these techniques is that it gets awkward when you discover that they were right and you were wrong. Worst of all, if you barrel in and it turns out that you didn’t really understand the code in the first place, you’ll look like a dick.

So here is a way to remain constructive and keep your dignity when it turns out you didn’t actually know what you were talking about. The basic principle that underpins it is:

> [“Don’t be a dick”](https://dontbeadickday.com/) – Wil Wheaton

Build relationships with the people you work with and keep building to the extent at which you can talk to them and share knowledge about programming. Approaching someone and having a conversation about the code where you both have an equal authority on it means that nobody has to lose.

“Wouldn’t it be nicer if this class didn’t have this dependency?” or “Should we refactor this to remove the duplication?” are great ways to start the conversation, but much more important than how you start is how you continue – if you’re going to get to the best outcome you need to listen hard. Find out why the code is written a certain way. Maybe discuss alternatives. Try to impart tricks that will cause decisions to made better next time without the need for a conversation.

Ultimately, though, you need to let them decide how far they go in changing the code. Maybe they won’t add the curly braces to the if-statement this time around, but if you didn’t make a big issue out of it there is a greater chance it will simmer away and make an impact on future code. Maybe a near-miss when adding a statement to an existing brace-less if-statement will finally convert them. If you act like a dick, though, anything you suggest will become a hard sell – because people will be thinking “that is how a dick codes – and I don’t want to be one of those”.
---
layout: src/layouts/Default.astro
title: 'Code responsibly: Paying attention to the humans you impact'
navMenu: false
pubDate: 2019-09-13T08:21:42+01:00
authors:
    - steve-fenton
bannerImage:
    src: /img/2019/09/code-responsibly.jpg
    alt: Code responsibly
categories:
    - Programming
tags:
    - DDD
    - Economics
    - Ethics
---

One of the consitent truths I have found in every development team I have worked with is that there is more work that can possibly be done. A great deal more. For the forseeable future, this will always be the case. I can come up with an innovative new idea by chance one Sunday afternoon. It’s sometimes a flash of inspiration. Maybe two or three minutes and the idea is created. If I choose to implement the idea, it is an initial investment of hundreds of hours followed by a regular trickle of sustaining maintenance on the idea until I decide to let it go. Ideation is often a billion times faster than implementation.

Because of this asymmetry, development teams are overwhelmed with work. This is why principles from Lean such as making work visible and limiting work in process have been such powerful tools. Even so, I see teams being flattened by the ambition of the organisation they write code for. The programmer’s responsibility to the organisation that employs her sometimes dominates the agenda and causes a great deal of stress. In other cases, I have come across development teams who have forgotten all of their responsibilities. They don’t care that users get frustrated by their software. They don’t have an interest in economics, so frustrate the execs who can’t control the level of investment in their ideas. They implement algorithms or collect data with no regard to their ethical responsibility to society. In both of these cases, the responsibility of us, as programmers, to other humans that we impact is under-serviced.

## Code responsibly

When we code responsibly, we are thinking broadly about all of the humans that will be impacted by what we write. To do this, you might want to complete a simple exercise to write down what groups of people are affected by what you do. It doesn’t have to be neat and tidy, or even complete. It just helps to think about it…

:::div{.inset}
:img{src="/img/2019/09/code-responsibly.jpg" alt="Code Responsibility Diagram" loading="lazy"}
:::

You are likely to think of your employer, your colleagues, customers, users, partner companies… maybe you’ll even think about the wider development community or society as a whole. Once you’ve done this, you can break it down further. Who are your users? What groups can you use to represent users, especially those who might have different needs. You might think of users who interact with your software using assistive technology. Perhaps you’ll think of partners who are impacted by changes you might make to an API. Dig down and work out how to make these groups visible.

Then stick it on your wall.

## Reset focus

Instead of being driven by the loudest voices, or following the money-trail of doing whatever you are told; you now have a coherent way of assessing what you are doing from a number of different perspectives. You aren’t just changing something because from a technology perspective it’s the “correct solution”; you’ve thought about what the experience will be like for different groups of end users, for the support team that will deal with their questions, for your employers who you will be expecting to fund the work, for your customers who make it possible to fund work at all, and for other humans in the broader community and society who you may be abusing by storing and processing data without good reason.

When we code responsibly, we don’t aim for technical purity (except where it benefits the humans), we don’t fixate on a specific architecture (except where it benefits the humans), and we don’t just do cool things that we have a personal interest in (except where it benefits the humans). There will be oppurtinities to do all of these things at the right time, but we can’t *force* the right time. We certainly cannot invent the right time by being dishonest to colleagues, employers, or customers.

## Economics

One final note on economics. One of the most common pieces of positive feedback that I have been given over the past two decades is that I am focussed on delivering outcomes. When people give me this feedback, what they mean is that I look for solutions with maximum economic benefit. Sometimes that means finding the smallest way to solve the problem, and on other occasions it means creating a solution that is a bit larger than needed so it is able to deliver a swathe of tangential benefits. I have found solid theory to accompany my natural instincts in Domain Driven Design (particularly the concept of focussing your effort on your core domain, and not wasting too much effort on non-core software), and in the work of Don Reinertsen on product economics. If you find your solutions are being challenged regularly, you may want to master these two areas of study as it is likely you are missing the broader perspective on your choices.

## Do the right thing

Map out a representation of all of those humans you are impacting. Put it somewhere visible. Make the right choices based on the complex mesh of all those perspectives, not just one… especially not just your own.
---
title: 'Slides from test-driven development'
navMenu: false
pubDate: 2011-11-25T17:16:43+00:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - Testing
---

Here is a brief overview and some of the slides from my Test Driven Development (TDD) talk on Thursday. The theme of the talk was to to discuss TDD in a non-zealous manner. This meant discussing both the costs and the benefits as well as referencing real studies as well as anecdotal evidence.

:::div{.inset}
:img{src="/img/2015/07/TDDSlide2.jpg" alt="TDD Isn't Free"}
:::

So I started by pointing out that TDD isn’t free of charge. [Case studies at Microsoft and IBM](https://www.microsoft.com/en-us/research/group/empirical-software-engineering-group-ese/) found a *15-35% increase in initial development time* after adopting TDD. This will vary based on the people, but it is important that everyone understands that there is an up-front cost to TDD.

So why take this initial hit? To highlight some of the benefits I sketched a picture. Importantly, the last thing on the list is that you would expect fewer bugs to make it into the application. I put this last because it is an obvious benefit – but possibly not the greatest benefit.

:::div{.inset}
:img{src="/img/2015/07/TDDSlide4.jpg" alt="TDD Benefits" loading="lazy"}
:::

So returning to the top of the list, tests act as documentation and sample code, which in a lot of cases means you don’t need to write a text document to explain the code. Text documents don’t get updated when code is changed, but tests do get updated. This makes them better than text documents.

You would expect features to be delivered in less cycles when you TDD, because if you expose bugs with a test before fixing them, the same mistake is less likely to re-appear in a later cycle.

A very powerful benefit of TDD is that it helps you to design your application. When a unit of code is hard to test, you have a warning sign that the design isn’t right. Because writing the tests gives you focus on the task at hand it can also keep you in the flow, rather than being blocked while you think about the next step. It also makes it easier to re-design your application because you will have confidence that your refactoring hasn’t introduced a problem.

In Empirical Software Engineering the success of ‘Test-First’ development was believed to be related to:

- Better task understanding
- Better task focus
- Faster learning
- Lower rework effort

Going back to the Microsoft and IBM case studies, where a 15-35% increase in initial development time was reported, the study found that in return for this cost, the defect density decreased between 40% and 90% relative to similar projects that did not use TDD.

And there is plenty of anecdotal evidence from people who have worked on real projects too and this leads me to a very important point.

I have worked at organisations that write no tests at all. I have worked at organisations that write some tests after they have written the code. I have worked at organisations that do TDD. The following observation is based on my experience at these numerous organisations.

TDD doesn’t make a developer great. It is not the measure of a great developer and it doesn’t turn average developers into great developers. I say this because TDD is not the cure to the myriad problems in software development. The real solution is to employ great developers.

The reason people make the mistake of believing that TDD will transform their development teams is that great developers tend to choose to use TDD. This skews the metrics as if you measured a team of great developers who have chosen to use TDD against a team of average developers who aren’t using TDD and use this evidence to prove that TDD is better, you have made the mistake of ignoring the human factor.

TDD is very rarely used on its own in a successful team either. A combination of lean process and agile methods are normally used by a successful team and the resulting regular quality releases cannot be attributed to a single practice or principle.

So please bear in mind that a developer can be great without using TDD just as a terrible developer may still be terrible if they used it. TDD alone is not the indicator of a good developer, even though the developers that I have worked with and respect the most were advocates and practitioners of TDD.

:::div{.inset}
:img{src="/img/2015/07/TDDSlide1.jpg" alt="TDD Discuss" loading="lazy"}
:::
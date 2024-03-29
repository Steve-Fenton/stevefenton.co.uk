---
title: 'Who broke the build?'
navMenu: false
pubDate: 2013-04-24T15:05:56+01:00
authors:
    - steve-fenton
categories:
    - Process
    - Programming
---

:::div{.inset}
:img{src="/img/2015/07/cruiser.jpg" alt="Cruiser - CC.NET Build Status"}
:::

In an Agile software development area you’ll usually find lots of information in prominent places about the status of builds and tests. Whether it is a big screen acting as an information radiator that highlights a problem as soon as a build breaks or whether it is a siren and flashing lights that alerts everyone of a problem – build and test information is important.

The reason it is important is that we like to know that at any given moment we could ship our products.

Given the prominence of this information, you would be forgiven for falling into the blame trap… “If the builds are so important, we need to make sure nobody ever breaks them”.

This sometimes manifests itself humorously, a humiliating desk ornament or funny hat for the programmer who broke the build. Other times it can be “managerial” – keeping statistics on the programmers who most break the build. Either way, beware of the consequences.

In Extreme Programming Explained, Kent Beck makes it clear that the team should be working in a safe environment. They should be free to make mistakes, which are used to learn and grow. Embarrassing or chastising someone for breaking the build violates the safe environment.

You need to consider also the behaviour you are encouraging. If you set a context within which the most important thing is not breaking the build, this will become the goal of programmers. Of course, the easiest way to avoid breaking the build is to never check in any code.

So the build monitors and dashboards are there to highlight a problem fast, but nobody should ever be afraid of breaking a build.
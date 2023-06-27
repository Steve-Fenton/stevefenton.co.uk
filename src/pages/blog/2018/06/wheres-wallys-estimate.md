---
title: Where's Wally's estimate?
navMenu: false
pubDate: 2018-06-17T21:19:07+01:00
authors:
    - steve-fenton
bannerImage:
    src: /img/2018/06/wheres-wally-world-record-dublin.jpg
    alt: Where's Wally world record attempt in Dublin
categories:
    - Process
---

This is a balancing post to follow on from work I have done in several teams on estimates. Firstly, I’d like to confirm that in some teams, I have eliminated estimates; and in others I have improved the discipline of estimates. Both are valid approaches in different situations. What I never do is leave dysfunctional estimation in place.

:::div{.inset}
:img{src="/img/2018/06/wheres-wally-world-record-dublin.jpg" alt="Where's Wally world record attempt in Dublin"}
:::

## Dysfunctional estimation

What is dysfunctional estimation? There are a few different kinds, but good examples include:

- Asking for an estimate without having a hypothesis about a factor that you hope will be impacted, and to what extent it may be impacted
- Asking for estimates at a greater level of precision than the cone of uncertainty allows (see my [alternate visualisation of the cone of uncertainty](/blog/2017/11/alternate-visualisation-cone-uncertainty/))
- Using an estimate intended for one purpose (broad-brush planning) for another purpose (writing a contact)
- … and the classic, pressuring people to provide an optimistic estimate to use a stick to beat them with later

The first step in a functioning relationship between all parties involved is to clarify the purpose of the estimate. When the need is understood, you can decide whether an estimate is the right tool for the job. In the cases that it is, you will also be able to select the correct kind of estimate and how much to invest in it.

With this contextual information in mind, let’s explore some common challenges with estimates, with the help of [Martin Handford’s](http://www.walker.co.uk/contributors/Martin-Handford-1497.aspx) famous character, Wally (or Waldo if you’re on the other side of the Atlantic).

## Where’s my estimate?

Here are some questions that will help you to understand estimates a bit better. I’m not going to attempt to explain everything in Steve McConnel’s *Software Estimation: Demystifying the Black Art* or Mike Cohn’s *Agile Estimating and Planning*. However, you can attempt to answer these questions using the techniques in those two books.

Let’s ask some questions…

> How long will it take to find Wally in one picture?

The estimate should probably be a range. Calculated numbers are preferable here. If you don’t have any inputs, such as historic data, to create a calculated range you’ll need to decide how to get some numbers. Do you find someone with experience in finding characters in pictures, or do you invest in a small sample so you can gather some realistic figures?

> How long would it take to find Wally in a picture you have seen before?

How does this affect the left-hand and right-hand side of the range? If you originally found Wally in 32 seconds, will it take exactly 32 seconds this time? Why / why not?

> How long will it take to find Wally in all ten pictures?

When you estimate the batch, what factors affect the overall range?

## Bonus question

Here is a bonus question that helps to illustrate the fundamental problem with estimates for testing. Imagine you are testing a Wally book. There are some basic rules that the books follow, such as “Wally appears one time in every picture”.

> How long will it take to prove that Wally is not in a picture more than once?

This is a tough problem. It can take a while to find Wally at all. How much time would you need to be certain that he isn’t there twice? It is far easier to prove he *is* there twice than it is to say for sure he isn’t. Compared to software, this is a much simpler problem, but it is highly likely that a double-Wally bug would slip through given enough pictures.

<small>Where’s Wally World Record Attempt in Dublin by [William Murphy](https://www.flickr.com/people/80824546@N00). [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/deed.en).</small>
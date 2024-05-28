---
title: 'Short-term measurement error'
navMenu: false
pubDate: 2016-06-01T18:44:03+01:00
modDate: 2024-05-28
authors:
    - steve-fenton
categories:
    - Process
    - Psychology
tags:
    - Metrics
    - Motivation
    - Rewards
---

Metrics and measurement have becoming increasingly important in software development. In fact, it's one of the defining elements of the [research-backed era of software delivery](https://octopus.com/devops/history/research-backed-software-delivery/). When it comes to the research, I'm a fan of the levels of academic rigour you get from projects like the [DORA research programme](https://dora.dev/).

In this article, I'm going to talk about two things:

- Magic numbers (and tragic numbers)
- Short-term measurement errors

## Magic numbers

I originally wrote about magic numbers on [LinkedIn](https://www.linkedin.com/pulse/metrics-find-your-magical-number-steve-fenton). The essence of the idea, though, is to work out:

1. The simplest measure, for...
2. The earliest indicator, of...
3. The broadest set of outcomes

On a general level, the current _magic numbers_ for software delivery are [DORA's four keys](https://octopus.com/devops/metrics/dora-metrics/):

1. Deployment frequency
2. Lead time for changes
3. Change failure rate
4. Failed deployment recovery time

I also love the idea from [Jim Benson](https://www.linkedin.com/in/jimbenson/) and [Tonianne DeMaria Barry](https://www.linkedin.com/in/tonianne-demaria-ba307922/) about using subjective wellbeing as a measure, because it's a great indicator of the team's future performance.

Magic numbers are used in context, not reported up the management chain. You use them locally as part of your continuous improvement process. Using metrics at the wrong level of elevation is one way your magic numbers become _tragic_ numbers. Another source of tragic numbers are metrics whose very use encourages dysfunction. The commonly used _velocity_ metric in Scrum is the most common tragic metric, but based on our goals, something like customer satisfaction can be tragic as it's a trailing indicator, so it arrives tragically late.

Some magic numbers are good permanent indicators. Others are contextual. You might introduce a specific measurement as part of an improvement idea. If you don't measure something useful, how will you know if things are getting better?

And that leads us to the next topic!

## Short-term measurement error

:::div{.inset}
:img{src="/img/2016/06/short-term-mistake.jpg" alt="Short-term measurement makes small improvements visible while hiding long-term negative consequences"}
:::

Let's imagine you run a monthly improvement cycle. You use this to look at the past month, talk about problems, and design improvement experiments. There's a dangerous temptation to reach a conclusion on these experiments in the next retrospective. That's dangerous.

There are two reasons this approach fails and they sit at each end of a scale:

1. You got a short-term kick from the improvement and the long term negative consequences aren't yet apparent.
2. It takes longer than one month to see the benefits, so it looks like the idea failed.

### Jumping to conclusions

You _could_ speed up your development process by saying, "let's not bother writing automated tests". You deliver each feature in three days, instead of five. In the next retrospective, you bank the +8 day win and dance into the warm glow of your own brilliance.

The problem is, from that initial moment, a growing negative consequence begins to build. It might take longer than one improvement cycle to recognize this problem. Eventually, without test automation, it takes you ten days to deliver a feature. You've soon lost all the hours from the early measurement plus a load more. Yikes.

I once worked in a company who had to track third-parties who invested on behalf of mutual clients. It took each account manager a couple of very boring days each month entering the current investment position into our record, which shadowed what the third-party was doing with the client's money.

A very popular decision was made to simply stop doing this. It saved 2x30 days per month. Wow!

Except it was no longer possible to process anything in our system, because all the processing required a current valuation. We couldn't validate the investments were legal for the type of product we were selling. We couldn't do anything. The company attempted (unsuccessfully) to recover from this decision several times. They no longer exist.

The short term measure of employee joy and days saved masked the long-term negative consequences of the decision.

### How to avoid jumping to conclusions

Sometimes you need to make sure you haven't over-simplified your measurements. This is where the DORA 4 keys can help you assess the broader system impact of all your improvement efforts. The tricky part is working backwards to determine the cause of changes, as they won't be visible immediately and may not even impact your magic numbers in the same order you introduce them.

In other cases, you need to decide how long you should wait before you will declare the result. A month probably isn't long enough for many improvement ideas.

### Mastery takes time

Let's flip the example around. If you introduced test automation today to a team who hadn't done it before, when would you see the improvement? It could take weeks, or even months. It would be easy to abandon the attempt after the first month as you'll have practically zero return for what might be a significant time investment.

If you are working on a new application or service and apply test-first development, you'll see a faster return than you will introducing test-automation to a heritage application. A team familiar with the tools and techniques will get a return earlier than one who have never applied it.

One of the mistakes I see in Agile teams is the expectation of an instant return on investment. If you have to get payback within a month, you're limiting your improvements to "velocity hacks" and will never achieve the level of mastery that brings true high-performance.

## The problem is everywhere

This isn't exclusive to software delivery, the problem is found everywhere in business. Commonly manifesting itself in punishment systems (miss this deadline and you’re in trouble), and reward systems (performance-related bonuses, employee of the month awards, etc). Using any of these methods will show a short-term improvement, but the net effect is negative in the longer term. This issue is so common that people will swear by their reward programs and show you proof that it works… but that proof will all suffer from the short-term measurement error. The long term effects of rewards are that they damage business.

So beware of measuring the short-term "green line" and double check that you aren’t missing out on a much more fundamental "red line" – even when using Magical Numbers. Give things a reasonable time to provide a useful result. Don't tie it to "one improvement cycle".

Further Reading:

- The Human Side of Enterprise – Doug McGregor
- Get Rid of the Performance Review – Sam Culbert
- Punished by Rewards – Alfie Kohn
- Drive – Dan Pink
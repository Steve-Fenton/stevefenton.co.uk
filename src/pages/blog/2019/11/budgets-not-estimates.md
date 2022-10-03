---
layout: src/layouts/Default.astro
title: 'Budgets not Estimates'
navMenu: false
pubDate: 2019-11-30T19:53:30+00:00
authors:
    - steve-fenton
categories:
    - Process
tags:
    - 'noestimates'
    - Estimates
    - Estimation
---

This is an early view over a process we are experimenting with in my organisation; budgets not estimates. It represents a re-ordering of components in the planning process that generates more options and reduces single-option big bets.

There are lots of different terms for how people plan software, but very often it involves someone turning up with a fully formed idea and asking how much it would cost to implement it. It might be called a requirement, a specification, a user story, a feature… it has many names, but it means “a single idea that I want executed”.

:img{src="/img/2019/11/traditional.jpg" alt="Traditional" loading="lazy"}

Most of the components of this planning are reasonable enough, but just occur in the wrong order. No amount of “Start With Why” posters seems to materially improve this situation. There are also all of the well reported dysfunctions around estimates, even though the estimates themselves are innocent enough when handled by responsible folks. We need to resolve these two issues. What two issues?

1. The problem of planning against a single pre-defined option, when a set of options is more powerful
2. The problems around estimation that we’ve been talking about for a few years now

## Problem budget

Our experimental solution to this planning issue is *problem budgets*. You define a problem. You work out how much you want to invest in an attempt to solve the problem. You work on generating a set of options that you think might solve the problem within the budget. You select an option and work on it until the initial budget is gone.

:img{src="/img/2019/11/budget.jpg" alt="Budget Not Estimate" loading="lazy"}

For example, the easy case of… “Thirty-percent of users drop out when they get to the payment screen, how much money is a solution to this problem worth?” (Not every problem is as easy to quantify.)

## Example

So, how does it work?

### Start With Why!

You need to focus on the problem you need to solve. Approaching this process with a fixed idea of the solution is a sure way to fail. Look at the problem, find out what a solution to the problem is worth, and decide how much of that you want to risk on an experiment. You’ll collect data as you go that will help you understand your probably success rate (how many times your first idea works, how many times your second idea works, and so on).

So, for example, “it’s kinda hard to update the website navigation”. You now have a problem to solve. Work on the problem until it is crystal clear. Use established techniques to dig below the surface to make sure you on the bedrock-problem, not some loose gravel layer above it.

### What’s it worth?

With a clear idea of the problem, you now work out what it would be worth to fix the problem. This is the money you will draw from to run experiments. You don’t just allocate the whole value to a big bet (you might do this sometimes, but if you’re doing it every time you need to rethink your attitude to risk). Wherever possible, consider allocating the budget in blocks that allow experiments that provide either success, or significant learning that can be fed back through the process.

“Let’s spend two-developer weeks on an idea to simplify updates to the website navigation for our users.”

Great! Now we have a clear problem, and a budget for our first experiment.

### Option generation

There are different ways to approach the next part, but all involve assembling a cross-functional team who are going to spend the budget. Now you run a session to generate options. You might start without the budget constraint and introduce it as a method of eliminating options that seem too expensive. You might begin with the budget and see what options come out of it. You can try different methods at this stage.

You might have multiple options, one option (beware), or no options at all. Depending on where you have ended up, you might adjust your budget, or come up with variations of existing ideas, or generate some new ideas.

In some teams, you might want to undertake this process in two or three short sessions to give people time to ponder between each one. Not everyone likes the cut and thrust of a single session and it’s more valuable to generate great ideas than it is to crack out a decision in one punch. You need a skilled facilitator either in each cross-functional team, or available for them to use. The facilitator will make sure the sessions work across diverse personality types and protect the divergent stage from premature convergence (convergent stages generally require less protection, but they will also make this stage more effective, too).

When the experiment is selected, the session can be capped-off with example generation, accompanied by any decomposition or slicing that is required to maintain the laser-sharp focus of the problem/budget.

### Make it happen

Now the team can get to work solving the problem. There are some important notes at this stage.

When the budget is used up, the work stops by default. This is explained well in [Shape Up](https://basecamp.com/shapeup) (published by Basecamp). The budget owner might decide to add further funding as an exception, but this doesn’t happen by default as it does in many software development endeavours. If the problem isn’t worth additional developer-weeks, it’s better that we stop and learn from what happened, rather than let the sunk-cost fallacy slowly bleed our annual budget on problems that aren’t valuable enough. Large projects kill companies by budget extensions, so we’re stopping any experiment from being big enough to crush us.

### Measure

In respect of the original problem, we need to know if we solved it. Even if we completed our work “on time and on budget”, the users might still struggle to update this darned website navigation. That’s what our [DITE cycle](/2019/09/the-dite-cycle-data-insight-theory-experiment/) is for.

Additionally (and avoiding dysfunction wherever possible) we want to collect some data that will help us make better decisions. If you collect a binary result of each experiment where it finishes within the budget or not (regardless of being extended), you will find out how many times you succeed on “option 1”, “option 2”, “option 3”, and so on. This will generate a probability spread that will help you decide how much budget should be spent on that first attempt. You can also fine-tune your attitude to risk if you find you succeed more than eighty-percent of the time on the first option.

If you decide to allocate a second-round of funding to a “first option”, you treat this as “option two” (the same solution with a different budget is another option, just as a second solution with the same budget would be).

We always want to have one eye on sunk-cost fallacy; and we always want to acknowledge that dysfunctions can creep in from all angles. Although we often highlight management dysfunctions around estimates in the upper branches of an organisation, there are also non-management dysfunctions relating to non-disclosure of information that grow insipidly about the roots, sometimes as a result.

## Benefits of stop-dead funding

However you run this, you need a mechanism that stops funding an idea that has gone out of control. Here’s a simple ten-Euro version of the principle.

:img{src="/img/2019/11/pivot-vs-persevere.jpg" alt="Pivot vs Persevere" loading="lazy"}

Scenario one is the most common mistake in software development; despite being offered the lesson that the idea is not going to work within the budget, the work continues until it is complete. It might cost 2x, 3x, 4x the original budget, but nobody stops spending the money because each time they review progress, they have become more bought-in to making things happen at all costs. You might eventually solve the original problem, but you’ve ignored every opportunity to learn along the way.

Let’s replay it with scenario two. In this alternate reality, we ditch the first attempt to solve the problem because we have proved that it isn’t possible within the budget. We go back to our set of options, possibly adding new options based on what we have recently learned, and we allocate some budget to one of those instead. If we are hitting an 80% success rate, this attempt is likely to be more successful.

Obviously there are more possible outcomes to this puzzle; the second attempt might also fail, perhaps the problem cannot be solved as easily as we thought. Two different ideas failed, so this is going to cost more than we anticipated. We’ve banked twice as much learning, so now we decide if maybe we should solve a different problem. Or perhaps we discovered a new way to solve it by trying the previous ideas. We are generating information and options, so we’re getting something for our money.

In all cases, trying a different idea will bring more value through learning and cancelling work that fails to meet the budget leads to better clarity around the whole process. The biggest threat to this process is allowing every idea to over-burn. When you do this, people stop paying attention to the concept of problem budgets. “Meh, they’ll let us spend longer on this, they always do!”

Each time you use up the whole budget, you need to take a pragmatic decision. If you think you can complete the task given another day, you might decide to continue (but track it as a second option). Keep you eyes peeled for the sunk-cost fallacy and proceed with caution.

As this process matures, I’m sure a great deal of learning will emerge, so I’ll write updates as the insights arrive.
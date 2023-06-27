---
title: What is the optimal number of members for an agile team?
navMenu: false
pubDate: 2022-05-20
modDate: 2022-10-13
keywords: agile,team,size,optimal
description: Find out how to work out the optimal size for your agile team.
bannerImage:
    src: /img/topic/process/crank-mechanism.png
    alt: A crank mechanism whose reciprocal motion represents feedback loops
authors:
    - steve-fenton
categories:
    - Process
tags:
    - Agile
---

This question is rather fascinating, partly because of misunderstandings of the famous George Miller paper about *the magical number seven (plus or minus two)*. [Some people apply Miller's findings to team size, which is wrong](/blog/2015/06/the-magical-number-of-misunderstandings/). So, what is the optimal number of members for an agile team?

I will use the term “developer” in the general agile way, which means anyone involved in delivering a product or feature. They might have business chops, testing skills, programming talent, operations knowledge, be a security guru, or possess some other skill needed to get something to market. They are all developing a thing, so they are a developer.

## “Optimal” requires factor(s)

Independent factors combine in complex ways when you attempt to answer this question. To find an optimal *x*, you must work out what you are optimising *for*. For example, if cost is your dominant factor, the optimal number of team members is zero. Of course, this is deliberately simplistic though not an uncommon view in the world of cost reductions. We all know what happens if you desperately need a golden egg, but your magic goose isn’t ready to lay. You can get it immediately, but it will be your (and the goose's) last one.

So, you’ll need to work out what factors are critical to your organisation and ensure that you optimise for them. Think about whether you are looking for an optimal stable state for a specific product or if you are thinking about how you can scale and grow faster. Team size will be impacted by the organisation’s strategy, the system architecture, communication structures, and what you want to achieve with each team.

With this in mind, let’s examine the competing forces.

## Optimising against forces

In developer productivity studies, it turns out that a single developer working alone is pretty close to the optimal team size. In practice, there are many reasons this isn’t ideal. If one person independently develops a system, your organisation will have many fragile crystals of knowledge, likely to be broken or stolen at any moment.

While this might provide optimal *individual* productivity, it is highly sub-optimal for knowledge management and sharing.

It's a high-risk strategy. With this in mind, the minimum number of team members ought to be two. With two team members, you have knowledge overlap and some positive pressure for people to share. This usually results in some form of knowledge artefact with a long shelf life; a simple wiki, README file, or another form of documentation. So, the first hard and fast rule is:

> The minimum team size is two.

A single team member is also sub-optimal for something more important than individual productivity: Flow efficiency. Unless your product idea has been completely commoditised (in which case, perhaps it is time to get into a new product line), you shouldn’t be terribly interested in individual productivity. What you really want to see is short lead times and frequent deployments.

A lone developer would be the constraint that prevents the organisation from improving flow for that part of the system. You need enough people, with enough slack, to ensure work can flow from “todo” across to “done” without stopping in a queue. You may need to experiment to find the correct level for each component or service (more on this shortly).

When QSM Inc. studied team size, they found that teams of up to three had the best profile across productivity and total effort (i.e. output per team member and the total cost of developing something). They also found that beyond seven people, things start to get sketchy. If you are looking to optimise a team in general, then you probably want to stick to this.

> The general maximum team size is seven.

What is meant by “general maximum team size”? Unless compelling circumstances exist, you shouldn’t have teams larger than this. You should normally operate a little below this maximum.

You might decide to optimise for speed, not productivity, for a specific development. If the work can be divided between more people, you could decide to run a larger team, with the development finishing earlier and costing more than if it were done by a smaller team. This isn’t the same as “adding people to a late project”, as you must choose up front to run a development this way.

This crosses into rocket science as the more people you add, the more it reduces individual productivity, which means you need to add more people – much like adding fuel to a rocket increases the overall weight, which then requires more fuel.

## Lower productivity expediting

Larger low-productivity teams have an associated cost because you could get the exact same features delivered at a lower cost if you didn’t have to hit a deadline. This means you should be sure you are only doing this for real deadlines, not just creating deadlines thinking that it makes you “get more for your money”. Let’s use a simple example that isn’t based on a study to illustrate the point.

| Overall effort | People | Individual Daily Product | Team Daily Product | Days to Complete | Total Days | Total Cost  |
|----------------|--------|--------------------------|--------------------|------------------|------------|-------------|
| 1000           | 4      | 5                        | 20                 | 50               | 200        | £60,000.00  |
| 1000           | 12     | 3                        | 36                 | 28               | 333        | £100,000.00 |

From the above table, you can see that you can get your feature in under 30 days, which means you hit the deadline (yay). However, you pay an extra £40k to get it.

This is one reason false deadlines damage a business. There are many more!

## Is there an upper limit?

As we’ve said above, the general upper limit is seven people. In practice, a common scaling tactic is to allow a team to grow to around ten or twelve and then look to split it. Ideally, the split would be architectural and organisational, leaving two independent units. See the section below on components and services. You may not find the seam that you can tap away at to divide the system straight away, but it is usually there somewhere.

If you have teams of more than a dozen people, the team should already be planning the amoeba-style split. This should be self-organised wherever possible, as the complex dynamics at play mean an externally-driven split can create wreckage. Making the process as organic as possible and letting the teams maintain close contact after the division will smooth the process and ensure any skill gaps can be resolved.

## You need skills

You must also consider what skills you need on a team to deliver the specific software being developed. For example, if personal data is being processed or stored, you’ll need some privacy skills or legal chops to ensure the component meets geographical requirements for personal data. You’ll also need to consider security, testing, and specific tech skills.

While you don’t need as many people as you need skills, it is unlikely you can cover everything you need with one or two people. Depending on the skills required, your minimum number of members may increase. For some components, for example, a loan repayment calculator, you’ll find two people is sufficient. In many cases, you may need more than two. With solid people development, a team of two can gain more skills than a traditional team of six; this will depend on your fundamental organisation and cultural capabilities.

It is certainly true that as you continue beyond twelve, you increase the overhead and admin to the extent that you might as well have stopped growing entirely at the dozen mark. The additional people cannot meaningfully deliver enough value to counter all the conflicts and problems that a large team experiences.

If you find yourself using pools of talent, such as shared skills (test, operations, security), this might be a sign you are missing skills. Agile teams are supposed to be cross-functional, so they shouldn’t routinely need to access a shared-service department for work that forms part of the regular deployment pipeline.

## Components and services

One of the constraints that most organisations must overcome is their system architecture. If you have one giant monolith, then you have one big team. You might subdivide this team in your organisation chart, but they all work on the same thing. One team member can block everyone else’s release or create conflicting changes. There's a lot of coordination. So, if your architecture doesn’t enable multiple teams, you’re stuck with one big one until you fix it.

That means you must work out how to isolate parts of your system so teams can work independently without tripping over each other. Each one of the components or services you create must be developed, integrated, tested, and deployed without any coordination with people working on other components. Even if you knew your optimal team size, it might take time to re-architect to enable it.

When you split a component, the split should be vertical (let’s separate the loans from the mortgages), not horizontal (let’s have a database team and a UI team). Horizontal divisions create dependencies, which is counter to the whole exercise.

## The only exception

There is one exception to the shared team rule. The exception is teams such as platform engineering or site reliability engineering. The purpose of such teams is to serve the development teams by creating golden pathways that improve the developer experience and system quality attributes. They create self-serve tools that increase productivity and encourage good choices.

These teams work because they are not gatekeepers or blockers. A team is never held up by a platform engineering team because the "shared" platform team isn't handling tickets, performing gatekeeping duties, or working on a deliverable for the development team. They are helping all teams achieve better performance by making pre-baked good decisions available as a product other teams can consume.

## Summary

The word “optimal” is tricky because optimisations always need context. If you were designing a web farm, “optimal” requires you to think about how much capacity you need at peak and what that would cost to run during the ebb between the peaks. If you optimise for availability, you'll spend quite a lot more. If you optimise for cost, you'll have to queue people or give up on responding to their requests when things get busy. It’s impossible to say in general where the slider should be moved until you check your customer service agreements and marketing promises.

Unlike infrastructure, you can’t auto-scale by throwing more people into the mix when it gets busy. Scaling teams depends on appropriate architectures and communication structures. Your organisation can become massive but should ideally be composed of many small independent teams. Many organisations might challenge this by saying, “our teams are bigger than your maximum, and we’re doing okay”, which is all well and good, but agility is almost certainly suffering. Agility is more challenging at scale and if the organisation is big, and all the teams are large, changing direction takes longer.

If you need to measure your organisation's agility, test the following scenario.

Suppose you discovered today an idea that could revolutionise your industry and made it your top priority. How long would it take for the first change to reach production? How long until you have a marketable feature? A large company with big teams might achieve straight-line speed, but when it comes to changing direction, they are like a drag racer on a rally circuit.

With all this in mind, the optimal size of an agile team is between two and seven people.
---
layout: src/layouts/Default.astro
title: What is the optimal number of members for an agile team?
navMenu: false
pubDate: 2022-05-20T14:08:00+01:00
authors:
    - steve-fenton
categories:
    - Process
tags:
    - Agile
---

This question is rather fascinating, in part because of the misunderstandings that have arisen in respect of the famous George Miller paper about the magical number seven (plus or minus two). [Some people apply the findings of Miller to team size, and they are wrong to do so](/2015/06/the-magical-number-of-misunderstandings/). So, what is the optimal number of members for an agile team?

I’m going to use the term “developer” below in the general agile way, which means it’s anyone who is involved in delivering a product or feature. They might have business chops, testing skills, programming talent, operations knowledge, be a security guru, or some other skill that’s needed to get something to market. They are all developing a thing, so they are a developer.

## “Optimal” requires factor(s)

There are independent factors that combine in complex ways when we attempt to answer this question. When you want to find an optimal *x*, you have to work out what you are optimising for. For example, if cost is your dominant factor, the optimal number of team members is zero. Of course, this is deliberately simplistic though not an uncommon view in the world of cost reductions. We all know, though, what happens if you need a golden egg that your magic goose isn’t ready to lay… you can get it immediately, but it will be your last one.

That means, you’ll need to work out what factors are important to your organisation and ensure that you are adjusting to them. Think about whether you are looking for an optimal stable state for a specific application or service, or if you are thinking about how you can scale and grow faster. Team size is going to be impacted by the organisation’s strategy, the system architecture and communication structures between teams, and what you want to achieve with each team.

With this in mind, let’s look at some of the competing forces.

## Optimising against forces

In developer productivity studies, it turns out that a single developer working on their own is pretty close to the optimal team size. In practice, there are many reasons this isn’t idea. If one person owns a system, your organisation will be made up of many fragile crystals of knowledge, which are likely to be broken or stolen at any moment. While this might provide optimal individual productivity, it is highly sub-optimal for knowledge management and sharing, and is a high-risk strategy. With this in mind, the minimum number of team members has to be two. With two team members, you have overlap of knowledge and a need to share, which usually results in some form of knowledge artefact with a long shelf life; a simple wiki or similar. So, our first hard and fast rule is…

> The minimum team size is two.

A single team member is also sub-optimal for something that’s more important than individual productivity, which is flow efficiency. Unless our product idea has been completely commoditised (in which case, perhaps it is time to get into a new product line), then we shouldn’t be terribly interested in individual productivity. What we really want to see is short lead times and frequent deployments. A lone developer would be the constraint that prevents the organisation improving flow for that part of the system. We need enough people, with enough slack, to ensure work can flow from “todo” across to “done” without stopping in a queue. This means we may need to experiment to find the correct level for each component or service that we have (more on this shortly).

When QSM Inc. studied team size, they found that teams of up to three had the best profile across productivity and total effort (i.e. output per team member and the total cost of the overall effort). They also found that beyond seven people, things start to get sketchy. If you are looking to optimise a team in general, then you probably want to stick to this.

> The general maximum team size is seven.

What do we mean by “general maximum team size”? What we mean is that unless there are compelling circumstances, you shouldn’t have teams larger than this. What compelling circumstance might you have? You can optimise purely to hit a deadline by running a team with more people who are all less productive due to the increased team size. This isn’t the same as “adding people to a late project” as you are choosing up front to run a team that can non-productively deliver something that a smaller team could not achieve in the same time. This crosses into rocket science as the more people you add, the more it reduces individual productivity, which means you need to add more people – much like adding fuel to a rocket increases the overall weight, which requires more fuel.

## Lower productivity expediting

Larger low-productivity teams have an associated cost, because you could get the exact same features delivered at a lower cost if you didn’t have to hit a deadline. This means you should be sure you are only doing this for real deadlines, not just creating deadlines thinking that it makes you “get more for your money”. Let’s use a simple example that isn’t based on a study to illustrate the point.

| Overall effort | People | Individual Daily Product | Team Daily Product | Days to Complete | Total Days | Total Cost |
|---|---|---|---|---|---|---|
| 1000 | 4 | 5 | 20 | 50 | 200 | £60,000.00 |
| 1000 | 12 | 3 | 36 | 28 | 333 | £100,000.00 |

From the above table, you can see that we can get our feature in under 30 days, which means we hit the deadline (yay), but we pay an extra £40k premium to get the feature.

## Is there an upper limit?

The general upper limit, as we’ve said above, is really seven people. In practice, a common scaling team is to allow a team to grow to around ten or twelve and then look to split it. Ideally, the split would be architectural and organisational, leaving two independent teams. See the section below on components and services. If you can’t find a seam to separate the component, it is very likely that you just can’t spot it. It is almost always there.

If you have teams of more than a dozen people, the team should already be planning the amoeba-style split. It is important for this to be self-organised wherever possible as there are complex dynamics at play that mean an externally-driven split will create wreckage. Making the process as organic as possible and letting the teams maintain close contact after the split will smooth the process and ensure any skill gaps can be resolved.

## You need skills

We also have to consider what skills we need on a team to deliver the specific component being developed. For example, if there is personal data being processed or stored you’ll need some privacy skills or even legal chops to ensure the component adheres to different geographical restrictions on this kind of data. You’ll need to consider security, testing, and specific technology skills, too. While you don’t need as many people as you need skills, it is unlikely you can cover off everything you need with one or two people. Depending on the skills required, your minimum number of members for the team will increase. For some components, for example a loan repayment calculator, you’ll find two people is sufficient. In many cases, you may need more than two. You might be able to develop your people so a team of two has more skills than a traditional team of six; this will depend on some fundamental organisation and cultural capabilities.

It is certainly true that as you continue beyond twelve, you increase the overhead and admin to the extent that you might as well have stopped growing entirely at the dozen mark. The additional people simply cannot meaningfully deliver enough value to counter all the conflicts and problems that a large team experiences.

If you find yourself using pools of talent, such as sharing skills in external test, operations, and security teams, this might be a sign that you have a missing skill. Agile teams are supposed to be cross-functional teams, so they shouldn’t routinely need to access a central team for work that forms part of the deployment pipeline.

## Components and services

One of the key constraints that almost every organization must overcome is their system architecture. If you have one big monolith, then you have one big team. You might group this team or otherwise attempt to sub-divide it in your organisation chart, but they are all working on the same thing, can block everyone else’s release or create conflicting changes, and require co-ordination. So, if your architecture doesn’t enable multiple teams, you’re stuck with one big team of all your people.

That means you need to work out how to isolate parts of your system so a team can work in ways that mean they don’t trip over other teams. Each one of the components or services you create must be developed, integrated, tested, and deployed without any co-ordination with people working on other components. Even if you knew your optimal team size, it might take you some time to re-architect to enable it.

When you split a component, the split should be vertical (let’s separate the loans from the mortgages) not horizontal split (let’s have a database team and a UI team) as this makes the teams even more co-dependent, which is counter to the whole exercise.

## Summary

The word “optimal” is tricky, because optimisations always need some context. If we were designing a web farm, “optimal” requires us to think about how much capacity we need at peak, and what that would cost to run during the ebb that exists between the peaks. If we optimise for availability, we spend quite a lot more. If we optimise for cost, we’ll have to queue people or simply give up on responding to their requests. It’s impossible to say in general where the slider should be moved until you check your customer service agreements and marketing promises.

However, with team size we can’t simply throw more people into the mix without creating appropriate architectures and communication structures. Your organisation can become massive, but should ideally be composed of many smaller independent teams. Many organisations might challenge this by saying “our teams are bigger than your maximum and we’re doing okay”, which is all well and good, but agility is almost certainly suffering. Agility is more challenging at scale and if the organisation is large, and all the teams are large, changing direction just takes longer.

If you need to measure the agility of your organisation, test the following scenario… if you discovered today an idea that could revolutionise your industry and decided to make it your top priority, how long would it take for the first change to reach production and how long until you have a marketable feature? A large company with big teams might achieve straight-line speed, but when it comes to changing direction they are like a drag racer on a rally circuit.

With all this in mind, the optimal size of an agile team is between two and seven people.
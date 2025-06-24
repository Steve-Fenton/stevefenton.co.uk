---
title: 'Scrum is really just Kanban'
navMenu: false
pubDate: 2024-01-08
keywords: agile,scrum,lean,kanban
description: We should stop saying Scrum and Kanban are for different kinds of work.
bannerImage:
    src: /img/2018/10/continuous-improvement.png
    alt: Three Ways to Improve Software Development
authors:
    - steve-fenton
categories:
    - Process
tags:
    - Agile
    - Scrum
    - Kanban
---

While many moderate people like to say that teams often use a mix of Scrum and Kanban, there are also those who like to say when you should [choose one over the other](https://resources.scrumalliance.org/Article/scrum-vs-kanban). I have a strong opinion on both of these thought processes. They're wrong. We should stop saying these methods are for different kinds of work.

:::div{.note}

This is my first attempt at explaining my thoughts, so feel free to [hit me with feedback](/contact/) so I can sharpen this up.

:::

Kanban is a fully working way for teams to document and improve their own process, whereas Scrum is a straight-jacket. If I were to be more generous, I'd describe Scrum as an implementation of Kanban with a <abbr title="work in process">WIP</abbr> limit that's set way too high.

I'm now going to back up my spicy take with a sprinkling of justification. But why should anyone listen to me?

Some background is below, or you can skip to [why Scrum is just Kanban](#scrum-is-just-kanban).

## My experience with Scrum and Kanban

Every programmer has a unique experience with software delivery processes. I entered the industry when phased software delivery was the most common pattern for software processes. The slight curveball was that I had already delivered a successful software system, as measured by user satisfaction. In fact, the system I delivered was the reason the software team petitioned to move me into their department.

How did this happen? Well, I worked in a Legal and Compliance team and created an Intranet site to house compliance information. This somehow led to being seconded to a *ridiculously large software project* the organization was attempting. As we know from the CHAOS report, the size of this project practically guaranteed it would fail.

There was a document in circulation about why software projects failed and it was an in-joke that we ticked every single box. It was a high-cost, multi-year project with no working version planned until the end of the project.

But I wasn't a programmer at this time. I was just there to make sure the software produced would comply with all the regulations. As chance would have it, I ended up being taught how to write code by one of the excellent developers on the project. I already knew HTML, CSS, and a sprinkling of JavaScript, so they augmented this with how to connect to a database to persist information using Classic ASP. Old school, right?

Anyway, this resulted in a spate of side projects where I bumped up against many kinds of interesting problems to solve.

### The file tracking system

The first professional software I wrote didn't happen until the big project had failed dramatically and I was re-assigned to a newly created *business* team. This team was a holding zone for all the folks left stranded after they were seconded to the project and got backfilled. In hindsight, this was an exit lounge for the organization.

The leader of this doomed department was a smart chap. He thought the team were smart and could make a positive impact to the organization, so he set about creating opportunities for the team members to do good things. In my case, he saw that I could write a web application and sent me to the filing team, who were drowning in work.

I worked with the team for a week doing the work with them until I understood how frustrating it was trying to manage 60,000 paper files with millions of individual documents. Then I continued to work with them to create a system to replace the paper-based request process for files. Instead of writing out a card, and slotting it into the cabinet to represent the removed file, all the requests were made via the system I wrote. Anyone could see where a file was at any time without lengthy searches for missing files and misplaced placeholder cards.

It wasn't particularly advanced, but the team loved it. They also saved a ton of money, as they had an annual peak around tax-year-end, which previously meant onboarding temps to quadruple their team size. With the system in place, they could handle the peak better without bringing in temps... and without having to clean up afterwards as the temps always made tons of mistakes.

At this point in time, I didn't know what a software delivery process was... but it seemed like the natural path to building software was to work with the people who were going to use it, demo small changes to them, incorporate their feedback, and then do it again.

### The hostile takeover

It turns out the filing team had been waiting for years to get a file-tracking system. The IT team had given them estimates and the organization was never going to let their developers spend six months writing the software. I gave them a first version in two weeks and we iterated for four more. This had embarrassed the IT team, though I didn't know this at the time. How had this upstart from the exit lounge delivered a system in six weeks?

To avoid further embarrassment, I was moved into the development team. I thought this would be a great opportunity to learn the job properly. However, things were downright hostile and none of the in-house developers wanted anything to do with me. The saving grace of this move was that I sat next to a contractor who was generous with his knowledge. He helped me transition from my initial skill set of JavaScript, Classic ASP, and PHP into this new language called C#.

My second professional software project used phased software delivery. There was a business analyst and a systems analyst ahead of me, and I used the documents they wrote to deliver features. However, these documents were small. Like *two pages* small. The analysts were also sat on the same bank of desks. That meant it worked. The development manager had nailed the cadence, so a document would slide onto my desk, I'd deliver it, and another one would slide across.

It was phased software delivery, but it was also small batch continuous flow.

### The wilderness years

When I left that job, things got confusing. Heavyweight software processes and maturity models were everywhere. I would join a team of 100 developers who got less done than the teams of 1-4 developers I had worked on. There was so much waste. In one organization, there would be a six-month death march to complete a project, after which we'd all sit our hands for three months while we waited for new work.

We weren't allowed to talk to users. We couldn't demo changes. There was even an underground market where project managers would trade budgeted hours to make sure their projects balanced. It was nonsensical.

However, the wilderness years were crucial as you have to *see* this stuff to believe it. If I'd joined software delivery a decade later, I would have dropped straight into the Scrum era and missed these key lessons. You really have to see heavyweight models in action to understand just how bad they are.

## Scrum

Extreme Programming was really the answer to heavyweight models. For a moment, it seemed like the industry was turning in that direction. A solid set of technical practices and a lightweight process to manage the work. Nice. Then Scrum gained traction.

Scrum probably leapt up the charts thanks to its complete lack of technical practices. It was superbly easy for non-technical leaders to understand. Some good came from Scrum - it gave most organizations a 12x reduction in batch size and most of the success probably comes from that factor alone. If you reduce batches from 6-12 months to 2-4 weeks, many things improve. The organizations were paying attention to the CHAOS report and against those measures projects would be far more successful.

Compared to heavyweight models, Scrum shines. It's like building something from steel instead of brass. However, it's still a long way from building the same thing with aluminium or carbon fibre. Effectively, it got us *lighter*, but it didn't get us truly *light*.

## Scrum is just Kanban

So how is Scrum really just Kanban? Well, Kanban works by mapping *what you currently do* and then applying some principles and practices to the improvement of how you do it. If you are using Scrum, you can switch to Kanban by reviewing your board and making sure it's an accurate representation of your value stream.

Are all the hand-offs and queues represented? If not, add them to make them visible.

At this stage, Scrum and Kanban are the same thing. You represent your process with a to-do column that represents a sprint backlog, with a WIP limit of whatever you use to determine the size of a spring backlog. Crucially, though, this WIP limit is too high.

It's now up to you to make little changes to this process and measure the result. There's no end state as improvement is continuous in Kanban.

Ultimately, most teams who go down this road *do* end up reducing the batch size to the point where their work looks more like single-piece flow. That's because batch size seems to have a law of nature attached to it. If you can reduce the batch to one thing, and cut that one thing down to one valuable change, it turns out you increase your software delivery performance *and* organizational goal attainment.

A true continuous improvement process will eventually lead to ultimate batch size reduction.

## Why Scrum remains popular

This isn't an attack on Scrum. It was popular because it was easy for non-technical folks to understand, unlike Extreme Programming which was harder for these people to follow. In any case, moving from heavyweight models to Scrum is likely to be beneficial if it involves making work visible and reducing batch size (even if it doesn't go far enough in this respect).

As of 2024, I think most of the reasons Scrum remains popular are toxic. The organizations using Scrum and scaled frameworks are clinging to them because *they don't have to change so much*. Scrum is used to avoid progress. If you re-label all the *ways we've always done things* you can run reasonable *agile theatre*.

Is this the intention of Scrum's authors? Absolutely not. But like [Benington and Royce](https://octopus.com/devops/history/early-software-delivery-models/), they're faced with rather nasty-looking interpretations of their work that don't resemble its intention. Remember when Benington said that the *top-down programming* approach where specifications had to be completed before code started was a *misleading and dangerous* interpretation of the Lincoln Labs model? Well, so it goes for every author of such a process, sadly.

However, I would argue that even a textbook implementation of Scrum can never be the end state for a software development team. Not while competitors are moving beyond it. However, I think that your [software development process probably doesn't matter as much as *intent*](/blog/2020/07/software-development-process-does-not-matter/).

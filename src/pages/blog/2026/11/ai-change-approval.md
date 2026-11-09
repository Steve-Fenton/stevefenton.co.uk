---
title: Your AI investment is eaten alive by your change approval process
subtitle: Old knowledge provides the solution once again
pubDate: 2026-11-09
description: "Change approval has been a constraining force on software delivery for decades. With teams adopting AI coding assistants and agents, the quantity, size and complexity of changes is making a bad problem worse."
keywords: "ai,change approval"
navMenu: false
bannerImage:
  src: /img/topic/architecture/london-southbank.jpg
  alt: "Photo by Steve Fenton. A view of London's Jubilee Gardens on the South Bank of the Thames. People are making their way across the wavy paths, or eating on the grass."
authors:
  - steve-fenton
categories:
  - Opinion
tags:
  - AI
meta:
  - name: canonical
    content: "https://thenewstack.io/stop-wasting-ai-investment-on-a-broken-change-approval-process/"
---

Change approval has been a constraining force on software delivery for decades. I've worked on teams who could deliver a change with the agility of an acrobat, only for it to sit waiting for weeks for the superstitious rituals of the <abbr title="Change Approval Board">CAB</abbr>. With teams adopting AI coding assistants and agents, the quantity, size and complexity of changes is making a bad problem worse.

For many organizations, investments in AI for developer productivity are failing to yield meaningful returns, and committee-based approval is often a contributing factor. Where organizations are unwilling to streamline their change approval process, investments in improving productivity *literally anywhere else* are a total waste.

Not only does heavyweight change approval slow everything to a crawl in the name of risk reduction, it turns out they have a negative impact on that same goal.

The answer to these board-room, coffee and biscuits, overcrowded and slow approval gates is something called "streamlined change approval". This involves dissipating the responsibilities for risk reduction into the normal pipeline for changes.

Peer review provides segregation of duties, neatly captured for auditors within the developer tools in the form of reviews, comments, and approvals. Automation provides rapid validation of "function and non functional requirements", and monitoring tools keep an eye out for bad changes that reach production and flag them for action.

This aligns with that old-school idea on how to make every aspect of software delivery better...

## A simple yet pivotal idea

So, there's a simple idea at the heart of modern software delivery that drives all the other things you can do to improve throughput, stability, quality, and compliance. It's called "working in small batches." The idea is so simple, yet many organizations dismiss it.

"Perhaps a small company or a startup can work in small batches," they say. "But we are regulated!"

The idea that [regulation requires large batches is nonsense](https://thenewstack.io/stop-blaming-regulation-for-poor-software-delivery-performance/). If you review proposed rules on cybersecurity, you'll see that small batches and short lead times will be a significant compliance advantage. Small batches achieve risk reduction, safety, security, and compliance far better than large batches.

Large batches are like a virus. When any part of your software delivery pipeline moves in large batches, it forces other pipeline stages to match the large batch size. That means you end up with a pipeline trending towards the largest batch in your delivery process. This is often the time it takes to test a software version manually or, when you have a CAB, the cadence of change approvals.

To deliver software in small batches, you must identify where the batch size is being set and reduce it at that stage by improving the process, automating steps and finding ways to minimize friction. This is where continuous delivery has so much power. It encourages testing to become a continuous activity, and it demands that approvals are a continuous part of the delivery pipeline.

## Proven By Research and Experience

There's a wealth of research that examines how batch size affects software delivery throughput, quality and risk. The long-running [State of DevOps research](https://dora.dev/research/) program includes small batches in its capability model alongside streamlined change approvals. You can see how these relate to each other, as we know that the number of changes will be forced to increase if the change approval process is slow and heavy (and the approval process gets slower and heavier when it must approve larger batches... a spiral of doom).

Lightweight change approvals are broken down further in the "[Compliance through Continuous Delivery" report](https://octopus.com/publications/compliance-through-continuous-delivery), which defines them as having four qualities:

- **A healthy approval chain**: When a chain of approvals is required, it should include sign-off from both the team and the direct manager.  
- **Few manual approvals**: Having many manual approvals creates a compound delay in the change approval process.  
- **No cross-team committees**: Change approval boards and committees are the worst approach to change approval.  
- **Approvals captured in deployment/ITSM tools**: Capturing approvals within deployment and ITSM (information technology service management) tools reduces approval friction.

Lightweight change approvals, combined with reliable deployments, increase software delivery throughput and the attainment of governance, risk and compliance goals.  

:::figure

:img{ src="/img/2026/approvals.png" alt="A model showing how lightweight change approvals and reliable deployments improve throughput." loading="lazy" }

::figcaption[Lightweight change approvals and reliable deployments improve throughput]

:::

While [Fred Brooks](https://en.wikipedia.org/wiki/Fred_Brooks) warned us that there are no silver bullets, it's fair to say that software delivery is overrun with supernatural monsters. These can be effectively banished with the silver bullet of small batches. When you decide to shrink your batch size, you must resolve inefficiencies throughout your software delivery pipeline, and change approvals is one beast that haunts this particular forest.

While the statistics are valuable evidence for small batches and lightweight change approvals, we also have three decades of experience from practitioners that confirm this. This experience has been documented in many software approaches, by  [Kent Beck](https://www.amazon.com/Extreme-Programming-Explained-Embrace-Change/dp/0321278658) (extreme programming), [Dave Farley and Jez Humble](https://www.amazon.com/Continuous-Delivery-Deployment-Automation-Addison-Wesley/dp/0321601912) (continuous delivery), [Mary and Tom Poppendieck](https://www.amazon.com/Lean-Software-Development-Agile-Toolkit/dp/0321150783) (lean software development), and [David Anderson](https://www.amazon.com/Kanban-Successful-Evolutionary-Technology-Business/dp/0984521402) (Kanban).

## Zooming in on code review and AI

Within the broader topic of change approval, we also have the small but mighty problem of code review. Large change sets, heavyweight code review processes, asynchronous reviews, and failing to run test automation before check-in all reduce delivery speed.

If you use AI to generate more code in a short period, any existing bottleneck in code review will become significantly worse. You're likely to increase batch sizes, triggering a vicious cycle that leads to longer waits, more extensive reviews and significant quality issues. When you have to wait longer to receive feedback on a review, you start saving up more changes for each review, which amplifies the problems even further.

:::div{.note}

As an aside, while I've worked on teams where code review was a bottleneck, in most cases it isn't. If you can see work piling up in stages after the code review stage, optimizing code review will just fill those queues up even more. If you use synchronous techniques, like pair programming, code review is a breeze.

:::

In the "[State of AI vs Human Code Generation Report](https://www.coderabbit.ai/blog/state-of-ai-vs-human-code-generation-report)," CodeRabbit analysed 470 open source pull requests to compare AI-generated changes with those made by humans. AI made 1.7x more mistakes than developers, with a higher rate of major and critical errors. That means that, as we increase the burden of code review, it has also become even more crucial.

Many organizations are responding to this by adding tools, like [Gemini Code Assist](https://codeassist.google) or [CodeRabbit](https://www.coderabbit.ai), to speed up code review. This is only part of the solution to addressing a bottleneck like this. Adding tools isn't enough, and we need to think systematically about constraints.

[Eli Goldratt](https://en.wikipedia.org/wiki/Eliyahu_M._Goldratt) said there can only ever be a single constraint in your system. It's the weakest link in the chain, so no matter what you do to the other links, the chain can never be stronger than that single weakest link. There are five focusing steps to manage constraints:

- **Identify**: You must find the one true bottleneck.  
- **Exploit**: Get the most value from what you have.  
- **Subordinate**: Pace everything else to the bottleneck.  
- **Elevate**: Invest in expanding capacity at the bottleneck.  
- **Repeat**, as the bottleneck may have now moved.

If you've identified code review as your bottleneck, you should first exploit it. You must determine how to maximize the value from the code review process. This may be as simple as prioritizing the most valuable changes in the code review queue.

Next, you subordinate the software delivery pipeline by setting the pace of all stages to match the speed at which you can process code reviews. Stages after code review are naturally limited because work can only begin once the review is complete, so you should limit the introduction of work in the stages preceding code review to match its pace.

If a developer can't start new work due to work-in-progress limits, they may be able to take on some of the code review workload, and the whole system improves as a result.

Finally, you elevate the constraint, which means improving the rate at which you can complete code review. At the top of your list should be working in smaller batches, as this means smaller code reviews, which are easier to understand and review.

You can also automate many tasks to lighten the load on the human reviewer. You can use linting tools, automated tests and static analysis to give faster feedback to developers without needing human review. That means the scope of the code review is narrower and more focused. The AI code review tools for summarizing and checking changes may be helpful at this stage.

The crucial wisdom within the five focusing steps is that if you skip to the elevating stage, you end up automating things that you could have removed or solved without investment.

## It really is about smaller batches

Everything ultimately comes back to working in small batches. Reducing batch size is a substantial positive driver of improvement. Automation makes sense when it enables tiny change sets that are deployable on demand. Small batches guide your tool choices and process improvements, and the results in terms of product, team and organizational performance will show you that it works.

When you examine your change approval process, you may be tempted to think that it doesn't make sense to work in such small batches, as each one requires assembling the entire change approval board. In reality, a change approval board doesn't make sense when you can work in such small, low-risk batches.

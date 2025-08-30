---
title: 'Context switching comes at the price of delivery'
navMenu: false
pubDate: 2012-06-10T16:05:51+01:00
authors:
    - steve-fenton
categories:
    - Process
    - Psychology
---

Context switching is a computing term that describes a process where a task or process is paused and shipped off somewhere so another task of process can use the CPU for a bit. The idea is that you can make it seem like lots of stuff is running on your computer by letting each thing get a turn at processing stuff. It's a clever illusion.

A computer can context switch pretty fast, but there are two cost categories to account for. Firstly, a couple of tasks that take 10 units of time might be swapping with each other, so after around 20 units they both complete. Without switching the first task would have been done in 10 units and the second after 20, so the average time to complete would be 15 units, which is better than the average of 20 units you get with context switching.

The second cost comes from the switch itself. You have to capture the current state of the process, store it somewhere, and then bring the other thing back out from wherever it was stored and start it up again. In computers, this is faster than a blink of an eye, so you probably don't cost it out.

This article isn't about computers though; it's about people.

## Human context switching

While these same two costs categories exist for people, the delays of pausing one thing to make progress on another, and the cost of getting back up to speed when you switch... a big difference is that it doesn't happen in the blink of an eye. The costs for context switching are greatly increased.

[Henrik Kniberg has a famous multitasking name game](https://www.crisp.se/gratis-material-och-guider/multitasking-name-game) that shows how it takes an order of magnitude longer to deliver names written of pieces of card if you have to keep switching between each task. This looks almost exactly like the processor switching problem when you record the result on paper.

Despite the multitasking name game being reasonably well known and almost universally accepted as being true about how you flow stories across a Scrum or Kanban board and why you should reduce your work in process (WIP) limits, the affect of interruptions doesn't seem to be held in the same regard when it comes to context switching.

Here's a dumb example so you can imagine the kind of scenario.

You are looking at your computer games collection in order to estimate how much trade-in you might get towards the ridiculously expensive latest release. As you glance at each game, you are estimating its value and adding it to a total value in your head. You get about half-way through and your partner asks you what you are doing.

By the time you have answered the question, your brain is likely to have either disposed of the numbers that were flowing through your mind or stuck the information somewhere more permanent. If the discussion goes on longer ("why are you doing that", "how long will that take") it becomes more likely that the information that was available immediately in your short term memory has been discarded or moved somewhere less instant.

So you go back to your games collection and start again – it will take less time to get to where you were before because your brain will remember some of the values you had estimated, but overall the clock is still ticking on the task.

So as you can imagine, you don't know to switch to a completely different feature in order to suffer a context switch. As soon as you are interrupted there is a cost and the longer the interruption lasts, the bigger the cost as your brain will move more information out of your immediate memory.

So bringing this all back to a development scenario. If a developer is interrupted with a question, it could put their work back by hours for each interruption due to context switching. This is because of the amount of stuff they are holding in their immediate memory while they are working on a feature. They will have parsed lots of code in the area they will be working on and will have projected their changes in their mind before they start coding and the interruption will impact their focus on this information. Additionally, once interrupted the developer may decide to batch other interruptions like email into the break – but this elongates the gap and makes it more likely that the information will be squirrelled away into harder to access places.

So bearing this in mind, imagine how much more damaging it is each time the question is misdirected and needs to be moved onto another developer. For example, you ask Wendy if she knows why the build is broken and she tells you that she thinks Karen is looking at it. When you ask Karen, she tells you that actually she isn't looking at it, but Shaun is. So you go to Shaun and get the correct answer – but at the cost of crushing the productivity of three developers rather than just one. Ouch. And that is just one interruption.

I think that it is sad that interruptions aren't taken seriously and very often people would rather reduce a work in progress limit than accept that interruptions are the greater cause of context switches in an agile team.

## Solutions

Ideally, any request for work should make its way to developers via the product owners in an agile team. Whether it is a bug or a feature or a request for a custom data dip – it is all work that should be known to the product owner and prioritised against the other work. Any work that gets to the developers without the product owners knowing hurts productivity because this work will tend to gravitate towards the same people, rather than be distributed and prioritised with a view of the bigger picture. It also means that the product owner is working with an incomplete set of data.

If you are on a team and need to manage interruptions, either because the kind of interruptions mean it works better that they come directly to the team or because the product owners are unable or unwilling to manage the flow of interruptions, you can designate one developer to be [The Disturbed](https://www.infoq.com/news/2009/09/answer-to-context-switching) for the duration of a sprint. If you do this, you need to bear in mind that they won't actually achieve very much (if anything) and that it is not a particularly satisfying role (so you can't give someone this role permanently). Equally, the person in this role needs to be able to be quite direct with the people asking for help, because it isn't just a matter of sending the interruption to the right person, or dealing with it yourself – you also have to tell people up front when they are not going to get what they are asking for because of higher priorities.

When using this method, The Disturbed also needs to be autonomous – the person performing this role cannot be undermined when they make a judgement call that doesn't suit someone. Their role is to protect the work on the Kanban board, so only work that they judge to be more urgent, such as a live issue, will be prioritised above this work. In some cases, The Disturbed might choose to add a task to the board to be picked up after the in-flight items are done.

The Disturbed is a sub-product-ownership role, so it comes with some of the same responsibilities and judgement calls. It shouldn't fall solely to the Scrum-master role to do this job because it needs to be a different person in each iteration.

## Summary

The problem of interruptions can only be solved if it is taken seriously. There needs to be general acknowledgement that the cost of a 10 minute interruption is much greater than 10 minutes, potentially measured in hours if it comes at the wrong time or if the problem pinballs between many developers on its way to the correct place.

If your product owners don't have the capacity to deal with requests coming in from across the business, you should probably consider adding to this team. If you really want to push this task down to the developers, you must understand that it will cost you a developer, per team, every year.

---
layout: src/layouts/Default.astro
navMenu: false
title: 'Context switching comes at the price of delivery'
pubDate: 2012-06-10T16:05:51+01:00
author:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=795'
interface_sidebarlayout:
    - default
medium_post:
    - 'O:11:"Medium_Post":11:{s:16:"author_image_url";s:75:"https://cdn-images-1.medium.com/fit/c/400/400/1*eXkhfEuF41g5W_xnc_ydLA.jpeg";s:10:"author_url";s:38:"https://medium.com/@steve.fenton.co.uk";s:11:"byline_name";N;s:12:"byline_email";N;s:10:"cross_link";s:3:"yes";s:2:"id";s:12:"df4d244af257";s:21:"follower_notification";s:3:"yes";s:7:"license";s:19:"all-rights-reserved";s:14:"publication_id";s:2:"-1";s:6:"status";s:5:"draft";s:3:"url";s:51:"https://medium.com/@steve.fenton.co.uk/df4d244af257";}'
categories:
    - Process
    - Psychology
---

If you are a programmer, you will know that context switching is the process of dehydrating and rehydrating the state of a CPU in order to allow it to run more than one process. Simplistically speaking, it allows you to run more than one program when you only have one CPU. If you are old enough, you’ll remember having to close one program before you were able to open another. The ability for a processor to multi-task is a convenient feature, but it comes at a cost.

For example, if you ask a computer to perform the same three tasks but in one case you ask it to do them sequentially and the in the second case you ask it to switch between them, you will see the following wastage taking place.

| 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | **1** | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 2 | 2 | **2** | 3 | 3 | 3 | 3 | 3 | 3 | 3 | 3 | 3 | **3** |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|

| Task | Completed In (Seconds) |
|---|---|
| Task 1 | 10 |
| Task 2 | 20 |
| Task 3 | 30 |

Sequentially, you get the first response in 10 seconds, the second response in 20 seconds and the third response in 30 seconds.

| 1 | 2 | 3 | 1 | 2 | 3 | 1 | 2 | 3 | 1 | 2 | 3 | 1 | 2 | 3 | 1 | 2 | 3 | 1 | 2 | 3 | 1 | 2 | 3 | 1 | 2 | 3 | **1** | **2** | **3** |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|

| Task | Completed In (Seconds) |
|---|---|
| Task 1 | 28 |
| Task 2 | 29 |
| Task 3 | 30 |

With context switching you get the first response in 28 seconds, the second response in 29 seconds and the third response in 30 seconds.

Of course, this is actually not quite right, because the process of context switching involves storing the state of the task you are switching away from and loading the state of the task you are switching to – which costs more time – quite often more time than the task itself if the task runs for any length of time.

### People

This article isn’t about computers though; it’s about people.

Despite this, the same principles that are highlighted in the computer example apply to people too – although people can be more complex. [Henrik Kniberg has a famous multitasking name game](https://www.crisp.se/gratis-material-och-guider/multitasking-name-game) that shows how it takes an order of magnitude longer to deliver names written of pieces of card if you have to keep switching between each task. This looks almost exactly like the processor switching problem when you record the result on paper.

Despite the multitasking name game being reasonably well known and almost universally accepted as being true about how you flow stories across a Scrum or Kanban board and why you should reduce your Work in Progress limits, the affect of interruptions doesn’t seem to be held in the same regard when it comes to context switching.

Here’s a dumb example so you can imagine the kind of scenario.

You are looking at your computer games collection in order to estimate how much trade-in you might get towards the ridiculously expensive latest release. As you glance at each game, you are estimating its value and adding it to a total value in your head. You get about half-way through and your partner asks you what you are doing.

By the time you have answered the question, your brain is likely to have either disposed of the numbers that were flowing through your mind or stuck the information somewhere more permanent. If the discussion goes on longer (“why are you doing that”, “how long will that take”) it becomes more likely that the information that was available immediately in your short term memory has been discarded or moved somewhere less instant.

So you go back to your games collection and start again – it will take less time to get to where you were before because your brain will remember some of the values you had estimated, but overall the clock is still ticking on the task.

So as you can imagine, you don’t know to switch to a completely different feature in order to suffer a context switch. As soon as you are interrupted there is a cost and the longer the interruption lasts, the bigger the cost as your brain will move more information out of your immediate memory.

So bringing this all back to a development scenario. If a developer is interrupted with a question, it could put their work back by hours for each interruption due to context switching. This is because of the amount of stuff they are holding in their immediate memory while they are working on a feature. They will have parsed lots of code in the area they will be working on and will have projected their changes in their mind before they start coding and the interruption will impact their focus on this information. Additionally, once interrupted the developer may decide to batch other interruptions like email into the break – but this elongates the gap and makes it more likely that the information will be squirrelled away into harder to access places.

So bearing this in mind, imagine how much more damaging it is each time the question is misdirected and needs to be moved onto another developer. For example, you ask Wendy if she knows why the build is broken and she tells you that she thinks Karen is looking at it. When you ask Karen, she tells you that actually she isn’t looking at it, but Shaun is. So you go to Shaun and get the correct answer – but at the cost of crushing the productivity of three developers rather than just one. Ouch. And that is just one interruption.

I think that it is sad that interruptions aren’t taken seriously and very often people would rather reduce a work in progress limit than accept that interruptions are the greater cause of context switches in an agile team.

### Solutions

Ideally, any request for work should make its way to developers via the product owners in an agile team. Whether it is a bug or a feature or a request for a custom data dip – it is all work that should be known to the product owner and prioritised against the other work. Any work that gets to the developers without the product owners knowing hurts productivity because this work will tend to gravitate towards the same people, rather than be distributed and prioritised with a view of the bigger picture. It also means that the product owner is working with an incomplete set of data.

If you are on a team and need to manage interruptions, either because the kind of interruptions mean it works better that they come directly to the team or because the product owners are unable or unwilling to manage the flow of interruptions, you can designate one developer to be [The Disturbed](https://www.infoq.com/news/2009/09/answer-to-context-switching) for the duration of a sprint. If you do this, you need to bear in mind that they won’t actually achieve very much (if anything) and that it is not a particularly satisfying role (so you can’t give someone this role permanently). Equally, the person in this role needs to be able to be quite direct with the people asking for help, because it isn’t just a matter of sending the interruption to the right person, or dealing with it yourself – you also have to tell people up front when they are not going to get what they are asking for because of higher priorities.

When using this method, The Disturbed also needs to be autonomous – the person performing this role cannot be undermined when they make a judgement call that doesn’t suit someone. Their role is to protect the work on the Kanban board, so only work that they judge to be more urgent, such as a live issue, will be prioritised above this work. In some cases, The Disturbed might choose to add a task to the board to be picked up after the in-flight items are done.

The Disturbed is a sub-product-ownership role, so it comes with some of the same responsibilities and judgement calls. It shouldn’t fall solely to the Scrum-master role to do this job because it needs to be a different person in each iteration.

### Summary

The problem of interruptions can only be solved if it is taken seriously. There needs to be general acknowledgement that the cost of a 10 minute interruption is much greater than 10 minutes, potentially measured in hours if it comes at the wrong time or if the problem pinballs between many developers on its way to the correct place.

If your product owners don’t have the capacity to deal with requests coming in from across the business, you should probably consider adding to this team. If you really want to push this task down to the developers, you must understand that it will cost you a developer, per team, every year.
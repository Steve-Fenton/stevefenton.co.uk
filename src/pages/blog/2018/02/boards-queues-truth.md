---
id: 3334
layout: src/layouts/Default.astro
title: 'Boards, queues, truth'
pubDate: 2018-02-02T09:50:29+00:00
author:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=3334'
permalink: /2018/02/boards-queues-truth/
medium_post:
    - 'O:11:"Medium_Post":11:{s:16:"author_image_url";s:75:"https://cdn-images-1.medium.com/fit/c/400/400/1*eXkhfEuF41g5W_xnc_ydLA.jpeg";s:10:"author_url";s:38:"https://medium.com/@steve.fenton.co.uk";s:11:"byline_name";N;s:12:"byline_email";N;s:10:"cross_link";s:3:"yes";s:2:"id";s:12:"933dbd2b8750";s:21:"follower_notification";s:3:"yes";s:7:"license";s:19:"all-rights-reserved";s:14:"publication_id";s:2:"-1";s:6:"status";s:5:"draft";s:3:"url";s:51:"https://medium.com/@steve.fenton.co.uk/933dbd2b8750";}'
image: /wp-content/uploads/2018/02/queue.jpg
categories:
    - Process
tags:
    - queues
---

![Queues](https://www.stevefenton.co.uk/wp-content/uploads/2018/02/queue.jpg)

At the Post Office in the UK, you used to enter the building and scan the room to perform an analysis of the queues. There were a number of open windows housing counter staff, and a queue for each one. A rookie would look for the shortest queue and join the end of it, but a pro would invest a few more seconds analysing the queues. Here are some common queues with their important visual clues:

1. (5 people) Parcel, Parcel, Parcel, Parcel, Parcel
2. (3 people) Parcel, Green Paper, Parcel
3. (4 people) Parcel, Parcel, Passport, Parcel

So we know that the amateur Post Office customer is going to pick the middle queue, because it has fewer people. But the expert customer heads over to the queue with five people in it. Are they crazy? Of course not, they just have a good appreciation for variability. Parcels are easy. They are the predictable work of the Post Office. You drop the parcel on the scales, are given a few postage options, and pay some money. In the worst case, you have to fill in a small registered delivery slip. Green Paper on the other hand is the warning light of the Post Office world. That person is applying for a new driving license and that involves checking a lot of information, rubber stamps, photography, bodily inspections, and forms. The other warning flag is that passport in queue three, maybe it is just identification for some small transaction – but it could be a replacement passport transaction. This is a highly variable queue item that could be faster than a parcel, or slower than a driving license.

The Post Office newbie watches as the longer queues stream past – and learns a lesson in single-server queues.

When you have as many queues as you have queue processors, the queues are badly affected by variability. A lucky queue will process many times faster than an unlucky queue (assuming variability is simply down to luck!)

This is why the Post Office changed their system. If you visit a Post Office today, while you still can, you’ll find that there is a single queue being processed by multiple windows. Everyone joins the queue on arrival and is processed as fast as they can be, rather than based on luck or judgement. If someone ahead of you wants to renew their passport *and* their driving license it no longer matters. They will tie up a window, but the queue will continue to be served by other windows. This is a parallel-server queue.

### Boards are queues

When you set up a board to track work, you are creating a queue. You may be tempted to set up many boards, maybe to track different kinds of work, or perhaps to track work arriving from different places, such as different customers. Before you set up additional boards, think back to the Post Office example. A single-server queue will cause the same problem with variability.

### Boards are truth

A second problem with multiple boards is that you have no definite source of truth. You can’t look at “the board” and see all of your work in progress. You end up generating lots of confusion and lose your ability to manage the work. Questions will arise, such as:

- Where will you pull your next task from?
- What are you working on right now?
- Are you pushing work towards a constraint?
- How much work is in progress?
- Are you able to pair/mob on a task?

### Summary

If you are already in a situation where you have myriad boards, your first fix should be to work towards one board per unit. You need to work out what a unit *currently* looks like in your organisation. If you have teams of two people, you should start by reducing the number of boards so you have one queue per two-person team. This allows each of these teams to answer all of the important questions. Over time, you should reduce the number of boards further, especially where teams interact over the same work, have interdependencies, or you simply want to encourage more collaboration.

If you ask an individual the questions listed above, you’ll find out whether the boards are effective. If you don’t even need to ask, because you can just look at the board and see the answers; that’s even better.

<small>Photo: Queue for Waterloo &amp; City by [Stephen Colebourne](https://www.flickr.com/photos/jodastephen/)</small>
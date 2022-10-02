---
id: 197
title: 'Refactoring your program and changing your oil'
pubDate: '2015-01-20T16:27:42+00:00'
author: 'Steve Fenton'
layout: post
guid: 'https://www.stevefenton.co.uk/?p=197'
permalink: /2015/01/refactoring-your-program-and-changing-your-oil/
interface_sidebarlayout:
    - default
medium_post:
    - 'O:11:"Medium_Post":11:{s:16:"author_image_url";s:75:"https://cdn-images-1.medium.com/fit/c/400/400/1*eXkhfEuF41g5W_xnc_ydLA.jpeg";s:10:"author_url";s:38:"https://medium.com/@steve.fenton.co.uk";s:11:"byline_name";N;s:12:"byline_email";N;s:10:"cross_link";s:3:"yes";s:2:"id";s:12:"3910dbb3e6e3";s:21:"follower_notification";s:3:"yes";s:7:"license";s:19:"all-rights-reserved";s:14:"publication_id";s:2:"-1";s:6:"status";s:5:"draft";s:3:"url";s:51:"https://medium.com/@steve.fenton.co.uk/3910dbb3e6e3";}'
categories:
    - Process
    - Programming
tags:
    - refactoring
---

Technical teams are often guilty of asking the customer to make a technical decision. As Kent Beck said in respect of Extreme Programming; technical people should make the technical decisions and business people should make the business decisions. Very often, people think that this is a territorial statement that says “stay away from my decision”, but it is actually a statement of responsibility. You are being paid as a technical specialist – make the call.

The question of refactoring comes up often when I talk to agile teams. Claims of not being allowed to perform refactoring or not being given time are made. “It is really hard to sell it to the business” people say.

You don’t need to sell it to the business. Refactoring is entirely a technical decision.

### Metaphor Time

You go to a mechanic and ask for an oil change. The conversation proceeds as follows:

You: “Please can I have an oil change?”

Mechanic: “Let’s go and look at your car together first.”

You: “Oh. Okay. Why?”

Mechanic: “Because I may need to run the engine for a while to warm it up.”

You: “I see. Will that make the oil change take longer? How long do you have to run the engine?”

Mechanic: “I won’t need to run it for long. It won’t make the job take much longer – it can actually help to drain the oil faster and more thoroughly than when it is cold.”

You: “I see. So will it make it more expensive?”

Mechanic: “No. I change the same amount whether I run the engine or not.”

You: “I see. So why do we need to discuss it?”

Mechanic: “Because on some cars the oil filter is in a tough position and is harder to change if the engine is hot.”

You: “I see. So you may decide to run the engine, or you may not.”

Mechanic: “Exactly. In fact, I may decide to not run it at all, or I may run it a little, or I may run it for a while.”

You: “I see. So will it take any longer or cost any more in any of those cases?”

Mechanic: “No. Ah – you have one of those. Nice car. I would like to run the engine for a while before I change the oil.”

You: “I’d rather you didn’t. I don’t want to waste petrol.”

Mechanic: “YOU NEVER LET ME DO A PROPER JOB!”

### Alternate Version

You: “Please can I have an oil change?”

Mechanic: “Sure. I’m an expert at that, so leave it with me.”
---
layout: src/layouts/Default.astro
navMenu: false
title: 'Schedule compression'
pubDate: 2016-08-02T06:00:03+01:00
authors:
    - steve-fenton
medium_post:
    - 'O:11:"Medium_Post":11:{s:16:"author_image_url";s:75:"https://cdn-images-1.medium.com/fit/c/400/400/1*eXkhfEuF41g5W_xnc_ydLA.jpeg";s:10:"author_url";s:38:"https://medium.com/@steve.fenton.co.uk";s:11:"byline_name";N;s:12:"byline_email";N;s:10:"cross_link";s:3:"yes";s:2:"id";s:12:"af8c79113d09";s:21:"follower_notification";s:3:"yes";s:7:"license";s:19:"all-rights-reserved";s:14:"publication_id";s:2:"-1";s:6:"status";s:5:"draft";s:3:"url";s:51:"https://medium.com/@steve.fenton.co.uk/af8c79113d09";}'
categories:
    - Process
tags:
    - 'noestimates'
    - deadlines
    - estimation
---

When a software team gives an estimate, it is not uncommon for the estimate to be “rejected”. I wanted to explore my thoughts on this matter.

When an estimate varies wildly from what you expect, want, or need; you have lots of options. But the following is *not* an option: “come back with a lower estimate”.

There are, of course, reasons that an estimate is not acceptable – but asking for a lower number will not make something improbable become probably. If you need things sooner, or cheaper, or both; there are ways to manage this. What you can’t get is “Everything! Now! Free!”.

Now, a quick diversion on Parkinson’s Law. People love quoting this, but it doesn’t apply. Parkinson was specifically referring to the civil service (and in particular, bureaucracy) when he said that “work expands to fill the time available”. The result of the mis-application of this quote is that people expect to combat Parkinson’s Law by squeezing development time.

So what happens when you compress a software development schedule? A few good things, and a lot of catastrophically bad things.

The good things:

Focus! If you have a critical date that everyone knows about, people will focussed on what absolutely must be done. Scope creep will be mostly eliminated, because everyone will be thinking about the date. If someone starts a sentence with “It would be nice if…”, everyone listening knows that this work will not be considered until after the date. Essentially, everyone has a mental MoSCoW map, and only the *M* matters. If you are after this laser-focus and are considering using a date to force it, artificial deadlines are a damaging way to achieve focus. There are better ways to do it, that require the business to show some discipline – rather than pitching them against a development team that act as a gatekeeper because they are under pressure.

Launch Plan! If there are other activities that will depend on the release, knowing when that release will land allows other areas to start work at the “last responsible moment”, rather than working on it too soon at the cost of other work (and possibly having to re-work what they do if something changes).

The bad things:

Schedule compression is lossy. If you force a date that isn’t achievable, things will have to be lost to achieve the date. Quality is usually the first and most obvious loss, with people-loss coming next (people leaving is often attributable to the loss of quality – they want to work on something they can be proud of). There are plenty of less tangible losses too; things that you are spending money trying to improve (engagement, morale, teamwork), while undermining them with death-march deadlines.

If you knew for certain exactly how long something would take, you would be able to negate any chance of Parkinson’s law without suffering loss. You would get a lossless compression of your schedule. The point it, though, that we don’t know how long it will take, which is why we are estimating. If you force dates, something has to give.

So what can be done?

If you have a genuine deadline to meet, like an inflection point that drastically changes the economics of your product or a regulatory change date – people will usually rally to make things happen. You can’t use this artificially, or too often. You are drawing from a balance of goodwill that, once empty, will damage your business.

### Economic inflection deadline

If you are dealing with a date that will change the economics of the software development from “golden” to “zero”, you need to understand that you are taking on the risk of this loss. If the date cannot be met for some reason, you’ll lose all of the sunk cost. Usually the risk of these kinds of project is offset by a big pay-off, so you should know how many of these you need to win to soak up those where you lose. If you business depends on winning every time, then expect to blow up eventually. You should be doing everything you can to stack the odds in your favour, such as taking extra care not to request features that aren’t essential before you have a working product.

If you are planning such an expedition into risk and ask for an estimate, and that estimate tells you it is not possible; you should seriously consider abandoning the idea and seek achievable ideas to fund instead. If the pay-off is potentially so big you still want to continue – don’t demand a lower estimate, admit that you are asking for the impossible and draw from your social goodwill. If you have no social goodwill remaining because you’ve pulled this strategy too often, expect losses (people, money, dates).

### Regulatory deadlines

If a deadline has been imposed by an external regulator, don’t mistake the situation for being any different to the economic situation. You just need to be able to turn the information into usable numbers – for example the cost of fines, the cost of any negative impact if the regulatory failure would cause an outcry. Once you are dealing with these numbers you can handle things just like with the example above.

Now there may be a case where not meeting the deadline would end your business. In these cases, if you couldn’t possibly meet the deadline, the responsible thing to do may be to wind up the business on good terms, rather than spend a load of capital and go bust when you miss the date. This would be a very extreme example, but I mention to remind you that if you know the likely outcome is catastrophic, you still have the power to make decisions.

### Estimates

In the above cases, the option to demand a shorter estimate is a form of business insanity. Of course you don’t want to hear that something may not be possible, but asking people to lie to you to tell that it is possible seems irresponsible. If you want a different estimate, you should be changing some of the variables. What would happen if you invested more money up front, or removed unnecessary road-blocks and bureaucracy that are slowing down delivery? What would happen if you didn’t tie people up in status reports and all-day meeting schedules for six months? You might even ask the software team what they would want changed to speed things up – they are likely to have some good answers. Feel free to ask for another estimate given changes in the constraints and variables…

### Alternatives

In cases where there is not real deadline, you may want to consider an alternative approach that doesn’t require software development teams to estimate. Rather than spending time calculating how long something may take, or how much it may cost, set a burn rate and start the experiment. You will very quickly be able to see the information you need, with the added bonus of not taking people away from the activity that you really want them to do (i.e. writing software).

If you budget for a monthly amount to invest in the work, you can check and adjust regularly based on the empirical evidence you have before you, and based on numbers that are easily collected and applied (such as lead time and cycle time).

You can also use techniques that don’t involve software in your experiments. Starting a feature with a manual process is a great way to see if it has traction, before checking the economics of assisting people to scale the feature with software.

This doesn’t technically mean you are running without estimates, because the projections you will make based on the metrics you collect are a form of estimation (just as the expected benefits of the software development will be estimates). The difference is that they start with real numbers and are simple to calculate (i.e. tell me how many acceptance criteria you have, and I can generate the projected dates automatically). The numbers are rough-sawn, but are good enough to make decisions. They are also available instantly, which means you can decide faster – and they can be regenerated regularly to help you review the decisions that have been made.

In Cranked, we used single-piece-flow and simple projections based on cycle time to give us this information. Other teams I have worked on have used card counts to generate projections. There are lots of simple ways to get the information you need without starting from scratch with the question “How long will this take?”.
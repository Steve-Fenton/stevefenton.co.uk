---
id: 1930
layout: src/layouts/Default.astro
title: 'Sources of risk'
pubDate: 2016-09-14T06:00:40+01:00
author:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=1930'
permalink: /2016/09/sources-of-risk/
medium_post:
    - 'O:11:"Medium_Post":11:{s:16:"author_image_url";s:75:"https://cdn-images-1.medium.com/fit/c/400/400/1*eXkhfEuF41g5W_xnc_ydLA.jpeg";s:10:"author_url";s:38:"https://medium.com/@steve.fenton.co.uk";s:11:"byline_name";N;s:12:"byline_email";N;s:10:"cross_link";s:3:"yes";s:2:"id";s:12:"ba599421d0e2";s:21:"follower_notification";s:3:"yes";s:7:"license";s:19:"all-rights-reserved";s:14:"publication_id";s:2:"-1";s:6:"status";s:5:"draft";s:3:"url";s:51:"https://medium.com/@steve.fenton.co.uk/ba599421d0e2";}'
categories:
    - Process
    - Programming
---

In software development, there is a simplistic model that says that risk is a function of time, or money. Lots of graphs have been published to show that as the duration of a project increases, so does the risk… or as the cost of the project increases the risk goes up. Of course, in many cases these two things are closely linked. A 12 month project will cost more than a 6 month project and so on. You may even be tempted to say that risk is tied to the time and money, with some kind of relationship between these two (let’s add them together by normalising them to shared unit… or multiply one by the other).

> r = *f*(*t*)

![Risk as a function of time (or money)](https://www.stevefenton.co.uk/wp-content/uploads/2016/09/risk-function-time.jpg)

But risk does not necessarily have to be tied to the length of time, or the amount of money. The only reason it looks like it is related to these is that, traditionally, the number of feedback loops for these projects is close to one. For example, for a six month project, the outcome is reviewed after six months. It may *look* like there are more frequent loop closures, because there are status reports or other forms of suggested progress… but these are all artificial.

So we should be thinking about genuine closed loops when we think of risk… but are we concerned about time since the last feedback loop, or the cost since the last feedback loop? Neither. It is the amount of change since the last feedback loop.

So risk is really about the change that has accumulated, where change is defined as “change that is unchecked by a closed feedback loop”.

> r = *f*(*c*)

This means that we can make a project of any budget, and any duration, successful. We just need to manage the feedback loops (without resorting to artificial indicators of progress). So long as we reduce the risk with regular feedback loops, we can continue indefinitely.

![Risk as a function of change](https://www.stevefenton.co.uk/wp-content/uploads/2016/09/risk-function-change.jpg)

This is a concept that is not new to people familiar with Extreme Programming, or Lean Startup, or Agile software development… it is sustainable pace, validated learning, fast feedback. It is risk management at a simple level. It is deciding not to travel too far before checking your direction.

### Sources of risk

There are many sources of risk that can be managed with closed feedback loops.

Opportunity Loss: usually a hard straight line or a steeply angled line that cuts over suddenly from gain to loss, or that significantly affects the amount of gain. The classic example would be a regulatory deadline, where delivery before the deadline means avoiding a big fine.

Delivery vs desire error: This is caused by specification error, communication failures, or poor delivery. The risk associated with this kind of source is usually parabolic or exponential (either way, you can solve a lot of problems by validating things before the steep rise). It basically means you get something, but it turns out that isn’t what you need.

Scope instability: this is caused by scope changing before the original delivery has been validated. On a basic level, this is assumptions layered over assumptions (i.e. we asked for “A”, now we need “B”… “A” hasn’t been delivered so there is an assumption about what “A” actually is. The difference between the unchecked “A” and the new “B” is also an assumption. “B” is also two assumptions – the assumption that “B” is what we need and the assumption that “B” is what we’ll get. Assumptions-cubed).

Market and competition: Features that turn out to be unwanted, or come later than a competitor, or fall short compared to a competitor. Anything where we *think* something is valuable but haven’t validated the theory.

Knowledge leak: caused by staff turnover, especially by persistent or high levels of churn.

### Feedback loops

A feedback loop should include the following:

- The people building the thing validate that the thing is sustainable (can we continue to deliver at this pace)
- The person who wants something reviews whether they now have it (I said it should be blue… is it blue?)
- Validating the assumptions that caused the thing to be done (is it worth £10 a month to customers?)

For feedback loops to be effective, you need to use techniques like [Impact Mapping](https://www.impactmapping.org/), and [Specification by Example](https://www.thoughtworks.com/insights/blog/specification-example). Impact Mapping creates clear goals, makes assumptions explicit, and makes you think about how you validate those assumptions. Specification by Example improves communication between people who want things and people who will supply the things those people want.

I speak to a lot of people who don’t do either of these practices… and who have the exact problems that are solved by these practices.

There are multiple feedback loops and each one is enclosed with the next one. The shortest loops are cheaper and earlier. The longer ones are more concrete, more refined.

1. Specification by Example also provides the tightest feedback loop. You can find out that something doesn’t add up at the point you are asking for it. There is zero change at this point, so you get the perfect payback as you prevented risk accumulating immediately.
2. You get to close another feedback loop when the software is released as people can now see it. If you do this regularly, you limit risk because you reduce the amount of change in each release. This is why some companies release multiple times a day – if you add up the risk of 6 releases, it will be less than the risk of one release with all six changes (remember the curve is not linear).
3. Impact Mapping closes a feedback loop a little later, because it usually involves collecting some data following a release. The difference between this feedback loop and previous one is that it is validated. You either make progress towards your goal, or you don’t. You *know* now, whereas before you just *think* you do.

![Feedback Loops](https://www.stevefenton.co.uk/wp-content/uploads/2016/09/feedback-loops.jpg)

### Faking it

There are lots of practices baked into organisations whereby you fake a feedback loop. A status report where something is “80% done” is an example of faking it. Pretending that something you can demo is that same as something that you have deployed into production is an example of faking it. “Internal-only” releases that aren’t being validated with real customers is an example of faking it. If you aren’t closing all three loops, you aren’t managing the risk.

Think of it this way. You fake it by showing a Product Owner each week the progress on the software. After six months, have you managed the risk… or is it still possible you’ll release the product and find out that nobody wants to buy it? Or that it doesn’t actually work for real cases, only with your carefully managed example data? Or that it installs fine on your test environment, but not on your live environment?
---
id: 3414
title: 'The value of experience in programming'
pubDate: '2018-03-28T13:38:59+01:00'
author: 'Steve Fenton'
layout: post
guid: 'https://www.stevefenton.co.uk/?p=3414'
permalink: /2018/03/the-value-of-experience-in-programming/
medium_post:
    - 'O:11:"Medium_Post":11:{s:16:"author_image_url";s:75:"https://cdn-images-1.medium.com/fit/c/400/400/1*eXkhfEuF41g5W_xnc_ydLA.jpeg";s:10:"author_url";s:38:"https://medium.com/@steve.fenton.co.uk";s:11:"byline_name";N;s:12:"byline_email";N;s:10:"cross_link";s:3:"yes";s:2:"id";s:12:"563b1b712d8a";s:21:"follower_notification";s:3:"yes";s:7:"license";s:19:"all-rights-reserved";s:14:"publication_id";s:2:"-1";s:6:"status";s:5:"draft";s:3:"url";s:51:"https://medium.com/@steve.fenton.co.uk/563b1b712d8a";}'
image: /wp-content/uploads/2018/03/time-cost.png
categories:
    - Programming
tags:
    - economics
    - experience
---

It is really hard to work out the value of experience in programming. To do this effectively, you’d need to study a reasonable number of people over a reasonable time period. You’d use the data to see whether there was a demonstrable benefit to experience. This is what I did over a 12 month period.

Before we talk numbers, there are some important notes that I have pulled right to the top of the article. I was worried that they would be missed as footnotes. Let’s properly understand the flavour of the salt we need to pinch when we discuss the numbers that follow.

There is a scale of experience in programming that has “repeat the same thing over and over for ten years” on one side and “doing something new every day” at the other. I had to use some judgement when assessing the number of “units of experience” of the programmers in this study.

Effectively, the units of programming experience are not simply “years”. John Doe at LOBCo may have accumulated one unit every three years working on the same line-of-business application for twelve years, whereas Jane Doe at AgencyCo may rack up a unit every six months working on a succession of varied projects for a succession of clients.

Spoiler Alert! Programmers with more experience are seriously cheaper. Although it is tempting to set out with the goal of “only recruiting top talent”, there will be problems ahead if you choose this route. Have a look a professional sports to see what happens when you decide you’ll just buy the top performers from other teams. You’ll also find that your people have something missing in their lives; sharing their knowledge with the next generation. So even when I reveal just how much cheaper it is to get experienced programmers to write your software, anyone who goes out afterwards to enlist the top points scorers deserves everything they get.

![Time/Cost Scatter](https://www.stevefenton.co.uk/wp-content/uploads/2018/03/time-cost.png)

The numbers I’m about to share are averaged across a large number of features (a whole year’s worth), and quite a few people. I haven’t been able to factor in every possible variable. People pair-programmed across the experience boundaries I described and I’m certain the less experienced team members relied on the more experienced team members even when they weren’t officially allocated the work. On the more positive side of things, the work was divided into feature cards of largely similar size, and the tasks were pulled by the team members, not pushed by management. We can assume that people were largely selecting work they felt able to complete. This is also why I felt simply counting the number of feature cards would be sufficient, rather than relying on a subjective sizing exercise.

I have used plain and simple times and costs. If something takes a lot more time, it has a knock-on effect as there is an opportunity cost associated with not delivering other work. I haven’t attempted to extrapolate this. In fact, I have ignored the value of the cards entirely. In real life, I recommend having a firm grasp of such things – the product economics are often more important than the time or cost of delivering a card.

This is not a truly scientific study. If you have ever discussed the possibility of scientific study of this kind, you’ll understand my views on the subject. However, there is nothing stopping you from collecting this information in your own organisation – I just beg you to use it for good, not evil.

On with the numbers.

### Cost

These numbers represent the salary-cost of all of the programmers in the group, divided by the number of feature cards completed over twelve months, divided by the number of individuals in the group.

Cost Per Card Based on Experience
| Experience Level | Cost Per Card |
|---|---|
| Junior | £625 |
| Mid-Level | £300 |
| Senior | £200 |

![Cost Per Card](https://www.stevefenton.co.uk/wp-content/uploads/2018/03/experience-financial-cost.png)

### Time

These numbers represent the number of days it would take an individual from each group to complete the same number of cards (a theoretical minimum viable product).

Time to Deliver Based on Experience
| Experience Level | Time |
|---|---|
| Junior | 250 |
| Mid-Level | 53 |
| Senior | 25 |

![Time to Deliver](https://www.stevefenton.co.uk/wp-content/uploads/2018/03/experience-time.png)

### Time and cost

The time and cost are, of course, linked. Unsurprisingly, the less experienced programmers take a lot longer to deliver features than the experienced programmers. About ten times longer, which bears out the concept of a 10x programmer. This leads to the cost difference. Unless you are paying the junior group 10x less than the experienced group, the cost of the work will be higher.

And this is where the cost difference occurs, because I can’t think of any team that pays the junior programmers one-tenth of what they pay the senior programmers. I can’t think of any team that has a range of this size between their highest and lowest paid programmers.

### Summary

So if you get the chance to pick up a programmer with a lot of experience units (sometimes, but not always, years), don’t get too hung up on the salary as they are probably cheaper than throwing bodies at the problem; especially when you consider Fred Brooks’ “time verses number of workers” problem for tasks with complex interrelationships.
---
layout: src/layouts/Default.astro
title: '7 bad practices Azure DevOps can add to your Agile process'
navMenu: false
pubDate: 2012-10-27T23:23:23+01:00
authors:
    - steve-fenton
categories:
    - Process
    - 'Azure DevOps'
tags:
    - Agile
---

This article explains how using TFS for Agile can result in some really bad behaviours. This is not an attack on TFS; I believe it can be used effectively at all stages of the Agile process and feels more joined up than using one tool to manage a backlog, another to track bugs, yet another to perform and record tests, something else for version control and so on.

To get the most out of TFS, you need to be aware of these bad practices so you can spot them and eliminate them as soon as they start to creep in.

## Hours Remaining

Although the story is estimated in a unit-less measure in TFS, it lets you add a number to a “time remaining” field on each task. This is the number that is used to chart the burn-down for the Sprint. In concept, there is nothing wrong with this, but in reality, it causes some bad practices.

## Bad habits 1-3:

*1. Constant re-estimating of tasks*

Each day, everyone has to re-estimate the time remaining on the task they are working on. On the whole, if they have a 14 hour task, they’ll probably update it to 7 at the end of day 1 without really thinking too much about it. If something goes wrong, at the end of day 2 and 3, it will still be 7. The concept of “partly done” shouldn’t exist, because until it is completed, it isn’t done at all.

*2. An assumption that the estimates are accurate because they are in hours*

As soon as you start talking in hours, you’d better be handing out ranges based on certainty. Read Robert Martin’s “The Clean Coder” for more on this. TFS doesn’t allow a range, so people will start using the numbers. In the worst cases, individual performance will be based on these numbers. The metric will be gamed.

*3. Allows the burn-down to be groomed by decreasing the time remaining on a partly done task*

Each team member is looking at a screen that shows the burn-down chart and their tasks. The temptation at the end of each day is to reduce the hours remaining to whatever makes the burn-down chart look correct. This means problems won’t be visible early on, because they are being disguised, consciously or subconsciously, by people typing in the numbers they believe are expected of them. If your burndown chart isn’t telling you about problems early, it is entirely worthless.

## Solution

Just put a 1 against every task. This turns the task binary – it is either done, or it isn’t – there is no middle ground. Your burn-down chart will actually work perfectly well. It will tell you how many tasks you have left each day and if you aren’t trending along the ideal line, you’ll know straight away.

Even if the tasks vary in size, the burn-down will give you an excellent indication of progress and the team can practice breaking a story into granular tasks, which you can get better at – rather than estimating in hours, which people never get any better at.

## Resource Management

Because TFS has intimate knowledge of the individuals in a team, it allows you to check that nobody is over-subscribed in a Sprint. It uses the number of hours that are available (in theory, given 100% focus) and the number of hours remaining from the tasks related to a story to display charts that go red when someone has too much work. Of course, it also goes red if someone over-estimates and it fails to go red if someone under-estimates. Eventually, what happens is that people divide their available hours between the tasks they are allocated and the Sprint fails. The resource management puts a great deal of emphasis on the wrong information, which results in more bad practices, that result in friction within a team and a lack of collective code ownership.

## Bad habits 4-7:

*4. At the start of the Sprint you allocate specific tasks to specific people*

It sounds like a perfectly safe thing to do – but you might as well break out the Gantt Chart because you have predicted the unpredictable. Some of the work will take longer, but rather than succeeding as a team by crowding problems and re-allocating work, the Hunger Games commence. Some team members will deliver everything allocated to them every Sprint, others will fail every Sprint. No team member feels motivated to help out the rest of the team if it might make them fall behind.

*5. Some team members will think they are done, when others are falling behind*

If a team member can see the list of tasks allocated to them in the Sprint, that is what they will aim to complete. They won’t be looking at the tasks allocated to other team members. Some people will have a successful Sprint, others will fail – but the overall outcome is failure for the team.

*6. When it goes wrong, the high value items don’t get delivered*

Because you are allocating work to specific people, the top priority items won’t necessarily be delivered first. If each team member has two high priority items and two low priority items, and one team member gets stuck, the team members who aren’t stuck will begin delivering the low priority items while the team member – who is in trouble on their first item – is sat on a high priority item. If the team were pulling from the same Sprint backlog, that high priority item would be delivered before the low priority items and if the Sprint was heading Northwards, it would be easier to negotiate scope if you are asking to drop items with a lower priority.

*7. You will start to believe the numbers*

But they are all wrong! The task estimates are wrong. The staff hours are wrong. Even if you record days off and every single meeting and comfort break it will still be wrong.

## Solution

If you followed the previous advice, each story is worth “1”, so your velocity is now expressed in a count of stories. That is low-fidelity, but usually enough. If a team can complete about 10 stories, that is what they should do. Stories and tasks should be pulled from the Sprint backlog by whoever is ready for work. The burndown chart and your task board will tell you if there is a resource problem. Stay away from tasks-in-hours marrying up to people-in-hours because you’ll be caught up in the tangled web of incorrect estimates and incorrect availability. Completely ignore the resource allocation and let the work be pulled out of the backlog in order as people need more work.
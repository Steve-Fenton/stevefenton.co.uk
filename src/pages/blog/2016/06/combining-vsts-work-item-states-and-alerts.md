---
layout: src/layouts/Default.astro
navMenu: false
title: 'Combining VSTS work item states and alerts'
pubDate: 2016-06-26T10:20:33+01:00
authors:
    - steve-fenton
medium_post:
    - 'O:11:"Medium_Post":11:{s:16:"author_image_url";s:75:"https://cdn-images-1.medium.com/fit/c/400/400/1*eXkhfEuF41g5W_xnc_ydLA.jpeg";s:10:"author_url";s:38:"https://medium.com/@steve.fenton.co.uk";s:11:"byline_name";N;s:12:"byline_email";N;s:10:"cross_link";s:3:"yes";s:2:"id";s:12:"b3fdac83d694";s:21:"follower_notification";s:3:"yes";s:7:"license";s:19:"all-rights-reserved";s:14:"publication_id";s:2:"-1";s:6:"status";s:5:"draft";s:3:"url";s:51:"https://medium.com/@steve.fenton.co.uk/b3fdac83d694";}'
categories:
    - Process
    - 'Visual Studio'
tags:
    - 'Task Boards'
---

Visual Studio Team Services recently got custom states for work items. The simplest way to use this new feature is to create a custom state for each column on your Kanban board (previously, tasks had to be “Committed” all the way through the board).

![VSTS Custom States](/img/2016/06/vsts-states.png)

This feature makes it even easier to set up custom alerts based on a card hitting a column on the board. For example, perhaps your product owner wants a poke every time a card moves from “Testing” into “Tested” states.

To set up the custom alert, go to the “Manage Project” screen:

![VSTS Manage Project](/img/2016/06/vsts-alerts-001.png)

You can now create a Work Item alert, with a filter for when the state “Changes To” the custom state “Tested” (or whatever custom states you have set up). Each time a work item moves across, an email summarising the change will be sent to the users or groups you have selected.

![VSTS Custom State Work Item Alert](/img/2016/06/vsts-alerts-002.png)
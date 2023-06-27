---
navMenu: false
title: 'Combining Azure DevOps work item states and alerts'
pubDate: 2016-06-26
authors:
    - steve-fenton
categories:
    - Process
    - 'Azure DevOps'
tags:
    - 'Task Boards'
---

Azure DevOps recently got custom states for work items. The simplest way to use this new feature is to create a custom state for each column on your Kanban board (previously, tasks had to be “Committed” all the way through the board).

:::div{.inset}
:img{src="/img/2016/06/vsts-states.png" alt="VSTS Custom States" loading="lazy"}
:::

This feature makes it even easier to set up custom alerts based on a card hitting a column on the board. For example, perhaps your product owner wants a poke every time a card moves from “Testing” into “Tested” states.

To set up the custom alert, go to the “Manage Project” screen:

:::div{.inset}
:img{src="/img/2016/06/vsts-alerts-001.png" alt="VSTS Manage Project" loading="lazy"}
:::

You can now create a Work Item alert, with a filter for when the state “Changes To” the custom state “Tested” (or whatever custom states you have set up). Each time a work item moves across, an email summarising the change will be sent to the users or groups you have selected.

:img{src="/img/2016/06/vsts-alerts-002.png" alt="VSTS Custom State Work Item Alert" loading="lazy"}
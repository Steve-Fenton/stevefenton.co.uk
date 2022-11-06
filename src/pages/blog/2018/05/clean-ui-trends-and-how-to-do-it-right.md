---
layout: src/layouts/Default.astro
title: 'Clean UI trends and how to do it right'
navMenu: false
pubDate: 2018-05-03T08:50:35+01:00
authors:
    - steve-fenton
bannerImage:
    src: /img/2018/05/full-ui.png
    alt: Cluttered user interface
categories:
    - Other
tags:
    - Design
    - UX
---

There used to be a trend in software creation where users would ask software developers to “add a type drop down to the auto date section”; and the developer would just do it. The result of this obedient style of software development did not result in a clean UI. The screenshot below can be found with several others on [this review of Bulk Rename Utility](http://www.softpedia.com/reviews/windows/Bulk-Rename-Utility--82549.shtml). This is a highly organised user interface, but is very cluttered.

:::div{.inset}
:img{src="/img/2018/05/bulk-rename-utility-crowded-ui.png" alt="Cluttered UI"}
:::

## Clean UI

Luckily, this doesn’t happen any more (okay, it probably does somewhere). People think a lot more about design. We now have a trend towards clean user interfaces with minimal distractions. The clean UI trend can be demonstrated with this simple wireframe of an imaginary app that shows a deployment workflow. There are three boxes to represent environments and each of these has two action buttons available: “Add” and “Clone”.

The full version of the user interface is shown below. It has nine *things* competing for visibility.

:::div{.inset}
:img{src="/img/2018/05/full-ui.png" alt="Full UI" loading="lazy"}
:::

The clean version of this UI is shown below. It has three things competing for visibility. That’s one third of the original number. This follows the newspaper pattern; the headlines are very clear and we don’t need to read on if we’re not interested.

:::div{.inset}
:img{src="/img/2018/05/clean-ui.png" alt="Clean UI" loading="lazy"}
:::

When we are interested in reading more, hovering or focussing on one of the headline boxes causes sub-headline items to appear. This is demonstrated below. The idea is that where the user is showing interest, you reveal more.

:::div{.inset}
:img{src="/img/2018/05/clean-ui-hover.png" alt="Clean UI Hover" loading="lazy"}
:::

You can follow this down to the next level by hovering over these sub-headline items, at which point they expand from icons to text plus icons. This helps to guide users as they don’t have to guess what the icons mean; but they will be more productive once they have learned the icons.

:::div{.inset}
:img{src="/img/2018/05/clean-ui-hover-subitem.png" alt="Clean UI Subitem Hover" loading="lazy"}
:::

## Beware of surprises

In the wireframe demo above, hovering over an item (or putting focus on it) at one level reveals items at the next level.

You can cause a major problem if you reveal these items when the user hovers over the empty space, because *they haven’t shown an interest in the headline item*.

If you reveal items as the mouse progresses through the white space, you cause a couple of very annoying problems. Firstly, you create a flickering user interface by revealing and hiding items as the mouse skims across the blank areas. Secondly, you can cause users to perform actions when they only intended to place focus on the window. This is especially common with multi-screen layouts, but also occurs in tiled layouts. Users typically aim for a blank area when they want to focus on a window, but if that blank area suddenly reveals buttons or links as they click, they may accidentally trigger some action or navigation without intending to.

In the example above, I have observed via the audit trail a number of occasions where an item is cloned, and then the clone is deleted. I suspect this is caused by the focus usability error of revealing items from white space. This could be solved if the items were only revealed when interest is shown in the parent item.

## Lost in space

A second problem with clean UI is where items don’t obviously belong to a parent. If there was an option to delete this entire pipeline, the delete icon should probably just be visible. Hiding it when there is no obvious parent makes it hard for people to guess where they need to hover in order to reveal the option. A common solution to this is to have a three-dot icon or a three-line icon that hints at a menu / more options – but where you place this will affect what people expect to find within.

Items in expandable menus typically need to represent the same level of abstraction. They should all operate against the same thing.

## The short version

The Clean UI trend is great, but we need to ensure we apply it carefully to avoid creating new user experience problems.
---
layout: src/layouts/Default.astro
title: 'Meet the Trello Butler'
navMenu: false
pubDate: 2019-10-16T08:56:03+01:00
authors:
    - steve-fenton
bannerImage:
    src: /img/2019/10/trello-butler-workflow-automation.jpg
    alt: Trello Butler
categories:
    - Automation
tags:
    - Butler
    - Trello
---

Most of my time is spent in technical-land, where we use tools such as Azure DevOps to manage the flow of work. There is, though, another side to our business and they love Trello. For at least part of my day, I’m looking at colourful lists of *stuff* that the business are pushing around in their Trello boards. There are often updates to the software, but only today did something appear that made me think… that’s cool. Meet the Trello Butler!

:::div{.inset}
:img{src="/img/2019/10/trello-butler.jpg" alt="Trello Butler"}
:::

Trello’s Butler is designed to collect little workflows that you perform repetitively and make them happen on a single push button. It’s easier with an example.

## Order all my lists

One of the boards the business owns is a number of lists that each needs to be ordered by different criteria. The historic solution to this is a user occasionally cleans the lists by visiting each one, selecting the menu, choosing “sort by”, and then choosing the field that is used to order that particular list. You have to remember to do it, and you have to know the rule for each list. Some are ordered by due date, others by age, and yet more by name.

Let’s automate it!

## Open Butler

You can open Butler using the little push-bell icon.

:::div{.inset}
:img{src="/img/2019/10/butler-icon.jpg" alt="Butler Icon" loading="lazy"}
:::

We’re going to add a “Board Button” because this action applies the whole board. You can create “Card Buttons” that apply on a per-card basis to represent your common actions too. The configuration in our example will prepare you to create these too as they are just as easy to set up.

Hit “Board Buttons” and then “Create Button”. You will now see a list of rules you can set up, very similar to Microsoft Outlook’s email automation rules (i.e. pretty simple wordy rules with some items you can change).

## Adding a rule

Select an icon and add a name for your rule. In our case, there is a nice “ordering” icon, and we’ll call the rule “Sort All Cards”.

There are icons along the top of the rules that are used to group different kinds of rule. The groups are Card, List, Move, Order, and Report.

To perform our ordering of lists, we’ll choose “Order”.

:::div{.inset}
:img{src="/img/2019/10/adding-butler-rules.jpg" alt="Adding Butler Rules" loading="lazy"}
:::

For each list, we’ll repeat these steps (it’s the last bit of repetition we’re going to do for a while… because Butler will be doing repetitive things in the future!)

1. Fill out the rule, sort the cards in list `New Cards` `by age` `ascending`
2. Click the “Add” icon

Each time we hit “Add”, the rule moves up into our actions set and the panel empties ready for the next rule. You can make more complicated ordering rules, as Butler supports “and then by” ordering.

## Save and use

Once we have all our lists and their ordering actions set up, we hit “Save” to add the button to the board. It will appear next to Butler.

:::div{.inset}
:img{src="/img/2019/10/butler-sort-lists-button.jpg" alt="Butler Sort Lists Button" loading="lazy"}
:::

Press the button and all the sorting will be taken care of for you.

## Butler rules

You can also make rules using Butler that will fire each time an action is performed by a user. For example, instead of hitting a button to sort the lists we could configure a rule:

when a card is `added to` list `New Cards` `by anyone` (add)  
sort the list `by age` `ascending` (add)

Now we don’t even need to press a button to order the list when a card is added. You can fire rules from a great many triggers such as card addition, movement, archiving, and more. You can perform multiple actions to cards and lists based on the trigger, so you can create interesting mash-ups of ordering lists, adding stickers to cards, even automatically moving them.

## Summary

To truly appreciate what Butler can do, you’ll need to play with it a bit. Browse through the screens and options to get a flavour for the features and then [identify what you might be doing manually that a computer is better suited to doing](/blog/2015/02/automation-philosophy/).
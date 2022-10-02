---
layout: src/layouts/Default.astro
navMenu: false
title: 'The tree view that killed the program'
pubDate: 2013-07-27T11:39:44+01:00
author:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=534'
interface_sidebarlayout:
    - default
categories:
    - Programming
---

I was fixing a legacy program that was crashing, freezing and failing in many nasty ways and I tracked all problems back to one thing. A tree view. In the grand scheme of things, although it was important for finding stuff, the tree view was not really fundamentally important to the application (i.e. the valuable part of the program was very much elsewhere).

So how could one tree view cause so much pain?

Here are some of the pain points along with the fixes I found to work. The standard performance disclaimers apply… You shouldn’t optimise until you have a problem. You shouldn’t assume any fix will be better just because someone else found it to be better; you have to measure it each way in your real context. I used Visual Studio performance analysis to do this and the testers used a bunch of other techniques to validate the result was a faster program.

This is really just an example that contains some problems and some specific ideas that happened to solve these problems. I’m sharing this because while their are websites dedicated to bad code, the reality of programming is that we have to fix it and the more stories we share about how we did that the better. Maybe you’ll come across similar problems and solve them in different ways – please share them too.

### Load The World

The program loaded pretty much the whole database into memory to display the tree view. It only displays the various names, but it loaded objects that are far too big and then attached them to the nodes on the tree view. While this could be viewed as a mechanism that avoids round-trips to the database, it makes even a mighty machine baulk. In addition, when you select an item from the tree-view it has to go and get the record from the database anyway, because it may have changed. We’re also talking about loading 20,000 objects, most of which will never come into view because their nodes won’t be expanded.

On top of the problems of getting this much data into memory, the database was unhappy about filling such a large data set too – so if you wanted something from the database while another user was loading the program, you would notice delays.

To solve this, small round-trips are made to load a small amount of data on demand. This is faster even if you expand a lot of nodes. If a node is collapsed, the data is discarded. A dummy node was used to ensure the expand option was available.

### Un-background Process

When some nodes were expanded, the program loaded up a bunch of threads to do some work in the background. A lot of work. Too much work for anything else to happen at the same time. This was causing a lot of “not responding” notices, white-screens-of-patience and occasional crashes.

The first stage of the fix for this was to only run the process when the user required it, rather than assuming they wanted it to run whenever a tree-node was expanded. The next stages are to move this process from a “view time” process to a “save time” process so it can happen once on save, rather than 1,000 times (or more) when people are viewing the data.

### Need More Input

Depending on the item selected in the tree-view, different options would be available in various toolbars and boxes. The mechanism used to determine the available options involved various database look-ups and logic flows in a mega-method that determined whether each of some 50 options should be enabled or not.

To solve this issue, the mega-method was re-written using a test-first approach so that we could have confidence in the options that would be presented. The principle of moving this logic into its own class, which had no access to the database, prevented the kind of evolutionary design that would cause too much of a chatty result (imagine a user is hitting the down arrow to navigate to a node, and this event fires each time the selection changes).

To allow the correct buttons to be presented without data access, a small set of meta-data was attached to tree-nodes that depended on this information to determine the available options. Unlike the original problem where the entire database was represented in the tree view and attached to the tree view, only visible items were represented and only a sub-set of data was attached. This was probably the hardest judgement call to make as the original problematic design gave us all a distaste for attaching data to the tree view, but it is important to realise that the implementation was wrong and a correct implementation is not necessarily wrong.

### User Experience

In order to really make things work (and therefore provide an acceptable user experience) we asked users to accept some changes to how things worked.

We wanted to simplify the structure of the tree view so it was a closer match to the shape of the underlying data (this meant we didn’t need to complicate the underlying data, or code-in additional structure, which is what had been done previously).

We needed to stop automatically performing some processes and instead supply the option to kick them off. Given this made the program much faster, this was easier to sell. The long-term goal is to make this process run on save (which is the only time the answer will change) to reduce the number of times it needs to be determined.

We needed to simplify some of the logic to determine whether a button should be available. For example, different types of report were available based on several factors and it would have meant making a database call to find out if “Print Report” should display. As this option is not often selected, and is normally enabled we asked to just switch it on and then determine the edge cases if the option is selected.

At this stage in the process, we are asking the users to take a leap of faith – we are new to them and to their program and the trust needs to be built over time.

### Result

This is still a work in progress at the time of writing, but here are some indications of the differences made by these changes.

The “un-background process” fix made the program nearly four times faster. This was determined over a series of test runs to eliminate good and bad luck. Three test runs on the old program had to be re-started due to crashes.

The other two fixes are still under test, but the anecdotal evidence based on using the program with the same data as the live system shows lower memory use, a happy database and an ultra-fast experience for the user.
---
layout: src/layouts/Default.astro
navMenu: false
title: 'Testing the in-progress Chess game'
pubDate: 2019-01-27T18:29:46+00:00
authors:
    - steve-fenton
image: /wp-content/uploads/2015/07/self-organising-pawn.jpg
categories:
    - Process
tags:
    - complexity
---

Last October, I was asked why releases of a legacy system were so hit and miss. There were a couple of reasons for the flaky releases, which I have summarised below. When you judge the quality of the metaphors, please bear in mind that these were invented off-the-cuff.

### Configuration

The first reason releases were unreliable was configuration. The software was in use by a large number of organisations who had never conformed to a recommended way of using the system. To win customers, a succession of configurable rules and toggles had been introduced from simple enable/disable flags to dynamic module loading (with many “this value will be used in conditional statements throughout the system” items in between).

I explained that the number of possible combinations of these configuration items was, in practice, infinite. In theory, it was just a *very big number*; but once the very big number exceeds the actual number of instances of the configuration (in this case, the number of customers), it becomes an academic exercise in multiplication. It would be faster to test every customer than it would be to test every configuration – even if techniques were applied to reduce the number of tests. The company couldn’t economically test every custom configuration, so it might as well be an infinite number.

Generating the number of combinations would have allowed me to be technically correct, but I wanted understanding rather a standing ovation. This is where I presented my knee-jerk metaphor.

> How would you approach testing if I gave you a chess board that featured an in-flight game and asked whether the board could be arrived at using valid moves?

By exploring this thought exercise, it soon became apparent that we had created a system that could rival atoms in the universe, just like possible chess games. When your system is ultimately configurable, you can’t expect to test every combination using humans. You can’t expect to test every known customer configuration with humans. You can potentially solve it with automation, but a preferable solution is to start converging on a smaller number of in-use configurations.

![](/img/2015/07/self-organising-pawn.jpg)

### Work in process and release frequency

The second reason the releases were rather touch-and-go was the usual reason. Too much work was being done in parallel. Too much work was being collected together into large releases. Too little attention was being paid to integration. The result was a long period of preparation for the release, with one programmer being assigned the laborious task of merging all of the branches that had sprung up since the last release. Another programmer was given the unenviable task of converting myriad database scripts into a correctly-ordered and reversible release script.

We reduced the amount of risk in each release by lowering the work-in-process limits and increasing the frequency of deployments. The team had grown afraid to release their software, so I challenged them by requesting releases at times they previously wouldn’t consider them. I wanted everyone on the team to expect their changes to made live at any time. Even Fridays. Even afternoons. Once the code was integrated into the mainline, it was going to go live. We all think about our changes differently when we can’t ice them in source control for six months.

If you want more detail on the changes, maybe you haven’t read Accelerate by Nicole Forsgren with Jez Humble and Gene Kim. I recommend this book as it correlates specific practices with organisational success. You can then source more detailed books on any of the practices you aren’t familiar with. Some of them are [listed in my section on great books](/about-me/recommended-reading/).

### Stupid metaphors

So, my chess metaphor probably contains quite a few holes; but it worked. Why do I always reach for some comparable real-world example rather than just presenting the facts?

I have found it to be a poor strategy to go into the wrong kinds of details when discussing these problems with stakeholders. It can often result in them filtering the information. The parts that are intuitive hit the mark, but the results often come from the counter-intuitive parts. This is where the metaphor can really shine.

To return to the chess analogy… the correct way to solve the untestable game is to watch it from the beginning. Validating each move in real time is trivial compared to working backwards from a snapshot of the game’s state.

That’s why we release each small change, rather than batching them. That’s why we might simplify the game to reduce the number of possible combinations.
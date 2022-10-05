---
layout: src/layouts/Default.astro
title: The Universal Truth of Collections
navMenu: false
pubDate: 2020-03-12T20:29:00+00:00
authors:
    - steve-fenton
categories:
    - Process
tags:
    - 'Product Management'
---

The BBC has been running a series called *Secrets of the Museum*, which features a behind the scenes look at the Victoria and Albert Museum in London. The longer I watched this fascinating show, the more it revealed one of the universal truths of humanity; it’s propensity to collect things and it’s inability to limit such collections to a sustainable size.

In the case of the V&A, the vast collection is a portal into the past. The items are each uniquely fascinating, but there is a common theme that emerges from the rows upon rows of historic objects; they simply cannot be kept in perfect condition. The collection has increased beyond a size the team of experts could possibly hope to preserve. Some of the items may not have been seen by the current team. Although many of the objects that come out of storage can be carefully restored, some of the items will decay and be lost forever. It’s inevitable that this will happen with a collection at this scale.

Now, I work in the software industry and the applicability of this problem to software products is striking. At some point in the lifecycle of a software product, the collection of features reaches the tipping point that means it can no longer be sustained. Some features will be “brought out of storage” and then carefully restored into working condition, but some will never be seen by the current team of experts and will inevitably decay and be lost forever.

Unless we limit the size of the collection, decay cannot be avoided.

So, how do we impose some form of limit? Firstly, you need to be acutely aware of your long-term investment in each and every feature you develop. To do this, you need to independently measure “collecting time” and “restoration time”. This will tell you the current ratio between these two competing demands, but more importantly you’ll discover the trajectory of restoration time.

Using this information, you can design how you will manage the growing restoration burden. There are many strategies in common use, from scaling to outsourcing, but the most effective technique is to avoid adding to the collection and retire features with low use. You can only do this if you know which features are seldom used, so you need to measure feature usage.

You may be tempted to keep a feature that isn’t in common use because you don’t need to “restore” it… but no feature is ever complete. Customers, competitors, and law-makers will make sure of that. That old feature that nobody in your current team has ever seen could be hit by a legislative change that means the expensive restoration project you hoped to avoid eats your roadmap.

Unlike the V&A, you can’t expect some wealthy benefactor to rescue you from a costly maintenance task. Only you can manage this problem and you have to start early.
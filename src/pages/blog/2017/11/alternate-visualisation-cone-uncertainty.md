---
title: 'Alternate visualisation of the Cone of Uncertainty'
navMenu: false
pubDate: 2017-11-16T08:50:46+00:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - Estimates
---

The cone of uncertainty is a software model that provides pre-baked multipliers to convert a single-point “most likely” estimate into a range, based on the broad stage of a well-managed sequential software development project. That isn’t to say it can’t also be applied to iterative software development – depending on the details of the method being used you may find you are creating a mini cone of uncertainty for each iteration, or you are working on a sub-set of the cone in each iteration.

The original cone of uncertainty (shown in scribbly-grey in the diagram below) shows that *estimates generated at later stages have less uncertainty*.

That means that if you re-estimate at each of the broad stages, the range that you get by running your single-point “most likely” estimate through the appropriate factors from the cone of uncertainty will be narrower.

## Cone of Uncertainty mistakes

The digram is not trying to tell you that the uncertainty will converge on your original single-point “most-likely” estimate. It means that when you re-estimate at the “user interface design complete” stage, you should land somewhere between 0.8x and 1.25x of your re-estimate… rather than at the highly uncertain conceptual range of 0.25x to 4x of your estimate. That doesn’t mean the numbers will be lower. Let’s look at an example (numbers rounded):

| Stage                       | Most Likely | Low End | High End | Range |
|-----------------------------|-------------|---------|----------|-------|
| Initial Concept             | 10          | 2.5     | 40       | 16x   |
| Approved Product Definition | 20          | 10      | 40       | 4x    |
| Requirements Complete       | 26          | 18      | 39       | 2.25x |
| UI Design Complete          | 32          | 26      | 40       | 1.6x  |
| Detailed Design Complete    | 36          | 32      | 40       | 1.2x  |

You can see in this table that at each stage, the range narrows rather impressively; but that doesn’t necessarily mean the “times will come in when we square things up” – it just means we are likely to more accurately estimate the correct number as we reduce uncertainty… which is what we mean when we say that this applies to a well run project. The cone doesn’t narrow at all unless you work at removing the uncertainty by making decisions.

Get ready for a little more disappointment. The cone of uncertainty represents the best-case scenario, with an estimate generated by skilled estimators. Needless to say, if you are giving out any numbers publicly at those early stages; prepare to be roasted. If you narrow the range from the gigantic 16x without moving the project to a more mature stage, you are no longer estimating – you’re just gambling.

## Look at it this way

To drive home the point, here is a cone of uncertainty that also has blue expanding lines that indicate where your later re-estimates are likely to fall in relation to the original. This version of the cone intends to drive home the point that managing a project well will mean:

- the re-estimate will be based on the most current knowledge
- the range you apply to the re-estimate will become narrower
- the re-estimates may provide higher estimates

Here is the cone with the overlays:

:::div{.inset}
:img{src="/img/2017/11/cone-of-uncertainty.jpg" alt="Cone of Uncertainty" loading="lazy"}
:::

A: Initial Concept  
B: Approved Product Definition  
C: Requirements Complete  
D: UI Design Complete  
E: Detailed Design Complete  
F: Code Complete
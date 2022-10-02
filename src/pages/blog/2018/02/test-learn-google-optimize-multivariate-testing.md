---
id: 3325
title: 'Test and learn with Google Optimize multivariate testing'
pubDate: '2018-02-05T08:50:21+00:00'
author: 'Steve Fenton'
layout: post
guid: 'https://www.stevefenton.co.uk/?p=3325'
permalink: /2018/02/test-learn-google-optimize-multivariate-testing/
categories:
    - Automation
tags:
    - multivariate
    - testing
    - univariate
---

I started writing this article and realised it was going to be epic, so I’ve tried to break it into sections to make it easier to read. You can skip past sections that you feel you are already comfortable with.

I’m not going to cover the nuts-and-bolts process of adding the scripts to your website as the Google Optimize website covers this in detail and supplied you with both the scripts and the detailed instructions. Please don’t feel guilty about adding to my bounce rate if you aren’t looking for more theoretical advice about how to run good experiments.

### Basic concepts of variate testing

Before we look at Google Optimize, we had better clarify some terms that you are going to stumble across when you start using a test and learn cycle to refine your website. You’ll hear terms such as split testing, A/B testing, and multivariate testing, so here are some quick definitions.

#### Univariate testing

Also known as “A/B Testing”, or “A/B/n Testing”, or “Split Testing”.  
The concept of univariate testing is to “change one thing”. Typically, this means changing a single item to determine its relationship to a goal. In some cases, this is taken to mean changing only one page.  
An example would be changing the size of the “Buy Now” button to see if increases sales.

#### Multivariate testing

Although only changing one thing at a time seems more scientific, you might be falling victim of inappropriate reductionism. Often, the relationship between items is more important than the individual items themselves. Multivariate tested “changes many things”, for example several pages that form part of a user journey, or several items within a page.

When you start changing things with many combinations, you will need to map out all the permutations and consciously decide which permutations you want to test. It is worth swotting up on permutation generation, and recursion trees (as although they sound complicated, that will make this task easier).  
Multivariate testing could involve changing the “Buy Now” button to be green, as well as increasing the size of the product image. You would probably want to test “original colour + original image”, “green + original image”, “original colour + larger image”, “green + larger image”. You may also test different shades of green and several definitions of “larger”. Most software tools can handle this kind of testing under their univariate testing mode.

Another example of multivariate testing is where you will change elements on different pages as part of a larger user journey. In this case, you’ll need the tool to track the session to co-ordinate the combination across pages. There is usually a special multivariate mode for this kind of test.  
Now we have the definitions nailed (and a hint at how the tools might confuse the definitions for practical purposes), let’s look at some other theoretical concepts for variate testing.

#### Noise

If you have ever attempted to weigh your cat, you may have discovered that cats don’t like standing on weighing scales. More accurately, they will happily sleep on the scales, if you aren’t trying to weight them; but as soon as you try to assert that they should stay on them their innate personality disorder will cause them to want to be anywhere else. A good solution to this problem is to weight yourself first, then weight yourself while holding the cat. You can then calculate the weight of the cat by subtracting the first number from the second.

You need to perform a similar trick with your variate testing, because you need to learn the personality of your cats (er, visitors). Your first experiment should have variations that contain no differences. This will measure the natural difference in scoring that your website has when presenting the same page to different groups of people. Whatever numbers you collect here serve as your background noise (i.e. you on your own) and your future experiments will have to result in significantly bigger numbers if you are taking them seriously (i.e. you expect you and your cat to weigh more than just you).

You may need to repeat this balancing experiment periodically to track the levels of background noise over time.

#### Goal and hypothesis

There are two things you need to be clear on before you run an experiment that contains a change.

1. Your goal (for example, get 4% of our website visitors to purchase a product)
2. Your hypothesis (“if we make the button bigger, more people who visit the website will purchase a product”)

If you want to do this bit well, read up on [Impact Mapping](https://www.impactmapping.org/)!

The goal can last much longer than a single experiment, so you may need to run several experiments before you achieve your goal. The hypothesis is around for just one experiment. It states, in a falsifiable way, exactly what you expect the outcome to be. Write a confident statement here, because it doesn’t matter if you are wrong; in fact, an ideal hypothesis has an equal chance of being right or wrong as this maximises learning. If you find most of your experiments “come out as you predicted”, you aren’t learning very much; you are just confirming what you already knew.

#### False dichotomies

No matter what kind of testing you are doing, it works better if you have more than two variations.  
Here’s an example, using the hypothesis that a larger “Buy Now” button will result in more sales.

False Dichotomy Version

1. The original button (30px)
2. The big button (60px)

The result of this experiment is that the original button wins, so you leave the button at 20px.

More Variety Version

1. The original button (30px)
2. A smaller button (20px)
3. A slightly larger button (40px)
4. A larger button (50px)
5. A large button (60px)

The result of this experiment is that the slightly larger button (40px) wins, closely followed by the larger button (50px). Things then drop off, so 60px must be too big. There is also a problem with everything below 40px being too small. We can all rationalise this, because 40px is the minimum recommended size for touch devices (for example), but now we’re choosing to increase the size of the button… a bit. In the first experiment, we wouldn’t have increased it.

Numbers often fit within a bell curve (although it isn’t always as neatly distributed as the classic bell curve we all see on book covers). If you compare testing two items, to five items, you’ll see that false dichotomy can in fact give us the “second worst” outcome from the larger set.  
So, use more variations to discover these distributions and if the 60px button wins, consider running a second experiment to see whether you have discovered a magical and rare linear, even or exponential relationship between button size and sales! You’re more likely to discover diminishing returns, or dramatic reversals.

So whatever variable you pick, test it across a range that includes numbers you also expect to fail above and below your “theoretical winner”.

#### Patience

When you run an experiment, you need to collect a lot of data. If you end the experiment too soon the results will be highly volatile. Individual personality plays too much of a factor in the outcome unless you can generate a large sample, so the hardest part will be letting the experiment run a little longer before you call it.

Be patient and collect enough samples to say with confidence that the result is representative of your whole user base. If you don’t have high traffic, run the experiment even longer.

#### Decisiveness

To create a natural tension against the previous principle of patience, you may find that an experiment runs on and on, never quite seeming to find a winner. Don’t keep it running indefinitely, bin it. You have learned something very valuable – your change is not an important factor in achieving your goals. Pick a completely new hypothesis and go change something else.

### Google Optimize

Now it’s time to roll up our sleeves and get started. You can follow along on the [Google Optimize](https://optimize.google.com/) website.

Everything works better if you are connected to a Google Analytics account, because you can select your Google Analytics Goals as objectives for your tests. Also, if you are considering running experiments before setting up Google Analytics to gain basic insights, I think you might be doing it wrong.

When it comes to using the visual designer, you’ll need to be using the Chrome browser (you’ll be prompted to install a browser extension). You can do the rest, including looking at reports, in any browser.

When you create an experiment, you will have an opportunity to choose an objective (reduced bounce rate, custom goals, conversions, et al) and you’ll also be able to target the pages and the visitors that will be part of the experiment.  
Let’s map our theories to the different parts of the Google Optimize tool.

#### Create an experiment

When you create a new experiment, you can choose from “A/B testing” and “Multivariate testing”. As described about, “A/B testing” satisfied both univariate and multivariate testing of a single page. If you want to perform multivariate testing across multiple pages in a user journey, choose the “Multivariate testing” option.

Optimize allows you to set objectives for the test, and this is where you place your hypothesis, linking it to an objective from Analytics, or to a custom objective.

The targeting section allows you to perform experiments based on many different factors. The two most common examples are limiting the experiment to just some pages on your website or running the experiment for only mobile device users. The most important part of targeting is to ensure it is reflected in your hypothesis. For example, if you are targeting only mobile users, your hypothesis should state that:

“Increasing the size of the “Buy Now” button *on mobile devices* will increase the number of sales.”

The variants section allows you to create and name each version of the page you are testing. This is where you create a reasonably number of differences to capture not just a binary “A or B” outcome, but a distribution that shows you where the edges are. You can then open these variants to edit your page in the visual designer, which works in Chrome and uses a special extension to show your web page with editing controls overlaid.

#### Reports

Reporting is a whole primary tab in Google Optimize, and they have done a grand job of it. The report is divided into an overview of experiment sessions over time, an improvement overview, and a strong summary of how the variations stack up against each other.  
The simple way to determine a winner is using the percentage probabilities, but there are also a few charts that help illustrate just how different the variations are.

The screen shot below shows that baseline and the first variation are not significantly better, but the second variation is significantly outperforming both. It is 77% likely to be better than the baseline. The exact number that counts as “a strong outcome” differs based on the number of variations. For a false dichotomy test, 77% wouldn’t be so strong, but with three variations it is pretty good.

![Google Optimize Inline Charts](https://www.stevefenton.co.uk/wp-content/uploads/2018/02/google-optimize-inline-charts.png)

The strange looking charts show a line for the middle 95th, a thicker bar for the middle 50th, and a circle for the median. You can hover to see the details and the numbers are also plotted over time on the chart below the table. Each row compares the variation with the baseline.

![Google Optimize Inline Charts Hover](https://www.stevefenton.co.uk/wp-content/uploads/2018/02/google-optimize-inline-charts-hover.png)

What is also interesting in this picture is that it hints that we might have found the “left hand side” of a bell curve, so perhaps we should attempt an experiment that would complete that picture.

### Summary

A good variate test starts with a strong hypothesis, this is the element that will make the biggest impact on how you learn. All of the sage advice you have picked up on setting good goals, and all of the wisdom of plan-do-check-act (and the many reinventions of it) has a part to play here. Enjoy the confidence you can have in your decision making when you have data to back it up.
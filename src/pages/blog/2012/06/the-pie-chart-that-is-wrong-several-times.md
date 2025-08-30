---
title: 'The pie chart that is wrong several times'
navMenu: false
pubDate: 2012-06-12T16:02:02+01:00
authors:
    - steve-fenton
categories:
    - 'Pie Charts'
tags:
    - Data
    - Visualisation
---

Before we get started I just wanted to confirm that I do not go out in search of bad charts on The Web. In all the cases where I highlight the problems of a given chart, they have come to me as part of daily life. Because of this, they sometimes appear on a website I actually have a lot of respect for and this is exactly what has happened today.

:::div{.inset}
:img{src="/img/2015/07/nooo-my-eyes1.jpg" alt="CSS Pre-Processor Chart"}
:::

Now this is actually a very pretty little chart showing the distribution of CSS preprocessors (more on this later). But it has more than one error. Let's get started.

## Typical Pie Chart Errors

As we all know by now, if you are going to use a pie chart ([and you probably shouldn't](/blog/2009/04/pie-charts-are-bad/)) it is easier to judge the size of a segment if it begins and ends on the four compass points on the circle. In this case, the chart manages to miss all four, not even opting to start at 12 o'clock.

The other convention you can use to make a pie chart easier to interpret is to order the segments and labels from highest to lowest. You can test this for yourself by reading out loud the first and second place items on this chart. Another test of this chart is to see how it answers the question – which CSS preprocessor is the most popular?

As always with pie charts and their descendants, less is more. Once you have more than four values, it gets harder to interpret the results. On top of this, the lack of association between the labels and the values makes it quite a task to apply the values to the correct segment – and that is it you don't have Deuteranopia or Protanopia, which makes all the segments look green or Tritanopia, which makes them look red or blue.

So here is a chart that displays the same information without the need to create a mental link between the labels, values and visuals…

:::div{.inset}
:img{src="/img/2015/07/nooo-my-eyes-21.jpg" alt="Adjusted CSS Pre-Processor Chart" loading="lazy"}
:::

## Just Plain Data Errors

Things don't end here though. This chart doesn't have its own title, but the title of the page that this chart appears on, and is directly beneath is "What is your preferred CSS preprocessor syntax?". This poses a deeper and more sinister error; especially given the chart's conclusion "Most people have used a CSS preprocessor".

It is not a deep semantic dive to find the discrepancy between this question and this statement. The question is "What is your preferred CSS preprocessor syntax", but the answer responds to the question "Have you *used* a CSS preprocessor".

And this general disconnect between the question and answer is mirrored in the list of responses available for selection. "Don't Like" makes no sense at all as an answer to either of the two possible questions.

- What is your preferred CSS preprocessor syntax? – Don't like (Presumably "None" would be the most appropriate answer)
- Have you used a CSS preprocessor? Don't like (Presumably "Yes" if you have decided you don't like them, so select the appropriate one you have tried)

Maybe the fault here is that the chart is trying to answer too many questions. Have you used a CSS preprocessor? Which one did you use? Which one do you use now? Do your prefer working with or without a CSS preprocessor?

Of course, if the question is the original "What is your preferred CSS preprocessor syntax, the chart should actually look like this:

And the conclusion would have to be "Most people are not using a CSS preprocessor". So the real question is… is there any bias on the part of the original chart's author? because if you add the people who haven't used one to the people who didn't like them, you get a majority of respondents.

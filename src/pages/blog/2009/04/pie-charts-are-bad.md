---
title: Pie charts are bad
navMenu: false
pubDate: 2009-04-17
modDate: 2022-10-21
bannerImage:
    src: /img/2015/07/pie004.png
    alt: A pie chart
authors:
    - steve-fenton
categories:
    - Pie Charts
tags:
    - Data
    - Visualisation
---

Since 1801, pie charts have displayed information and statistics about all kinds of things. From population to profit, market share to margins and, presumably, the most popular pastry-encased dinners. Pie charts are as popular in the statistics world as their namesakes are in the culinary world. Despite this popularity, there are some convincing reasons to avoid using them altogether. Essentially, pie charts are bad *at drawing insights from data*.

It takes some time to understand the problems with pie charts. Some issues are related to execution, but most are problems with selecting the pie chart in the first place.

## Comparing individual values

One common argument in support of pie charts is the comparison of individual values. This is probably why news channels are pie-chart-obsessed when it comes to elections.

In 2009, the British people selected their representatives to sit on the European parliament. The results are displayed in the pie chart below (Data: [BBC News 2009 European Election Result](http://news.bbc.co.uk/1/shared/bsp/hi/elections/euro/09/html/ukregion_999999.stm)).

:::figure{.inset}
:img{src="/img/2015/07/pie001.png" alt="Nasty Euro Election Pie Chart" loading="lazy"}
::figcaption[Euro election pie chart]
:::

So, what's wrong with this pie chart? While it's reasonably clear that the Conservative Party got the single biggest chunk of the vote, it is tough to tell the difference between the following three parties: UKIP, Labour, and the Liberal Democrats. This is a bit of a problem as the whole point of the chart should be to give us this kind of information. It is also hard to tell the difference between the next two parties: Green and BNP.

Let’s rearrange the data onto a column chart. This is usually a good choice for comparing values, as readers only need to evaluate the height of each column.

:::figure{.inset}
:img{src="/img/2015/07/column001.png" alt="Fantastic Euro Election Column Chart" loading="lazy"}
::figcaption[Euro election columns chart]
:::

The difference is clear. When comparing the portion of the total vote, the pie chart (the guaranteed choice of the newspapers) is rubbish compared to the column chart.

I wanted to keep the comparison between these as fair as possible. I have carefully set the height of the tallest bar to match the size of the pie chart. This leads neatly to the size discussion…

## Size matters

Let's look at size using the same data as the previous example. No matter what anyone tells you, size *does* matter. So what happens when we change the size of our graphical statistical tools. Pie charts demonstrate further problems. When you make a pie chart bigger, nothing happens. A larger chart doesn’t reveal more information. It is just as useless as it was when it was tiny. Just look at this waste of space.

:::figure{.inset-small}
:img{src="/img/2015/07/pie002.png" alt="Shocking Tiny Pie" loading="lazy"}
::figcaption[Tiny pie chart]
:::

:::figure{.inset}
:img{src="/img/2015/07/pie003.png" alt="Awful Large Pie" loading="lazy"}
::figcaption[Large pie chart]
:::

Our trusty column chart, however, remains versatile. Enlarging the chart can make the differences between the items even clearer. In these examples, you can see the differences clearly enough in the small chart, but you can also see the enhanced impact of the big one beneath it.

:::figure{.inset-small}
:img{src="/img/2015/07/column002.png" alt="Excellent Tiny Column Chart" loading="lazy"}
::figcaption[Small column chart]
:::

:::figure{.inset}
:img{src="/img/2015/07/column003.png" alt="Stunning Huge Column Chart" loading="lazy"}
::figcaption[Large column chart]
:::

Where clearly labelled (and if it is useful for the specific analytics), it is also possible to display a column chart with a different vertical scale (for example, a log scale) or from a non-zero starting point (though this is rarely wise). A pie chart cannot be adapted in these ways.

## Comparing combined values

Another common reason people reach for a pie chart is where combined values are to be compared.

In 2010, the people of the UK voted in the General Election. The result of the election was a hung parliament, which meant that no single party had an overall majority. In this scenario, the two parties with the most votes look to the smaller parties to form an alliance with them to have a combined majority.

The long and short of this electoral scenario is that you must do a few sums. The top two parties were the Conservative Party and the Labour Party. In third place were the Liberal Democrats. So here are the critical questions that come up when this happens.

Could second-place party Labour team up with third-place Liberal Democrats to create a combined force with more parliamentary seats than the Conservatives? Check out this pie chart and decide for yourselves. (Data: [BBC News 2010 General Election Result](http://news.bbc.co.uk/1/shared/election2010/results/))

:::figure{.inset}
:img{src="/img/2015/07/pie004.png" alt="Disasterous UK Election Pie Chart" loading="lazy"}
::figcaption[UK election pie chart]
:::

It is actually quite hard to tell. You have to compare the lilac section with the combined purple and yellow sections. It isn’t easy to tell which is bigger when displayed on a pie chart.

If we return to our trusty column chart, things are a little more obvious.

:::figure{.inset}
:img{src="/img/2015/07/column004.png" alt="Brilliant UK Election Column Chart" loading="lazy"}
::figcaption[UK election column chart]
:::

Now it's clear. The Liberal Democrats were in a uniquely gifted situation. If they were to team up with Labour, the combined party would be bigger than the Conservative Party. Equally, if they teamed up with the Conservatives, they would be the outright winners. The Lib Dems were the king-makers of this general election.

And the kings of the chart world? Let’s agree it isn’t the pie chart.

## Additional arguments

There are many, many reasons to avoid pie charts. I have kept the arguments small in number to spend time illustrating them. I haven’t gone into discussions on polar pie charts, complex spie charts, multi-level pie charts, donut charts, or other variations. Suffice it to say, they don’t work in their simplest form and making them more complicated does nothing to improve things.

## Summary

Pie charts should be avoided if you want to gain insights from your data. There will always be glossy brochure-ware applications for big colourful charts. As data professionals, these are *not* the tools of our trade.

Though I have made no effort to be impartial about the hateful pie chart, I took care to follow some rules to ensure a fair comparison.

1. Real statistics  
    I have used real statistics in these charts. I haven’t invented statistics to make pie charts look bad.
2. Same real estate  
    I have used similarly sized charts in each comparison.
3. Plain display
    I have avoided things that make pie charts even worse, such as 3D displays, transparency, and shadows.
4. Same order  
    I have ordered all pie and column charts highest-to-lowest. This is how people expect charts to be arranged.

At their very essence, pie charts fail to add depth or understanding to data. Many other chart types are available, most of which offer the benefit of chronological interpretation and comparisons. While other charts help increase your understanding, pie charts are nothing more than colourful circles.

So the next time somebody asks you, “are pie charts good?” Tell them instantly: “No, pie charts are bad”.
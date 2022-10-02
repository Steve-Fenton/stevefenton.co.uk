---
id: 122
layout: src/layouts/Default.astro
title: 'Pie charts are bad'
pubDate: 2009-04-17T01:42:58+01:00
author:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=122'
permalink: /2009/04/pie-charts-are-bad/

image: /wp-content/uploads/2015/07/pie004.png
categories:
    - 'Pie Charts'
tags:
    - data
    - visualisation
---

Since 1801, pie charts having been displaying information and statistics about all kinds of things. From population to profit, market share to margins and, presumably, the most popular pastry-encased dinners. Pie charts are as popular in the statistics world as their namesakes are in the culinary world. Despite this popularity, there are some convincing reasons to avoid using them altogether. Essentially, pie charts are bad *at drawing insights from data*.

It takes some time to understand the problems with pie chart. Some issues are related to execution, but most are problems with the selection of the pie chart in the first place.

### Comparing individual values

One common argument in support of pie charts is the comparison of individual values. This is probably why news channels became pie-chart obsessed when it comes to elections.

In 2009, the British people selected their representatives to sit on the European parliament. The results are displayed in the pie chart shown below (Data: [BBC News 2009 European Election Result](http://news.bbc.co.uk/1/shared/bsp/hi/elections/euro/09/html/ukregion_999999.stm)).

![Nasty Euro Election Pie Chart](https://www.stevefenton.co.uk/wp-content/uploads/2015/07/pie001.png)

So, what is wrong with this pie chart? While it is reasonably clear that the Conservative Party got the single biggest chunk of the vote, it is really hard to tell the difference between the next three parties: UKIP, Labour, and the Liberal Democrats. This is a bit of a problem as this is the whole point of the chart should be to give us this kind of information. It is also quite hard to tell the difference between the next two parties, Green and BNP.

Let’s re-arrange the data onto a column chart. This is usually a good choice for comparing values as readers only need to evaluate the height of each column.

![Fantastic Euro Election Column Chart](https://www.stevefenton.co.uk/wp-content/uploads/2015/07/column001.png)

The difference is clear. When comparing the portion of the total vote, the pie chart (which is the guaranteed choice of the newspapers) is rubbish when compared to the column chart.

To keep the comparison between these as fair as possible, I have very carefully kept the height of the tallest bar the same length as the height of the pie chart. This leads neatly onto our next discussion…

### Size matters

Using exactly the same statistical reference as the previous example, let’s look at size. No matter what anyone tells you, size does matter. So what happens when we change the size of our graphical statistical tools. Pie charts once again demonstrate a problem. When you make a pie chart bigger, nothing happens. A larger chart doesn’t reveal more information. It is just as useless as it was when it was tiny. Just look at this, what a waste of space.

![Shocking Tiny Pie](https://www.stevefenton.co.uk/wp-content/uploads/2015/07/pie002.png)

![Awful Large Pie](https://www.stevefenton.co.uk/wp-content/uploads/2015/07/pie003.png)

Our trusty column chart, however, remains versatile. Enlarging the chart can make the differences between the items even clearer. In these examples, you can see the differences clearly enough in the small chart, but you can also see the enhanced impact of the big one beneath it.

![Excellent Tiny Column Chart](https://www.stevefenton.co.uk/wp-content/uploads/2015/07/column002.png)

![Stunning Huge Column Chart](https://www.stevefenton.co.uk/wp-content/uploads/2015/07/column003.png)

Where clearly labelled and if it is useful for the specific analytics, it is also possible to display a column chart with a different vertical scale (for example a log scale) or from a non-zero starting point. A pie chart cannot be adapted in these ways.

### Comparing combined values

Another common reason people reach for a pie chart is where combined values are to be compared.

In 2010, the people of the UK voted in the General Election. The result of the election was a hung parliament, which essentially meant that no single party had an overall majority. In this scenario, the two parties with the most votes look to the smaller parties to form an alliance with them in order to have a combined majority.

The long and short of this electoral scenario is that you need to do a few sums. The top two parties were the Conservative Party and the Labour Party. In third place were the Liberal Democrats. So here are the important questions that come up when this happens.

Could second-place party Labour team up with third-place Liberal Democrats to create a combined force with more seats in parliament than the Conservatives? Check out this pie chart and decide for yourselves. (Data: [BBC News 2010 General Election Result](http://news.bbc.co.uk/1/shared/election2010/results/))

![Disasterous UK Election Pie Chart](https://www.stevefenton.co.uk/wp-content/uploads/2015/07/pie004.png)

It is actually quite hard to tell. The lilac section verses the combined purple and yellow section – it isn’t very easy to tell which is bigger when it is displayed on a pie chart.

If we return to our trusty column chart though, things are a little more obvious.

![Brilliant UK Election Column Chart](https://www.stevefenton.co.uk/wp-content/uploads/2015/07/column004.png)

Quite clearly, the Liberal Democrats were in a uniquely gifted situation. If they were to team up with Labour, the combined party would be bigger than the Conservative Party. Equally, if they teamed up with the Conservatives, they would be the outright winners. The Lib Dems were the king-makers of this general election.

And the kings of the chart world?-Let’s just say it isn’t the pie chart.

### Additional arguments

There are many, many reasons to avoid pie charts. I have kept the arguments small in number in order to spend time illustrating them. I haven’t gone into arguments such as the polar pie charts, complex spie charts, multi-level pie charts, donut charts, or any other variation. Suffice to say, they don’t work in their simplest form and making them more complicated does nothing to improve things.

### Summary

If you are looking to gain insights from your data, pie charts should be avoided. There will always be glossy brochureware applications for big colourful charts of all kinds. As data professionals, these are not the tools of our trade.

Though I have made no effort to be impartial about the hateful pie chart, I taken care to follow some rules to ensure fair comparison.

1. Real statistics  
    I have used real statistics in these charts. I haven’t invented statistics to make pie charts look bad.
2. Same real estate  
    I have used similarly sized charts in each comparison.
3. Plain display  
    I have avoided things that make pie charts ever worse, such as 3D displays, transparency, and shadows.
4. Same order  
    I have ordered all pie and column charts highest-to-lowest. This is how people expect charts to be ordered and that’s how I’ve ordered them.

At their very essence, pie charts fail to add depth or understanding to data. There are many other chart types available, most of which also offer the benefit of chronological interpretation. Where other charts help you to increase understanding, pie charts are nothing more than colourful circles.

So the next time somebody asks you “are pie charts good”, tell them instantly – “no, pie charts are bad”.
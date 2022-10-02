---
layout: src/layouts/Default.astro
navMenu: false
title: 'What data is missing?'
pubDate: 2020-09-25T06:00:08+01:00
authors:
    - steve-fenton
categories:
    - Analytics
tags:
    - data
---

When you start collecting data at scale, you need to decide when to invest in keeping “all the datas” and when to keep only a sample. When it comes to sampling, you need to ensure that the parts you discard and the parts that you keep are a truly representative sample. That means you need to discard at random to ensure that what you keep “looks like” the total data when scaled up.

Common mistakes in this arena include…

- Believing numbers are precise
- Not considering excluded groups

[Analytics are not precise (but that’s okay)](/2019/06/analytics-are-lossy-and-thats-okay/), because of loss due to many factors, one of which will be deliberate if you are sampling.

Ignoring excluded groups is a more fatal error.

For example, if your analytics software runs with JavaScript, it would be wrong to infer that “100% of our visitors have JavaScript enabled” – those without it aren’t being counted, so you don’t know how many there are.

Let’s look at an example that embodies this principle.

These are the results of the 2016 US Election in terms of votes. Clinton had 1.3 million more votes than Trump (but the electoral college system resulted in Trump being elected).

[![Column chart shows Clinton has the majority of votes, a small lead over Trump, with a small column for other votes.](/img/2020/09/2016-us-election-votes.jpg)](/2020/09/what-data-is-missing/2016-us-election-votes/)

You will hear people saying that 48% of voters chose Clinton and 47% chose Trump. This is wrong. When we look at votes, we are excluding specific groups of the population. In particular, we exclude those not eligible to vote and those who *didn’t* vote (or whose vote was not counted).

That doesn’t matter right? Can’t we just scale up our population? No, because the people who didn’t vote will not behave the same as people who did vote. For example, if the right candidate was available, they might vote. If their vote was not counted due to some form of corruption, or technical fault, or usability problem with the voting system – their vote *could* count next time.

In the case of the US Election in 2016, the “no vote” population is massive. In fact, if we look at *voters* rather than *votes* we find that “no vote” represents 43% of the voting population, leaving just 27% for Clinton and 26% for Trump.

[![Chart shows the largest column is no votes, with columns that are three fifths as high for Clinton and Trump and a very small column for others.](/img/2020/09/2016-us-election-voters.jpg)](/2020/09/what-data-is-missing/2016-us-election-voters/)

Why does this matter?

Because it changes how you react to the data. Without considering the whole population of voters your strategy will be to win votes from “the other side”. With the broader picture, you will focus more effort on motivating non-voters to attend. Your web analytics might not be as fundamental to saving the planet from corruption as they will be in the next US election, but the data you might be ignoring could be just as important to your strategy.

Number of votes obtained from [The BBC](https://www.bbc.co.uk/news/election/us2016/results), number of eligible voters from [Heavy](https://heavy.com/news/2016/11/eligible-voter-turnout-for-2016-data-hillary-clinton-donald-trump-republican-democrat-popular-vote-registered-results/).
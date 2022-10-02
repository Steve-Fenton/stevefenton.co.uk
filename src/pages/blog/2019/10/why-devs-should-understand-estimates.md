---
layout: src/layouts/Default.astro
navMenu: false
title: 'Why devs (should) understand estimates'
pubDate: 2019-10-24T13:30:11+01:00
authors:
    - steve-fenton
image: /wp-content/uploads/2019/10/software-estimation-books.jpg
categories:
    - Process
    - Programming
tags:
    - '#noestimates'
    - estimates
---

Yes, this is a sub-post! A reaction to a post titled “Why Devs (Should) Like Estimates”. I try not to get involved in industry conversations about estimation (or, indeed, #NoEstimates) as it can get very dicey at a general level in ways that simply don’t occur for a specific team or organisation. I’ll briefly qualify this before I continue with why devs *should* understand estimates. When you sit down with the people who are spending money in the hope of some return (business), and the people able to take that money and generate something more valuable than the cash itself (technical), you can usually resolve the questions of whether estimates are needed, what form they will take, and how they will be used. It’s rarely a difficult conversation because when you know the purpose of an estimate, you can select a method that matches the need. This is very important, so I’ll do a dramatic inverse pull-quote…

> When you don’t understand *why* an estimate is needed, you won’t solve the problem – even with an estimate.

There are two tools I use in respect of estimates: One is the [phase precision premise](/2019/03/the-phase-precision-premise/), which identifies some broad classifications that apply to software development that should affect your decision on whether to estimate. The second is [a simple decision flowchart for estimation / not estimating](/2015/09/noestimates-in-practice/), which helps you decide whether the underlying need can be solved in a different way. This post builds on this and offers a critique of the “Why Devs (Should) Like Estimates” article.

### Why now?

Having stayed away from this debate for a long time, the publication of the article on a website that has a massive influence with developers (the Stack Overflow Blog), has made it impossible to ignore. A great many people will take it for granted that the information is accurate, complete, and correct. It is important to draw attention to areas that you, dear reader, must look at in more depth before you eat the poisoned apple that has been placed in your hands.

In particular, I don’t want Yaakov Ellis to take any of this critique personally. In fact, the advice might work perfectly well within Stack HQ. The problems arise, as I’ve mentioned before, when local success is misinterpreted as general practice. In other words, I have worked on teams that never needed to provide estimates, but my general advice is not “don’t ever provide estimates”.

### Brick by boring brick

Let’s take some quotes and nitpick them, hopefully constructively.

> As a Principal Web Developer at Stack Overflow and a long time Tech Lead, I learnt that accurate estimates were essential in order for a company to be healthy and productive.

This is a generalisation. Many healthy and productive companies do not require estimates, let alone accurate estimates. If you have experience with ten companies and the five <abbr title="healthy and productive">HAP</abbr> ones used estimates, while the five un-HAP ones didn’t, you have a correlation based on a limited sample. You now need to collect a larger sample and remove other factors to find out whether this correlation is causation. I propose the theory that a representative sample will show that accurate estimates are not strongly correlated to HAP organisations (and are not the cause of health or productivity).

> An estimate helps to plan and coordinate product releases, synchronize work with other teams, ensure that resources \[and people\] are allocated properly to meet the needs of the product

As many have described before (Woody, Neil, Duarto, et al) you can plan, co-ordinate, and undertake work without estimates. It is commonly said that the planning is more important than the plan. If you decomposed all of the activities that contribute towards the successful execution of a feature, it is likely you could remove the “estimation” component without much affecting benefits described above.

> and of course to enable accurate billing of clients when your team has been hired to do a job for an outside company.

Having worked within an agency environment in the past, I feel we need to distinguish between estimation and billing. If you are billing based on the estimate, for example as part of a fixed-price contract, it is important that across a number of projects you remain profitable. The bill will always be accurate in this scenario, because it will be for the exact amount agreed as part of the fixed price contract. You, as an agency, are being paid for the sum total of effort *and* to assume the risk. Your price should reflect this. If, though, you are working on a shared-risk model, such as an agile contract, you are partners in the endeavour and alternatives to estimation are available. For example, I worked on an agile contract where the client reviewed what had actually been delivered every two weeks, before deciding whether to continue funding the project. The client therefore assumes a capped two-week risk, and the agency is motivated to deliver value for money in each period to gain the renewal. No estimates are required in this case as the risk is capped and the decisions are based on real delivery, not estimated delivery.

> as many of us have learned, while it is easy to give someone a number, it is much harder to give a number that is in any way accurate

As Robert C. Martin often points out, it is trivial to give an accurate estimate. It is also trivial to give a precise estimate. The only time it becomes difficult is when both precision and accuracy are needed. Without getting into lots of detail about the [cone of uncertainty](/2017/11/alternate-visualisation-cone-uncertainty/), or individual estimation methods, I’ll simply state than an “accurate” estimate means one that turns out to be correct (for example, between one and one-million days). A “precise” estimate is one that has a narrow range (for example, between three and five days). The cone of uncertainty shows us how likely we are to achieve both precision and accuracy *on average* across a number of projects, based on the stage in the project lifecycle. It should be possible to transfer this thinking between projects, products, and features with minor adjustments.

> an accurate estimate will enable you to deliver your work with a high level of quality in the least amount of time

An organisation must exhibit a form of dysfunction if the estimates impact quality. To put it bluntly, the organisation has to choose that a date is more important than quality in order for this correlation to emerge. When this happens implicitly, it is best for software professionals to pause and ensure the decision is made explicit.

> It will help you to avoid false starts and the pain of having to throw away code unnecessarily

An estimate does not prevent false starts. If the planned solution doesn’t solve the underlying problem you will have a false start, even with an accurate and precise estimate. Learning-based cycles such as [DIBBs and DITE](/2019/09/the-dite-cycle-data-insight-theory-experiment/) are designed to help you avoid investing too much in a false start. Unless you have no feedback loop, you should only ever need to throw away code necessarily.

> It will help to minimize scope changes

No it won’t. When the scope inevitably does change, you will need to revise the estimate. Fixed price contracts are usually protected by a clause to ensure this, otherwise bankruptcy beckons.

> It will allow you to structure and to plan out your work in the most efficient way that you can

We all seem to prefer the term “effective” rather than “efficient” these days, but in either case the planning is not the estimate. If the only way to ensure an appropriate level of thought is put into a task is to request an estimate, you have uncovered the signs of a dysfunction that could be fixed. Until it is fixed, by all means use the estimate as a way to promote a reasonable level of thought.

> Estimation technique is a personal decision that each dev has to make for themselves.

Beware of a situation that may result in every individual using a different method to estimate. In fact, beware of a situation where any estimate is generated solely by an individual. You’ll be more successful if you use group techniques to expose and discuss differences in estimates. The differences are always interesting. In the sources I quote below, more than ninety-percent of group estimates were more accurate than individual estimates and the magnitude of the errors was reduced by half.

> An estimate that is made by someone other than the person who will be doing the work is much harder to get correct

This is a near miss. In most modern software development organisations we don’t want to allocate tasks too early, so forcing the estimator to be the individual contributor actually doing the work will cause scheduling problems later on. What *is* true is that the *people* doing the work are better placed to provide *accurate* estimates than people not doing the work. In combination with the previous point, accurate estimates can be obtained from the group of people doing the work using an acknowledged estimation technique that takes into account the cone of uncertainty. Yes, individuals work at different speeds, or know different things; but the range you supply in an estimate can take this into account. Unless you work in total isolation, this shouldn’t make a material difference. The developer could pair with the current expert and complete the task in the anticipated time, thus giving you a second expert.

> An estimate that is not based off of a strong understanding of the functional requirements will most likely result in an inaccurate estimate

I won’t pull out the many quotes from the article about refusing to estimate until the specification is final, but I’ll include a commentary on that here. From an industry perspective, estimating at different points in the software development lifecycle is possible and has known industry-level ranges of uncertainty… this is called the cone of uncertainty. I’ve mentioned it a few times already. If you want to be scientific about it, you could gather your own organisation-level cone of uncertainty, but it might not be any more useful than the industry one (as your one will be impacted every time something within your organisation changes, such as the individuals on the team).

> Your estimate should end up setting a number of hours to complete the defined tasks

In fact, the granularity of your estimate should be adjusted to ensure you don’t give a false sense of precision. If you told me a task would take between 132 and 141 hours, you are suggesting you know more than you really do. It is better to say it will take between 5 and 6 days, which is materially the same information. If it really does take 132 hours, the 5-6 days estimate is accurate. If it really does take 141 hours, the 5-6 days estimate is accurate.

### And there’s more

A more general problem I have with the article in general is that it seems highly skewed to project-thinking. Perhaps for those of use using a data-driven insights-based approach where we take small steps and validate our direction often, this kind of “ensure the spec and estimate are updated regularly” thinking simply doesn’t apply. It seems to be more closely married to a Waterfall approach, where things are “nailed down” too early and the feedback loop is too late. This is not my world. Even if it were, the advice does not align to some very well researched advice that is available from the authors I mention below.

### Good advice on estimation

Steve McConnell wrote the definitive guide to estimation in [Software Estimation: Demystifying the Black Art](https://wordery.com/software-estimation-steve-mcconnell-9780735605350) (Microsoft Press). This book is backed by a great deal of well researched information from industry sources. It debunks the aforementioned article in great detail, despite being written more than a decade earlier. Mike Cohn has also written a book I refer to often, [Agile Estimating and Planning](https://wordery.com/agile-estimating-and-planning-mike-cohn-9780131479418), which brings solid estimation advice to iterative software development.

![Software Estimation Books](/img/2019/10/software-estimation-books.jpg)

Remember, you don’t always have to estimate. The [Phase Precision Premise](/2019/03/the-phase-precision-premise/) and the [Estimation Decision Flowchart](/2015/09/noestimates-in-practice/) may lead you to alternatives. When you *do* need to estimate, Steve and Mike have got you covered.
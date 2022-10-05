---
layout: src/layouts/Default.astro
title: 'Analytics: More users than sessions'
navMenu: false
pubDate: 2019-03-01T07:00:03+00:00
authors:
    - steve-fenton
bannerImage:
    src: /i/x/2019/02/sample-users-session.png
    alt: Two Visitors, both visit in January and one visits again in Febrary
categories:
    - Analytics
---

Analytics are super-useful but can get a bit tricky at times. For some reason, several of *those times* seem to have cropped up this week. So, following on from my article on [Why Unique Visitors in Analytics Never Adds Up](/2019/02/why-unique-visitors-in-analytics-never-adds-up/) – I now have one about how you can sometimes have more sessions that users.

For the purposes of this article, a user is a “Unique User”. We’re talking about Purple Jane, or Blue Dave. Try to think of a user as a human being; we don’t think of them in this way often enough. A session is a time when they visit the website to view one or more pages.

Logically speaking, we can imagine a user having one or more sessions. What seems less logical is a user having less than one session, or a session having more than one user. If we detected and tracked that two people were sitting together to look at the computer, it would become possible – but this is also creepy and unlikely, especially if they have stuck a sticky-note over their web cam.

Referring back to our graphic of Purple Jane and Blue Dave from the previous article, we can see that in our analytics report we would expect to find the stats in the table below. Purple Jane visits just once in January, and views two pages. Blue Dave visits two pages in January and another two in a return visit in February.

:img{src="/img/2019/02/unique-visit-tracking.png" alt="Two Visitors, both visit in January and one visits again in Febrary" loading="lazy"}

Analytics – Year so Far:

| Metric     | Value |
|------------|-------|
| Users      | 2     |
| Sessions   | 3     |
| Page Views | 6     |

Here’s how it might look on a dashboard:

:img{src="/img/2019/02/dashboard001.png" alt="Analytics Dashboard" loading="lazy"}

But what if things don’t entirely make sense? Here are a couple of reasons!

## Widget filters

When you create a dashboard, you can filter the widgets to get the information you want. It is pretty common to miss the filter from one of your widgets, in which case you get an inconsistent view.

:img{src="/img/2019/02/widget-filter.png" alt="Widget Filter" loading="lazy"}

For example, if you had a dashboard to view traffic for a particular browser, you might add the filter “Only show -> Browser -> Containing -> Chrome”. When you do this, the number changes *but the title doesn’t change to indicate the filter!*. You can manually change the title, which helps, but you can forget to do that too. Here’s the dashboard with the browser filter applied to “Sessions” but not to “Users”.

:img{src="/img/2019/02/dashboard002.png" alt="Confusing analytics dashboard" loading="lazy"}

This scenario looks impossible, but that’s because the dashboard design is wrong. But there are other scenarios where you will come across this seemingly impossible scenario without making a mistake on your dashboards…

## When to count users and sessions

The rules for counting a user and a session differ. Let’s look at a practical and simplified example of a single user visiting a handful of pages.

:img{src="/img/2019/02/sample-users-session.png" alt="Sample user's session" loading="lazy"}

Our user, Purple Jane, hits the website and looks at three pages. The landing page registers a new visit, because this is a new session. The second and third page both register that a unique user looked at them – but they don’t register a visit because they are part of an existing session.

If we look at our website stats, we’ll see we have 1 unique user, 1 session (or visit), and 3 page views. There is nothing confusing here.

:img{src="/img/2019/02/unfiltered-users-session.png" alt="Unfiltered analytics" loading="lazy"}

If we filter our website stats, for example by running a report that only includes our product pages, we can get a confusing result. We have 1 unique user, 0 sessions (or visits), and two page views… which looks a bit odd.

:img{src="/img/2019/02/filtered-users-session.png" alt="Filtered analytics" loading="lazy"}

The stats aren’t telling us that no visits were made to these pages, they are telling us that no visits *started* on these pages.

When you look at a single user and a single visit, this is all very clear. When you scale this up to the size of a busy website, you can see things like 5,000 users and 2,000 sessions, which is more likely to be confusing.
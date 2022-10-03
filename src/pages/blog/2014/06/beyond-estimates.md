---
layout: src/layouts/Default.astro
navMenu: false
title: 'Beyond estimates'
pubDate: 2014-06-18T21:52:44+01:00
authors:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=337'
interface_sidebarlayout:
    - default
medium_post:
    - 'O:11:"Medium_Post":11:{s:16:"author_image_url";s:75:"https://cdn-images-1.medium.com/fit/c/400/400/1*eXkhfEuF41g5W_xnc_ydLA.jpeg";s:10:"author_url";s:38:"https://medium.com/@steve.fenton.co.uk";s:11:"byline_name";N;s:12:"byline_email";N;s:10:"cross_link";s:3:"yes";s:2:"id";s:12:"77a0ae064d8f";s:21:"follower_notification";s:3:"yes";s:7:"license";s:19:"all-rights-reserved";s:14:"publication_id";s:2:"-1";s:6:"status";s:5:"draft";s:3:"url";s:51:"https://medium.com/@steve.fenton.co.uk/77a0ae064d8f";}'
categories:
    - Process
tags:
    - 'noestimates'
---

In order to stop the flow of people who are so keen to tell me what my opinion is on the #NoEstimates debate – I have documented here my current position, which is neither entirely for nor against the use of estimates.

This is my *current* position, as of today. I may change my mind if sufficient evidence is presented to sway me (be it qualitative or quantitative in nature).

There are [many kinds of estimates](/2014/06/Definition-of-Estimates/) in use, including:

- Guesses
- Carefully judged predictions
- Projections

Guesses have no place in software development. If you are guessing, you may as well not estimate at all. Decisions may be made if people interpret the guess as a professional judgement and a guess is neither professional nor judged.

Carefully judged predictions are a less clear case. If you are following the style of estimation described in The Clean Coder (Robert C. Martin), it is likely that you are producing accurate estimates using a range. Precise estimates have no place here, because that suggests you can know the unknowable. Whether this kind of estimation should be used depends a great deal on the context. If you can show where the value is and can confirm that the investment in estimation is paying back returns – who can say that you shouldn’t be doing them. If you are using estimates as if they are real dates and beating people with a stick when the dates are missed, you are a fool.

Projections are a different matter altogether. The technical team I work on has stopped doing any form of estimation, but we have coached the business people we interact with to show them how to create projections. If they ever need to, they can use the techniques we have shared to transform current information into projected date-ranges that indicate when a feature is likely to become available.

The important thing here is that we have shown the business how to obtain their own numbers. The classic problem of a technical team providing an estimate and then being held to it is gone. The business team make the projection and when they change the order in which they want features delivered they understand that it changes their projection. When they ask for more features, they can adjust their projections. When they remove features because they are no longer needed, they can adjust their projections.

The people who decide whether or not they need an estimate are now able to provide it to themselves. If they change anything that affects their projection, they understand that it needs to change and why. Of course there will be mistakes, but there is no longer a *Pratt salute* of blame, because the people impacting the projections are also responsible for them.

Where the team can impact the projections, it is for genuine technical and individual reasons and these can be addressed professionally within the organisation (for example, if a team member leaves the company the projections will be impacted).
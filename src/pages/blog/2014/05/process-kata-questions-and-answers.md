---
layout: src/layouts/Default.astro
navMenu: false
title: 'Process Kata questions and answers'
pubDate: 2014-05-01T22:19:59+01:00
authors:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=361'
interface_sidebarlayout:
    - default
medium_post:
    - 'O:11:"Medium_Post":11:{s:16:"author_image_url";s:75:"https://cdn-images-1.medium.com/fit/c/400/400/1*eXkhfEuF41g5W_xnc_ydLA.jpeg";s:10:"author_url";s:38:"https://medium.com/@steve.fenton.co.uk";s:11:"byline_name";N;s:12:"byline_email";N;s:10:"cross_link";s:3:"yes";s:2:"id";s:12:"202f09a3fe89";s:21:"follower_notification";s:3:"yes";s:7:"license";s:19:"all-rights-reserved";s:14:"publication_id";s:2:"-1";s:6:"status";s:5:"draft";s:3:"url";s:51:"https://medium.com/@steve.fenton.co.uk/202f09a3fe89";}'
categories:
    - Process
---

![Process Kata](/img/2015/07/process-kata-two.jpg)

I wrote an article describing how [the team I work on used a kata to test out our new process](/2014/04/Process-Kata/). I got some interesting questions and comments, so I thought I’d respond in more detail in this follow up.

> This only works if the team has permission to discard any process treacle they find.

The team isn’t Agile if they need permission to change their process. There are two principles attached to the Agile Manifesto that are directly related to this and another indirectly related. On a practical note, unrelated to Agile, a team consisting of everyone needed to deliver the outcome will optimize the process as a whole, whereas clipboard-waving management optimization typically optimizes sub-processes even if this is detrimental to the wider system.

One of the key outcomes of the process kata is an adjustment to any part of the process that was found to be wrong.

> Do you simulate external influences to test robustness against the real world?

In a word; no.

To simulate the real world issues we are likely to face we would be predicting the unpredictable. The kata is not the only opportunity to reflect and tune; the process will be changed frequently if real life breaks it or finds it wanting. A kata is just practice – an opportunity to become proficient when there is no consequence to failure. It would have been reckless to start our process on real work without having spent some time practising it.&lt;

The process kata is a limited test of the process. The process itself should include a method for reflecting on the process and adjusting it to improve it.

> Is it a process kata or a practices kata?

Any coding kata should exercise one or more practices – almost always test-first programming but typically many others. The process kata started with the customer/implementation team conversations, moved onto specification, building and delivering the desired outcome. There are many practices baked-in to the process, such as Impact Mapping, Specification by Example, Executable Specifications, Test-First Programming, SOLID principles, pairing, mob programming, retrospectives and many more – but the process kata allows more than practice of each of these, it allows the whole sequence of events to be attempted.

The process kata is a complete run through of normal working practices. We call one turn of the crank-handle and increment and each increment may contains several iterations – but these are specifics of our process and not requirements of a process kata.

> Can this work in an audited environment (such as ISO9001)?

&lt;

Yes it can. Our team is subject to two separate audits for different ISO standards as well as a myriad other audits because we operate in the healthcare sector (safety critical emergency triage). Most standards require that the process is documented adequately and followed appropriately and this is entirely possible with the kind of process we are using inside of the process kata. In fact, having been audited a few times now I can reveal that the inspect and adapt step in our process is seen favourably by the auditors, who are also keen to see evidence of the retrospective process to back up the changes we make.

If you are audited a great deal, there may be a need to keep some lightweight documentation that adequately describes your process – and of course you need to follow your process, which is really the whole point of the audit.

> Is this a meeting?

No – and you may not even need to run the process kata in a meeting room if you can practise it in your normal working environment. A process kata is not a discussion about the process – although there will be a measure of reflection about the effectiveness of the process – it is a thorough walk through.

> How did you estimate the work when it wasn’t real work?

We didn’t because our process doesn’t include estimation or sizing. If your process includes an estimation stage, you should include it – although this stage of your process should be examined just like any other. What is the purpose of that aspect of your process? Is there a better way of working that means you don’t need to spend time on it? We have dropped estimation because we have found more effective ways of satisfying all of the constraints we were given when we questioned why-why-why-why-why estimation was required.
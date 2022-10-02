---
layout: src/layouts/Default.astro
navMenu: false
title: 'Behind the BizOps buzz: Metric MLA'
pubDate: 2019-04-02T07:50:21+01:00
author:
    - steve-fenton
image: /wp-content/uploads/2019/04/conversions-per-week.jpg
categories:
    - Analytics
tags:
    - bizops
---

We all know that BizOps is gaining momemntum and that we need to think about how we take care of it in our own organisations. Not just because it’s yet another buzzword ending in “Ops”, but because of what we’ve been piecing together for many years. If you’ve read Start With Why, or The Lean Startup, or one of the many excellent business and management books to have been penned post-McGregor, you’ll know what lies at the heart of BizOps… adding some cold hard economic facts to our smushy organic human decisions. We’re not trying to replace those dendrites, axons, and neurons with robot decision making; we’re trying to supply some rational data to accompany the emotive stuff. That human part of the decision is still important, because your data isn’t going to come up with many ideas – so we need a way to test out the ideas that we come up with objectively and scientifically.

I’m not going to talk much about scientific method or experiment design here. When you are ready for those you’ll find plenty of sources of that information. What I want to present is a few stages that I have found useful in setting up DevOps dashboards, monitoring, and alerting that I found were useful once again when setting up business-focussed dashboards, monitoring, and alerting. In other words – there are some principles that are well developed for technical decision making that apply equally to business decision making.

![Conversions Per Week](https://www.stevefenton.co.uk/wp-content/uploads/2019/04/conversions-per-week.jpg)

### Data

This applies to digital and physical products, but I’ll use a simple website example. Imagine you have a brochure site that you intended to use to convince potential customers that you have an awesome product – and you want to generate telephone calls into your sales team.

You’ll need to follow the three steps below to get yourself some BizOps data:

- **Metric**: what do you need to measure?
- **Accuracy**: how accuracte will it be?
- **Lifetime**: how long should you measure it?

### Metric

We know that we want to measure how many phone calls we get, but that’s probably not enough. Usually we’ll want to compare it to something, such as unique visitors, so we can eliminate some of the noise created by ebbs and flow in traffic and so we can isolate the effects of improvements to the website verses advertising. So we’ll need to make sure we are collecting, for example, phone call clicks *and* unique visitors.

### Lifetime

It can be tempting, once you start collecting data, to collect it forever. While this is valid in some cases, it can be damaging in others. Metrics tend to be a proxy for something the organisation values. For example, it can be hard to track how much your website is impacting your financial performance – so you take a metric like “contact form submissions” and you measure those. The assumption is “the more contact form submissions we get, the more likely we are to be making money”. This tends to evolve along the following lines:

1. Collect the count of form submissions
2. Count the submissions for each type of form
3. Value the submissions per type, so a general enquiry is worth $1 and a brochure request is $5
4. Find out the actual value that resulted from each lead form
5. Work out the actual lifetime value that results from each lead form

As you can see, the numbers at each stage move closer to the real value generated from the form submission, so we need to make sure we are using the improved metric as we progress. You may keep the count of form submissions when you start valuing them (you can get an average value from this), but you shouldn’t keep the hard-baked dollar-value when you start collecting the real value.

Another consideration that should encourage you to retrire metrics is this. You introduce a metric in order to drive a certain decision. Once you mature beyond that point in time where a decision was needed, what bad decisions may follow if you still track that metric?

The metrics to keep are those that best represent your success as an organisation. When you track a proxy metric, you should set up a regular cycle to review and retire metrics before they cause damage.

### Accuracy

Now we come to accuracy. There are some trade-offs to be made here. If we show the phone number in a large clickable header, we will measure some clicks – but we’ll also be obvlious to other interactions. Many users will read the number from their screen and type it into their phone. That means you are accidentally segmenting your metric to “users on a device with click-to-call capability, who realise the link is clickable, and prefer to click to dial”. It is possible that this segment of users is indicative of all users. You might not be any more or less likely to call based on being outside of this segment. However, it is highly likely that there is a big difference to be found here. Let’s look at two versions on a case study…

Gubbintech implement tracking on telephone link clicks on their website. They find that 3% of their visitors call the sales team as part of their visit. They make a few changes to the styling of the phone number and manage to get that number up to 4%.

Or!

Gubbintech implement tracking using a special telephone numbers on their website that isn’t used in directory listings or for print marketing. They use one number to display on mobile devices and another on desktop devices. They find that 3% of their visitors call the sales team as part of their visit, *but almost all of them are using the mobile device telephone number*. They check their website on some different devices and find that the telephone number appears in the header of the website on mobile devices, but is in the footer contact section of their desktop site. They change the desktop site to make the telephone number more prominent and increase calls to 6%. They go on to change the styling of the phone numbers and get that number up to 8%.

This is all down to accuracy. Displaying the standard phone number as a clickable link will get you a low-accuracy indication that people are using a feature. You could risk hiding the number behind a clickable “Call us Now” call-to-action and get a higher level of accurracy (trading a bit of the user experience for that accuracy). Or you can implement a more costly bit of tracking with special trackable phone numbers (though anyone commiting the number to their contact list may be surprised in the furture). What’s the correct answer? There isn’t one, each one involves some trade-off.

Importantly, once you set a level of accuracy you need to maintain it. For example, if you track telephone number conversions using a low-accuracy method – you can’t later compare a high-accuracy method against it. You’d be comparing “3% when we could only track click interactions” with “6% when we can track every dial”, which looks like an improvement in results when it is, in fact, only an improvement in tracking. If you change the accuracy, you should create a new name for the metric to avoid bad comparisons. For example, “TelephoneClicks” vs “ActualTelephoneCalls” in this case.

### Summary

When you are choosing your BizOps metrics, you need to make sure the numbers will be a good proxy for the real change you want to see. In all of the above examples we have assumed telephone calls is a good proxy for the success of Gubbintech. It may not be. In fact, more telephone calls might be a bad thing as it could increase the cost to service a customer. The question is whether we can get our hands on a better metric, such as actual sales volumes and values. It is important to consider the accuracy when you create the metric, but also if you change how you collect it. Create a new name for a metric if you significantly alter its scope or accuracy. Finally, don’t keep recording metrics that no longer represent the aspirations of your organisation or when a more suitable metric has supplanted it.
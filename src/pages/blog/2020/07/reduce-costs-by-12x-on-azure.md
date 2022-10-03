---
layout: src/layouts/Default.astro
title: Reduce costs by 12x on Azure
navMenu: false
pubDate: 2020-07-28T20:00:24+01:00
authors:
    - steve-fenton
bannerImage:
    src: /i/x/2020/07/flat-comparison.jpg
categories:
    - Azure
tags:
    - 'Cost Management'
---

I’m in the process of writing a little test app that I’d like to run on Azure to keep an eye on a suite of 1,000 websites. It’s a .NET Core app that replaces a test pack written with JMeter that has been manually “push-button” executed in the past. It means the tests can run continuously with alarms if there’s an issue. Removing manual work is worth some money, but there’s no reason to spend more than you have to, so let’s look at a week of gentle optimisation of costs.

The test app is pretty simple. A data store, a user-interface to add more tests to the pack and to review test runs, and a little robot that actually does all the work.

My first guess for the Azure set up was a serverless SQL database for the data store, an app service for the user-interface, and a web job for the robot. With this all set up, what tools are there to find out if this is a good solution from a cost perspective?

## Azure Cost Management

The Azure Portal has a really neat area for cost management, which includes something called *Cost Analysis*. You’ll find that in the menu as shown below.

:img{src="/img/2020/07/azure-cost-analysis.jpg" alt="Azure Cost Analysis Menu" loading="lazy"}

This is the best place to start as it breaks down the cost per resource and provides a forecast of spending. This screen is able to provide reasonable forecasts after a couple of days of normal operation.

:img{src="/img/2020/07/forecast.jpg" alt="Cost Forecast" loading="lazy"}

My first attempt to save money was to write some basic scheduling to [switch off the app service on a schedule using an Azure logic app](/2020/07/start-and-stop-an-azure-app-service-on-a-schedule-with-azure-logic-apps/). The user-interface wasn’t required out-of-hours. This saved a little bit of money, but with the robot working full time the app services was still the expensive resource. As it was costing more than a basic Virtual Machine, I decided to shift the robot out of a web job and into a small Virtual Machine. This achieved a bigger saving.

A quick aside… this article is not “using a small virtual machine is cheaper than using a web job”! It depends on what you are doing. This article is “here are tools you can use to find what works for you”.

## Park My Cloud

The next cost saving tool is [Park My Cloud](https://www.parkmycloud.com/). It works across a number of providers, including Azure, and provides a simple way to create schedules that automatically run. It also looks at your Virtual Machines and suggests right-sizing fixes too. For my purposes, using one of the standard schedules to power-down the machine out of hours removed around half the cost of the Virtual Machine.

:img{src="/img/2020/07/park-my-cloud.jpg" alt="Park My Cloud Scheduling" loading="lazy"}

Park My Cloud is like having an accountant for your cloud spend; they basically pay for themselves by saving you money.

## Results

The first chart shows the changing cost curve as different changes were applied.

:img{src="/img/2020/07/chart-actual-spend.jpg" alt="Actual Spend Chart" loading="lazy"}

Taking “today” as day zero, we can compare the long-term costs before and after the cost saving measures.

:img{src="/img/2020/07/flat-comparison.jpg" alt="Comparison of Different Configurations" loading="lazy"}

The result is, it costs 12x less after spending a few hours thinking about different ways to power the test app on Azure.
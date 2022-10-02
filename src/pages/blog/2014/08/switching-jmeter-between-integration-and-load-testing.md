---
layout: src/layouts/Default.astro
navMenu: false
title: 'Switching JMeter between integration and load testing'
pubDate: 2014-08-20T21:20:52+01:00
author:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=302'
interface_sidebarlayout:
    - default
categories:
    - Automation
tags:
    - jmeter
---

We have been re-using our JMeter integration tests as load tests, which has been a great way of discovering various slow-downs in our REST APIs (in particular, we found that a large backup process slowing down our network significantly at 1am each morning).

If you are using JMeter in the same way, you may find that you are constantly adjusting from integration mode to load testing mode by changing loop counts, thread counts and CSV data set configuration.

Here is an overview of how we avoid updating a ton of configuration each time we want to switch between these two modes of operation.

![Integration Tests Tree](/img/2015/07/jmeter-tree-integration-and-load.png)

All of the actual requests to the APIs are containing in the modules thread (which has zero threads configured against it). This allows requests to be re-used, rather than copying the REST sampler each time we want to make a particular request.

We then have a Load Test Thread and an Integration Test Thread. Each of these is stuffed full of configuration differences. For example:

| Item | Load Test | Integration Test |
|---|---|---|
| Nested CSV data config – Stop thread on EOF | No | Yes |
| Action after error | Continue | Stop Thread |
| Nested loop controller loop count | 1 | Forever |
| Nested loop (for CSV data) | 2 | Forever |
| Nested CSV data config – Recycle | Yes | No |

The main theme of the difference is that the load test should keep going as long as we want (based on the master thread group settings of thread count and loops), whereas the integration test should run until it has used up all of the data in the CSV data set.

When not in use, both the load test thread and the integration test thread are set to 0 threads. If you run the tests in this state, nothing happens.

When we want to run a load test, we simply configure the number of threads and number of loops on the load test thread group and the tests run indefinitely.

![Load Test Threads](/img/2015/07/load-test-threads.png)

When we want to run an integration test, we set the load test thread group to 0 threads, and set the integration test thread group number of threads to 1, as shown below.

![Integration Test Threads](/img/2015/07/integration-test-threads.png)

The only duplication in the tests are the calls to the modules (you can read more about [modularising your JMeter tests](/Content/Blog/Date/201206/Blog/Modularising-JMeter-Tests/) in my earlier post).

This is much simpler than constantly reconfiguring the same thread group to switch it between load and integration mode – it is almost certain that one of the many settings would be forgotten, which often results in unexpected results and lost time.
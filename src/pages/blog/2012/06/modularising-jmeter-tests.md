---
layout: src/layouts/Default.astro
navMenu: false
title: 'Modularising JMeter tests'
pubDate: 2012-06-27T15:50:34+01:00
authors:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=777'
interface_sidebarlayout:
    - default
categories:
    - Automation
tags:
    - JMeter
---

JMeter is an awesome tool for writing load tests, but it isn’t obvious how you would break your tests into re-usable chunks. For example, if you are testing multiple scenarios that all require a login, it is a bit annoying to have a copy of the nodes required to log in and check the sign in worked in each test. It would be much better to have a login component that you could just re-use in all your tests. The great news is that you can re-use your JMeter stuff by creating modules.

So here is our example – a typical test in JMeter.

- Thread Group 
    - User Defined Variables
    - CSV Data Set Config
    - HTTP Cookie Manager
    - View Results Tree
    - HTTP Request (Sign In) 
        - Response Assertion
    - Loop Controller 
        - \[Testing something in a loop\]
    - HTTP Request (Sign Out)

Your own test may do lots of other things. You may have many thread groups with each one testing a different scenario, but ultimately all needing to sign in and sign out. So here are the nodes you need to know about to make your sign in and sign out reusable.

### Simple Controller

The simple controller is the top level of the reusable block of nodes. It isn’t going to do anything, but will act as a named placeholder that acts as the entry point for your tests.

### Module Controller

The module controller allows you to specify a module to run, which is going to be our simple controller.

### Setting It Up

So to create our new reusable block, we add a new Thread Group, and add a new Simple Controller underneath:

- Thread Group 
    - Simple Controller

![JMeter Simple Controller](/img/2015/07/jmeter001.jpg)

Don’t configure your new Thread Group to have any more than 1 of everything. Your test Thread Group is where you will specify all of this information and you don’t need it on your reusable module.

Now you can move the nodes into this placeholder:

- Thread Group 
    - Simple Controller 
        - HTTP Request (Sign In) 
            - Response Assertion

And remove it from your test:

- Thread Group 
    - User Defined Variables
    - CSV Data Set Config
    - HTTP Cookie Manager
    - View Results Tree
    - **\* Gone! \***
    - Loop Controller 
        - \[Testing something in a loop\]
    - HTTP Request (Sign Out)

Now, where the sign in HTTP Request used to be, we add a new Module Controller, and select the Module To Run – our sign in Simple Controller should appear in the list.

- Thread Group 
    - User Defined Variables
    - CSV Data Set Config
    - HTTP Cookie Manager
    - View Results Tree
    - **Module Controller (Sign In)**
    - Loop Controller 
        - \[Testing something in a loop\]
    - HTTP Request (Sign Out)

![Module Controller](/img/2015/07/jmeter002.jpg)

We can repeat this process for anything that can be reused and use a Module Controller in each tests that needs the nodes.

Here is our actual JMeter structure after doing this:

![JMeter Tree](/img/2015/07/jmeter003.jpg)
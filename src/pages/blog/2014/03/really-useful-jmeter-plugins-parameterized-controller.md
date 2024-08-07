---
title: 'Really useful JMeter plugins: Parameterized controller'
navMenu: false
pubDate: 2014-03-10T22:36:33+00:00
authors:
    - steve-fenton
categories:
    - Automation
tags:
    - JMeter
---

There are lots of really useful JMeter Plugins out there but some of them are really, really useful and if you don’t know they exist you might think some things are too difficult or even impossible.

Here are just a couple of scenarios you may find yourself in, which are included along with a bunch of others in the [“Extras with Libs” set of plugins on JMeter-Plugins](http://jmeter-plugins.org/downloads/all/).

## Calling a Module With Arguments

I’m a big fan of [using modules in JMeter](/blog/2012/06/modularising-jmeter-tests/), because I hate repeating myself. Sometimes, though, you want to call your “module” with different arguments. Assuming you’ve used a simple controller to represent a module you may have found this largely impossible.

The good news is that the extras set contains a parameterized Controller. You can add one of these for each scenario and then nest the module controller inside of the parameterized Controller. You can then reference the user defined variables you set up in your parameterized controller just like you do the ones you set up at the Test Plan level.

:::div{.inset}
:img{src="/img/2015/07/jmeter-param-controller.png" alt="Parameterized Controller" loading="lazy"}
:::

Remember, you can copy/paste the parameterized controller and change the values. This isn’t repeating yourself because all of the repetition is squirrelled away in your simple controller.

In the above example, the module controller calls the reusable simple controller. The variables used in the parameterized controller will be used by the resuable simple controller. Each parameterized controller you use can have a different value for the “Name” variable.
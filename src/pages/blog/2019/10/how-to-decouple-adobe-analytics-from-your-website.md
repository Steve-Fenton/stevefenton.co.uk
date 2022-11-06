---
layout: src/layouts/Default.astro
title: 'How to decouple Adobe Analytics from your website'
navMenu: false
pubDate: 2019-10-10T07:50:01+01:00
authors:
    - steve-fenton
categories:
    - Analytics
tags:
    - Adobe
---

Websites change. Often. If your analytics depend too much on the exact implementation details of your website your world will be full of hurt when you change it later on. This is why I prefer to use custom events to decouple Adobe Analytics from the website it is tracking.

Here’s an example. You *could* set up a rule in Adobe Tag Manager that spies on an HTML element of a certain type, with a certain attribute… but over time you end up with a large list of dependencies that is hard to describe and even harder to manage. So, instead of letting Adobe know about the website, let’s use a custom event that can be easily described. The event can fire in all cases, and be tracked when we choose.

## Add a conversion variable

We’re going to be super-generic in this example. We’re going to track “custom events” and store an event “name”. This is super-easy to understand and we can configure the whole thing from scratch. To start, we need an eVar (Conversion Variable) to store the custom event name.

In Adobe, we head to Admin > Traffic Manager > Edit Settings > Conversions > Conversion Variables to find the list of existing items. We’ll add a new one called “Custom Event Name”.

<dl><dt>Status</dt><dd>Enabled</dd><dt>Name</dt><dd>Custom Event Name</dd><dt>Type</dt><dd>Text String</dd><dt>Description</dt><dd>The name of the custom event that has fired</dd></dl>

This should be enough to get started with – there are more fields that you can explore at your leisure. We now have an eVar that will contain the name of the custom event. Adobe gives us a number too, so we have eVar1, for example.

## Add a success event

If we want to record an event (rather than just use the eVar on its own). We can head to Admin > Traffic Management > Edit Settings > Conversions > Success Events.

We’ll add a new event called “Custom Event” to use as part of our solution.

<dl><dt>Name</dt><dd>Custom Event</dd><dt>Type</dt><dd>Counter</dd><dt>Polarity</dt><dd>Up is good</dd><dt>Description</dt><dd>Captures custom events</dd></dl>

Once again, we’ll be given an event number, so Event1 or whatever number is available.

## Dynamic Tag Manager

We now have an eVar and an Event to use in a new rule in Dynamic Tag Manager. We’ll set up two rules, which each play a part in keeping different concerns separated in our analytics configuration.

1. A Data Element to store the custom event name
2. An event based rule to capture any changes to the data element

### Add data element

In Dynamic Tag Manager > Rules > Data Elements create a new data element.

<dl><dt>Name</dt><dd>CustomEventName</dd><dt>Type</dt><dd>JS Object</dd><dt>Path</dt><dd>data.customEvent.name</dd><dt>Default Value</dt><dd>Unspecified</dd><dt>Force Lowecase Value</dt><dd>Yes (we’ll eliminate casing differences)</dd><dt>Scrub whitespace and linebreaks…</dt><dd>Yes (we’ll eliminate trivial differences)</dd><dt>Rember this value for</dt><dd>Pageview</dd><dt>Default Value</dt><dd>Unspecified</dd><dt>Default Value</dt><dd>Unspecified</dd></dl>You’ll need to approve and publish all changes to rules.

### Add an event-based rule

We will now add a rule that responds to any change to the data element we just created. This is the part that turns the collected data into an actual signal to Adobe Analytics. It will record the event and the custom event name.

In Dynamic Tag Manager > Rules > Event Based Rules add a new event based rule.

<dl><dt>Name</dt><dd>Custom Event</dd></dl>Add the following conditions:

<dl><dt>Event Type</dt><dd>dataelementchanged</dd><dt>Select Data Element</dt><dd>CustomEventName</dd></dl>And add the following Adobe Analytics settings:

<dl><dt>Tracking</dt><dd>does NOT increment a page view</dd><dt>Page URL</dt><dd>%PageUrl%</dd><dt>eVars</dt><dd>eVar1=”%CustomEventName%”</dd><dt>Events</dt><dd>event1=”%CustomEventName%”</dd></dl>You may also want to set other eVars, for example if you track server time, user time, or other information with your event.

You’ll need to approve and publish all changes to rules.

## JavaScript

You have finished configuring Adobe, so now you can trigger the events from your website. Importantly, we *still* want to maintain separation, so the ideal set-up is…

1. You have JavaScript custom events being raised for “interesting interactions”
2. You document the contract formed by the custom event, so your new shiny website in the future can raise these events
3. You write an *additional* event listener to bind the event to the data element you created earlier, in a separate “Adobe Listeners” script file

The word “additional” is super-important here. The point of triggering and consuming custom events in JavaScript is that a listener can do exactly one thing. This is a great way to keep the functional listeners completely separate to the analytics listeners. You absolutely do not want your analytics code mixed into another part of your application.

Here’s a jQuery event listener for our analytics script file…

```javascript
    $(document).on('CustomEvent', function (event, eventData) {
       window.data.customEvent.name = eventData.name;

       _satellite.getVar('CustomEventName');
    });
```

There are two important parts to this script. The first is that we push the data into the data layer, you need to ensure it has been initialised, so if you’re uncertain you can make sure just before you set the value:

```javascript
window.data= window.data|| {};
window.data.customEvent = window.data.customEvent || {};
```

The second important bit is the call to `_satellite.getVar('CustomEventName');`. By retrieving the eVar by it’s name, we trigger the pull from the data layer, and the signal up to our Analytics Account. Without this line, nothing happens.

You can inspect your network tab to see the request that is sent, or use the Observepoint browser extension to see the values being transmitted.

From the address in the network tab, look for your eVar and event by the number Adobe gave them, for example `v1` for the eVar and `event1` for the event:

`...&v1=myspecialevent&events=event1%3Amyspecialevent&...`

The same information is available nicely formatted from Observepoint, which adds an additional tab to your developer tools.

## Summary

The triggering of events is separated from the listeners. These events can be documented as being required for analytics to work.

The listeners for analytics are separate from any functional listeners. The file containing these listeners *should* be re-usable even if you update the whole website (because you have an event document that describes the events that must be raised).

The configuration in Adobe remains as it is, even in the case of massive website changes. You can go home early that day. You’re welcome.
---
layout: src/layouts/Default.astro
title: How to debug Google Analytics v4 (GA4)
navMenu: false
pubDate: 2021-06-14T08:22:03+01:00
authors:
    - steve-fenton
bannerImage:
    src: /img/2021/06/google-analytics-debug-view.jpg
    alt: Debug view in Google Analytics
categories:
    - Analytics
tags:
    - 'Google Analytics'
---

Sometimes you need to see what’s going on under the hood of your analytics tracking. Google Analytics v4 (GA4) provides a simple way to debug your configuration either at the property level, or per-event.

## The DebugView screen

The DebugView can be found in your Google Analytics v4 property, at the bottom of the menu.

:::div{.inset}
:img{src="/img/2021/06/google-analytics-debug-view.jpg" alt="Google Analytics v4 Debug View"}
:::

One of the useful features is that when you choose an event, it will show you the value over time. For example, in the screenshot below the `ConsentLoaded` event shows the value for “HasIndicatedConsent” was `false` at 08:42, changed to `true` at 08:44, and has remained true for the subsequent two events.

:::div{.inset}
:img{src="/img/2021/06/event-values-over-time.jpg" alt="Event Values Over Time" loading="lazy"}
:::

## Switching on debug mode

Switch on the debug tools for the whole property by adjusting your analytics configuration tag to add `debug_mode` as shown below.

```javascript
  gtag('config', 'G-AAAAAAAAAA', {'debug_mode': true});
```

Alternatively, you can set this flag on specific events, using the same `debug_mode` flag in your event data:

```javascript
  gtag('event', 'MyCustomEvent', {
    'eventdata': 'ABC',
    'debug_mode': true
  });
```
## Correlating the session

Often, you need to pick your session out of several debug sessions that will appear on the DebugView page.

If you open up any event in DebugView, you’ll see a `ga_session_id`. You can correlate this with the `sid` being sent to the `collect` route. You can find this in the Network tab of your browser’s developer tools.
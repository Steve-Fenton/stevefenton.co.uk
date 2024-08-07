---
title: 'Disable swipe navigation in Chrome and Edge (Chromium edition)'
navMenu: false
pubDate: 2019-10-23T13:08:49+01:00
authors:
    - steve-fenton
categories:
    - Browsers
tags:
    - Chrome
    - Edge
---

There’s a feature in Google Chrome and the new Chromium version of Microsoft Edge that navigates back or forward through your browser history when you swipe. It navigates on touch interactions, and also on track-pad interaction. If you use some web-based tools that feature horizontal scrolling (such as online Kanban boards) – this becomes infuriating.

After accidentally navigating for the 100th time today, I went and found the setting that is responsible for this behaviour.

You will find the settings on the flags page, which has a slightly different address depending on whether you are in Chrome or Edge:

Chrome

```
chrome://flags/#overscroll-history-navigation
```

Edge

```
edge://flags/#overscroll-history-navigation
```

Within the settings page, you’ll find an item titled “Overscroll history navigation”, which you can disable.

:::div{.inset}
:img{src="/img/2019/10/overscroll-navigation-history.jpg" alt="Overscroll Navigation History" loading="lazy"}
:::

You might also spot other settings that can be a pain in terms of accidental activation, such as pull-to-refresh.

Change those settings and re-launch your browser for a more enjoyable life!
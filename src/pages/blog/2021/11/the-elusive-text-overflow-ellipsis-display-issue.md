---
layout: src/layouts/Default.astro
title: 'The elusive text-overflow: ellipsis display issue'
navMenu: false
pubDate: 2021-11-18T16:17:07+00:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - CSS
---

When you want to limit text on your web page, you really want to show an ellipsis to let people know you’ve truncated the display. This is especially true in cases where the cut-off decided by the browser might cause confusion, alarm, or blushing. Consider the text “Get offers on shoes”, which could be displayed as “Get off”. It would be more gentle to say “Get off…”. You get the idea.

The basic idea behind this in CSS is shown below. First, we limit the `height`, then we tell the browser not to show the content that falls outside the element with `overflow`, and finally we set the `text-overflow`

```css
    .limit {
        height: 1.5em;
        overflow: hidden;
        text-overflow: ellipsis;
    }
```

In many cases, though, this simply doesn’t do what you expect.

:img{src="/img/2021/11/no-ellipsis.jpg" alt="No ellipsis is shown" loading="lazy"}

There are two common reasons for this.

## Wrapping

In our above example, text wrapping will prevent the ellipsis from being displayed. We can solve this with `white-space` treatment to ensure our “just one line” objective is met.

```css
    .limit {
        height: 1.5em;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
```

In most cases, this will solve the missing ellipsis problem.

## Targeting the right element

If the `white-space` fix doesn’t solve the problem, the second most likely issue is that an element inside your overflow element is causing your issue. You need to make sure you are targeting the element that contains the text to ensure the ellipsis sees the light of day. With the example above, moving the class to the inner-element will resolve this.

:img{src="/img/2021/11/with-ellipsis.jpg" alt="Ellipsis is shown" loading="lazy"}
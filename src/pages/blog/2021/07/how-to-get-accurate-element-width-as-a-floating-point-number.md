---
id: 11591
layout: src/layouts/Default.astro
title: 'How to get accurate element width as a floating point number'
pubDate: 2021-07-02T18:15:51+01:00
author:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=11591'
permalink: /2021/07/how-to-get-accurate-element-width-as-a-floating-point-number/
categories:
    - Programming
tags:
    - javascript
---

This is going to be a quick one, as I’m writing this down so future me doesn’t have to set fire to several hours of debugging. I’ll explain more background after I give you the answer.

If you find you are getting the wrong answer for element sizes, you are probably using this, where `elem` is some DOM element:

```
<pre class="prettyprint lang-javascript">
    const width = elem.clientWidth; // 580
```

When you do this, an element that is `580.484` pixels wide is going come back with `580`. Accurate, but not precise.

When you need those extra digits, you need to use `getBoundingClientRect` to get precision:

```
<pre class="prettyprint lang-javascript">
const width = elem.getBoundingClientRect().width; // 580.484
```

### Why do those 0.484 pixels matter?

Some background. This is needed because I’ve seen this question asked online and the answers say “why would you need this” or “there’s something wrong if you care about that level of precision”. As you may know, I *do* care about precision.

That 0.484 pixel matters as soon as you start using it for calculations. It is common to multiple the width of an element by an index number to position things in view (you know, sliders and stuff like that).

If you multiply by 580 each time, the 0.484 starts to add up. When you get to 3x the value, you have more than 1 whole pixel of difference. This will mean the following become true:

- You may be displaying 1 pixel of something that isn’t supposed to be visible
- Intersection observers will be telling you something is visible (technically true) when only that 1 pixel is being shown

In the first case, things will look visually sloppy if you have a detectable 1px column of unexplained colour calling your attention. The second case will trip you up if you are trying to add meaningful information about what is visible to people who don’t rely on vision.

The larger a portion of a pixel you miss out on, and the larger the multiplication, the worse this problem becomes (i.e. using our 0.484 example, you have 1 pixel on item 3 and it’s over 4px on item 10. It’s going to get noticeable!

| Item | Left | Width \* n |
|---|---|---|
| 1 | 580 | 580.484 |
| 2 | 1160 | 1160.968 |
| 3 | 1740 | 1741.452 |
| 4 | 2320 | 2321.936 |
| 5 | 2900 | 2902.420 |
| 6 | 3480 | 3482.904 |
| 10 | 5800 | 5804.840 |

### Summary

If you take one thing away from this article, please let it be “never respond to a question with ‘why would you want to know?'”. Curiosity should be rewarded, not snarked.
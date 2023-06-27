---
title: 'A great general CSS3 transition rule'
navMenu: false
pubDate: 2011-06-18T18:04:58+01:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - CSS
---

As a follow up to my article on [CSS3 Multiple Transitions](/blog/2011/05/css3-transitions-and-multiple-transitions/), I thought I would supply a really simple code sample that you can use to unleash the funk of CSS3 on your website.

Remember, it doesn’t matter what browser support is for :abbr[CSS]{title="Cascading Style Sheets"} 3 transitions, because it just means that things won’t animate if the transition isn’t supported – the change will still happen, but it will be abrupt rather than smooth.

So here is the “general all round winner” of CSS3 transitions – it essentially says “just animate everything for me on this element”…

```css
-moz-transition: all 0.5s ease;
-o-transition: all 0.5s ease;
-webkit-transition: all 0.5s ease;
transition: all 0.5s ease;
```
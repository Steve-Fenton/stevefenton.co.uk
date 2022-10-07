---
layout: src/layouts/Default.astro
title: 'The CSS sibling selector'
navMenu: false
pubDate: 2017-10-19T12:08:23+01:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - CSS
    - HTML
---

There is often a bit of confusion surrounding the CSS sibling selector, or `~` as it is known to its friends.

Here is how it works.

 ```css
div ~ p {
    color: red;
}
```

This CSS translated into English says:

> If there are is a paragraph next to another paragraph inside a division, make the text red

Here is an example HTML snippet that shows where the CSS sibling selector will apply. Effectively, only to the two paragraphs that are right next to each other, and within a division:

 ```html
    <div>
        <p>Not a sibling</p>
        <div>Not a p</div>
        <p>Sibling one</p>
        <p>Sibling two</p>
    </div>
```

:::div{.inset}
:img{src="/img/2017/10/css-sibling-selector.png" alt="CSS Sibling Selector" loading="lazy"}
:::

## Doesn’t traverse up

A common misunderstanding is that you can use the sibling selector to traverse up to the parent in order to navigate to a sibling of the left-hand selector, so in the above example, people want the `div ~ p` selector to find the two paragraphs that are siblings of the inner `div` tag. This is still not possible in CSS yet, but we live in hope.

If you need to find the “Not a sibling” and “Sibling one” paragraphs as siblings of “Not a p”… you’ll need to resort to some JavaScript.
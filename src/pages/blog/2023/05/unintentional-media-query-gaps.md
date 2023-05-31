---
layout: src/layouts/Default.astro
title: 'Unintentional CSS media query gaps'
navMenu: false
pubDate: 2023-05-31
keywords: css,media,query,sub-pixel,rendering
description: The problem with CSS media query ranges and how to resolve them.
bannerImage:
    src: /img/2022/12/neatly-arranged-boxes.png
    alt: An abstract stack of neatly arranged boxes.
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - CSS
---

Here's an interesting little issue I came across with media querie ranges. I don't normally use ranges for media queries, so I've not encountered this specific problem before.

The most common media query issue I find myself fixing is where there are overlaps or gaps in the queries, so the page fights itself for two or three pixels around the breakpoint. This is often caused by the problem of CSS not yet supporting variables in media queries - so it's possible for someone to type a bad number if you don't have a pre-processor.

Todays' problem came from a utitlity that allows art-direction use cases on content, by letting people add alternate content for different screen sizes. I've created a simpler version of it for demonstration purposes.

## Showing content for specific sizes

The following HTML has three versions of the content, each one is supposed to be shown for a particular screen size.

To do this, you set all the sizes you don't want the content to be shown with a class.

```html
<div class="hide-medium hide-large">
<p>Small</p>
</div>

<div class="hide-small hide-large">
<p>Medium</p>
</div>

<div class="hide-small hide-medium">
<p>Large</p>
</div>
```

The CSS uses the class names to hide the content where they aren't appropriate to the screen size, using media queries.

```css
body {
  margin: 0;
  text-align: center;
  font-family: sans-serif;
  font-size: 18px;
}

/*
Breakpoint 1: 0-200px
Breakpoint 2: 200px-500px
Breakpoint 2: 500px and up
*/

@media (max-width: 199px) {
  .hide-small {
    display: none;
  }
}

@media (min-width: 200px) and (max-width: 499px) {
  .hide-medium {
    display: none;
  }
}

@media (min-width: 500px) {
  .hide-large {
    display: none;
  }
}
```

It looks like everything is covered:

|Name    | Start | End   |
|--------|-------|-------|
| Small  | 0     | 199px |
| Medium | 200px | 499px |
| Large  | 500px | +     |

A casual test confirms this all works. A more rigorous test finds there are issues. In particular, this issue at 199px.

:::figure
:img{ src="/img/2023/05/css-media-query-issue.png" loading="lazy" }
::figcaption[Everything is visible at 199px]
:::

## Pixels aren't always integers

The problem we have here is that we don't really have 199px of width, we have 199.5px or some other non-integer value. This is all part of the [pixel identity crisis](https://alistapart.com/article/a-pixel-identity-crisis/), where nobody knows what a pixel is anymore. Importantly, whatever a pixel is, it might not be an integer.

When you look back at the table, a value of 199.5 is above the "small" size, and below the "medium" size. That means none of the existing rules apply.

To solve this, you could fight the numbers... let's just add some nines!

```css
body {
  margin: 0;
  text-align: center;
  font-family: sans-serif;
  font-size: 18px;
}

/*
Breakpoint 1: 0-200px
Breakpoint 2: 200px-500px
Breakpoint 2: 500px and up
*/

@media (max-width: 199.9px) {
  .hide-small {
    display: none;
  }
}

@media (min-width: 200px) and (max-width: 499.9px) {
  .hide-medium {
    display: none;
  }
}

@media (min-width: 500px) {
  .hide-large {
    display: none;
  }
}
```

With 199.9 we beat rounding related to pixel density and everything now works. Maybe there is some future point where there are _so many pixels_ even this needs to change. I guess we add more nines (don't add more nines now as 199.99 creates the opposite problem, where nothing is shown at 200px).

## A less head-scratching alternative

In [Media Queries Level 4](https://www.w3.org/TR/mediaqueries-4/#mq-range-context), the specification gives us a better way to solve this problem.

You can use the syntax: `(num) <= width < (num)` to create ranges that don't suffer from rounding issues.

The key point is to use `<=` on the left, and `<` on the right, to ensure there is no overlap. Otherwise two contents will show at the same time.

This is more precise than the 1px gaps we left in the original problem CSS and less "hand wavey" than adding nines.

Here's the working code in action.

```css
body {
  margin: 0;
  text-align: center;
  font-family: sans-serif;
  font-size: 18px;
}

/*
Breakpoint 1: 0-200px
Breakpoint 2: 200px-500px
Breakpoint 2: 500px and up
*/

@media (width < 200px) {
  .hide-small {
    display: none;
  }
}

@media (200px <= width < 500px) {
  .hide-medium {
    display: none;
  }
}

@media (500px <= width) {
  .hide-large {
    display: none;
  }
}
```

Now the browser can handle the numbers, and you can get to the pub.

## Conclusion

Playing with the numbers confirmed we had non-integer gaps in our range, because _pixels_.

This can be fixed using the Media Queries Level 4 syntax, which is [supported in all the modern browsers](https://caniuse.com/css-media-range-syntax).
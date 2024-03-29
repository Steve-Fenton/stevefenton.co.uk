---
title: 'HTML5 forms number input elements'
navMenu: false
pubDate: 2011-05-23T19:08:55+01:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - HTML
---

I have been looking in detail at HTML 5 forms and in particular at some of the new attributes, special input types and [date-related input types](/blog/2011/05/html-5-forms-date-input-elements/). In this post I’m going to look at some numeric input types in HTML 5.

## Number

The number input type is designed to accept numeric input and provides an uppy-downer style button set for adjusting the value. Just like the [date inputs](/blog/2011/05/html-5-forms-date-input-elements/), you can set min and max attributes and you can also set a “step” attribute.

```html
<input type="number" name="number" min="10" max="60" step="10">
```

### Min

The lowest allowed number.

### Max

The highest allowed number.

### Step

The gap between increments, so if I hit the “up” button, it will step-up by this amount and if I hit the “down” button, it will step-down by this amount.

In the above code sample, each time I press “up” the input will step from 10 to 20, then 20 to 30 and so on until it reaches the max value.

## Range

The range input type is similar to the number input type, except the user interface is a slider rather than a text box. Without the “step” attribute, the bar can be moved smoothly into any position, with the “step” attribute, the bar will jump between the allowed values.

With a range input, you should specify a value that will be equivalent to 100% of the width of the range (i.e. the value the input will be if the bar is “all the way to the right”).

```html
<input type="range" name="range" step="10" value="100">
```

## Next Episode!

Well, I’ve covered lots of the new HTML 5 forms stuff, but in next article I will give [a handy summary](/blog/2011/05/html-5-forms-summary/) and talk a bit about browser support and backwards compatibility.
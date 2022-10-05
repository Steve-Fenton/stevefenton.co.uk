---
layout: src/layouts/Default.astro
title: 'HTML5 forms date input elements'
navMenu: false
pubDate: 2011-05-23T19:11:45+01:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - HTML
---

The third section of my over-excited journey into HTML5 forms deals specifically with date-related input elements. You may have already heard that there is a date-picker input type, but there is more on offer than just a boring old date-picker. We have lots of different date inputs and we also have some attributes to help make them behave exactly as we want.

## Date

The date input type does away with JavaScript date pickers (damn, I’ve written some of those!) Even better, it does away with validating that a date is within a range as you can optionally specify a min and max date (or both!)

So here is an example of a date input with both min and max dates set. The browser will display a date picker and it will also prevent dates outside of our range from being selected.

```html
<input type="date" name="date" min="2011-01-01" max="2011-05-31">
```

### Min

Dates before the “min” date cannot be selected.

### Max

Dates after the “max” date cannot be selected.

## Week

Just as you thought it couldn’t get any more exciting, you discover that there is another type of date input. The week input type lets the user select a week-of-the-year, for example “2011 Week 52”. Just like the date input type, the browser will show a date-picker and you can set a min and max date.

```html
<input type="week" name="week">
```

## Month

Another variation on the date input type, the month selector allows a user to select a month, for example “2011-05”. All the same rules apply to this one too.

```html
<input type="month" name="month">
```

## Time and Datetime

Follow the same pattern for type=”time” and type=”datetime”. The browser will show a visual picker and you can specify min and max values… great stuff!

## Next Episode!

In my next episode on HTML5 forms I’m going to cover [number related inputs](/blog/2011/05/html-5-forms-number-input-elements/).
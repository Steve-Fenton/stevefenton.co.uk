---
id: 11446
layout: src/layouts/Default.astro
title: 'Calculating Coronavirus timings with Excel'
pubDate: 2021-02-22T20:00:09+00:00
author:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=11446'
permalink: /2021/02/calculating-coronavirus-timings-with-excel/
categories:
    - Opinion
tags:
    - data
---

Following on from my [article on working with public coronavirus data](https://www.stevefenton.co.uk/2020/09/working-with-public-coronavirus-data/) where I calculated the original peak in the UK to have been an estimated 50,000 cases per day (not the recorded 6,000 cases per day)… the most common follow up questions (aside from predictions on what will happen next) are about timings. What is the typical roadmap for a sufferer from confirmed case, to hospitalisation, to death.

The simple answer to this, thanks to some simple Excel formulas and VLOOKUPs is:

Admission to hospital is around 8 days after a positive test result, but only for around 8.5% of confirmed cases.

Death occurs around 15 days after a positive test result, but only for around 2.1% of confirmed cases.

We can visualise this by offsetting the dates on the relevant datasets, so we can see the shapes of the line graphs lining up, as shown below.

[![Coronavirus Offsets](https://www.stevefenton.co.uk/wp-content/uploads/2021/02/covid-offsets-972x1024.jpg)](https://www.stevefenton.co.uk/2021/02/calculating-coronavirus-timings-with-excel/covid-offsets/)

All of the above analysis is based on data since 1st September 2020 (and 8 or 15 days before for the offset data).

### Excel Tricks Used

All of the above was achieved with two simple Excel tricks.

The first is just the ability to minus a simple number off a date, which automatically works on dates. If I select a date cell, and subtract a number cell, that number of days is removed. Nothing too tricky here.

Cell A3 contains the date for the number of cases, cell B1 contains the number of days I want to remove. Using the `$` just means when I copy this formula down the column, the “A3” will automatically update to A4, A5, A6, and so on – but the $B$1 remains “B1”.

```
<pre class="prettyprint">
=A3-$B$1
```

The second is the awesome VLOOKUP, which allows me to take this calculated date and find the number of hospital admissions, or the number of deaths, by looking up the value from the offset date. I’ve organised the data I’ve downloaded into tabs named “cases”, “admissions”, and “deaths”.

So, for example I’m looking for admissions using:

```
<pre class="prettyprint">
=VLOOKUP(B3,admissions!A:B,2,FALSE)
```

In other words, I’m looking up the date in “B3” (the result of my date calculation), in the data found in the first two columns of the admissions sheet “admissions!A:B”. Column A is the date and Column B is the number of admissions, so I’m asking for column 2 (the second column), and I’m requesting no range lookup by saying “FALSE” in the range lookup flag.

With a chart for cases, admissions, and deaths based on this calculated offset date, I’m able to change the value of B1 (the number of days to offset) and immediately see whether it brings the charts into alignment. A few tracer-guesses either side soon found the numbers used above.
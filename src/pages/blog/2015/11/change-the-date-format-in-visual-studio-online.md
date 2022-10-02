---
id: 1510
title: 'Change the date format in Visual Studio Team Services'
pubDate: '2015-11-18T06:00:04+00:00'
author: 'Steve Fenton'
layout: post
guid: 'https://www.stevefenton.co.uk/?p=1510'
permalink: /2015/11/change-the-date-format-in-visual-studio-online/
categories:
    - 'Visual Studio'
---

Visual Studio Team Services is rather good, but if you are using it outside of the USA you’ll be fighting the date format, which displays in the month-day-year format. The recommended fix for this used to be to set your preferences to pick up the date format from the browser, but for some reason this no longer seems to work.

The current fix is as follows:

![Visual Studio Online Date Format](https://www.stevefenton.co.uk/wp-content/uploads/2015/11/visual-studio-online-date-format.png)

A) Go to your name in the top-right of the screen, then select “My Profile” -&gt; “Preferences”

B) From the Language list, select an option that isn’t “Browser” (otherwise the date and time pattern are not editable).

C) Select the date pattern that you prefer

This will update the dates displayed in charts and on cards and reduce confusion.
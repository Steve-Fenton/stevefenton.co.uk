---
title: 'Hide Trello columns'
navMenu: false
pubDate: 2015-08-07T07:30:57+01:00
authors:
    - steve-fenton
categories:
    - Process
tags:
    - JavaScript
    - jQuery
    - Trello
---

If you have seen the average Trello board that has evolved over any length of time, you will have noticed they can suffer a little from column explosion.

Fear not. You can use this short script to get rid of the boring columns with a single click.

All you need to do is adjust the list of boring columns.

```javascript
(function () {
    var boringColumns = ['New Issue', 'Ice Box', 'For Review', 'For Specification'];
    var lists = $('.list-wrapper');
    $.each(lists, function (ix, list) {
        var text = $('h2.list-header-name', list).text();
        if ($.inArray(text, boringColumns) > -1) {
            list.style.display = 'none';
        }
    });
}());
```

Once you are done, jam it into one unholy line of code, with “javascript:” at the start and use it as the URL for a bookmark in your browser.

```javascript
javascript:(function() { var boringColumns = [['New Issue', 'Ice Box', 'For Review', 'For Specification']; var lists = $('.list-wrapper'); $.each(lists, function(ix, list) { var text = $('h2.list-header-name', list).text(); if ($.inArray(text, boringColumns) > -1) { list.style.display = 'none'; } }); }());
```

The script uses jQuery… because that is what is available on the page.
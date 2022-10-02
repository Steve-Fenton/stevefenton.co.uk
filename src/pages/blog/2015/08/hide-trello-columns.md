---
layout: src/layouts/Default.astro
navMenu: false
title: 'Hide Trello columns'
pubDate: 2015-08-07T07:30:57+01:00
author:
    - steve-fenton
medium_post:
    - 'O:11:"Medium_Post":11:{s:16:"author_image_url";s:75:"https://cdn-images-1.medium.com/fit/c/400/400/1*eXkhfEuF41g5W_xnc_ydLA.jpeg";s:10:"author_url";s:38:"https://medium.com/@steve.fenton.co.uk";s:11:"byline_name";N;s:12:"byline_email";N;s:10:"cross_link";s:3:"yes";s:2:"id";s:12:"1e11e678a302";s:21:"follower_notification";s:3:"yes";s:7:"license";s:19:"all-rights-reserved";s:14:"publication_id";s:2:"-1";s:6:"status";s:5:"draft";s:3:"url";s:51:"https://medium.com/@steve.fenton.co.uk/1e11e678a302";}'
categories:
    - Process
tags:
    - javascript
    - jquery
    - trello
---

If you have seen the average Trello board that has evolved over any length of time, you will have noticed they can suffer a little from column explosion.

Fear not. You can use this short script to get rid of the boring columns with a single click.

All you need to do is adjust the list of boring columns.

```
<pre class="prettyprint lang-js">(function () {
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

```
<pre class="prettyprint lang-js">javascript:(function() { var boringColumns = [['New Issue', 'Ice Box', 'For Review', 'For Specification']; var lists = $('.list-wrapper'); $.each(lists, function(ix, list) { var text = $('h2.list-header-name', list).text(); if ($.inArray(text, boringColumns) > -1) { list.style.display = 'none'; } }); }());
```

The script uses jQuery… because that is what is available on the page.
---
layout: src/layouts/Default.astro
navMenu: false
title: 'Set a minimum font size'
pubDate: 2020-02-14T16:04:22+00:00
author:
    - steve-fenton
categories:
    - Programming
tags:
    - javascript
    - jquery
---

This is just a little script I needed to use to increase text size conditionally. It only increases text below a minimum size and leaves everything else. Please also see a more recent post on [CSS Clamp](https://www.stevefenton.co.uk/2020/04/css-clamp-the-goldilocks-of-css-math-functions/)!

```
<pre class="prettyprint lang-javascript">
(function () {
    var minFontSize = function () {
        $(".content-zone *").each(function () {
            var $this = $(this);
            if (parseInt($this.css("fontSize"), 10) < 16) {
                $this.css({ "font-size": "16px" });
            }
        });
    };

    $(document).ready(minFontSize);
    $(document).ajaxComplete(minFontSize);
})();
```
Before Image

![Text Size Before](/img/2020/02/text-size-before.jpg)

After Image

![Text Size After](/img/2020/02/text-size-after.jpg)

You can see that the span element is the same size before and after, but all the tiny text has been increased to the minimum size.
---
layout: src/layouts/Default.astro
title: Set a minimum font size
navMenu: false
pubDate: 2020-02-14T16:04:22+00:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - JavaScript
    - jQuery
---

This is just a little script I needed to use to increase text size conditionally. It only increases text below a minimum size and leaves everything else. Please also see a more recent post on [CSS Clamp](/blog/2020/04/css-clamp-the-goldilocks-of-css-math-functions/)!

```javascript
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

:::div{.inset}
:img{src="/img/2020/02/text-size-before.jpg" alt="Text Size Before" loading="lazy"}
:::

After Image

:::div{.inset}
:img{src="/img/2020/02/text-size-after.jpg" alt="Text Size After" loading="lazy"}
:::

You can see that the span element is the same size before and after, but all the tiny text has been increased to the minimum size.
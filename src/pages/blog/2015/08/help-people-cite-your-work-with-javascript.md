---
layout: src/layouts/Default.astro
navMenu: false
title: 'Help people cite your work with JavaScript'
pubDate: 2015-08-12T07:30:26+01:00
author:
    - steve-fenton
categories:
    - Programming
tags:
    - javascript
---

This is a little script that helps people to cite your work by placing the URL on the clipboard along with the text they are <del>stealing</del> referencing. It works by cloning the selection into a hidden element just before the copy-to-clipboard, and then reverting the selection just after. The example below is for modern browsers so if you want to support older browsers you would need to polyfill the addEventListener call as Internet Explorers passim used attachEvent.

The end result is the selected content, followed by “- Source: http://www.example.com/etc/here”.

```
<pre class="prettyprint lang-js">(function () {
    function createSelectionCloneElement() {
        var container = document.createElement('div');
        container.innerHTML = "";
        container.style.position = "absolute";
        container.style.top = "-2000px";
        container.style.left = "-2000px";
        container.style.width = "1000px";
        container.style.overflow = "auto";
        return container;
    }

    if (!document.addEventListener) {
        // You could polyfill, or use attachEvent etc...
        return;
    }

    document.addEventListener('copy', function () {
        try {
            var selection = document.getSelection();

            var clone = selection.getRangeAt(0).cloneContents();

            // Container for the selection
            var alternateSelection = createSelectionCloneElement();
            document.body.appendChild(alternateSelection);

            alternateSelection.appendChild(clone);
            alternateSelection.innerHTML += " - Source: " + document.location.href;

            var newRange = document.createRange();
            newRange.selectNodeContents(alternateSelection);

            var rangeToRevertTo = selection.getRangeAt(0);

            // Switch out selection for the amended one - this is what will be copied
            selection.removeAllRanges();
            selection.addRange(newRange);

            setTimeout(function () {
                // Revert to the original selection
                selection.removeAllRanges();
                selection.addRange(rangeToRevertTo)
            }, 0);
        } catch (e) {}
    });
}());
```
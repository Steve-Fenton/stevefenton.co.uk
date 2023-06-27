---
title: 'Get elements grouped by a CSS value'
navMenu: false
pubDate: 2017-02-28T08:44:22+00:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - CSS
    - JavaScript
---

The following script allows you to group all elements on a web page by a particular CSS value. So for example, if you specify ‘fontFamily’, you’ll get a list of font families used on the website, and a list of all elements using each one.

You can specify other attributes if you would like to get a list of elements grouped by ‘fontSize’, ‘color’, or even ‘paddingTop’.

This output is from a query using ‘fontWeight’ – the script has found both ‘100’ and ‘400’ in use in calculated styles:

```
08:42:32.443 100 : #LI(16),#myElem3,#BUTTON(18),#SPAN(20),#myElem4,#LI(22),#BUTTON(24)...
08:42:32.445 400 : #myElem1,#myElem2,#SPAN(5),#SPAN(244),#SPAN(249),#SPAN(255),#sm-14882713376453093-73,#SPAN(262),#SPAN(263)...
```

The example below crushes the dictionary down to display in the console, but you can use the dictionary in full, the key is the CSS attribute value – with each element appearing as an item in the array against the key.

```javascript
function elementsGroupedBy(attribute){
    if (typeof getComputedStyle == 'undefined') {
        getComputedStyle = function(elem) {
            return elem.currentStyle;
        }
    }

    var results = {};
    var nodes = document.body.getElementsByTagName('*');

    for (var i = 0; i < nodes.length; i++){
        var elem = nodes[i];

        if (elem.style) {
            var val = elem.style[attribute] || getComputedStyle(elem, '')[attribute];

            if (val) {
                if (!results[val]) {
                    results[val] = [];
                }

                results[val].push('#' + (elem.id || elem.nodeName + '('+ i +')'));
            }
        }
    }

    return results;
}

var elementsByFontFamily = elementsGroupedBy('fontFamily');

for (var key in elementsByFontFamily) {
    console.info(key + ' : ' + elementsByFontFamily[key].join(','));
}
```
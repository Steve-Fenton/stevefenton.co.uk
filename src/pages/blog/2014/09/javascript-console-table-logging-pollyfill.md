---
id: 295
layout: src/layouts/Default.astro
title: 'JavaScript console table logging polyfill'
pubDate: 2014-09-01T21:13:44+01:00
author:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=295'
permalink: /2014/09/javascript-console-table-logging-pollyfill/
interface_sidebarlayout:
    - default
categories:
    - Browsers
    - Programming
tags:
    - javascript
---

There is a rather neat addition to the console in Chrome that lets you log an array of objects using the new console.table method. You can simply pass some data, or you can pass a list of columns you are interested in – like this:

```
<pre class="prettyprint lang-javascript">
var items = [
    { name: 'Martin', occupation: 'Street Fighter' },
    { name: 'Divya', occupation: 'Destroyer' },
    { name: 'Dan', occupation: 'Fashionista' }
    ];

// Just log the array
console.table(items);

// Or, you can specify columns (for example to reduce the table size)
console.table(items, ['name', 'occupation', 'title']);
```

Of course, this doesn’t work anywhere else – but you can use this hastily written pollyfill to get support everywhere else… the table isn’t as pretty, only handles specifically arrays of objects and you can’t sort it in the console, but it works while you’re waiting for browsers to decide it is a great idea.

![Console Table](https://www.stevefenton.co.uk/wp-content/uploads/2015/07/console-table.png)

```
<pre class="prettyprint lang-javascript">
(function() {
    if (!console.table) {
        function getColumnHeadings(data, cols) {
            if (!cols) {
                cols = [];
                for (var prop in data[0]) {
                    cols.push(prop);
                }
            }
            return cols;
        }
       
        function getColumnWidths(data, columnHeadings) {
            var dataMaxLengths = {};
            for (var i = 0; i < data.length; i++) {
                for (var j = 0; j < columnHeadings.length; j++) {
                    var prop = columnHeadings[j];
                    var headingLength = prop.length;
                    var currentLength = dataMaxLengths[prop] ? dataMaxLengths[prop] : 0;
                    var newLength = data[i][prop] ? data[i][prop].length : 0;
                    dataMaxLengths[prop] = Math.max(headingLength, currentLength, newLength);
                }
            }
            return dataMaxLengths;
        }
       
        function padString(width, string, padding) {
            return (width <= string.length) ? string : padString(width, string + padding, padding)
        }
       
        function consoleTable(data, cols) {
            var columnHeadings = getColumnHeadings(data, cols);
            var columnWidths = getColumnWidths(data, columnHeadings);
           
            for (var i = 0; i < data.length; i++) {
                var output = '';
                var header = '';
                for (var j = 0; j < columnHeadings.length; j++) {
                    var prop = columnHeadings[j];
                    var padLength = columnWidths[prop];
                    if (i === 0) {
                        header += '|- ' + padString(padLength, prop, ' ') + ' -';
                    }
                    output += '|- ' + padString(padLength, (data[i][prop] ? data[i][prop] : ''), ' ') + ' -';
                }
               
                if (i === 0) {
                    console.log('%c' + header + '|', 'color: black; font-style: italic');
                }
               
                console.log('%c' + output + '|', 'color: blue; font-style: italic');
            }
        }
       
        console.table = consoleTable;
    }
}());
```
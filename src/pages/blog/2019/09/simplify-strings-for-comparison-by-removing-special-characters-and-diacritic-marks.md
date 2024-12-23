---
title: 'Simplify strings for comparison by removing special characters and diacritic marks'
navMenu: false
pubDate: 2019-09-13T16:30:49+01:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - JavaScript
---

This is the JavaScript edition, but I also have a [C# method to remove special characters diacritic marks](/blog/2020/03/removing-special-characters-and-diacritic-marks-in-c/). I was working on a search system that needed to simplify the strings for comparison. It needed to compare the text regardless of special characters (diacritic marks) or casing. The following function breaks the special characters into their component parts, before removing the “special” parts and lower-casing the whole thing.

```javascript
function normalise(term) {
    // Simplifies diacritic characters, accents, and casing
    term.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
 }
```

You can see the impact using this sample from a couple of languages:

```javascript
const strings = ['example', 'façade', 'résumé', 'černá', 'piñata'];

for (let s of strings) {
    const simple = s.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    console.log(simple);
}
```

The output is:

1. example
2. facade
3. resume
4. cerna
5. pinata
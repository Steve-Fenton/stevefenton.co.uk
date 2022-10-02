---
layout: src/layouts/Default.astro
navMenu: false
title: 'Knowledge Hardwork Attitide Coincidence or Not'
pubDate: 2015-12-05T06:00:04+00:00
authors:
    - steve-fenton
categories:
    - Opinion
tags:
    - motivation
    - typescript
---

You have almost certainly seen this often-regurgitated “motivational” quote. It goes like this (and is often pictured on an erasable board to make it look more like it has gushed forth from a beautiful mind)…

- - - - - -

### Coincidence or Not

<div>If</div><div>A,B,C,D,E,F,G,­H,I,J,K,L,M,N,­O,P,Q,R,S,T,U,­V,W,X,Y,Z</div><div>Equals</div><div>1,2,3,4,5,6,7,­8,9,10,11,12,13,14,­15,16,17,18,19,20,21,­22,23,24,25,26</div><div>Then</div><div>K – N – O – W – L – E – D – G – E</div><div>11 + 14 + 15 + 23 + 12 + 5 + 4 + 7 + 5 = 96%</div><div>H – A – R – D – W – O – R – K</div><div>8 + 1 + 18 + 4 + 23 + 15 + 18 + 11 = 98%</div><div>Both are important, but both fall short of 100%</div><div>BUT</div><div>A – T – T – I – T – U – D – E</div><div>1 + 20 + 20 + 9 + 20 + 21 + 4 + 5 = 100%</div>- - - - - -

### So, is it coincidence, or not?

The answer to the original question (“Coincidence or Not?”) is, of course, neither.

The real question is, where did the % come from here? The value of all the letters of the alphabet added together is 351. So, a word that adds up to 100 is *not* 100% is it? This means…

“Knowledge” represents 27.35%, not 96%, “Hardwork” is 27.92%, and “Attitude” is 28.49%.

Here’s a program that you can use to find the values quickly, with additional contributions from [Morteza Rahmani](https://www.linkedin.com/in/ppx1400/):

```
var map = 'abcdefghijklmnopqrstuvwxyz';

function getValue(word) {
    word = word.toLowerCase();
    let total = 0;
    
    for (let i = 0, len = word.length; i < len; i++) {
        var char = word[i];
        if (map.indexOf(char) + 1) {
            total += map.indexOf(char) + 1;
        }
    }
    
    return total;
}

// So what is 100%?
console.log(getValue(map));

function getValueAsPercent(word) {
    var a = getValue(map);
    var b = getValue(word);
    return word + ' (' + b + ') ' + Math.round((b / a) * 100) + '%';
}

// None of these are...
console.log(getValueAsPercent('Knowledge'));
console.log(getValueAsPercent('Hardwork'));
console.log(getValueAsPercent('Attitude'));
```
If you want a phrase that gives you 100% (although I’m at a loss to understand why you would need one), you need look no further than: “Dull Motivational Quotes Suck”.
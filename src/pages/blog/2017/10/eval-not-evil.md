---
layout: src/layouts/Default.astro
title: 'Eval is not evil'
navMenu: false
pubDate: 2017-10-07T05:00:39+01:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - JavaScript
    - TypeScript
---

We’ve all read JavaScript: The Good Parts, and there is plenty of wisdom in Douglas Crockford’s landmark work. His reminder that eval is evil has echoed through the JavaScript community and saved many people from a total mess.

:img{src="/img/2017/10/Duck_of_Vaucanson.jpg" alt="Duck of Vaucanson" loading="lazy"}

However, as programmers we must remain thinking individuals who question received wisdom. You must resist inappropriate use of reductionism; the kind that tempts you to compress a chapter of intelligent monologue into a bullet-point rule. This is the kind of problem we had more than 15 years ago when we realised that “you shouldn’t use tables for layout”… which gets repeated back to us by novices as “you shouldn’t use tables!”.

In general `eval` is *A Bad Thing*™, but actually the feature itself isn’t evil – it is simply a signpost for a design error.

## Eval as a signpost

Let’s look at a common case, shown below.

```javascript
function myFunction1() {
     alert('1');
}

function myFunction2() {
    alert('2');
}

const functionQueue = [
    'myFunction1',
    'myFunction2'
];

for (let i = 0; i < functionQueue.length; i++) {
    const func = functionQueue[i] + '()';
    eval(func);
}
```

Right at the end there is the `eval` – but replacing that line with something like `window[functionQueue[i]]();` does nothing but disguise the real issue, which is design.

The real problem here is the `functionQueue`, which contains strings not functions.

## Functions as first-class citizens

One of the great things about JavaScript is that functions are first-class citizens. This means you can avoid the magic-string function names altogether in the example code we have so far… which eliminates your eval/window-magic-string crime.

```javascript
function myFunction1() {
     alert('1');
}

function myFunction2() {
    alert('2');
}

const functionQueue = [
    myFunction1,
    myFunction2
];

for (let i = 0; i < functionQueue.length; i++) {
    functionQueue[i]();
}
```

If we use our text editor’s tools to rename these functions (they do have terrible names currently) – our code will still work. Refactoring tools can change the function name in the function declaration and also in the list of functions. This is the real problem with the first solution, not the `eval`… the `eval` was just telling us about the problem. So maybe eval is just trying to help you, Roland.

## The Function Name Strings Come From Elsewhere

Now there may well be cases where the function names are coming from somewhere external – so they are going to be strings and there is nothing you can do about it. Well, someone invented a pattern for that. You see, you need to decouple those strings from the function names because the function names may change and your external source won’t keep up with that. So here is your simple factory method for decoupling your code from this external source of strings…

```javascript
// Pretend these come from the database...
const functionQueue = [
    'myFunction1',
    'myFunction2'
];

// And your code starts here
function myFunction1() {
     alert('1');
}

function myFunction2() {
    alert('2');
}

function functionFactory(functionName) {
    const functionMap = {
        'myFunction1': myFunction1,
        'myFunction2': myFunction2
    };

    return functionMap[functionName];
}

for (let i = 0; i < functionQueue.length; i++) {
     functionFactory(functionQueue[i])();
}
```

If you rename `myFunction1`, the map will be updated, but the external key will not be affected. The external source and the internal code are decoupled. We now also have a function that has the single responsibility of mapping the “public name” to an actual function, which means we have a good place to hand the code to handle the exceptional case of not having a function that maps to an unknown public key. In all of the above examples, that case simply results in a very quiet popping sound.

## Summary

When you find a supposedly “evil language feature” in your code, you don’t solve the problem by swapping the feature that Douglas Crockford hates for one he didn’t specifically mention (hey, maybe he also mentioned that your replacement feature is shoddy, but not with such a pithy quote). Look for the design that eliminates the real underlying problem.

<small>Duck of Vaucanson by Unknown, Public Domain, https://commons.wikimedia.org/w/index.php?curid=1493624</small>
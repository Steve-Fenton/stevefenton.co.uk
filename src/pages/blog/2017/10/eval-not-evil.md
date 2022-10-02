---
layout: src/layouts/Default.astro
navMenu: false
title: 'Eval is not evil'
pubDate: 2017-10-07T05:00:39+01:00
author:
    - steve-fenton
medium_post:
    - 'O:11:"Medium_Post":11:{s:16:"author_image_url";s:75:"https://cdn-images-1.medium.com/fit/c/400/400/1*eXkhfEuF41g5W_xnc_ydLA.jpeg";s:10:"author_url";s:38:"https://medium.com/@steve.fenton.co.uk";s:11:"byline_name";N;s:12:"byline_email";N;s:10:"cross_link";s:3:"yes";s:2:"id";s:12:"8ad80dc8be55";s:21:"follower_notification";s:3:"yes";s:7:"license";s:19:"all-rights-reserved";s:14:"publication_id";s:2:"-1";s:6:"status";s:5:"draft";s:3:"url";s:51:"https://medium.com/@steve.fenton.co.uk/8ad80dc8be55";}'
categories:
    - Programming
tags:
    - javascript
    - typescript
---

![Duck of Vaucanson](https://www.stevefenton.co.uk/wp-content/uploads/2017/10/Duck_of_Vaucanson.jpg)We’ve all read JavaScript: The Good Parts, and there is plenty of wisdom in Douglas Crockford’s landmark work. His reminder that eval is evil has echoed through the JavaScript community and saved many people from a total mess.

However, as programmers we must remain thinking individuals who question received wisdom. You must resist inappropriate use of reductionism; the kind that tempts you to compress a chapter of intelligent monologue into a bullet-point rule. This is the kind of problem we had more than 15 years ago when we realised that “you shouldn’t use tables for layout”… which gets repeated back to us by novices as “you shouldn’t use tables!”.

In general `eval` is *A Bad Thing*™, but actually the feature itself isn’t evil – it is simply a signpost for a design error.

### Eval as a signpost

Let’s look at a common case, shown below.

```
<pre class="prettyprint lang-javascript">function myFunction1() {
     alert('1');
}

function myFunction2() {
    alert('2');
}

const functionQueue = [
    'myFunction1',
    'myFunction2'
];

for (let i = 0; i &lt; functionQueue.length; i++) {
    const func = functionQueue[i] + '()';
    eval(func);
}
```

Right at the end there is the `eval` – but replacing that line with something like `window[functionQueue[i]]();` does nothing but disguise the real issue, which is design.

The real problem here is the `functionQueue`, which contains strings not functions.

### Functions as first-class citizens

One of the great things about JavaScript is that functions are first-class citizens. This means you can avoid the magic-string function names altogether in the example code we have so far… which eliminates your eval/window-magic-string crime.

```
<pre class="prettyprint lang-javascript">function myFunction1() {
     alert('1');
}

function myFunction2() {
    alert('2');
}

const functionQueue = [
    myFunction1,
    myFunction2
];

for (let i = 0; i &lt; functionQueue.length; i++) {
    functionQueue[i]();
}
```

If we use our text editor’s tools to rename these functions (they do have terrible names currently) – our code will still work. Refactoring tools can change the function name in the function declaration and also in the list of functions. This is the real problem with the first solution, not the `eval`… the `eval` was just telling us about the problem. So maybe eval is just trying to help you, Roland.

### The Function Name Strings Come From Elsewhere

Now there may well be cases where the function names are coming from somewhere external – so they are going to be strings and there is nothing you can do about it. Well, someone invented a pattern for that. You see, you need to decouple those strings from the function names because the function names may change and your external source won’t keep up with that. So here is your simple factory method for decoupling your code from this external source of strings…

```
<pre class="prettyprint lang-javascript">// Pretend this is external to your code!
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

for (let i = 0; i &lt; functionQueue.length; i++) {
     functionFactory(functionQueue[i])();
}
```

If you rename `myFunction1`, the map will be updated, but the external key will not be affected. The external source and the internal code are decoupled. We now also have a function that has the single responsibility of mapping the “public name” to an actual function, which means we have a good place to hand the code to handle the exceptional case of not having a function that maps to an unknown public key. In all of the above examples, that case simply results in a very quiet popping sound.

### Summary

When you find a supposedly “evil language feature” in your code, you don’t solve the problem by swapping the feature that Douglas Crockford hates for one he didn’t specifically mention (hey, maybe he also mentioned that your replacement feature is shoddy, but not with such a pithy quote). Look for the design that eliminates the real underlying problem.

<small>Duck of Vaucanson by Unknown, Public Domain, https://commons.wikimedia.org/w/index.php?curid=1493624</small>
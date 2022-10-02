---
id: 2774
layout: src/layouts/Default.astro
title: 'The death of the immediately invoked function expression'
pubDate: 2017-11-04T15:29:23+00:00
author:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=2774'
permalink: /2017/11/death-immediately-invoked-function-expression/
categories:
    - Programming
tags:
    - javascript
    - typescript
---

I was wondering whether we could be about to witness the death of the immediately invoked function expression (IIFE)? You know, we have been using IIFEs for a long time now to provide some scope for our stuff, because we don’t want to pollute the global scope, but there are two features that are now “common JavaScript” that are going to probably kill off this pattern.

### The immediately invoked function expression (IIFE)

So your common and garden IIFE works like this simple example, which is (incidentally) how the TypeScript compiler generated classes when targeting older versions of the ECMAScript specification. The example variable is only accessible within the function, so we don’t end up polluting the global scope, which is great news for window.Fish!

```
<pre class="prettyprint lang-javascript">
(function () {
    var example = 'This is an example';
}());

alert(typeof example); // undefined
```

It’s pretty simple, but it is two lines of boilerplate with enough braces and brackets to appeal to a RegEx connoisseur.

### To let (or const)

The logical replacement for this IIFE in modern times would be a block scoped variable and just a couple of curly braces. So we can use `const` or `let`, like this:

```
<pre class="prettyprint lang-javascript">
{
    const example = 'This is an example';
}

alert(typeof example); // undefined
```

What we have here is behaviourally identical to the IIFE example, but with an entire function removed. We still have a clean global scope, and we could put “one item into global scope” should we wish, by declaring it outside of the curly braces. In any case, we have the same thing going on.

A note on let/const: use `const` by default and “downgrade” to `let` where you find you must reassign the variable.

### Modules are Even Better

The next logical step in isolating scope is also becoming widely available in the browser (and is already widely available with a module loader like RequireJS or SystemJS). If you place your code in a module, it is entirely absent from the global scope.

### Summary

So do we still need IIFEs in a world with block-scoped variables and modules?

The logical conclusion is that we will stop using the immediately invoked function expression as the means to scope… we’ll either use block-scoped variables, or a module. Of course, it is just as likely that people will just carrying on using it; because… monkeys and ladders right!
---
title: 'Catching null and undefined without side effects'
navMenu: false
pubDate: 2018-04-03T21:35:09+01:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - JavaScript
    - TypeScript
---

This article simply promotes the use of the statement `if (x == null)` when you want to check if a value is either `null` or `undefined`. I keep on having to explain this point, because catching null or undefined without side effects is important.

If we break the statement down, there is a very important JavaScript concept that underpins it. It is the `==` comparison, which allows type coercion (AKA type juggling). Using just two equal signs is often frowned upon, because usually you don’t want types to be fiddled with during a comparison, but for checking null and undefined it is actually desirable behaviour.

You will also be advised to use `if (x)` to check null and undefined, but this actually allows far too much type coercion, because your null and undefined get juggled into a boolean “false”. Other values that will juggle their way into a boolean false include zero, an empty string, and the literal boolean value false.

So if you want to check for null and undefined without writing the full `(x === null || typof x === 'undefined')` the double-equals comparison is your friend.

Here’s the proof. First the code…

```typescript
function check(x, name) {
    if (!x) {
        console.log(name, '(!x)')
    }

    if (x == null) {
        console.log(name, 'x == null');
    }

    if (x === null) {
        console.log(name, 'x === null');
    }

    if (typeof x === 'undefined') {
        console.log(name, 'x === undefined');
    }
}

check(0, 'Number 0');
check('', 'Empty string \'\'');
check(false, 'Boolean false');

check(null, 'null');

let un;
check(un, 'undefined');
```

… and then the output!

```
Number 0 (!x)

Empty string '' (!x)

Boolean false (!x)

null (!x)
null x == null
null x === null

undefined (!x)
undefined x == null
undefined x === undefined
```
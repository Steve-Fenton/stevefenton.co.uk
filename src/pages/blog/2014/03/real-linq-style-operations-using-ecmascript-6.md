---
layout: src/layouts/Default.astro
title: 'Real Linq-style operations using ECMAScript 6'
navMenu: false
pubDate: 2014-03-21T22:27:58+00:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - JavaScript
    - Linq
---

There have been a few attempts to create versions of .NET’s LINQ extensions to JavaScript and TypeScript, but most of them involve operating on an array and returning an array. To be clear, it involves evaluating the result of the expression immediately and giving back the whole result immediately.

This isn’t really analogous for LINQ, which actually returns an enumerable that hasn’t yet been evaluated.

## LINQ Style Using Generators

The good news is ECMAScript 6 has generators, which allow a more LINQ-like implementation. Here is an example of “where” and “select” using ECMAScript 6.

```javascript
(function () {
    function toList() {
        var list = [];
        while(true) {
            var item = this.next();
            if (item.done) {
                break;
            }
            list.push(item.value);
        };
        return list;
    };

    Array.prototype.where = function (predicate) {
        var _this = this;
        function* generator() {
            for (var i = 0; i < _this.length; i++) {
                var item = _this[i];
                if (predicate(item)) {
                    yield item;
                }
            }
        }
       
        generator.prototype.toList = toList;
       
        return generator();
    };

    Array.prototype.select = function (converter) {
        var _this = this;
        function* generator() {
            for (var i = 0; i < _this.length; i++) {
                var item = _this[i];
                var newItem = converter(item);
                yield newItem;
            }
        }
       
        generator.prototype.toList = toList;
       
        return generator();
    };
}());
```

This extends the array prototype – if you find that distasteful you could easily wrap it and access it via an object, rather than directly extending the native array.

## Where

Here is a full example using “where”.

```javascript
var nums = [1, 2, 3, 4, 5, 6];

// Example 1: where
function isEqualPredicate(num) {
    return num % 2 === 0;
}

// Get's an 'enumerable' that hasn't yet executed...
var evens = nums.where(isEqualPredicate);

// Logs: 2, 4, 6
while(true) {
    var currentItem = evens.next();
    if (currentItem.done) {
        break;
    }
    console.log(currentItem.value);
};
```

## Select

Here is a full example using “select”.

```javascript
var nums = [1, 2, 3, 4, 5, 6];

// Example 2: select
function toStringConverter(num) {
    return num.toString();
}

// Using .toList() gets back the whole array...
var strings = nums.select(function(num) { return num.toString(); }).toList();

// Logs: ["1", "2", "3", "4", "5", "6"]
console.log(strings);
```

## Summary

Adding LINQ style expressions to JavaScript without also deferring the evaluation isn’t really providing a true equivalent. In the examples above, adding items to the “num” array after the LINQ expression means that item will be included in the evaluation:

```javascript
function isEqualPredicate(num) {
    return num % 2 === 0;
}

// Get's an 'enumerable' that hasn't yet executed...
var evens = nums.where(isEqualPredicate);

// Add to nums
nums.push(8);

// Logs: 2, 4, 6, 8
while(true) {
    var currentItem = evens.next();
    if (currentItem.done) {
        break;
    }
    console.log(currentItem.value);
};
```

Now that is a bit more like it! Note, though, that if you want to be able to keep running the generator, you’ll need to write a bit more code (in the code above, once you have reached the end, you can’t repeat the process).
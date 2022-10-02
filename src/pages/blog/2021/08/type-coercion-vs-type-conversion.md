---
layout: src/layouts/Default.astro
title: Type Coercion vs Type Conversion
navMenu: false
pubDate: 2021-08-19T09:29:17+01:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - types
---

The key difference between *type coercion* and *type conversion* is that type coercion is always *implicit*, whereas type conversion can be either implicit or explicit.

In other words, “type conversion” refers to the general process of changing a type, whereas type coercion refers more specifically to the implicit conversion of a type. We can further sub-divide type coercion into two kinds – programmer controlled, and compiler controlled (sometimes referred to as juggling). Some languages provide a mechanism to explicitly state the conversion from one specific type and another, for example in C# you can define a conversion using `public static implicit operator...`, which puts the programmer in control of the implicit coercion. When the compiler is making the decision, results may appear surprising unless you understand the rules used by the compiler. This often catches people out for example in JavaScript, where `'3' + 6` is 36. It’s only a problem when the compiler’s behaviour doesn’t match the programmer’s expectation (i.e. the ball not landing in the hand of a juggler – a mixture of surprise and embarrassment).

Here are some pseudocode examples of these operations…

```javascript
Number num = 1;
String str = '2';

// Explicit type conversion
Number total = num + str.ToNumber(); // 3

// Implicit type coercion
Number total = num + str; // 12

// Type coercion as juggling
Number total = num + str; // 2 (1 + str.Length)
```
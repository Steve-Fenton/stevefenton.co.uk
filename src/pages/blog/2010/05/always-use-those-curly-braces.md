---
id: 1041
layout: src/layouts/Default.astro
title: 'Always Use Those Curly Braces'
pubDate: 2010-05-04T21:37:20+01:00
author:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=1041'
permalink: /2010/05/always-use-those-curly-braces/
interface_sidebarlayout:
    - default
categories:
    - Programming
tags:
    - .net
    - 'c#'
    - java
    - php
    - typescript
    - vb
---

I write a lot of code in a lot of different languages – but there is one common rule I apply to all of them… when you use an “if” block, always put in the curly braces even if you don’t need them. Many errors are related to violations of this simple style rule. I have lost count of the number of times I have seen an error that is related to missing curly braces.

To illustrate, let’s look at the *wrong* way of doing things. I’ll pop the example in JavaScript – but this applies equally to many other C-Like languages, such as TypeScript, C#, Java, PHP and so on.

```
<pre class="prettyprint lang-javascript">
if (something == 10)
    alert("Something equals 10");
```

In this example, if the variable “something” is equal to 10, an alert will pop up to tell you so. If it doesn’t equal 10, no alert will pop up. This is all well and good until the code is modified. For example, there is a requirement to reset something to 0 when it gets to 10. This leads to the following common error:

```
<pre class="prettyprint lang-javascript">
if (something == 10)
    alert("Something equals 10");
    something = 0;
```

In this example, the alert will only pop up if something equals 10, but the line of code to reset something to 0 will happen every single time, no matter what the value of something is. All of this can be avoided by using curly braces in the first place – it seems like such a trivial and obvious problem, yet I keep on encountering this error, either in code or in questions asked on various help forums.

```
<pre class="prettyprint lang-javascript">
if (something == 10) {
    alert("Something equals 10");
}
```

This example leaves us in no doubt whatsoever about what is included in the if statement and what isn’t. It doesn’t matter that it is a one liner – this is the most readable and maintainable state for the code to be in.

### More Than Just Curly Braces

Of course, this doesn’t stop at curly braces – the same error happens all the time in HTML because people aren’t in the habit of laying out their nested tags properly. It isn’t OCD to layout your code neatly, it is fundamental to the readability of your code. I’ll finish with the updated second bit of code, which properly resets something to 0 when it equals 10.

```
<pre class="prettyprint lang-javascript">
if (something == 10) {
    alert("Something equals 10");
    something = 0;
}
```

### Helps Refactoring

One additional benefit of having a rigorous style for all of your if-statements, and other code structures, is that it make your refactoring job easier. This is especially true if you are applying the [Flocking Rules](https://www.sandimetz.com/99bottles/) to refactoring, as I am. When you are looking for duplication, it is easier to spot it when the duplication has the same geography.

Let’s look at two extremes, where the code is semantically similar. The stylistic differences make the duplication either easier, or harder, to spot.

Here is an example of bad geography for refactoring:

```
<pre class="prettyprint lang-javascript">
if (something > 9 && something < 11) {
    alert("Something equals 10");
    something = 0;
} else console.log('Not ten');

//.. more code

if (something == 10) console.log('Something was 10');
else console.log('Not ten');
```

And again with some discipline, giving us good geography:

```
<pre class="prettyprint lang-javascript">
if (something == 10) {
    alert("Something equals 10");
    something = 0;
} else {
    console.log('Not ten');
}

//.. more code

if (something == 10) {
    console.log('Something was 10');
} else {
    console.log('Not ten');
}
```

Ideally, where the if-statement uses the same condition, it should be obvious that it is the same. When you are looking for duplication, it helps if the duplication has the colour and the shape of other instances – just like Dave Grohl envisaged when he wrote the album of the same name, maybe.

So go beyond the simple “always use those curly braces” and aim for a level of uniformity that will let you ace your refactoring too.
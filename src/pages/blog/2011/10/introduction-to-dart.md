---
layout: src/layouts/Default.astro
navMenu: false
title: 'Introduction to Dart'
pubDate: 2011-10-15T17:36:44+01:00
author:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=892'
interface_sidebarlayout:
    - default
categories:
    - Programming
tags:
    - dart
---

[Dart](https://www.dartlang.org/) is a new language designed to run in your browser or on a server. It is comparable to JavaScript, but has many features that will make it more structured. Imagine JavaScript, but with classes and interfaces.

Before I get carried away, I must mention that Dart is currently in preview, whereas JavaScript and CoffeeScript (a project with some similar intentions to Dart, but different ideas) are both in production. The draft of the language was last updated yesterday (14th October 2011) and is version 0.02.

I won’t dive into why you might use any of these in preference to any other at this stage, but the choice between Dart and CoffeeScript will largely depend on what other languages you use and enjoy – CoffeeScript has elements of Python, Haskell and Ruby, whereas Dart will be more familiar for developers of C-style languages (such as, erm, JavaScript!)

So let’s pitch up with a nice Hello World example in Dart, based on the Dart tutorials.

```
<pre class="prettyprint lang-dart">
class Greeter {
  String prefix = 'Hello,';
  greet(name) {
    print('${prefix} ${name}');
  }
}

main() {
  var greeter = new Greeter();
  greeter.greet("Steve Fenton esq");
}
```
My notes on this example are that we can easily create a class, use typed variables, such as “String” and use “var” where the type would be overly redundant, i.e. I could have used:

```
<pre class="prettyprint lang-dart">
Greeter greeter = new Greeter();
```
Long term, Dart could well be “JavaScript without the gotchas”, but in any case I’m looking forward to trying it out!

If you want to have a go, [get started by following the interactive Dart tutorials](https://www.dartlang.org/guides/get-started).
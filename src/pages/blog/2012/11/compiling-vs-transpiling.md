---
layout: src/layouts/Default.astro
title: 'Compiling vs Transpiling'
navMenu: false
pubDate: 2012-11-18T23:02:16+00:00
authors:
    - steve-fenton
categories:
    - Programming
---

Despite the fact that the term “transpiling” has been around since last century, there appears to be a fair bit of confusion about what it means and what the difference between *transpiling* and *compiling* is.

Firstly, transpiling is a specific kind of compiling. This helps a great deal as we now know we are talking about the same kind of thing. It is actually a specific kind of compiling. So how do we define it compared to the more general term?

<dl><dt>Compiling</dt><dd>is the general term for taking source code written in one language and transforming into another</dd><dt>Transpiling</dt><dd>is a specific term for taking source code written in one language and transforming into another language that has a similar level of abstraction</dd></dl>

So (simplistically) when you compile C#, your method bodies are transformed by the compiler into IL. This cannot be called transpiling because the two languages are very different levels of abstraction.

When you compile TypeScript, it is transformed by the compiler into JavaScript. These are very similar levels of abstraction, so you could call this transpiling.

Both compilers and transpilers can optimise the code as part of the process.

Other common combinations that can be dubbed as transpiling include C++ to C, CoffeeScript to JavaScript, Dart to JavaScript and PHP to C++.
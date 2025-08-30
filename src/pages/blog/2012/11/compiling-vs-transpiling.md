---
title: 'Compiling vs transpiling'
navMenu: false
pubDate: 2012-11-18T23:02:16+00:00
modDate: 2025-01-15
authors:
 - steve-fenton
categories:
 - Programming
---

Despite the fact that the term "transpiling" has been around since last century, there appears to be a fair bit of confusion about what it means and what the difference between *transpiling* and *compiling* is.

Firstly, transpiling is a specific kind of compiling. This helps a great deal as we now know we are talking about the same kind of thing. It is actually a specific kind of compiling. So how do we define it compared to the more general term?

<dl>
<dt>Compiling</dt>
<dd>is the general term for taking source code written in one language and transforming into another</dd>
<dt>Transpiling</dt>
<dd>is a specific term for taking source code written in one language and transforming into another language that has a similar level of abstraction</dd>
</dl>

Both compilers and transpilers can optimise the code as part of the process.

## Examples of compiling and transpiling

When you compile C#, the compiler transforms your method bodies into IL. This can't be called transpiling because the two languages have very different levels of abstraction.

When you compile TypeScript, it's transformed into JavaScript. These are very similar levels of abstraction, so you could call this a transpiler.

Other common combinations that can be dubbed as transpiling include C++ to C, CoffeeScript to JavaScript, Dart to JavaScript, and PHP to C++.

### Does TypeScript compile or transpile

TypeScript transpiles. It's a superset of JavaScript, so it aims to remove the type annotations and occasionally inject or transform code where a feature can't be directly represented.

Remember, transpiling is a specific type of compilation. That means the technical answer is it does both.

### Is Babel a compiler or a transpiler

The purpose of Babel is to let you write modern JavaScript while targeting an older runtime. That means this is another example of a transpiler.

## Bundling vs transpiling

Are bundlers a type of transpiler? That's an interesting question. Let's examine the thought process behind it.

The simplest imaginable bundler could stitch all your files together into one big file. You'd benefit from fewer network requests, though HTTP/2 means there are fewer benefits to this these days. I don't think anyone is asking whether this is compiled or transpiled as it's the same code in fewer files.

Most bundlers, however, go a bit further. They often substitute variable names with shorter ones to squeeze the file size down. You won't find `const customerReceiptId = getReceipt(transaction)` in your bundled file. Instead, you'll find `const a = b(c)`. That's much shorter and lots of clever stuff has to happen in the bundler to understand the scope of each variable to make this work. It's also incomprehensible, so we use source maps to make debugging code in the browser easier.

This more advanced optimizing bundler looks a bit like a compiler or transpiler. However, it's actually something else: a bundler.

## Summary

When you see a short-bodied tailless amphibian, you can call it a frog. If it turns out to be a toad, you're still correct as a toad it a kind of frog.

In the same way, if you see something transforming code, you can call it a compiler. A transpiler is a kind of compiler.

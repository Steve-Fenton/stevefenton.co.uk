---
layout: src/layouts/Default.astro
navMenu: false
title: 'C# 9 non-null parameters'
pubDate: 2020-05-25T06:30:42+01:00
author:
    - steve-fenton
categories:
    - Programming
tags:
    - .net
    - 'c#'
---

For those who got excited about this one, C# 11 is where this is landing, with a slight change. Check out [C# parameter null checking](https://www.stevefenton.co.uk/2022/03/parameter-null-checking-in-c/) for more.

- - - - - -

This neat C# 9 feature can be summed up in a tiny snippet of code. You know that code analysis warning that tells you that the argument passed might be null… wouldn’t it be nice if you could refuse to accept null?

Well, you can. This is the before…

```
<pre class="prettyprint lang-csharp">
public Book(string firstName, string lastName)
```
And this is the after, with bangs after the parameter name to say “this can’t be null”.

```
<pre class="prettyprint lang-csharp">
public Book(string firstName!, string lastName!)
```
This is a shortcut that asks the compiler to add some code in for us, to save us some typing. Each bang is roughly equivalent to a check like this:

```
<pre class="prettyprint lang-csharp">
if (firstName is null) {
    throw new ArgumentNullException(nameof(firstName));
}
```
Ideally, this would have been the default way back when, but we live and learn and can now bang-up our parameters and kill off nulls high up in our stack, if they have to exist at all.
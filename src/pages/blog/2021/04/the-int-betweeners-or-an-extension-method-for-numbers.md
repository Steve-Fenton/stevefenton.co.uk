---
layout: src/layouts/Default.astro
navMenu: false
title: 'The Int Betweeners (or&#8230; An extension method for numbers)'
pubDate: 2021-04-23T08:57:57+01:00
author:
    - steve-fenton
image: /wp-content/uploads/2021/04/greg-davies-inbetweeners.jpg
categories:
    - Programming
---

It is pretty common to need to test a number is between two other numbers. You can do it with an `if (number > a && number  if-statement, but it is nice when code reads out loud. Now you can read that if-statement out loud if you want to sound like a robot, but in real life we'd probably say:`

> If the number is between 1 and 9 it is a single-digit number

Implicit in this statement is that this would be inclusive. When a magician says "give me a number between 1 and 10", you can give them 1, 2, 3, 4, 5, 6, 7, 8, 9, and 10. Only a comedian rejects one and ten, so unless you want your code to provide hilarious punchlines in production we should model the serious version.

The simplest way to do this is with an extension method.

```
<pre class="prettyprint lang-csharp">
public static bool Between(this int number, int a, int b)
{
    return number >= Math.Min(a, b) && number <= Math.Max(a, b);
}
```
This provides the eminently readable `if (number.Between(1, 10))` check, which is nice.

Example:

```
<pre class="prettyprint lang-csharp">
int number = 5;

// true cases
Console.WriteLine(number.Between(1, 10));
Console.WriteLine(number.Between(5, 10));
Console.WriteLine(number.Between(0, 5));
Console.WriteLine(number.Between(5, 5));

// false cases
Console.WriteLine(number.Between(6, 10));
Console.WriteLine(number.Between(3, 1));
```
It's just a one line method, so it's no particular bother to write a similar one to handle other types. If we are being kind to those using the code, there would probably be more documentation than there would be code... so, here is the full thing.

```
<pre class="prettyprint lang-csharp">
public static class TypeExtensions
{
    public static bool Between(this int number, int a, int b)
    {
        return number >= Math.Min(a, b) && number <= Math.Max(a, b);
    }

    public static bool Between(this decimal number, decimal a, decimal b)
    {
        return number >= Math.Min(a, b) && number <= Math.Max(a, b);
    }
}
```
Photo: Greg Davies, The Inbetweeners. [Check out this busy chap](https://gregdavies.co.uk/).
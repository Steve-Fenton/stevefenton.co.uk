---
layout: src/layouts/Default.astro
navMenu: false
title: 'Combinatorial and pairwise testing with NUnit'
pubDate: 2015-04-11T00:29:28+01:00
authors:
    - steve-fenton

categories:
    - Automation
    - Programming
tags:
    - .net
    - C-Sharp
    - NUnit
---

I discovered these features after a tip off from [Jason Gorman](http://codemanship.co.uk/). The CombinatorialAttribute and PairwiseAttribute in NUnit. Test Analysts will already be very familiar with combinatorial testing and pairwise testing as they are fundamental test planning techniques.

The short version for those who haven’t come across them before is that:

- Combinatorial – test every possible combination of inputs
- Pairwise – ensure that each pair of combinations is tested

The pairwise technique is normally employed when combinatorial testing generates too many test cases to practically test and works on the premise that most errors are caused by the interaction of just two factors.

But did you know that NUnit can generate test cases for both of these techniques using just lists of inputs?

Here are some examples:

You have a method that accepts two arguments, *a* and *b*, which are an int and a string respectively. *a* can be 1, 2, 3, or 4. *b* can be A, B, or C. You could manually work out all of the possible combinations, like so:

| a | b |
|---|---|
| 1 | A |
| 1 | B |
| 1 | C |
| 2 | A |
| 2 | B |
| 2 | C |
| 3 | A |
| 3 | B |
| 3 | C |
| 4 | A |
| 4 | B |
| 4 | C |

Or you could just pass in the possible inputs and let NUnit work it all out for you:

```
<pre class="prettyprint lang-csharp">
[Test, Combinatorial]
public void ExampleTest(
    [Values(1, 2, 3, 4)] int a,
    [Values("A", "B", "C")] string b)
{
    Console.WriteLine(a + " " + b);
}
```
The above code will generate all possible combinations of the inputs.

But what about pairwise testing? To show this off, we need more than two inputs (because with two inputs pairwise and combinatorial are the same). With three inputs we can start to see the problem of combinatorial explosion (when the number of combinations starts to get out of hand).

```
<pre class="prettyprint lang-csharp">
[Test, Combinatorial]
public void ExampleTest(
    [Values(1, 2, 3, 4)] int a,
    [Values("A", "B", "C")] string b,
    [Values("x", "y", "z")] string c)
{
    Console.WriteLine(a + " " + b + " " + c);
}
```
This results in 36 possible combinations, but if we switch to pairwise, we get just 12 combinations:

```
<pre class="prettyprint lang-csharp">
[Test, Pairwise]
public void ExampleTest(
    [Values(1, 2, 3, 4)] int a,
    [Values("A", "B", "C")] string b,
    [Values("x", "y", "z")] string c)
{
    Console.WriteLine(a + " " + b + " " + c);
}
```
It is worth reading up on the pros and cons of pairwise testing, but given that the computer is doing the hard work and assuming your tests are blazingly fast, you may find combinatorial testing sufficient in cases where you decide to use it.

Here is a quick example that is a little more realistic – we’re going to make dinner. This example was taken from a training course written by James Skilton – he uses it to demonstrate combinatorial vs pairwise testing… and told me:

> “Pairwise testing is a risk-based replacement for exhaustive testing, as it is not often practical, cost-effective, or realistic when compared to the risk model of the required solution”.

The result of a combinatorial test is 26,244 tests (this took almost a minute to run in NUnit on top of generating the combinations). Using the pairwise approach instead resulted in 87 tests, which ran in under one second after generation of the tests).

```
<pre class="prettyprint lang-csharp">
[Test, Pairwise]
public void CombinatorialTest(
    [Values("Black Olives", "Scallions", "Chilli", "Mushrooms", "Jalapenos", "Pickles", "Bacon", "Lettuce", "Onion")] string topping,
    [Values("Pepperjack", "Swiss", "Gouda", "Blue", "Cheddar", "Feta")] string cheese,
    [Values("Ketchup", "Mustard", "Mayo", "Horse-radish", "A1", "BBQ", "Garlic", "Ceasar", "Pesto")] string sauce,
    [Values("Angus", "Chicken", "Turkey", "Veggie", "Bean", "Bison")] string burger,
    [Values("Fries", "Onion Rings", "Sweet Pot Fries")] string sides,
    [Values("Fountain", "Shake", "Malt")] string drink
)
{
    // Code...
}
```
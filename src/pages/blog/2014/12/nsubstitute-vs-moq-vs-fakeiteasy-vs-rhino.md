---
layout: src/layouts/Default.astro
navMenu: false
title: 'NSubstitute vs Moq vs FakeItEasy vs Rhino'
pubDate: 2014-12-20T19:35:36+00:00
authors:
    - steve-fenton

categories:
    - Programming
tags:
    - .net
    - 'c#'
    - fakeiteasy
    - moq
    - nsubstitute
    - rhino
---

The long and short of this article is that I tried out a whole load of mocking frameworks and decided I liked NSubstitute the best. This is currently a reasonably simple decision, because on the whole, Moq, FakeItEasy, Rhino, JustMock and many others besides are all essentially syntactical best friends.

There may be some minor differences between “A.Fake&lt;T&gt;”, “MockRepository.GenerateStub&lt;T&gt;”, “Mock.Create&lt;T&gt;” and “new Mock&lt;T&gt;” but when you consider that this line of code sums them all up in one hit – you can see they are all in the same club.

```
<pre class="prettyprint lang-csharp">
mock.Setup(m => m.DoSomething()).Returns("Value");
```
This is specifically the Moq version, but asides from the two words that precede the lambda – this is what you’ll find almost everywhere. You may remember being warned to “beware yellow snow” when using ASP.NET templating, well in this case you get a sea of “((m =&gt; m))” or “(() =&gt; )” emoticons.

Here is the full Moq version for use when comparing with NSubstitute later. I wrote versions of this same simple scenario in something like eight mock frameworks.

```
<pre class="prettyprint lang-csharp">
var mock = new Mock<GameLanguage>();
mock.Setup(m => m.DoSomething()).Returns("Value");

var language = mock.Object;
language.Fizz = "Fizz";
language.Buzz = "Buzz";

_target = new Game(language);
```
Enter NSubstitute and its neat use of extension methods.

```
<pre class="prettyprint lang-csharp">
language.DoSomething().Returns("Value");
```
I prefer this syntax. A lot.

Here is the complete NSubstitute version.

```
<pre class="prettyprint lang-csharp">
var language = Substitute.For<GameLanguage>();

language.DoSomething().Returns("Value");
language.Fizz = "Fizz";
language.Buzz = "Buzz";

_target = new Game(language);
```
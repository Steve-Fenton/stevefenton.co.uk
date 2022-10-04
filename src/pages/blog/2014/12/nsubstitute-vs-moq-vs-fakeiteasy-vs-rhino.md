---
layout: src/layouts/Default.astro
title: 'NSubstitute vs Moq vs FakeItEasy vs Rhino'
navMenu: false
pubDate: 2014-12-20T19:35:36+00:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - .net
    - C-Sharp
    - FakeItEasy
    - Moq
    - NSubstitute
    - Rhino
---

The long and short of this article is that I tried out a whole load of mocking frameworks and decided I liked NSubstitute the best. This is currently a reasonably simple decision, because on the whole, Moq, FakeItEasy, Rhino, JustMock and many others besides are all essentially syntactical best friends.

There may be some minor differences between “A.Fake<T>”, “MockRepository.GenerateStub<T>”, “Mock.Create<T>” and “new Mock<T>” but when you consider that this line of code sums them all up in one hit – you can see they are all in the same club.

```csharp
mock.Setup(m => m.DoSomething()).Returns("Value");
```

This is specifically the Moq version, but asides from the two words that precede the lambda – this is what you’ll find almost everywhere. You may remember being warned to “beware yellow snow” when using ASP.NET templating, well in this case you get a sea of “((m => m))” or “(() => )” emoticons.

Here is the full Moq version for use when comparing with NSubstitute later. I wrote versions of this same simple scenario in something like eight mock frameworks.

```csharp
var mock = new Mock<GameLanguage>();
mock.Setup(m => m.DoSomething()).Returns("Value");

var language = mock.Object;
language.Fizz = "Fizz";
language.Buzz = "Buzz";

_target = new Game(language);
```

Enter NSubstitute and its neat use of extension methods.

```csharp
language.DoSomething().Returns("Value");
```

I prefer this syntax. A lot.

Here is the complete NSubstitute version.

```csharp
var language = Substitute.For<GameLanguage>();

language.DoSomething().Returns("Value");
language.Fizz = "Fizz";
language.Buzz = "Buzz";

_target = new Game(language);
```
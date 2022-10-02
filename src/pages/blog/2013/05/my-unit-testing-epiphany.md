---
id: 602
layout: src/layouts/Default.astro
title: 'My unit testing epiphany'
pubDate: 2013-05-01T14:51:34+01:00
author:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=602'
permalink: /2013/05/my-unit-testing-epiphany/
interface_sidebarlayout:
    - default
categories:
    - Programming
tags:
    - tdd
---

I promised to write up the details of this after writing the following Tweet while listening to Ian Cooper talk on “TDD: Where did it all go wrong?” at DevSouthCoast in April.

> “I have had an epiphany at @DevSouthCoast – I’m embarrassed about some TDD techniques I have been using. NO MORE!”

So what was it that caused such a flash-of-light realisation? What was I doing so wrong? Here’s the story, with all the credit going to Ian Cooper who opened my eyes to this issue.

The correct way of doing TDD, i.e. a way that makes it worthwhile, has been lost over time. Misunderstandings have crept in. Arbitrary rules have been added that undermine the concept.

The version of TDD that appears in many books, articles, and examples is this incorrect version. It sounds plausible. It has enough in common with the original to sound real. A subtle difference in the method, though, is making an enormous difference to its effectiveness.

I’m not going to talk about everything Ian covered in his talk. You can seek him out for that (as an aside, please seek out a meet-up rather than just jumping out of a bush and confronting him). I’m going to talk about the bit that I think is causing the real damage.

Many sources, some of which are considered authorities, tell us to pair up our implementation class with a twin test class.

This is wrong. It is causing most of the pain we have with unit tests.

It encourages you to do the wrong thing – or more specifically, it stops you from doing the right things. Here is what I now believe to be the better way and this is what Ian opened my eyes to (and send to be what Kent Beck originally meant).

Red. Green. Refactor. We have all heard this. I certainly had. But I didn’t really get it. I thought it meant… “write a test, make sure it fails. Write some code to pass the test. Tidy up a bit”. Not a million miles away from the truth, but certainly not the complete picture. Let’s run it again.

Red. You write a test that represents the behaviour that is needed from the system. You make it compile, but ensure the test fails. You now have a requirement for the program.

Green. You write minimal code to make the test green. This is sometimes interpreted as “return a hard-coded value” – but this is simplistic. What it really means is write code with no thoughts on design, patterns, or structure. Do it the naughty way. We just chuck lines into a method; lines that perhaps shouldn’t even be in the method or even in the class. Yes – we should avoid adding more implementation than the test forces, but the real trick is to do it sinfully.

Refactor. This is the only time you should add design. This is when you might extract a method, add elements of a design pattern, create additional classes, or whatever needs to be done to pay penance to the sinful way you achieved green.

(Key point…) When you do it this way, you end up with several classes that are all tested by a *single* test class. This is how things should be. The tests document the requirements of the system with minimal knowledge of the implementation. The implementation could be **One Massive Function**<span class="st">®</span> or it could be a bunch of classes.

The big mistake comes when you get carried away with “isolation”. If you were to undertake too much design up-front, you could end up with one test class per class in your program. In fact, this is a set-up that is encouraged in several books and articles – that’s why you name the test class after the class you are testing right? You end up creating test-doubles for every dependency because the impression you get is that your tests should not depend on anything outside of the class under test. This creates accidental coupling.

The term “isolation” means that you avoid having to cross a port. You don’t want to rely on a network, database, file system, external service, or anything else that you might add an adaptor for in a Hexagonal Architecture.

It doesn’t mean creating a metaphorical cube-farm for your classes. If you over-isolate your code when you write unit-tests, you are creating tests that rely on implementation – because each change made in the implementation causes problems in your tests. If you change the class structure to introduce a better pattern, all your tests need to be changed.

Seek to isolate your test from changes to implementation details, rather than trying to isolate one method from all other code.

I am guilty of using the wrong kind of isolation in the past. I was diligently trying to eliminate every dependency, whether or not it crossed a port, because I thought it was the right thing to do – but trust me, I am committed to refactoring the tests I have written to put this right.

This wasn’t Ian’s only point on the night – but it was one that made a big difference to how I feel personally about TDD.

The big irony of this is that when I attended a coding dojo a month back, I actually did TDD right. I wrote tests to represent the behaviour required in the program and when I introduced a chain of responsibility pattern, I didn’t split out my tests to match the classes I introduced.

The structure of the tests made sense to the structure of the business domain, instead of matching the structure of the implementation.

Oddly though, this wasn’t how I was doing it during daylight hours. I think this is because in real life it is harder to separate those required behaviours from all the other stuff in our heads.

If you have been doing things the way I did don’t feel guilty about it, because much of the literature is misleading. Let’s all just do it better from now.

This article generated lots of great discussion. You can read more in [My Unit Testing Epiphany Continued!](https://www.stevefenton.co.uk/2013/05/My-Unit-Testing-Epiphany-Continued/)
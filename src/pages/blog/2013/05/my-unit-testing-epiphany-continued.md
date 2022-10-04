---
layout: src/layouts/Default.astro
title: 'My unit testing epiphany continued'
navMenu: false
pubDate: 2013-05-13T14:30:28+01:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - TDD
---

I had some great feedback on [my unit testing epiphany](/blog/2013/05/my-unit-testing-epiphany/). Normally I would append an update, but this was worth a proper follow up article. As a side-note, if you don’t have some friends who will question you, probe you and otherwise engage your mind on a topic – you really need to get some of those. They are much more important than the ones who just agree with everything.

So here are some questions I got and my thoughts on them, with the over-arching caveat that I am currently in the process of actually putting my implementation where my mouth is – so I don’t have data with any longevity to back this up, only my own experience with <abbr title="Test Driven Development">TDD</abbr>.

> Isn’t what you’re describing ‘integration testing’?

Not under the new glossary! Integration testing is what you’re doing if your tests cross a port. This is one of the fundamental parts of the epiphany – my view on what constituted a “unit” was pretty much a “class file” before I realised that this makes tests too reliant on the implementation. This is the cause of over-isolation. This doesn’t mean you test your whole program through one test – you isolate wherever a port is crossed (things like file-system, service calls, database repositories and the like).Aren’t you talking about ‘acceptance tests’?

Not quite. I’m talking about tests written by the programmer while raging the TDD, not the tests written “by the customer” (often not by the customer – but on their behalf). The programmer decides on the test that will drive the next bit of code and generates the tests they need. What I am talking about is unit-tests that are closer to acceptance tests than they used to be because they are describing things that are higher level than they would if they were testing an over-isolated class.

If the term <abbr title="Behaviour Driven Development">BDD</abbr> hadn’t been appropriated by something different, this approach would probably bear that name – it isn’t what we now know as BDD, but it is more behavioural in style, because the tests describe what the program or module is intended to do, not what a low-level implementation is expected to do.

> What about those one-test-per-class tests?

The recommendation here is that you use these low-level tests for discovery *if you need them* – but you don’t check them in to source control. Ian described these as “driving in first gear”, which you sometimes need to do – but you want to be going faster than this. In my experience, this low-level of testing is great for discovering legacy code – but isn’t great for TDD.

> This isn’t what I have been taught / doesn’t match this book!

Damn right. The problem is that the over-isolation method is incredibly common and very well documented in lots of books. This doesn’t make it right. Of course, there is nothing to say that what I’m writing about here is correct (although I feel that – fundamentally – it is better) – so you’ll need to use your judgement. Try it out and see the difference. You can’t do a spike on this because one of the big problems with over-isolated tests doesn’t manifest itself until you start trying to change the implementation. Perhaps a good coding kata will help to trial the concept.

I think that low-level testing with uber-isolation makes it hard to refactor your code. Each change in the implementation results in changes to the tests. If you do things using the post-epiphany methods, your implementation is free to change without impacting the tests at all.

This is the great irony of over-isolation. It actually makes you *more* dependant on the implementation, not less dependant.

Nick Lanng says:

> The thing that convinced me is per-class unit tests mock all dependencies. If the behaviour of that dependency changes then everything that mocks it will be incorrect but still pass the tests.

So my summary is this; although this isn’t what we were all taught to do and even though it isn’t what those books say (I have read at least four that all say it) – be prepared to be dazzled by the same flash of inspiration as I. The way they are telling us to do it doesn’t work. It makes our tests painful to maintain. It is the reason anti-TDD-ists have so much fire-power amongst their peers. If we change how we’re doing this, it will be better.

## Credits

All of this came from an awesome talk by Ian Cooper. They are my words, but they are inspired by Ian’s concise and awesome explanation. I entered the room a cynic (I believe I commented to friend that I was looking forward to the talk titled “TDD: Where did it all go wrong?” because it didn’t realise it had gone wrong!) I left the room educated.

Ian also credited much of the intention of all of this to Kent Beck. Ian’s view was that this is actually not a new way of doing things, but a way that more closely matches what Kent intended. I can’t speak on behalf of Kent or indeed Ian – but it resonates with what I have been reading in Kent’s books.

## The New Glossary

Here is a glossary of terms, how I viewed them before my epiphany and how I now understand them.

| Term        | Before                                                    | Now                                                      |
|-------------|-----------------------------------------------------------|----------------------------------------------------------|
| Unit        | A class file                                              | A collection of classes, but nothing that crosses a port |
| Integration | A test that relies on something else being there          | A test that crosses over a port                          |
| Isolation   | Replacing every dependency a class has with a test-double | Replacing dependencies at the port                       |
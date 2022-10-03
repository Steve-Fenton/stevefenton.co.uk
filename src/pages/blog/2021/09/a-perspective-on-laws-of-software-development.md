---
layout: src/layouts/Default.astro
title: A perspective on laws of software development
navMenu: false
pubDate: 2021-09-14T15:54:05+01:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - Laws
---

There are two basic types of natural laws, or laws of nature. Universal and probabilistic. Universal laws of nature state the when you find one thing, you will always find some other specific thing or things. Probabilistic laws of nature say that things are commonly found together.

Some examples may help. If you drop a bird egg from five meters onto concrete, it will fall and smash. That’s a universal law. However, there is a probabilistic law that if you find a smashed wild bird egg on the ground and look up, you’ll see a nest. You won’t always, but it’s a common enough occurrence that you’d make use of this *law* if you were searching for nests.

These laws are so commonplace in our culture, it was almost inevitable that programmers would start seeing them in their daily tasks. When you find a law related to people, organisations, management, or programming – be super aware that they are likely to be probabilistic and that (as with everything that involves brains) there may be some advantage to be gained from flipping the law. Let’s start with the canonical example of a law and it’s associated paradox.

## The Pareto Principle

The Pareto Principle is a simple probabilistic law that says around 80% of the consequence comes from 20% of the cause (also known as the eighty-twenty rule). For example, you’ll find about 80% of the world’s income is earned by 20% of the world’s population.

While Joseph Juran developed this idea in 1896, based on Vilfredo Pareto’s study on land ownership; the idea has been found to be useful many times. For example, in 1989, a study on global GDP found that the richest 20% were earning 83% of income.

Surely this can only ever be a super-useful rule? Hang on, because you need to beware…

### The Pareto Pardox

This is the sharp handle that you hold when you wield this principle… because The Pareto Principle is so well known, people commonly stick with squeezing the 20%. Before long, the effort required to find “one more optimisation” in the 20% zone is way more than the effort to pick something out of the remaining 80%. You’ve simply fixed all the easy stuff, time to roll the sleeves up.

Imagine an orange juice company. They reckon 80% of the juice is going to drop out in the first squeeze, as long as they get the technique right. So they optimise that first squeeze and find that after a bit of trial and error, they do in fact get about 80% of the juice if they use both hands and a particular grip. Happy days. Economically, though, they can’t discard one fifth of all the juice in the oranges they buy; so they continue working on techniques to try and increase the amount of juice in the first squeeze. They spend months on it and achieve 82% of the juice in one hit.

Their competitor, who is aware of The Pareto Paradox, squeezes the orange twice. They get about 80% in the first squeeze and then with another two squeezes they are in the 90s somewhere. They optimised the first squeeze just like the other company, but then they abandoned attempts to further optimise the 20% and started looking at the other 80%. Long term, this company will work out the exact number of squeezes that balances time, effort, and juice. They also start selling the peel to a hipster company who make deck shoes out of them. Cracking.

### The Pareto summary

It’s useful to know when a law is universal or probabilistic. It’s also useful to understand the blind spots that develop when you trust a law too far.

Thanks for reading. I’ve included below, for my own benefit, some things to bear in mind with other common laws that circulate in the industry.

- - - - - -

## Brooks’ Law

The Mythical Man Month is a book that just doesn’t go out of date. (Except, perhaps, the chapter on Microfiche but modern alternatives could reasonably be substituted!) Brooks’ Law simply states that adding more people to a late project will make it later. This is usually exacerbated by starting a project before the right people are available to staff it, or believing you can run multiple projects concurrently without them having an effect on each other. (See “Why Limit WIP” by Jim Benson).

There isn’t so much an exception to this, but a “prevention of too broad an application”. There are often people who are close to a project, but not actively contributing to it. These inner-loop folks can become individual contributors and speed things up; you may defend Brooks’ Law by saying “they are already on the project…” kind of.

The term “project” is applied colloquially here.

## Conway’s Law

The design of your organisation will inevitably be reflected back to you in the design of your software. This is bad news for a badly designed organisation, but you can take advantage of this law using the *Inverse Conway Manoeuvre*. Organise your people how you would want the software to be organised and the architecture will naturally follow.

## The Dreyfus Model composition problem

The Dreyfus Model has great merit. In the model, you progress your skill through five stages: Novice, Advanced Beginner, Competent, Proficient, and Expert. The [Dreyfus Model Composition Problem](/2012/12/the-dreyfus-model-mistake-in-software-development/) takes place when you believe the Dreyfus Model applies to “a software developer”. It doesn’t, it applies to any individual skill. You may be an *expert* in C#, but a *novice* at HTML, and a *competent* at CSS. (That last one is joke as nobody feels competent with CSS). Which leads neatly onto…

## The Dunning/Kruger Effect

The Dunning/Kruger Effect has become famous and has even been weaponised. The basic picture is that the less you know on a subject, the more likely you are to mis-calculate your knowledge. In other words, the more you know, the more you realise you don’t know. There have been many studies on illusory superiority that also relate to this, though they are more a snapshot of people’s self-assessment rather than a commentary on how that assessment changes over time.

While it is worth using the Dunning/Kruger Effect as a cautionary tale, there is a positive side to this self-deception. If, as a beginner, you realised how much there was to learn on any subject, you would probably give up. For example, when you write your first program and the phrase “Hello World” appears on the screen, you feel like you’ve mastered programming. This fuels your efforts to undertake more complex challenges. By the time you realise the true extent of the knowledge, you already have bags of it and you feel up to the challenge of learning every day for the rest of your life.

The Dunning/Kruger Effect is, in my opinion, less damaging than Imposter Syndrome when applied to “creating things”. The inverse is true when it comes to “teaching things”. Discuss!

- - - - - -

## Not laws

The following are not laws and were probably never intended as laws (be kind). I reject them, though they sometimes indicate at least some form of intangible experience-based local truth for the author.

### Greenspun’s Meme Format

Not it’s original title, but from Greenspun’s 10th Rule of Programming, which reads “Any sufficiently complicated C or Fortran program contains an ad hoc, informally-specified, bug-ridden, slow implementation of half of Common Lisp,” we can template out programming aphorisms from *memistic* application, such as “any sufficiently complicated software framework contains an ad hoc, informally-specified, bug-ridden, slow implementation of a web server”. Just bear in mind that when you read these, Greenspun never even had another nine rules when he coined this, so there is no law here. Sometimes appears as Zawinsky’s Law, “every program attempts to expand until it can read mail. Those programs which cannot so expand are replaced by ones which can,” though this makes no specific mention of the quality of these expanding programmes.

### The Peter Principle

Entire books have been dedicated to the principle that “…in a hierarchy, every employee tends to rise to their level of incompetence. Thus, in time, every post tends to be occupied by an employee who is incompetent to carry out its duties”. Of course, it is very common for someone “really good at making chairs” to be promoted into a role where they no longer *do* this thing they were really good at. However, on closer inspection you will discover that where The Peter Principle applies, it is a sign of organisational dysfunction. While we are on that topic…

### Parkinson’s Law

“Work expands so as to fill the time available for its completion.” It doesn’t. In the absence of other pressures, you may find yourself in a position of *infinite finesse*. It is possible that the author intended to mean that “if you have no reason not to add every new idea to a plan, you’ll probably add every new idea to the plan”?

### Sturgeon’s Revelation

“90% of everything is crap,” which translates rather wonderfully to programming as “90% of everything is CRUD.” (As in CREATE READ UPDATE DELETE). Funny, but not really true.

That’s the end for now. I’ll update to add new items I stumble across – or to correct things where one of you makes a fair argument against my characterisations.
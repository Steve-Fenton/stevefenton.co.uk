---
layout: src/layouts/Default.astro
title: 'TypeScript vs the world'
navMenu: false
pubDate: 2017-09-24T11:22:42+01:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - TypeScript
---

This is the shortest note possible to warn you about the “TypeScript vs Babel”, “TypeScript vs JavaScript”, “TypeScript vs… pretty much everything in the world” articles out there.

There are multiple problems in the articles I am reading in my feeds.

## Superficial

The main problem is that the people comparing TypeScript with *all the languages* is that they have often barely scratched the surface. Here is a common example, pulled from a comparison with Babel…

```typescript
class Article {
    name: string;

    constructor(name: string) {
        this.name = name;
    }
}
```

This is not how you do things if you are a TypeScript programmer. If a colleague sent a pull request with this code, I’d be pairing up and making some changes. This is how your TypeScript code should look (i.e. [stop manually mapping parameters to properties]\(/blog/2013/04/stop-manually-assigning-typescript-constructor-parameters/)):

```typescript
class Article {
    constructor(public name: string) {
    }
}
```

This updated code immediately resolves commonly cited problems with TypeScript… because the verbosity of the type annotations and property mapping in the constructor are all gone. Compared to other languages, the updated version is vastly more attractive… so either the comparisons are either naïve, or show some form of bias.

Similarly, there are examples littered with unnecessary type annotations. The TypeScript compiler is *super awesome at inferring types*, so your starting point for type annotations should be to:

> Switch on the *noImplicitAny* flag and only add types where the compiler prompts you! <cite>Steve Fenton, twice per day since October 2012\*</cite>

You know… [just embrace type inference in TypeScript because: IT’S AWESOME!]\(/blog/2014/07/embrace-type-inference-in-typescript/)

## Artificial

The next problem is artificial comparisons. Many languages, compilers, and tools are not in direct competition. In some cases you might use both of the items in the “TypeScript vs…” article (i.e. TypeScript vs Babel) and in others, you wouldn’t be sat with a blank text editor deciding between them, because they are not substitutes (i.e. TypeScript vs CoffeeScript).

There is also an emergent statement about using “plain JavaScript for small programs and TypeScript for large programs”. I disagree with this. There are a number of people who have put their tiny program into TypeScript and immediately found subtle bugs caused by type errors. Those errors can exist in 10 lines of code just as easily as they can in 100,000 lines of code.

Arguments about there not being type definitions, or up-to-date type definitions for dependencies are also questionable. Let’s look at the decision making process.

Step 1: I’d like some type checking, so I’ll use TypeScript for my program.

Step 2: I need to use LogicalFallacy.js.

Step 3: There are no type definitions for LogicalFallacy.js

Step 4: I’ll just use plain JavaScript for my whole program… because if I can’t get type checking for 50% of it, I have decided I also don’t want type checking for the other 50% of it. (Said nobody ever).

## Fear

There is a certain amount of fear-driven-comparison when it comes to new things (are we still calling TypeScript “new”… it seems a lot of people are right at the early-adoption zone despite the five-year anniversary of TypeScript being upon us). People invested a lot of time learning the other “solutions” to the “JavaScript Problem” and it feels like they wasted their time. That is, I’m sorry to tell you, very much what the long view of programming is like. Everyone has left behind them a trail of dead technology… my own journey is strewn with the bodies of Classic ASP, PHP, Flash, VB6, Windows Forms, ASP.NET Web Forms, WPF, SOAP, WCF, CoffeeScript, Dart, and countless other technological corpses.

Don’t despair though, because out of everything that I’ve buried, there are major chunks of goodness that live much longer… object-oriented programming, aspect-oriented programming, functional programming, refactoring, TDD, BDD, SOLID principles, clean code, optimisations tricks, data schemas, and many other timeless classics.

## So what?

So this! Just be careful with all of these comparison articles. There is a crowded bandwagon of opinions – but the people holding the megaphone aren’t at all responsible for making your next program work, and they don’t even know what is valuable to your team, or your users.

<small>\* I haven’t actually been saying this twice per day since October 2012. The flag itself went missing in v0.9 but came back in v0.9.1 – and we didn’t even know it was there in v0.8, so that part of the advice came later. Obviously, it isn’t *literally* twice per day, it is just “a great many times”.</small>
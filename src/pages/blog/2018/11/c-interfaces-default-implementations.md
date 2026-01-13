---
title: 'C# interfaces: Default implementations'
navMenu: false
pubDate: 2018-11-16T19:17:50+00:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - C-Sharp
    - TypeScript
description: Explains C# 8 default interface implementations by comparing them to traits and mixins.
---

The C# 8.0 announcement included a note on default implementations of interface members. If you’ve been programming for long enough, this might make you a little nervous at first thanks to the hangovers of multiple inheritance. Before you chuck out this idea, though, let’s look at it from a different perspective.

I’m going to talk quickly about *traits*. In programming traits are like mixins ([read more about traits vs mixins](/blog/2018/11/traits-vs-mixins/) if you’re interested in this subject). If you haven’t heard of mixins, here’s a quick quote:

> Mixins take their name from a customizable ice-cream dessert that was first available at Steve’s Ice Cream in Somerville, Massachusetts. The idea behind the mix-in dessert was that you choose an ice cream and add another product to flavor it, for example, a candy bar. The mix-in, or smoosh-in, ice-cream concept has gone global since its appearance on Steve Herrell’s menu back in 1973. <cite>Steve Fenton, Pro TypeScript (Second Edition). Apress. 2018.</cite>

With both traits and mixins, the idea is that you extend the behaviour of a class using a shared implementation. Put another way, they let you take a normal class and give it super powers; just like in Stan Lee comic. That’s why all of my [examples of mixins in TypeScript](/blog/2017/08/typescript-mixins-part-two/) are based around super heroes.

So, if you have a Human class, you can mix it up with some super power mixins or traits. For example, if you had a spider-based mixin and you added it to a `Human` class, the `Human` class would gain the shared methods from the spidery mixin.

I’ll get back to C# in just a second, but here’s the TypeScript code version of the previous statement.

 ```typescript
type Constructor<T = {}> = new (...args: any[]) => T;

function DoesWhateverASpiderCan<TBase extends Constructor>(Base: TBase) {
  // Extend the supplied class with more stuff
  return class extends Base {
    swing() {
      alert('swing from a thread');
    }

    spinWeb(size: any) {
      alert('spins a web any ' + size)
    }
  };
}

// Just a normal class
class Human {
    constructor(private name: string) {
    }
}

// Smoosh Human and Spider together...
const SpiderMan = DoesWhateverASpiderCan(Human);

// Create a new SpiderMan!
const peter = new SpiderMan('Peter');
peter.swing();
```

Now TypeScript has mixins, so you can extend a class in a stateful way. C# has default implementations on interfaces, which is traits. Traits are stateless. This is a constraint, but it may also make your life easier. Now, the preview of C# 8.0 isn’t available at the time of writing, so the following C# equivalent of Spiderman might not compile, but it gives a general idea of what’s coming.

 ```csharp
interface IDoWhateverASpiderCan
{
    void swing() => 
        Console.WriteLine("swing from a thread");

    void spinWeb(string size) => 
        Console.WriteLine($"spins a web any {size}");
}

class Human
{
    private readonly string _name;

    public Human(string name)
    {
        _name = name;
    }
}

class Spiderman: Human, IDoWhateverASpiderCan
{
}

var spiderMan = new Spiderman();
spiderMan.swing();
```

The `Spiderman` class inherits from `Human`, and *implements* the `IDoWhateverASpiderCan` interface; except it doesn’t have to implement anything because the interface has the default implementation. That means the methods on the interface can be shared between many classes. It also means you can implement many default implementations from many different interfaces, thus smooshing together the behaviour of as many radioactive creatures as you like.
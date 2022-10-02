---
id: 2279
layout: src/layouts/Default.astro
title: 'TypeScript Mixins part two'
pubDate: 2017-08-26T16:21:55+01:00
author:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=2279'
permalink: /2017/08/typescript-mixins-part-two/
categories:
    - Programming
tags:
    - mixins
    - typescript
---

I had a feeling I would be writing this article when I first penned [TypeScript Mixins Part One](https://www.stevefenton.co.uk/2014/02/typescript-mixins-part-one/) back in 2014. For simplicity, I have used exactly the same program in this updated example, so you should find it easier to compare the simple mixins from the olden times, with the real mixins in this verison.

There is no need for a mixin function in this version, as the mixins are defined as functions to start off with. What you do need to get started is a constructor type…

### The constructor type

This is a generic type that represents an object with a constructor that accepts zero or more arguments. You’ll need this to type your mixins later.

```
<pre class="prettyprint lang-typescript">
type Constructor<T = {}> = new (...args: any[]) => T;
```

### Declaring TypeScript Mixins

Mixins are just functions. They use the constructor type and return a class that extends the supplied base type. The shape of a mixin is so similar, you’ll probably add a snippet that just needs a function name, after which you can fill in the class body.

You can add as many class members as you like to the return class in your mixin.

```
<pre class="prettyprint lang-typescript">
function Flies<TBase extends Constructor>(Base: TBase) {
    return class extends Base {
        fly() {
            alert('Is it a bird? Is it a plane?');
        }
    };
}

function Climbs<TBase extends Constructor>(Base: TBase) {
    return class extends Base {
        climb() {
            alert('My spider-sense is tingling.');
        }
    };
}

function Bulletproof<TBase extends Constructor>(Base: TBase) {
    return class extends Base {
        deflect() {
            alert('My wings are a shield of steel.');
        }
    };
}
```

### Augmenting Mixins

Now you can create smoosh-ins using any class, and your mixin functions. All you do is create new augmented types by calling any combination of mixins, for example:

```
<pre class="prettyprint lang-typescript">
class Hero {
    constructor(private name: string) {

    }
}

const BeetleGuy = Climbs(Bulletproof(Hero));

const HorseFlyWoman = Climbs(Flies(Hero));
```

When you use these augmented types, you’ll get full intellisense for all the members, which magically appear for you just as you’d expect.

```
<pre class="prettyprint lang-typescript">
const superhero = new HorseFlyWoman('Shelley');
superhero.climb();
superhero.fly();
```

### Full Example

Here is the full code sample, you can [paste it straight into the TypeScript Playground](https://goo.gl/kEDtv1) to try it out for yourself.

```
<pre class="prettyprint lang-typescript">
type Constructor<T = {}> = new (...args: any[]) => T;

function Flies<TBase extends Constructor>(Base: TBase) {
    return class extends Base {
        fly() {
            alert('Is it a bird? Is it a plane?');
        }
    };
}

function Climbs<TBase extends Constructor>(Base: TBase) {
    return class extends Base {
        climb() {
            alert('My spider-sense is tingling.');
        }
    };
}

function Bulletproof<TBase extends Constructor>(Base: TBase) {
    return class extends Base {
        deflect() {
            alert('My wings are a shield of steel.');
        }
    };
}

class Hero {
    constructor(private name: string) {

    }
}

const BeetleGuy = Climbs(Bulletproof(Hero));

const HorseFlyWoman = Climbs(Flies(Hero));

const superhero = new HorseFlyWoman('Shelley');
superhero.climb();
superhero.fly();
```
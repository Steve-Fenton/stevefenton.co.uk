---
layout: src/layouts/Default.astro
title: 'TypeScript Mixins part three'
navMenu: false
pubDate: 2018-11-07T14:56:50+00:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - TypeScript
---

Don’t worry, the mechanism for creating TypeScript mixins hasn’t changed, but I just wanted to demonstrate that the technique described in [TypeScript Mixins Part Two](/2017/08/typescript-mixins-part-two/) is valid for use with static properties.

Reusing the original example, let’s see what happens if we add static properties to our `Flies` and `Climbs` mixins.

```typescript
type Constructor = new (...args: any[]) => T;

function Flies(Base: TBase) {
    return class extends Base {
        static altitude = 100;
        fly() {
            console.log('Is it a bird? Is it a plane?');
        }
    };
}

function Climbs(Base: TBase) {
    return class extends Base {
        static stickyHands = true;
        climb() {
            console.log('My spider-sense is tingling.');
        }
    };
}

class Hero {
    constructor(private name: string) {

    }
}

const HorseFlyWoman = Climbs(Flies(Hero));

const superhero = new HorseFlyWoman('Shelley');
superhero.climb();
superhero.fly();

console.log(HorseFlyWoman.stickyHands);
console.log(HorseFlyWoman.altitude);
```

Not only does this work at runtime, all of the types are perfectly combined. This is very useful if you need to include static properties in your TypeScript Mixins.
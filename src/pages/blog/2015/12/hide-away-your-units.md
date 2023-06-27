---
title: 'Hide away your units'
navMenu: false
pubDate: 2015-12-04T14:26:34+00:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - OOP
    - TypeScript
---

If you have an object in your code, and that object has some kind of measurement, you might well have done this:

```typescript
class Desk {
    constructor(
        public width: number,
        public depth: number,
        public height: number
        ) {}
}
```

But this will almost certainly lead to some issues… for example, you store your values as centimeters but then find that you need to display millimeters in some territories and inches in others. “That’s easily fixed” you might say… “I can times the value by 10 to get mm, and by 0.393701 to get inches!”.

Of course you *can* do this… but then you start to find the number 0.393701 all over the place in your code… and then you add “search by size” and discover that you are converting back and forth all over the shop when trying to find a desk between 100 somethings and 150 somethings.

So replace your number with something that will allow you to hide away the details…

```typescript
class Desk {
    constructor(
        public width: Length,
        public depth: Length,
        public height: Length
        ) {}
}

class Length {
    constructor(private lengthInMillimeters: number) { }
    
    get millimeters() {
        return this.lengthInMillimeters;
    }
    
    get centimeters() {
        return this.lengthInMillimeters / 10;
    }
    
    get inches() {
        return this.lengthInMillimeters / 25.4;
    }
}
```

Once you have started to hide away all the details in this class, life becomes much easier… this class can handle all comparisons and even provide a simple API for creating itself in different units:

```typescript
class Length {
    private static inchFactor = 25.4;
    private static cmFactor = 10;
    
    constructor(private lengthInMillimeters: number) { }
    
    static fromInches(inches: number) {
        return new Length(inches * Length.inchFactor);
    }
    
    static fromCentimeters(centimeters: number) {
        return new Length(centimeters* Length.cmFactor);
    }
    
    static fromMillimeters(millimeters: number) {
        return new Length(millimeters);
    }
    
    get millimeters() {
        return this.lengthInMillimeters;
    }
    
    get centimeters() {
        return this.lengthInMillimeters / Length.cmFactor;
    }
    
    get inches() {
        return this.lengthInMillimeters / Length.inchFactor;
    }
    
    equals(length: Length) {
        return length.lengthInMillimeters === this.lengthInMillimeters;
    }
    
    isGreaterThan(length: Length) {
        return this.lengthInMillimeters > length.lengthInMillimeters;
    }
    
    isLessThan(length: Length) {
        return this.lengthInMillimeters < length.lengthInMillimeters;
    }
}
```

In some languages, you can even override operators for equals, greater than, and less than, which would allow comparison using the normal ==, operators. Another feature of some languages is that you can hide the constructor, meaning you can only create a length using the static methods, making your code very explicit and confusion free.

In the examples above I have used the smallest unit as the storage unit, but you could use any unit with sufficient granularity, even one that isn’t exposed.

Wherever you are dealing with rounding, store the unit with decimal precision to ensure you don’t round-away from the original number when you convert between units.
---
title: 'AOP with TypeScript'
navMenu: false
pubDate: 2012-11-14T23:04:49+00:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - 'Aspect-Oriented Programming'
    - TypeScript
---

For this example, I am using the [jquery.aop plugin](http://code.google.com/p/jquery-aop/wiki/Reference) to weave aspects into the TypeScript program. Other Aspect-Oriented Programming frameworks are available for JavaScript – but this is the one I have used in JavaScript and is a good example of bringing a JavaScript framework into TypeScript. I will create a follow up to discuss using Aspect later!

As with any JavaScript library, to get the full benefit of TypeScript you will need a definition file, so here is my definition of jquery.aop:

```typescript
declare class Advice {
    unweave(): void;
}

declare interface PointCut {
    target: Object;
    method: string;
}

declare class Aop {
    before: (pointCut: PointCut, advice: Function) => Advice[];
    after: (pointCut: PointCut, advice: Function) => Advice[];
    afterThrow: (pointCut: PointCut, advice: Function) => Advice[];
    afterFinally: (pointCut: PointCut, advice: Function) => Advice[];
    around: (pointCut: PointCut, advice: Function) => Advice[];
    introduction: (pointCut: PointCut, advice: Function) => Advice[];
}

interface JQueryStatic {
    aop: Aop;
}
```

The Advice class represents the function that is returned by calls to the AOP framework. The PointCut interface is used to define the pointCut parameter expected by all of the set-up functions in jquery.aop and the JQueryStatic interface extends the definitions found in the jquery.d.ts definition.

So now we are ready to encapsulate our cross cutting concerns, with all the type checking power of TypeScript. Here is an example where we add a simple visible alert to a TypeScript class.

```typescript
/// <reference path="jquery.d.ts" />
/// <reference path="aop.d.ts" />
class ExampleClass {
    exampleMethod() {
        alert('Hello');
    }
}

jQuery.aop.before(
    { target: ExampleClass, method: 'exampleMethod' },
    function () { alert('Before exampleMethod'); }
);

jQuery.aop.after(
    { target: ExampleClass, method: 'exampleMethod' },
    function () { alert('After exampleMethod'); }
);

var example = new ExampleClass();
example.exampleMethod();
```

Without AOP, calling exampleMethod on an instance of ExampleClass would result in an alert containing the text “Hello” – but without changing the ExampleClass definition we can hook into code points to add our additional logic. In our case, we add more annoying alerts, one before and one after.

In the real world, the AOP code would most likely live in a separate file based on the cross-cutting concern it was adding.

The [jquery.aop reference](http://code.google.com/p/jquery-aop/wiki/Reference) contains the full details, but the functions themselves are well named after the code point they hook you into:

- before
- after
- afterThrow
- afterFinally
- around
- introduction

It is really easy to get started with AOP in TypeScript and it makes even more sense in the context of the modules and classes TypeScript adds.
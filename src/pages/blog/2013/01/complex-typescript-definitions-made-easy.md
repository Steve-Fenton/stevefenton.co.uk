---
id: 669
title: 'Complex TypeScript definitions made easy'
pubDate: '2013-01-23T22:27:10+00:00'
author: 'Steve Fenton'
layout: post
guid: 'https://www.stevefenton.co.uk/?p=669'
permalink: /2013/01/complex-typescript-definitions-made-easy/
interface_sidebarlayout:
    - default
categories:
    - Programming
tags:
    - typescript
---

When it comes to consuming existing JavaScript code in TypeScript, you have a few options at your disposal. You can include JavaScript files in your compilation. You can shift the code into a `.ts` file and fix it up. If these are not an option, you may want to write a TypeScript definition for the JavaScript code.

So here is how you tackle writing complex TypeScript definitions using iterative refinements.

### Step 1 – Definitely Typed

There is nothing worse than spending hours on something then discovering it has already been done. Many popular JavaScript tool-kits and frameworks already have definitions on Boris Yankov’s [Definitely Typed project](http://definitelytyped.org/). All of these existing definitions are just a simple NPM install away (you’ll find them in the @types organisation on NPM).

### Step 2 – Var

Your first step with any definition is this:

```
<pre class="prettyprint lang-typescript">
declare var amazingToolkit: any;
```

This doesn’t give you any type checking, but it instantly lets you use it however you like. This is the universal sink unblocker of TypeScript. If you need to use some JavaScript and don’t have time to define it, this is where you start. You can back-fill the definition later on and the compiler will start to warn you if anything you are using doesn’t match up.

### Step 3 – Options

I normally recommend that you define the stuff you use first. The full definition for the JavaScript can wait in line behind the sub-set you need to use right now. So let’s imagine we have the following two calls in TypeScript that we want to add static typing to:

```
<pre class="prettyprint lang-typescript">
amazingToolkit.AmazingClass.amazingProperty = true;
amazingToolkit.AmazingClass.run(1, 'Hello');
```

There are a few options for specifying a definition. The first is to use the declare keyword. When you prefix a module or class with “declare”, you can put together the type information without any implementation, like this:

```
<pre class="prettyprint lang-typescript">
declare module AmazingToolKit {
    export class AmazingClass {
        static amazingProperty: bool;
        static run(iterations: number, text: string) : void;
    }
}
```

The second option is to use an interface to describe the type information:

```
<pre class="prettyprint lang-typescript">
interface AmazingToolKit {
    AmazingClass: {
        amazingProperty: bool;
        run(iterations: number, text: string) : void;
    };
}
```

From a type checking point of view, these are identical – so when would you use each one?

Using the declare keyword with modules and classes means that your TypeScript code can extend the code in the JavaScript file. For example:

```
<pre class="prettyprint lang-typescript">
declare class MyClass extends AmazingToolKit.AmazingClass {
   
}
```

So this is only appropriate if there is a prototype to extend in the first place – if in doubt, the interface style definitions are the way to go as any TypeScript code would have to implement the whole interface.

### Step 4 – Complex

There are some interesting real-life cases where you need to create more complex definitions. Here are some examples you can refer to that may help.

#### Fluent

You have some JavaScript that let’s you chain your calls…

```
<pre class="prettyprint lang-typescript">
amazing.up().down().left().right().right();
```

All you need to do is return the interface from each call…

```
<pre class="prettyprint lang-typescript">
interface Amazing {
    up() : Amazing;
    down() : Amazing;
    left() : Amazing;
    right() : Amazing;
}

declare var amazing: Amazing;
```

#### Nested

You have some JavaScript that has nested functions…

```
<pre class="prettyprint lang-typescript">
amazing.move(15, 23);
amazing.move.up(23);
```

You just need to create an interface for the “move” component (you can also do this in-line in the Amazing interface, but it is just not as readable), like this – note the anonymous function at the top of the interface, which is our “move(15, 23)” call…

```
<pre class="prettyprint lang-typescript">
interface AmazingMove {
    (x: number, y: number) : void;
    up(distance: number) : void;
    down(distance: number) : void;
    left(distance: number) : void;
    right(distance: number) : void;
}

interface Amazing {
    move: AmazingMove;
}

declare var amazing: Amazing;
```

#### Array of functions

One question that crops up a lot is how to define a function that requires you to pass an argument that is an array of functions…

```
<pre class="prettyprint lang-typescript">
var funcs = [
    function (x) { alert(x); },
    function (x) { console.log(x); }
];

amazing.callAll(funcs);
```

This is how you would define it…

```
<pre class="prettyprint lang-typescript">
interface Amazing {
    callAll(funcs: { (x: string) : void; }[]): void;
}

declare var amazing: Amazing;
```

This can be simplified by looking at the inner function definition “(x: string) : void;”, which is simple wrapped in curly braces “{ (x: string) : void; }” and then given the array literal tail “{ (x: string) : void; }\[\]”.

#### Others

If you have come across a tricky definition that you are proud to have solved, let me know and I’ll happily add it to the list along with full credit to you!

### Step 5 – Do I Model Private Members?

If the JavaScript library has “private” members, should you model them in your definition? There is a simple rule for this.

If the member is private thanks to a closure that hides it from the outside world, don’t add it to the definition. For example, the “update” function in the following code example:

```
<pre class="prettyprint lang-typescript">
var Example = (function () {
    var update = function() {
        alert('Private');
    }

    function Example() {
    }

    Example.prototype.doIt = function () {
        update();
    };
    return Example;
})();
```

If the member has been added to the prototype of the object, add it to the definition so you know not to create a member with the same name on a sub-class. For example, the “update” function in the following variation of the code example:

```
<pre class="prettyprint lang-typescript">
var Example = (function () {
    function Example() {
    }

    Example.prototype.update = function() {
        alert('Private');
    };

    Example.prototype.doIt = function () {
        this.update();
    };
    return Example;
})();
```

### Step 6 – Definitely Typed

That feeling you get when you find a definition already written – you can cause that feeling for other people by submitting your definition to Boris Yankov’s [Definitely Typed GitHub project](https://github.com/borisyankov/DefinitelyTyped).
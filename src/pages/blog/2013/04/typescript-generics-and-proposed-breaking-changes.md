---
id: 610
layout: src/layouts/Default.astro
title: 'TypeScript generics and proposed breaking changes'
pubDate: 2013-04-22T15:06:27+01:00
author:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=610'
permalink: /2013/04/typescript-generics-and-proposed-breaking-changes/
interface_sidebarlayout:
    - default
categories:
    - Programming
tags:
    - typescript
---

You may remember that back in January 2013 I penned an article about [what Generics might look like in TypeScript](https://www.stevefenton.co.uk/2013/01/An-Early-Vision-Of-TypeScript-Generics/) when they were added. The great news is that it was pretty much spot on, so to get the skinny on [TypeScript Generics in the 0.9 alpha release, just read the article from January](https://www.stevefenton.co.uk/2013/01/An-Early-Vision-Of-TypeScript-Generics/). The brief version is that you can use a generic type and add a type constraint using familiar C#-style syntax:

```
<pre class="prettyprint lang-typescript">
interface Repository<T extends Entity> {
    getById(id: number): T;
}
```

The differences to bear in mind are that…

1. The type doesn’t have to explicitly implement or extend “Entity” in the above example. TypeScript will be happy with a compatible type (one with the requisite properties and methods)
2. You use “extends” in the type constraint no matter whether you are using a class or an interface. (You might have assumed you would use “implements” when using an interface as a type constraint).

If you want to use an expression that looks a bit like generics, you need to add some parenthesis to help the compiler out… although you probably just need to have a word with yourself and just put one expression per line!

```
<pre class="prettyprint lang-typescript">
(something < x), y > (z) // expression
something < x, y > (z) // generic
```

Enough about the awesomeness of generics in TypeScript. What else is incoming in TypeScript 0.9.x that you should worry about?

### Arrays Are Generic

Okay, so I couldn’t stop talking about generics just yet, because the “Array” type is now generic. This means you could now (if you wanted) use the generic type parameter with the array type, which is analogous to the old way of marking up and array – here they both are.

```
<pre class="prettyprint lang-typescript">
var a: number[]; // you can still use this
var x: Array<number>; // this just shows off generics
```

### Bool Type Deprecated

The “bool” type is obsolete and the “boolean” type is now the correct one to use. This won’t break in 0.9.x if the preview is anything to go by – but it will eventually be removed, so it is time to update your TypeScript files.

### Modules

Modules are being simplified and you should start to consider them primarily as name-spaces. Don’t start thinking crazy thoughts about using modules as if they were classes. Seriously. Stop it.

### Overloads

You must now put any overloads directly before the method that they are overloading. This is common sense, but previous versions of the compiler were chilled out about this and 0.9.x compilers aren’t. You’ll need to move them if you have been placing them in funky locations.

You will also have to specify the return types explicitly on overloads. Don’t hate dude; appreciate.

### Static Methods

The 0.9.x compiler requires static methods to be fully qualified. Previous compilers allowed you to drop out the class name if you called the static method from inside the same class. You will need to add the class name in from now on.

```
<pre class="prettyprint lang-typescript">
class Example {
    static staticMethod() {
       
    }
   
    static otherStaticMethod() {
        // This will need to be Example.staticMethod();
        staticMethod();
    }
}
```

### Declare Needed In Definition Files

Originally, you didn’t need to use the “declare” keyword in definition files. The contents of a definition file was treated implicitly as if it had this keyword. From 0.9.0 you’ll need to add the “declare” keyword in definition files just like you do in normal TypeScript files.

[The Definitely Typed project](https://github.com/borisyankov/DefinitelyTyped) will be busy for a week or two on this one.

### Further Reading

You can read the announcement and download the alpha preview, which may be unstable, on the [MSDN blog by Jonathan Turner](http://blogs.msdn.com/b/typescript/archive/2013/04/22/10413065.aspx).
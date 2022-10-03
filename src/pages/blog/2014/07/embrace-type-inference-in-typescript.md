---
layout: src/layouts/Default.astro
navMenu: false
title: 'Embrace type inference in TypeScript'
pubDate: 2014-07-18T21:36:12+01:00
authors:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=316'
interface_sidebarlayout:
    - default
categories:
    - Programming
tags:
    - TypeScript
---

TypeScript is structurally typed. I spend a good amount of time explaining this in [Pro TypeScript](/Content/Pro-TypeScript/) because it is incredibly important. It is, in fact, more important than the features that are getting all of the headlines. Modules, namespaces, classes, type annotations, generics, destructuring… these are all great language features; but the combination of a structural type system and powerful type inference is truly fabulous.

If you are pushed for time, simply commit this phrase to memory and let it swim around for a bit:

> Don’t write a type-annotation if you can avoid it.

### Too Much Information

Here is a typical example of a program with a bunch of types…

```
interface Person {
    name: string;
    address: string;
    telephone: string;
}

interface Staff {
    stageManager: Person;
    lighting: Person;
    sound: Person;
}

const staff: Staff = {
    stageManager: { name: 'Dan', address: '1 Street Lane', telephone: '0898 007' },
    lighting: { name: 'Divya', address: '1 Crescent Road', telephone: '0898 008' },
    sound: { name: 'Martin', address: '1 Cul De Sac Alley', telephone: '0898 009' }
};

//...

function showName(person: Person): void {
    console.log(person.name);
}

showName(staff.stageManager);
showName(staff.lighting);
showName(staff.sound);
```
This is exactly what you’d do in a nominal type system – have a bunch of named types and then *decorate all the things* with those types. In some cases, you’ll still want to do this in TypeScript… but let’s take a second to think about our program.

There is only one true type constraint in this program – the showName function relies on the object having a “name” property. This is the only place we need to specify a contract in our program. If we re-think our type annotations, we can decide to…

> Only use type annotations to state a required type.

### Do Less!

Our code now looks like this:

```
const staff = {
    stageManager: { name: 'Dan', address: '1 Street Lane', telephone: '0898 007' },
    lighting: { name: 'Divya', address: '1 Crescent Road', telephone: '0898 008' },
    sound: { name: 'Martin', address: '1 Cul De Sac Alley', telephone: '0898 009' }
};

//...

function showName(person: { name: string }): void {
    console.log(person.name);
}

showName(staff.stageManager);
showName(staff.lighting);
showName(staff.sound);
```
Do we no longer have any types in the program? Actually, we have all the same types that we had before, except instead of hand-writing the interfaces and annotations, TypeScript is doing it all for us – except for the requirement that a person argument must have a name property that is a string. (Side note: the function now depends on a single property, rather than accidentally depending on all of the properties of `Person` as it did before. This is a good thing!)

If we were to remove the “name” property from one of the staff, we’d get a type error when calling the `showName` function. If we were to add additional properties to the lighting staff member, they would instantly be available (they wouldn’t if we were using an interface that didn’t have the additional property).

When using type annotations, life is just better when you [do less](https://www.youtube.com/watch?v=38CLCudCirw).

So here is the way I determine when I need to step in a tell the compiler about the type.

Open the project properties, select “TypeScript Build” and un-tick the box that says “Allow implicit any types” so the compiler will tell you when it hasn’t managed to work out a type for itself. Now just fill in the types each time you get a compiler warning.

If you aren’t using Visual Studio, it is just a case of passing the following flag to the compiler:

`<br></br>--noImplicitAny<br></br>`

### Where Types *Really* Matter

Now just one bit of detail before we all bin every type annotation in the whole program. There is one place you want to add types consistently: functions. Whether it is a stand-alone function, or a method on a class – you should specify the types for the arguments and the return type. The only exception to this rule is if the types are already well-known because of contextual types… but if you need to keep it simple – add types of your functions.
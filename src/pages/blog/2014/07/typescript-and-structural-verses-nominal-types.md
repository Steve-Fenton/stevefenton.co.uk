---
layout: src/layouts/Default.astro
navMenu: false
title: 'TypeScript and structural verses nominal types'
pubDate: 2014-07-31T21:28:58+01:00
authors:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=312'
interface_sidebarlayout:
    - default
categories:
    - Programming
tags:
    - typescript
---

This blog is the result of my thought process over a proposed feature for TypeScript that would bring some nominal types to TypeScript (see [GitHub](https://github.com/Microsoft/TypeScript/issues/202)).

TypeScript is a structurally typed language. Take the following simple example – in order to satisfy the type of “Duck”, you can either supply a “Duck”, or something that looks like a duck and quacks like a duck – whether that is a class, or an object – or whatever.

The same is true for any *structure*. By structure, we’re talking classes, interfaces, type annotations – whatever!

```
<pre class="prettyprint lang-typescript">class Duck {
    show() : string {
        return 'most duck, such feather';
    }
   
    speak() : string {
        return 'quack';
    }
}

class LooksLikeADuckQuacksLikeADuck {
    show() : string {
        return 'some duck, some feather'
    }
    speak() : string {
        return 'Ahem; quack';
    }
}

var duck: Duck;
// Fine
duck = new Duck();
// Also fine
duck = new LooksLikeADuckQuacksLikeADuck();
```
Of course, we can make the example more elaborate – but all we do is make the compiler work harder, the result is the same – with one exception.

If you create a class with private members, you create a structure that cannot be imitated. For example, the result of the original code is transformed entirely, simply by adding a private member to Duck:

```
<pre class="prettyprint lang-typescript">class Duck {
    private anyField: string;
   
    show() : string {
        return 'most duck, such feather';
    }
   
    speak() : string {
        return 'quack';
    }
}
```
The “imposter” class doesn’t implement this private field, so it is no longer considered to have the same structure. You may think you can remedy this by adding a matching private field to the “imposter”, but actually this will result in the compiler warning you that the type cannot be converted, because of the private field.

So if you are looking for nominal types, the simple addition of a private member will get you the behaviour you need, despite TypeScript not being a nominally typed language. This may actually be enough for domain-driven design enthusiasts, who need this behaviour for their domain id classes (this prevents the common accident of using the wrong id when calling a method, for example, because the ids are not all numbers, each one has a unique type).

Of course, this isn’t the cleanest option for getting this behaviours (hence the discussion on GitHub). So here are some ideas floating around in my head.

Important note: these are just ideas from my head. They are not planned to be added to TypeScript and even if they were, there is every chance the TypeScript team would come up with a much better implementation than I have.

### Nominal Types in TypeScript…

My idea was to create a simple keyword that can be used either to create a nominal type, which would be treated nominally, not structurally, throughout the program.

For the purposes of an example I have used the “named” keyword to mark the type as nominal, it could be “nominal” or “fenton” or anything:

```
<pre class="prettyprint lang-typescript">named class Duck {
    show() : string {
        return 'most duck, such feather';
    }
   
    speak() : string {
        return 'quack';
    }
}
```
Now the Duck class (or any class or interface marked with the “named” keyword) would be nominal and would not be compatible with an identical structure. No need for a private member – this type is nominal.

#### A Bridge Too Far

The keyword could also be used to create a nominal-style restriction locally to a method or type annotation, although this is a bridge too far and opens up a whole can or worms when it comes to whether the type is nominal when calling the method, when used inside the method, when used inside of a method called from this method and so on…

```
<pre class="prettyprint lang-typescript">function getById(id: named ProductId) {
    //...
}
```
This would state that the structural type “ProductId” should be treated as a nominal type for this function (or variable when used as a variable type annotation, for example). If you accidentally passed an identical structure such as “PersonId”, although it is structurally identical it would be rejected because the id parameter is nominal.

So this is my idea for nominal types in TypeScript – in the meantime, you can use the private member trick (or the other common trick, the funkily-named public member that won’t accidentally match other types).
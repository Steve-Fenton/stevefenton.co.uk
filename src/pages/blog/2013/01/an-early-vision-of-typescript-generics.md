---
layout: src/layouts/Default.astro
navMenu: false
title: 'An early vision of TypeScript generics'
pubDate: 2013-01-21T22:33:30+00:00
author:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=671'
interface_sidebarlayout:
    - default
categories:
    - Programming
tags:
    - typescript
---

Probably the most highly anticipated features of TypeScript is generics. They were a massive hit when they arrived in C# and there is no reason to suspect they will be any less popular with TypeScript programmers.

So how will generics in TypeScript look and behave? Here is an imaginary example. <del>Please bear in mind this feature doesn’t yet exist in the TypeScript language – so this may not reflect how it will be implemented when it does arrive</del> **As of the 0.9.0 release, this article does appear to be correct, so it turns out this *is* how it is being implemented**.

So let’s imagine we have this pre-generic code – a repository that gives us some data, either a Name or a Product…

```
<pre class="prettyprint lang-typescript">
interface Entity {
    id: number;
}

class Name implements Entity {
    constructor(public id: number, public firstName: string, public lastName: string) {
       
    }
}

class Product implements Entity {
    constructor(public id: number, public title: string, public available: bool) {
   
    }
}

interface Repository {
    getById(id: number): Entity;
}

class NameRepository implements Repository {
    getById(id: number) : Entity {
        return new Name(id, 'Steve', 'Fenton');
    }
}

class ProductRepository implements Repository {
    getById(id: number) : Entity {
        return new Product(id, 'Mobile Thing', true);
    }
}

var repository = new NameRepository();
var name = <Name> repository.getById(1);
```

We don’t have generics, so we have to convert our general “Entity” into our specific “Name”, or drop the shared interface and use only specific repositories, or use the any type or otherwise fiddle about.

With generics, we could use…

```
<pre class="prettyprint lang-typescript">
interface Entity {
    id: number;
}

class Name implements Entity {
    constructor(public id: number, public firstName: string, public lastName: string) {
       
    }
}

class Product implements Entity {
    constructor(public id: number, public title: string, public available: bool) {
   
    }
}

interface Repository<T extends Entity> {
    getById(id: number): T;
}

class NameRepository implements Repository<Name> {
    getById(id: number) : Name {
        return new Name(id, 'Steve', 'Fenton');
    }
}

class ProductRepository implements Repository<Product> {
    getById(id: number) : Product {
        return new Product(id, 'Mobile Thing', true);
    }
}

var repository = new NameRepository();
var name = repository.getById(1);
```

So our repository requires the generic type &lt;T&gt; to be a class that implements the Entity interface (although you still use the “extends” keyword when defining a type constraint), so you can’t just pass any type argument you like.

The implementations of Repository tell the Repository interface the type they operate on, which means they can now return their specific type, not the interface. Our name variable doesn’t need a cast, it will be of type Name, because that is what a NameRepository returns.

Type parameters such as this may also be available for generic functions and classes as well as the interface in this example.

I’m really looking forward to seeing how the final implementation looks and how it gets used in practice.
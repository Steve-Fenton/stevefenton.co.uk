---
layout: src/layouts/Default.astro
navMenu: false
title: 'Why private members result in unmatchable TypeScript structures'
pubDate: 2014-12-03T19:47:54+00:00
author:
    - steve-fenton

categories:
    - Programming
tags:
    - typescript
---

[![Pro TypeScript](https://www.stevefenton.co.uk/wp-content/uploads/2015/07/pro-typescript-199x300.jpg)](https://www.stevefenton.co.uk/publications/pro-typescript/)I covered this in detail in Pro TypeScript, but the question comes up often, so here is a quick refresher on how private members affect type matching in TypeScript’s structural type system. class CustomerId { constructor(private id: number) {} getId() { return this.id; } } class ProductId { constructor(private id: number) {} getId() { return this.id; } }

If you create a new CustomerId, it cannot be assigned to a variable of type ProductId, despite the fact they *look* exactly identical. They both have a private property named “id” and a public method named “getId”.

Here is the reason this is such an important feature in TypeScript…

```
class CustomerId {
    constructor(private id: number) {}
       
    getId() { return this.id; }
}
       
class ProductId {
    constructor(private id: number) {}
               
    getId() { return this.id; }
}

function getCustomer(id: CustomerId) {
    // ...
}

var id1 = new CustomerId(1);
var id2= new ProductId(2);

// Type passes
getCustomer(id1);

// Error - wrong type
// The compiler just saved you from a tricky little bug!
getCustomer(id2);
```
I am using the Domain Driven Design technique of creating identifiers to wrap the primitive number type. The purpose of creating this extra code is that it is easy to accidentally pass the wrong id to a method if the method simply accepts a number. For example, I wanted to pass “item.ProductId” number, but I slipped when typing and chose the “item.PortfolioId” number instead.

The best case scenario is that the PortfolioId doesn’t exist in the Product table and I get an error. The worst case scenario is that there is a Product with the same id as the Portfolio and so instead of getting a simple error that will lead me to spot my mistake, I actually have a system that looks like it is working, but exhibits really strange behaviour that can’t easily be tracked back to my original typing error.

So it is worth creating classes to wrap “ProductId”, “PortfolioId”, “CustomerId” and so on, because instead of an error or some crazy behaviour, I get a compile-time warning that “Argument of type PortfolioId is not assignable to type ProductId”. The programming Armageddon has been avoided.

And this neatly demonstrates why private members *should* cause a type to be structurally unmatchable in a structural type system.

If there is ever a case where I do need to be able to substitute any of the identifiers for one another, it can be done with a simple interface:

```
interface GeneralId {
    getId() : number;
}

class CustomerId {
    constructor(private id: number) {}
       
    getId() { return this.id; }
}
       
class ProductId {
    constructor(private id: number) {}
               
    getId() { return this.id; }
}

function nonSpecificMethod(id: GeneralId) {
    //...
}

var id1 = new CustomerId(1);
var id2 = new ProductId(2);

// Type passes
nonSpecificMethod(id1);

// Type passes
nonSpecificMethod(id2);
```
---
layout: src/layouts/Default.astro
navMenu: false
title: 'TypeScript: Using classes as interfaces'
pubDate: 2017-11-05T16:05:52+00:00
author:
    - steve-fenton
categories:
    - Programming
tags:
    - ood
    - typescript
---

The practice of using classes as interfaces in TypeScript is most commonly promoted in the [Angular style guide](https://angular.io/guide/styleguide#interfaces), which says (emphasis mine):

> *Consider* using a class instead of an interface.

The recommendation is to think about using a concrete class as an interface using the `implements` keyword. I am hoping to convince you to do your best to avoid this practice where you can.

### Using classes as interfaces

Because TypeScript has a structural type system, every type is really just a shape with some width. You might have classes, interfaces, annotations, types, and other inferred structures; but they are all just shapes.

Here is an example using a class traditionally, and as an interface.

```
class Customer {
    constructor(public id: number, public name: string) {

    }
}

// Using a Class as a Class
class VipCustomer extends Customer {
    constructor(id: number, name: string, public value: number) {
        super(id, name);
    }
}

// Using a Class as an Interface
class RewardCustomer implements Customer {
    public id: number;
    public name: string;
}

// A function that requires a "Customer Shape"
function logCustomer(customer: Customer) {
    console.log(customer.id, customer.name);
}

// All valid calls to logCustomer
logCustomer(new Customer(1, 'Robin'));
logCustomer(new VipCustomer(2, 'Marion', 5000));
logCustomer(new RewardCustomer());
logCustomer({ id: 3, name: 'Tuck' });
```
This example demonstrates that a function that must be passed a “Customer Shape” will take any compatible structure. We are not in a nominal language that *must* be passed `Customer` or an explicit sub-class.

You’ll also see that by using the `implements` keyword, we don’t inherit from the `Customer` class but instead must implement the members as it if were an interface.

In the same way, you can create an interface from a class, like this:

```
interface NamedEntity extends Customer {

}
```
The `NamedEntity` interface gets all of the members of the `Customer` class. That’s currently the id and the name.

The flexibility of using classes as interfaces seems great, but there are some major architectural concerns to bear in mind.

### The Stable Abstractions Principle

I’m going to summarise quite a broad architectural concern here, there is a lot more to this than I can cover briefly. Your code can be charted on the “I/A” graph, where abstractness (A) is plotted against stability (I). The main sequence of your code should follow the diagonal line from the top left (highly abstract, highly stable) to the bottom right (highly concrete, highly unstable).

![Zone of Pain and Zone of Uselessness](https://www.stevefenton.co.uk/wp-content/uploads/2017/11/zone-of-pain-and-zone-of-uselessness.png)

This is because very stable code needs to be abstract in order to allow extension, and highly volatile code should be concrete so it is easy to change. Changes to the concrete classes does not usually result in changes to the abstractions. This is what makes interfaces less volatile than implementations.

By using classes as interfaces, you land right in the zone of pain. This is the area on the bottom-left of the graph that contains code that is concrete, and unstable. Yowch. Every change you make to the class implicitly results in a change to the class-as-an-interface, which makes the interface as unstable as the class.

### Interface Segregation Principle

By using a class as an interface you will also unwittingly break the Interface Segregation Principle (ISP). That’s the *I* in *SOLID*.

The class-as-an-interface will contain all of the members of the class. That’s the members it has now – and everything you add in the future. This is largely equivalent to all those people that have a 1:1 relationship between classes and interfaces in other languages.

Let’s look at this way, the ISP states:

> “…no client should be forced to depend on methods it does not use…”

Now imagine your class-as-an-interface has trickled out into five or six locations and you add a new method to the original class. Now you get errors because the method is missing. Functions that previously accepted an object will now reject it – because it is missing a member that the function doesn’t even need. This is not SOLID code.

Here is an updated `Customer` class from the original examples in this article.

```
class Customer {
    constructor(public id: number, public name: string) {

    }

    greet() {
        return `Hello ${this.name}`;
    }
}
```
This breaks `RewardCustomer` and two of the calls to the `logCustomer` function – and in all three cases, the `greet` method is not needed.

### Painful privates

Are you still thinking about using classes as interfaces? Well, consider a case where you want a private member on your `Customer` class.

```
class Customer {
    constructor(public id: number, public name: string) {

    }

    private encapsulatedMethod() {
        return 5;
    }
}
```
We have a similar problem to when we added a public member, except things are a lot worse. You actually cannot create any matching types to `Customer` any more, because it has a private member. For example, you can’t fix `RewardCustomer` by adding the method:

```
class RewardCustomer implements Customer {
    public id: number;
    public name: string;

    private encapsulatedMethod() {
        return 5;
    }
}
```
If you try this, you’ll be told that:

> Class ‘RewardCustomer’ incorrectly implements interface ‘Customer’. Types have separate declarations of a private property ‘encapsulatedMethod’.

That’s excepting the fact that your `RewardCustomer` doesn’t actually want to add the method in the first place.

You can see that the end result of this problem will be that the `private` access modifier will be changed to fix the problem, breaking the principle of least privilege and breaking encapsulation all in one go.

### Interfaces as interfaces

It sounds obvious, then – perhaps a truism – that when you need an interface, a strong contender ought to be an interface. Here is the whole lot with an interface thrown in at the start that actually does the job of a real interface. It sits in the stable/abstract space, describes just a small set of members, and results in everything working.

```
class NamedEntity {
    public id: number;
    public name: string;
}

class Customer {
    constructor(public id: number, public name: string) {

    }

    greet() {
        return `Hello ${this.name}`;
    }

    private encapsulatedMethod() {
        return 5;
    }
}

// Using a Class as a Class
class VipCustomer extends Customer {
    constructor(id: number, name: string, public value: number) {
        super(id, name);
    }
}

// Using a Class as an Interface
class RewardCustomer implements NamedEntity {
    public id: number;
    public name: string;
}

// A function that requires a "Customer Shape"
function logCustomer(customer: NamedEntity) {
    console.log(customer.id, customer.name);
}

// All valid calls to logCustomer
logCustomer(new Customer(1, 'Robin'));
logCustomer(new VipCustomer(2, 'Marion', 5000));
logCustomer(new RewardCustomer());
logCustomer({ id: 3, name: 'Tuck' });
```
One particular element to zoom in on here is the `logCustomer` function. It depends on the `NamedEntity` interface and uses all of its members. This means the function can be called from the widest range of types. Compared to the situation with the class-as-an-interface, where the function depends on an increasing number of members that it doesn’t actually use – and hopefully the benefits become clear.

### Summary

Hopefully you will be a little cautious about using classes as interfaces. There are many pitfalls to that approach. Just because one of the largest projects on the planet mentions it in a style guide doesn’t make it right.
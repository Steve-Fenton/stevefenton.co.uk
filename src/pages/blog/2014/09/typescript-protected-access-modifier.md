---
id: 277
layout: src/layouts/Default.astro
title: 'TypeScript protected access modifier'
pubDate: 2014-09-26T20:49:18+01:00
author:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=277'
permalink: /2014/09/typescript-protected-access-modifier/
interface_sidebarlayout:
    - default
categories:
    - Programming
tags:
    - typescript
---

The highly anticipated arrival of the protected access modifier is near. The protected keyword is similar to the implementation of protected in Java and C# – but as always, there are some interesting details – because TypeScript is structural, not nominal.

- Private members are only accessible within their declaring class.
- Protected members are only accessible within their declaring class and classes derived from it.
- Public members can be accessed anywhere.

When you override a private or protected member, you have to apply the same access level.

```
<pre class="prettyprint lang-typescript">
class MyClass {
    private privateProperty: string;
    protected protectedProperty: string;
}

class MySubClass extends MyClass {
    notAllowed() {
        return this.privateProperty;
    }
    thisIsAllowed() {
        return this.protectedProperty;
    }
}
```

You can also access the protected property in the following situation.

```
<pre class="prettyprint lang-typescript">
class MyClass {
    private privateProperty: string;
    protected protectedProperty: string;
}

class MySubClass extends MyClass {
    static compare(a: MyClass, b: MySubClass) {
        // Accessing MyClass properties
        var notAllowed1 = a.privateProperty;
        var notAllowed2 = a.protectedProperty;

        // Accessing MySubClass properties
        var notAllowed3 = b.privateProperty;
        var allowed = b.protectedProperty;
    }
}
```

Interesting note: In the above example, the static method on MySubClass accepts arguments of type MyClass and MySubClass – it is able to access the protected property on the instance of MySubClass (but not on MyClass).

Both private and protected members affect type matching in TypeScript: Private members only ever match themselves (i.e. the same private member from the same class). Protected members match themselves and overridden versions of themselves on sub-classes.

The protected keyword, just like the existing private keyword, can only be used within a class – not on an interface. If an interface inherits protected properties (remember, you can inherit from a class with your interface), then it can’t declare properties with the same name.

The final point to bear in mind is that the protected keyword is a compile-time constraint. You can use it to indicate intent, but not to enforce the rules at runtime.
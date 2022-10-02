---
id: 185
layout: src/layouts/Default.astro
title: 'Union types ease TypeScript getters and setters'
pubDate: 2015-02-08T16:13:40+00:00
author:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=185'
permalink: /2015/02/union-types-ease-getters-and-setters/

categories:
    - Programming
tags:
    - typescript
---

A classic problem in TypeScript was the constraint on getters and setters that said they had to return the same type. This is normally a useful constraint, because it makes no sense to call a property with a number, but get back a string when you access it – but there are some cases where you do want to break the constraint.

The great big example of this at the moment is promises, but you can use this technique whenever you have a good reason to accept and return different types.

```
<pre class="prettyprint lang-typescript">
interface Example<T> {
    value: T;
}

class MyClass {
    private _example: Example<string>;

    set example(value: string) {
        this._example = { value: value };
    }

    get example() : Example<string> {
        return this._example;
    }
}
```

In the above example, the compiler warns you that the getter and setter are not compatible. However, you can fix that using a union type, as shown below.

```
<pre class="prettyprint lang-typescript">
interface Example<T> {
    value: T;
}

type StringExample = string | Example<string>;

class MyClass {
    private _example: Example<string>;

    set example(value: StringExample) {
        this._example = <Example<string>> { value: value };
    }

    get example() : StringExample {
        return this._example;
    }
}
```

You can further improve on this example by introducing a type check on the setter to make sure you have been passed a string. I have shown an example of throwing an argument exception (commented out) or simply using the value as in this case it is the type we need.

```
<pre class="prettyprint lang-typescript">
interface Example<T> {
    value: T;
}

type StringExample = string | Example<string>;

class MyClass {
    private _example: Example<string>;

    set example(value: StringExample) {
        if (typeof value !== 'string') {
            // throw new Error('Argument exception');
            // or
            this._example = value;
        } else {
            this._example = { value: value };
        }
    }

    get example() : StringExample {
        return this._example;
    }
}
```

Not quite perfect… this code solves the getter/setter problem, but it will mean you have to introduce type checks or type assertions if you need to guarantee you have a specific type from the union type. This is why the compiler was updated to automatically type arguments inside of a guard clause (which the last example shows, because inside the if/else statement the value parameter is typed string and Example&lt;string&gt;.
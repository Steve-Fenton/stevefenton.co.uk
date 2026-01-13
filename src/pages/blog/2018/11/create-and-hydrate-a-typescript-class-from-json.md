---
title: 'Create and hydrate a TypeScript class from JSON'
navMenu: false
pubDate: 2018-11-29T11:15:26+00:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - TypeScript
description: Provides a TypeScript function to hydrate a class instance from JSON data, with optional strict mode for property validation.
---

It is pretty common to want to hydrate a class from a JSON value obtained in a service. If you just parse the JSON you get the properties, but not the behaviours that you expect. As this is a reasonably common problem to solve, it is worthing doing it just once.

The following function will dynamically create and hydrate a class when passed a string of JSON data. You need to pass your class and the JSON string. Everything else is optional.

```typescript
function hydrate<T>(constr: { new(...args: any[]): T }, data: string, strictMode: boolean = true, ...args: any[]): T {
    const obj = JSON.parse(data);
    const instance = new constr(...args);

    for (let key in obj) {
        if (!strictMode || instance.hasOwnProperty(key)) {
            instance[key] = obj[key];
        }
    }

    return instance;
}
```

Here is a basic use of this hydrate function. The default mode is “strict”, which means only existing members will be hydrated. If the JSON contains more data than you want, it is discarded – rather than arbitrarily adding more members to the class. For strict mode to work, all members to mapped must be initialised in the class with a value.

```typescript
class Example {
    public name: string = '';
    public val: number = 0;

    getToken() {
        return `${this.name}_${this.val}`;
    }
}

const data = `{ "name": "Fenton", "val": 5}`;

const example = hydrate(Example, data);

// "Fenton_5"
console.log(example.getToken());
```

If you don’t initialise your members, you can still hydrate it on the condition that you *might* gain properties (which will be ignored in your TypeScript program).

```typescript
class Example {
    public name: string;
    public val: number;

    getToken() {
        return `${this.name}_${this.val}`;
    }
}

const data = `{ "name": "Fenton", "val": 5}`;

// Disabling strict mode to force all properties to map,
// even if they don't exist on our new class instance
const example = hydrate(Example, data, false);
```

You can use the same calls to hydrate a class that has constructor parameters. In these cases, the values will be undefined until the data is populated during hydration. In cases where you need to pass arguments for construction to work you can do that too:

```typescript
class Example {
    public name: string;
    public val: number;

    constructor(public description: string) { }

    getToken() {
        return `${this.name}_${this.val}:${this.description}`;
    }
}

const data = `{ "name": "Fenton", "val": 5}`;

const example = hydrate(Example, data, false, 'My Description');

// "Fenton_5:My Description"
console.log(example.getToken());
```

In all cases, the operation is not guaranteed to populate members in a type safe way as this would require runtime inspection of types. Where you are hydrating and dehydrating state for a class, it works pretty well.
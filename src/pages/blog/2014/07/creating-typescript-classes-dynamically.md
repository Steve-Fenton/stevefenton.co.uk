---
title: 'Creating TypeScript classes dynamically'
navMenu: false
pubDate: 2014-07-11T21:41:44+01:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - TypeScript
---

The question of how you could dynamically create a TypeScript class at runtime has come up a few times. It isn’t possible to lean too heavily on the type information in your program, because it is all erased during compilation – so you have to use a JavaScript method to do it.

Despite needing to use JavaScript, you can make your life easier by making the creation accept a generic type argument, so you can use the object with all your usual type checking and auto-completion.

Here is an example the class and method that creates instances:

```typescript
class InstanceLoader {
    static getInstance<T>(context: Object, name: string, ...args: any[]) : T {
        var instance = Object.create(context[name].prototype);
        instance.constructor.apply(instance, args);
        return <T> instance;
    }
}
```

And you can call it like so:

```typescript
interface NamedThing {
    name: string;
}

class Example {
    public name = 'Janice';
}

var example = InstanceLoader.getInstance<NamedThing>(window, 'Example');

alert(example.name);
```

Now you can create any class that implements the NamedThing interface (explicitly or implicitly) dynamically at runtime. The interface simply helps you with type checking and auto-completion – so you only need an interface that describes the properties you expect to exist on the returned object.

If you need to pass constructor arguments, you can do that too:

```typescript
interface NamedThing {
        moreInput: string;
}

class Example {
        public name = 'Janice';
       
        constructor(public input: string, public moreInput: string) {
               
        }
}

var example = InstanceLoader.getInstance<NamedThing>(window, 'Example', 'Some input', 'Some more input');
alert(example.moreInput);
```
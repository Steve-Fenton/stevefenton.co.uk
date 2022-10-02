---
id: 4374
layout: src/layouts/Default.astro
title: 'Create and hydrate a TypeScript class from JSON'
pubDate: 2018-11-29T11:15:26+00:00
author:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=4374'
permalink: /2018/11/create-and-hydrate-a-typescript-class-from-json/
medium_post:
    - 'O:11:"Medium_Post":11:{s:16:"author_image_url";s:75:"https://cdn-images-1.medium.com/fit/c/400/400/1*eXkhfEuF41g5W_xnc_ydLA.jpeg";s:10:"author_url";s:38:"https://medium.com/@steve.fenton.co.uk";s:11:"byline_name";N;s:12:"byline_email";N;s:10:"cross_link";s:3:"yes";s:2:"id";s:12:"98f96e6a847f";s:21:"follower_notification";s:3:"yes";s:7:"license";s:19:"all-rights-reserved";s:14:"publication_id";s:2:"-1";s:6:"status";s:5:"draft";s:3:"url";s:51:"https://medium.com/@steve.fenton.co.uk/98f96e6a847f";}'
categories:
    - Programming
tags:
    - typescript
---

It is pretty common to want to hydrate a class from a JSON value obtained in a service. If you just parse the JSON you get the properties, but not the behaviours that you expect. As this is a reasonably common problem to solve, it is worthing doing it just once.

The following function will dynamically create and hydrate a class when passed a string of JSON data. You need to pass your class and the JSON string. Everything else is optional.

```
<pre class="prettyprint lang-typescript">
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

```
<pre class="prettyprint lang-typescript">
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

```
<pre class="prettyprint lang-typescript">
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

```
<pre class="prettyprint lang-typescript">
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
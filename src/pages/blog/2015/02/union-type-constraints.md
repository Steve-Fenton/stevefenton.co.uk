---
layout: src/layouts/Default.astro
navMenu: false
title: 'TypeScript union type constraints'
pubDate: 2015-02-01T16:16:52+00:00
authors:
    - steve-fenton

categories:
    - Programming
tags:
    - typescript
---

When you use a union type in TypeScript, the union type is eligible to be used as a generic type constraint. Let’s look at an example.

All of the following code will use these three simple classes:

```
class FirstType {
    constructor(public num: number){
    }
}

class SecondType {
    constructor(public name: string, public num: number){
    }
}

class ThirdType {
    constructor(public name: string) {
    }
}
```
Now we create a union type that includes the FirstType and SecondType classes, but not the ThirdType class.

```
type UnionType = FirstType | SecondType;
```
Only values of FirstType, SecondType, or a value structurally identical to one of these two types will satisfy the UnionType that we have created.

```
var exampleUnionType: UnionType;

// Allowed
exampleUnionType = new FirstType(0);
exampleUnionType = new SecondType(' ', 0);
exampleUnionType = { num: 3 };

// Not allowed
exampleUnionType = new ThirdType('');
```
You may be thinking that this is all a bit basic, but read on. If we were to create a generic method or function, it is highly possible that we will want to restrict the type argument based on our union type. Here is a generic function before any type constraint is added:

```
function getItemsOfType<T>(
        unionTypes: Array<UnionType>,
        typeFilter : new(...args) => T): Array<T> {
       
    return <Array<T>><any> unionTypes.filter(item => {
        return item instanceof typeFilter;
    });
}
```
This function takes an array of UnionType items and gives back only items that match a given type filter.

In the example below, while the function works – it allows us to ask to filter based on ThirdType, which can never occur within the array. The answer is correct (it finds no matching elements) but to allow the call in the first place seems nonsensical.

```
var unionTypeList: Array<UnionType> = [
        new FirstType(1),
        new SecondType('Two', 2),
        new FirstType(3),
        new FirstType(4)
];

function getItemsOfType<T>(
        unionTypes: Array<UnionType>,
        typeFilter : new(...args) => T): Array<T> {
               
    return <Array<T>><any> unionTypes.filter(item => {
        return item instanceof typeFilter;
    });
}

var justFirstTypeItems = getItemsOfType(unionTypeList, FirstType);
// "[{"num":1},{"num":3},{"num":4}]"
console.log(JSON.stringify(justFirstTypeItems));

var justSecondTypeItems = getItemsOfType(unionTypeList, SecondType);
// "[{"num":2}]"
console.log(JSON.stringify(justSecondTypeItems));

var justThirdTypeItems = getItemsOfType(unionTypeList, ThirdType);
// "[]"
console.log(JSON.stringify(justThirdTypeItems));
```
We can fix this using a type constraint. Usually, you would expect to specify either an interface or a base class as a type constraint – but you can specify a union type too. We now get a compiler warning about our nonsensical filter.

```
function getItemsOfType<T extends UnionType>(
        unionTypes: Array<UnionType>,
        typeFilter : new(...args) => T): Array<T> {
               
    return <Array<T>><any> unionTypes.filter(item => {
        return item instanceof typeFilter;
    });
}

var justFirstTypeItems = getItemsOfType(unionTypeList, FirstType);
// "[{"num":1},{"num":3},{"num":4}]"
console.log(JSON.stringify(justFirstTypeItems));

var justSecondTypeItems = getItemsOfType(unionTypeList, SecondType);
// "[{"num":2}]"
console.log(JSON.stringify(justSecondTypeItems));

var justThirdTypeItems = getItemsOfType(unionTypeList, ThirdType);
// Error: ThirdType is not assignable to parameter
```
Remember – you can assign structurally compatible types to the array (this was demonstrated earlier in this article) – and this type constraint will allow structurally compatible types to be passed in as a filter. This means that you can filter based on any type that could be in the array.
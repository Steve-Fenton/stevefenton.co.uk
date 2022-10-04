---
layout: src/layouts/Default.astro
navMenu: false
title: 'Avoiding the any type where possible'
pubDate: 2014-07-14T21:39:08+01:00
authors:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=318'
interface_sidebarlayout:
    - default
categories:
    - Programming
tags:
    - TypeScript
---

If you have chosen to use TypeScript, it is almost certain that one of the features you are after is type-safety. [Basarat](http://www.basarat.com/) is constantly finding bugs in open source JavaScript projects that would have been caught early by the TypeScript compiler and I have seen similar compiler warnings popping up at design time when pairing that would have otherwise been runtime issues in need of debugging.

So I think I’m safe in my assumption that you are pretty bought-in to the type checking.

If this is the case, your goal in life should be to avoid the “any” type wherever possible in your code. This should be an easy goal to achieve.

I have recommended the following style of TypeScript programming before, but I’ll re-emphasise it in terms of this no-any goal.

1. Set the compiler –noImplicitAny flag.  
    This will cause the compiler to alert you when it cannot infer a type.
2. Only add type annotations where the compiler cannot infer the type.  
    Lean on the compiler and language service rather than overly decorating your source code with annotations.
3. Avoid the use of *any* in your type annotations.  
    Keep an eye out during pairing, mobbing, peer reviews etc.

There are some cases where the *any* type is needed. It is a useful transitional type for external code (you’ll see it is in fact my recommended first stage for creating a type definition). It is also useful for truly dynamic code and it can be used as a last-resort for squeezing a type assertion next to a type the compiler disagrees with. These cases, though, are rare. Most uses of any are incorrect and will…

> “*…inject bugs like hell in your code; you are bypassing the type system.*” – [Mario Pastorelli](https://twitter.com/mapastr).

So what if you do want to use a dynamic type… should you just use *any*? Here is an example Mario found in an article by Dave Fancher ([TypeScript: Bringing Sanity to JavaScript](http://davefancher.com/2014/07/11/typescript-bringing-sanity-to-javascript/)), which highlights the hazards of any:

```typescript
var x: number = 10;
var y: any = "a";
x = y;
```

You can see the absolute nightmare that you can cause with this trick. The variable x has the number type, but now contains a string value. If you use this for an addition, you’ll end up with a concatenation and you’re essentially back in JavaScriptLand. In real life, the offending lines of code could be a long ways apart and it would take you a while to unstick yourself from this tar-pit.

Do you still want to be so slapdash with the *any* type! (This question is rhetorical – I know that you probably already got the point about avoiding this type so I apologise for over-stressing it).

So what can you do if you genuinely want a dynamically assignable type, but that can’t be used accidentally all over the place: you use the custom *External* type, which is represented with a class in the example below.

- You can assign one type, then later assign another type.
- You can use it anywhere in place of any other type (but not by accident)

So if you accidentally use the type thinking it is a number, you get a compiler warning – but if “you know better than the compiler” (which is usually what the any type is used for) then you can convert it to a specified type and use it – after all, you are the boss.

```typescript
class External {
    constructor(private value: any){
    }
    convertTo<T>() {
        return <T><any> this.value;
    }
    set Value(value: any) {
        this.value = value;
    }
}
var x: External = new External('Some String');
var y: number = 5;

// Cannot be accidentally used, like an 'any' can be
var result = x + y;
x = y;

// 'Some String5'
var workingResult = x.convertTo<string>() + y;
alert(workingResult);

// Can set the value to a different type
x.Value = 4;

//9
var newResult = x.convertTo<number>() + y;
alert(newResult);
```
---
id: 645
layout: src/layouts/Default.astro
title: 'What is wrong with method overloads in TypeScript'
pubDate: 2013-02-24T21:48:03+00:00
author:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=645'
permalink: /2013/02/what-is-wrong-with-method-overloads-in-typescript/
interface_sidebarlayout:
    - default
categories:
    - Programming
tags:
    - typescript
---

The only thing wrong with method overloads in TypeScript is that people are confused by their experience with overloads in other languages. In almost all cases, you simply don’t need to use an overload. The main case for using an overload is *when writing a type definition for an existing JavaScript library* – but even then you can probably avoid them.

Here is a quick summary of features that you can use instead of method overloads, in no particular order:

- Default parameters
- Optional parameters
- Union types
- Object-orientation

The reason that you don’t need to use overloads in TypeScript in particular, is that they all decorate a single implementation. That means you get no benefit from them in cases where a single signature could describe the same thing. This differs from languages that have separate implementations for every overload.

### Optional and Default Parameters

I often see method overloads used as per the following example. The two overload signatures accept either just a `firstName`, or both a `firstName` *and* a `lastName`. There are lots of variations on this theme, but read the example and then I’ll point out a general law of TypeScript overloads.

```
<pre class="prettyprint lang-typescript">
class Example {
  sayHello(firstName: string);
  sayHello(firstName: string, lastName: string);
  sayHello(firstName: string, lastName?: string) {
    let message = 'Hello ' + firstName;
    
    if (lastName) {
      message += ' ' + lastName;
    }
  
    return message;
  }
}
```

Let’s introduce the general law of TypeScript overloads:

> If you can delete the overload signatures and all of your tests pass, you don’t need TypeScript overloads

This law is based on the following principle: the implementation signature (that’s the last one of the three in the example above) very often logically represents what the overloads are trying to represent. Implementation signatures are easy to read.

Here is the correct version of the `sayHello` method. Note that the only change is to remove the two overloads. The implementation signature already describes what the overloads were describing.

```
<pre class="prettyprint lang-typescript">
class Example {
  sayHello(firstName: string, lastName?: string) {
    let message = 'Hello ' + firstName;
    
    if (lastName) {
      message += ' ' + lastName;
    }
  
    return message;
  }
}
```

The same applies if you have a default parameter, so:

```
<pre class="prettyprint lang-typescript">
  sayHello(firstName: string);
  sayHello(firstName: string, lastName: string);
  sayHello(firstName: string, lastName: string = 'Unknown') {
```

Can be expressed simply as:

```
<pre class="prettyprint lang-typescript">
  sayHello(firstName: string, lastName: string = 'Unknown') {
```

### Union Types

I have also seen a lot of implementations that accept an argument of different types, for example:

```
<pre class="prettyprint lang-typescript">
class Example {
  doSomething(num: number);
  doSomething(str: string, truth: boolean);
  doSomething(x: any, truth?: boolean) {
    if (typeof x === 'string') {
      return 'Hello ' + x;
    } else if (truth) {
        return 'Number is ' + x;
    }

    return '';
  }
}
```

The first parameter can be a `string` or a `number`. Before I delete any overloads, I’m going to tighten up the implementation signature, using a union type:

```
<pre class="prettyprint lang-typescript">
class Example {
  doSomething(num: number);
  doSomething(str: string, truth: boolean);
  doSomething(x: number | string, truth?: boolean) {
    if (typeof x === 'string') {
      return 'Hello ' + x;
    } else if (truth) {
        return 'Number is ' + x;
    }

    return '';
  }
}
```

This signature is more honest, because `x` isn’t literally any type, it is only a `string` or a `number`. With the improved implementation signature, we can once again delete the overload signatures:

```
<pre class="prettyprint lang-typescript">
class Example {
  doSomething(x: number | string, truth?: boolean) {
    if (typeof x === 'string') {
      return 'Hello ' + x;
    } else if (truth) {
        return 'Number is ' + x;
    }

    return '';
  }
}
```

In many cases, though, what I’d actually do is create two methods that each did one thing.The more a method branches based on the supplied arguments, the sooner you need to clean up your code.

```
<pre class="prettyprint lang-typescript">
class Example {
  showRate(rate: number, display: boolean) {
    if (display) {
      return 'Number is ' + rate;
    }

    return 'Rate is not available.';
  }

  showName(name: string) {
    return 'Hello ' + name;
  }
}
```

The older version of yourself that needs to change how rates are displayed will thank you for this. The `showRate` method only needs to change when rate-related stuff changes, and no longer needs to change for the stuff that was in the `else` statement.

### Different Inputs

If you have a method that processes “some kind of data”, and that data could come from one of many places, you might be tempted to use overloads… but actually what you need is an abstraction.

Let’s look at before:

```
<pre class="prettyprint lang-typescript">
class Example {
  process(datasource: FileData);
  process(datasource: MongoData);
  process(datasource: FileData | MongoData) {
    let data: string[];
    
    if (isFileData(datasource)) {
      data = datasource.getDataFromFiles();
    } else {
      data = datasource.getDataFromStore();
    }

    return data;
  }
}
```

And after:

```
<pre class="prettyprint lang-typescript">
interface DataProvider {
  getData(): string[];
}

class Example {
  process(datasource: DataProvider) {
    return datasource.getData();
  }
}
```

What we’ve done is change the class to depend on the `DataProvider` abstraction. If we add a new kind of data provider, like `MagneticTapeData`, we don’t need to change our method to be aware of the new type. This is key to reducing the echoes of change throughout an application (i.e. finding all of the `if` and `switch` statements that need to have the new type added as an additional logical branch – [see Alarm Bells in Object-Oriented Programming](https://www.stevefenton.co.uk/2013/03/alarm-bells-in-object-oriented-programming/)).

### Never Use Overloads

I’m not saying “never use overloads”, I’m just pointing out that overloads are a sign-post that warns you about sloppy code. Sometimes they are necessary, but in most cases they can be designed out of your program, a process that will improve your code and make it easier to maintain. Add it to your list (which for object-oriented developers probably already includes if and switch statements).

Show me an overloaded method and I’ll show you how to write your code without it.
---
title: 'Simpler TypeScript bit flags'
navMenu: false
pubDate: 2016-01-04T20:25:15+00:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - TypeScript
---

I [wrote about bit flags a while ago](/publications/pro-typescript/), demonstrating that you can use an enum in TypeScript along with “powers of two” to create flags:

```typescript
export enum StepType {
    Given = 1,
    When = 2,
    Then = 4
}
```

These can then be combined and tested using bitwise operations.

```typescript
var example = StepType.When | StepType.Then;

var isGiven = (example & StepType.Given) == StepType.Given; // false

var isWhen = (example & StepType.When) == StepType.When; // true
```

Well, if you can’t be bothered with multiplication, you can simplify your life using a left shift along with simple sequential numbers. The example below is equivalent to the original example (and is taken from the [TypeSpec BDD framework for TypeScript](https://github.com/Steve-Fenton/TypeSpec)).

```typescript
export enum StepType {
    Given = 1 << 0,
    When = 1 << 1,
    Then = 1 << 2
}
```
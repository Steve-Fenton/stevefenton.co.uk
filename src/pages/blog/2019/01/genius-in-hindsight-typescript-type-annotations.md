---
layout: src/layouts/Default.astro
title: 'Genius in hindsight: TypeScript type annotations'
navMenu: false
pubDate: 2019-01-28T18:14:20+00:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - dart
    - typescript
---

When TypeScript first landed in public view in October 2012, the type annotations looked a bit funky. If you were a student of type theory, they would have been familiar; but most programmers wouldn’t have seen a type annotation like this before:

```typescript
var name: string;
```

Given the popularity of putting type names before variable names, it would have been incredibly tempting to just continue the trend. It would be even more tempting if you had been involved in, for example, a very famous language that followed this pattern…

```csharp
string name;
```

> Disclaimer! The imaginary language used in this article is entirely fictitious. Any resemblance to real programming languages, living or dead, is purely coincidental.

So what was the reason behind this strange decision not the precede names with types? Having been somewhat absent when the decision was made, I’m going to add some post-hoc narrative that shows that, in hindsight, the TypeScript team is full of genius. It’s possible that this is mere coincidence, but if you’ve ever discussed a feature with these people you’ll know that not much is left to chance!

So let’s go back to the imaginary version of the language, which back in 2012 would have been fine.

```csharp
// NotScript
string name;
List<int> digits = [];

// Compiles to
var name;
var digits = [];
```

All is well in good until June 2015, when the ECMA-262 6th edition landed (AKA ECMAScript 2015). At this point we burned our `var`s and replaced them with `const` and, where absolutely necessary, `let`.

How on eorðe would we specify whether our `string name` or `List<int> digits</int>` should be compiled into `const`, or `let`, or `var`?

The compiler could remove this choice. It could always use `const` unless it detects an assignment and then switch to `let`. It could just always use `var`. It could work, if it removed our choice.

Alternatively, it could allow us to use the official keywords in place of the type arguments and then attempt to infer types, but our `List` can’t be inferred and nor can any variables that aren’t initialized when they are declared.

Maybe the pragmatic solution is to allow us to specify both with a pair of keywords…

```csharp
// NotScript
const string name;
const List<int> digits = [];
```

Or even create additional keywords and placements to let us specify the details…

```csharp
// NotScript
final string name;
List<int> digits = const [];
```

All in all, we could end up in a bit of a mess… which is why I’m pretty convinced that one or more people on the TypeScript team are very smart indeed to have created type annotations as they did. Or they had access to a time machine. Or they were keeping a very close eye on the ECMAScript proposals.

Probably the time machine.
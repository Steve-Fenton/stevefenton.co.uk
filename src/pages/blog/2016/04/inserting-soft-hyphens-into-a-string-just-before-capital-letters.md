---
layout: src/layouts/Default.astro
title: 'Inserting soft hyphens into a string just before capital letters'
navMenu: false
pubDate: 2016-04-08T06:00:08+01:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - C-Sharp
    - RegEx
---

I am currently working on a open source project that involves the display of lots of .NET file names within flexible tiles (the tiles are sized based on the display). It is a pretty common scenario to have reasonably long file names that won’t fit nicely on a tile.

For example, CustomerEntitlementRepository.cs needs a pretty big tile.

This can be solved rather clumsily by using CSS word-wrap:

```css
word-wrap: break-word;
```

This will split whole words as needed to make things fit, but it loses a lot of readability, which would make these tiles less useful.

A much better way to split the words would be if they would break on whole words, i.e. “Customer”, “Entitlement”, “Repository”. But of course, they aren’t whole words – because there are no spaces.

So the solution is to insert soft-hyphens:

```css
Customer&shy;Entitlement&shy;Repository.cs
```

Soft hyphens only appear when they are needed, so when there is enough room, you’ll see:

```
CustomerEntitlementRepository.cs
```

And when there isn’t enough room, you’ll see a variation such as:

```
CustomerEntitlement-
Repository.cs
```

To insert these soft hyphens automatically with C#, you can use this regular expression:

```csharp
Regex.Replace(fileName, @"((?<=\p{Ll})\p{Lu})|((?!\A)\p{Lu}(?>\p{Ll}))", "&shy;$0");
```
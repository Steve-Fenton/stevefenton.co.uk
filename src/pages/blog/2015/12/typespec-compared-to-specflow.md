---
layout: src/layouts/Default.astro
navMenu: false
title: 'TypeSpec compared to SpecFlow'
pubDate: 2015-12-15T06:00:38+00:00
authors:
    - steve-fenton
categories:
    - Automation
    - Programming
tags:
    - bdd
    - typescript
    - typespec
---

Updated: It is no longer mandatory to enclose parameters with quotes – which makes things even more similar between C#/SpecFlow and TypeScript/TypeSpec. On with the original article…

Updated: TypeScript’s decorator feature makes things even more similar!

This isn’t a “framework a” vs “framework b” post. When performing BDD, if you are using C#, you’ll be using SpecFlow… if you are using TypeScript, TypeSpec is the only option (although you can use JavaScript frameworks too, with an associated type definition). So the reason for the comparison is to see what step definitions look like in the two languages, to see what is similar and what is different. I have contributed code to both of these projects.

Here is a typical C# example using SpecFlow.

```
<pre class="prettyprint lang-csharp">
[Given("I have entered (\d+) into the calculator")]
public void EnterNumber(decimal num) {
    calculator.Add(num);
}
```
And here is the same step in TypeSpec.

```
@given(/I have entered (\"\d+\") into the calculator/i)
enterNumber(context: any, num: number) {
    calculator.add(num);
}
```
As you can see, there is a lot in common between these. Although the features of the programming languages force some syntactical switches there is a regular expression that is used to match steps written in Gherkin’s given-when-then syntax, and a method to handle that step.

Both SpecFlow and TypeSpec will find arguments in the specification, parse them to the correct type, and pass them to your step method. Both allow variables to be entered directly, or appended using a table of examples.

There are a couple of differences.

In TypeSpec, you can choose whether the regular expressions are case sensitive or not. In the example above, the “i” flag at the end of the expressions makes the matching case-insensitive.

In TypeSpec, the first argument of the step method is always the test context. This is usually passed in the constructor in SpecFlow. In TypeSpec, it is a dynamic object – but you can supply an interface if you want to get some assistance from the TypeScript compiler (supply the interface name in place of “any” in the example above).

One final noteworthy difference is that while you can use the specific decorators for “given”, “when”, and “then” in TypeSpec, there is also a catch all “step” decorator that will make a step available to all keywords.

In summary, all of your knowledge from SpecFlow (or Cucumber, JBehave, and so on) is instantly transferable to TypeSpec. There are a couple of minor differences, mainly driven by differences in the underlying language or runtime – but nothing too baffling.
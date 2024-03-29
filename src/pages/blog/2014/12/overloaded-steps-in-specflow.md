---
title: 'Overloaded steps in SpecFlow'
navMenu: false
pubDate: 2014-12-10T19:40:04+00:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - .net
    - C-Sharp
    - Gherkin
    - RegEx
    - SpecFlow
---

This can be a pretty common situation in SpecFlow, thanks to the trusty default RegEx that SpecFlow uses:

```gherkin
Scenario: Binding Test
    Given I have defined a step for the second line of this specification, but not the third
    And this line accepts "a string" in
    And this line accepts "a string" in and "another string" in
    Then the second line should be bound
    And the third line should not be bound
```

The specification says it all – I have defined a step for the second line:

> And this line accepts “a string” in

But I haven’t defined a step for the third line:

> And this line accepts “a string” in and “another string” in

However, thanks to the following step definition, both lines happily get matched.

```csharp
[Given(@"this line accepts ""(.*)"" in")]
public void GivenThisLineAcceptsIn(string p0)
{
    ScenarioContext.Current.Pending();
}
```

:::div{.inset}
:img{src="/img/2015/07/specflow-before.png" alt="SpecFlow Before" loading="lazy"}
:::

As you can see, the third line is not purple because it is actually matched to the step definition for the second line (you can tell this because the silver text includes the whole middle chunk of the specification).

This is easily fixed using a slightly adjusted RegEx in the method attribute:

```csharp
[Given(@"this line accepts ""([^\""]*)"" in")]
public void GivenThisLineAcceptsIn(string p0)
{
    ScenarioContext.Current.Pending();
}
```

As you can see, the RegEx has been changed from the default: `(.*)`

To the more specific quote-inclusive: `([^\""]*)`

You might also want to note that there is a double-quote after the \\ – this is because the RegEx is inside of the string attribute, so needs to be escaped – the actual RegEx that is used is `([^\"]*)`

The result of this is the expected behaviour:

:::div{.inset}
:img{src="/img/2015/07/specflow-after.png" alt="SpecFlow After" loading="lazy"}
:::

For single quotes, you could use `([^\']*)`

Update! After a brief discussion… this could be on the cards for a [feature enhancement to SpecFlow](https://github.com/techtalk/SpecFlow/issues/309)!

Update! I have submitted [a pull request that adds this feature to SpecFlow](https://github.com/techtalk/SpecFlow/pull/383).
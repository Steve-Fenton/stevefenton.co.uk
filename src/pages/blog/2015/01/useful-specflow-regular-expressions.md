---
layout: src/layouts/Default.astro
navMenu: false
title: 'Useful SpecFlow regular expressions'
pubDate: 2015-01-31T16:22:01+00:00
author:
    - steve-fenton
interface_sidebarlayout:
    - default
categories:
    - Programming
tags:
    - .net
    - 'c#'
    - regex
    - specflow
---

Here are some useful regular expressions that can improve your SpecFlow step definitions. All of the examples are ready to drop-in to a C# string, so they are pre-escaped for your pleasure (for example, the useful RegEx (\[^\\”\]\*) is listed as “”(\[^\\””\]\*)”” so you can use it in a definition like this:

```
<pre class="prettyprint lang-csharp">[Given(@"this line accepts ""([^\""]*)"" in")]
```
Each RegEx in the list is superior to the standard (.\*) expression, which often causes accidental matching between similar steps.

If you have any useful regular expressions you want to add, please let me know and I’ll credit you here.

| RegEx | Name | Example | Finds |
|---|---|---|---|
| ``` ""([^\""]*)"" ``` | Quoted String | ``` Given my name is "Steve"  [Given(@"my name is ""([^\""]*)""")] ``` | Steve |
| ``` '([^\']*)' ``` | Single-Quoted String | ``` Given my name is 'Steve'  [Given(@"my name is '([^\']*)'")] ``` | Steve |
| ``` ([^ ]*) ``` | Unquoted String | ``` Given my name is Steve  [Given(@"my name is ([^ ]*)")] ``` | Steve |
| ``` (\d+) ``` | Numbers | ``` When I walk 10km  [When(@"I walk (\d+)km")] ``` | 10 |

You can also use these regular expressions with examples in a Scenario Outline:

```
<pre class="prettyprint lang-gherkin">
Scenario Outline: Example
        Given my name is "<name>"
        When I walk <distance>km
        Then that should be "<result>"

Examples:
        | name  | distance | result       |
        | Steve | 10       | Satisfactory |
        | Steve | 20       | Awesome      |
```
With the Steps:

```
<pre class="prettyprint lang-csharp">
[Given(@"my name is ""([^\""]*)""")]
public void GivenMyNameIs(string name)
{
           
}

[When(@"I walk (\d+)km")]
public void WhenIWalkKm(int distance)
{
           
}

[Then(@"that should be ""([^\""]*)""")]
public void ThenThatShouldBe(string result)
{
           
}
```
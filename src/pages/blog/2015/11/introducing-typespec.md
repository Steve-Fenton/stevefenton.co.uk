---
layout: src/layouts/Default.astro
navMenu: false
title: 'Introducing TypeSpec'
pubDate: 2015-11-29T11:13:42+00:00
author:
    - steve-fenton
categories:
    - Programming
tags:
    - bdd
    - typescript
    - typespec
---

![TypeSpec Browser Ouput](https://www.stevefenton.co.uk/wp-content/uploads/2015/11/typespec-browser-output-300x177.png)Having completed the [MVP roadmap](https://github.com/Steve-Fenton/TypeSpec/issues?q=milestone%3Av0.5), [TypeSpec](https://github.com/Steve-Fenton/TypeSpec) is now available to use.

TypeSpec is a BDD framework for TypeScript designed to work with separate specifications written in the Given-When-Then style. It works in the browser (real or ghost), and on Node.

You can grab it from NuGet:

```
<pre class="prettyprint lang-cmd">PM> Install-Package TypeSpec 
```
You can grap it from NPM:

```
<pre class="prettyprint lang-cmd">npm install typespec-bdd
```
If you are familiar with BDD from frameworks such as SpecFlow, Cucumber, or similar – you’ll find a familiar set of tools that you can apply straight to TypeScript.

- Features, Scenarios, and Scenario Outlines
- Scenario tagging
- Given, When, Then style specifications (in their own file)
- Step definitions, and comprehensive step definition hinting for missing steps

Here is a feature taken from the TypeSpec test suite:

```
<pre class="prettyprint lang-gherkin">Feature: Scenario Outline
       In order to make features less verbose
       As a BDD enthusiast
       I want to use scenario outlines with tables of examples

@passing
Scenario Outline: Basic Example with Calculator
       Given I am using a calculator
       And I enter "<Number 1>" into the calculator
       And I enter "<Number 2>" into the calculator
       When I press the total button
       Then the result should be "<Total>" on the screen

Examples:
    | Number 1 | Number 2 | Total |
    | 1        | 1        | 2     |
    | 1        | 2        | 3     |
    | 2        | 3        | 5     |
    | 8        | 3        | 11    |
    | 9        | 8        | 17    |
```
And here is the full set of steps that covers this feature (and quite a few others). You should be able to spot a few features in here, from the test context that allows you to share data between test classes, to the simple expressions used to match conditions in the test, to the assertions that ship with TypeSpec.

```
import { Assert, given, when, then } from './TypeSpec/TypeSpec';

export interface CalculatorTestContext {
	done: () => void; // Standard TypeSpec aync done method.
	calculator: Calculator;
}

export class CalculatorSteps {
	@given(/^I am using a calculator$/i)
	usingACalculator(context: CalculatorTestContext) {
		context.calculator = new Calculator();
	}

	@given(/^I have entered (\"\d+\") into the calculator$/i)
	passingArguments(context: CalculatorTestContext, num: number) {
		calculator.add(num);
	}

	@when(/^I press the total button$/gi)
	pressTotal() {
	}

	@then(/^the result should be (\"\d+\") on the screen$/i)
	resultShouldBe(context: CalculatorTestContext, expected: number) {
		var actual = context.calculator.getTotal();
		Assert.areIdentical(expected, actual);
	}
}
```
The context is entirely dynamic, but by supplying an interface for it, you can get the compiler to catch mistakes for you.

The decorators allow your step definitions to be automatically collected. This means you can run your tests by simply pointing out where the specifications are located (you can pass in as many specification files as you like).

```
import { AutoRunner } from './Scripts/TypeSpec/TypeSpec';

import './CalculatorSteps';

AutoRunner.run(
    '/Specifications/Basic.txt'
);
```
Grab TypeSpec from NuGet or NPM or check out [TypeSpec on GitHub](https://github.com/Steve-Fenton/TypeSpec), fork it, use it, raise issues (preferably with acceptance criteria in Given-When-Then syntax).
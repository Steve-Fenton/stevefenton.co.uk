---
title: Getting started with JestSpec
navMenu: false
pubDate: 2023-01-08
keywords: javascript,testing,gherkin,cucumber,jestspec
description: Find out how to add JestSpec to a Jest test project to run Gherkin specifications in your tests.
bannerImage:
    src: /img/topic/jest/jest.png
    alt: Jest logo features a jester's boot
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - JavaScript
    - Jest
---

There are a few projects that can add Gherkin/Cucumber style test features to Jest, but I wanted something that could be used more generally to write natural language tests (including Gherkin syntax) to integrate with Jest for testing. I've written all-in-one specification testing frameworks (such as TypeSpec), where a runner and assertions are provided in addition to the specifications. However, there are benefits to running within an established test framework:

- You can mix specifications and unit tests
- You can use the same assertion syntax in all your tests
- Your existing code coverage reports will work
- Any extensions to the test framework can be used

So, JestSpec was written to work within Jest (and can also be used within other JavaScript and TypeScript test frameworks).

## Installing JestSpec

Install JestSpec with [NPM](https://www.npmjs.com/package/jest-spec).

```
npm install jest-spec --save-dev
```

All the source code is on [GitHub](https://github.com/Steve-Fenton/JestSpec).

If you haven't already installed Jest, you can use NPM for that, too.

```
npm install jest --save-dev
```

JestSpec works with Jest, but also other test frameworks, so it doesn't install Jest for you as you might not be using it.

## Specifications

The best way to explain specifications for those that haven't used them is to show you one. Here's a test for a basic calculator.

```gherkin
Feature: Basic Working Example
    In order to avoid silly mistakes
    As a math idiot
    I want to be told the sum of two numbers

Scenario: Basic Example with Calculator
    Given I am using a calculator
    And I enter 50 into the calculator
    And I enter 70 into the calculator
    When I press the total button
    Then the result should be 120 on the screen
```

There are two parts to this test. The *feature* section allows you to write what the feature should do. This isn't used in testing but can be used to generate documentation. The example has an old *story* format, but you can write whatever works for you.

The second part is the *scenario*. Each line in this plain language test will map to a function that does the work. This mapping allows purely business language to be used in the test file. Technically this allows business users to write tests, but in practice, a better way to use this is to have the business and technical folks write a specification together in a short *specification workshop*. The format of the test means everyone in the room can understand the examples.

I'll cover *scenario outlines* shortly. These include a table of examples. This might be the most powerful format for the specification workshops. Not only does it prompt everyone in the room to think of edge cases and boundaries, but it's also a really concise way to understand what people want the system to do.

## Mapping the language

When you run a specification with a missing mapping, JestSpec will output a template function for you to use. When you "fill in the blanks" on these template functions, you end up with a module like the one below.

This module imports that thing to be tested (a calculator) and provides a map for each line in the business-language test.

You'll notice that you can avoid repeating a line by parameterizing it. For example, `I enter (\d+) into the calculator`, will work for both "And I enter 50 into the calculator" and "And I enter 70 into the calculator". It will also work when the business add further tests with different numbers.

```javascript
import { Calculator } from '../../sample/calculator.mjs';

export function steps(map) {

    map(/I am using a calculator$/i, (context) => {
        context.calculator = new Calculator();
        return context;
    });

    map(/I enter (\d+) into the calculator$/i, (context, number) => {
        context.calculator.add(number);
        return context;
    });

    map(/I press the total button$/gi, (context) => {
        context.total = context.calculator.getTotal();
        return context;
    });

    map(/the result should be (\d+) on the screen$/i, (context, expected) => {
        expect(context.total).toBe(expected);
        return context;
    });
}
```

Because each function is called independently, JestSpec injects a shared context that shares the state for one specification. You can add arbitrary entries into the context to re-use in other map functions. You can also make steps `async` if you need to, as shown below...

```javascript
map(/I press the total button$/gi, async (context) => {
    context.total = await context.calculator.getTotal();
    return context;
});
```

You'll notice that the assertions use Jest's `expect...toBe` format. That's because Jest will be performing those checks for you at the appropriate time.

Now that you have a language mapping, from your domain-specific business language into real JavaScript calls, you can now write a Jest test to use it.

## Integrating with Jest

Here's a file called `calculator.test.mjs`, which supplies the mapping steps and the feature file to be tested:

```javascript
import { JestSpec } from 'jest-spec';
import * as CalculatorSteps from './steps/calculator.steps.mjs';

const spec = new JestSpec();
spec.addSteps(CalculatorSteps);

test('Calculator adding', () => {
    spec.run('/src/specifications/Calculator.feature');
});
```

After creating an instance of `JestSpec` and adding the steps, a normal Jest test calls `spec.run`. This parses the specification, manages the state, and maps the text to your step functions.

For a complex specification, you might add more steps to JestSpec using the `addSteps` method.

It's a best practice to only call `spec.run` once per test. You *could* call multiple specifications, but a one-to-one mapping makes it easier to identify failing tests and allows you to name each specification.

## Scenario outlines

As I mentioned earlier, when talking about specification workshops, scenario outlines provide a powerful way to explore a new feature. When working in the healthcare industry, we ran these workshops with a cross-functional product team that included a clinically trained nurse, a test analyst, and several developers. By writing up a table of examples as we talked about the feature, questions would come up such as:

-  What if this is less than zero?
-  What's the maximum this can be?
-  Why does this happen differently in this case?
-  Can we exclude this case from this version of the feature?

Having a test analyst in the same room as the business expert certainly led to an increased understanding of what we were doing. Equally, having the business expert look at the plain text scenario meant they thought of stuff that wouldn't have come up outside of the discussion until much later.

Scenario outlines contain a table of examples and you can reference the column names in the specification. Like this:

```gherkin
Feature: Scenario Outline
    In order to make features less verbose
    As a BDD enthusiast
    I want to use scenario outlines with tables of examples

Scenario Outline: Basic Example with Calculator
    Given I am using a calculator
    And I enter <Number 1> into the calculator
    And I enter <Number 2> into the calculator
    When I press the total button
    Then the result should be <Total> on the screen

Examples:
    | Number 1 | Number 2 | Total |
    |----------|----------|-------|
    | 1        | 1        | 2     |
    | 1        | 2        | 3     |
    | 2        | 3        | 5     |
    | 8        | 3        | 11    |
    | 9        | 8        | 17    |
```

This example of a scenario outline doesn't need any new steps. The ones added for the original calculator specification also handle this. You can add new rows to the table without adding code and you can adjust the text-based tests to introduce new scenarios using existing steps without adding code.

The only time you need to add new code is...

1. To support a new line of business text
2. To link a new specification to a Jest test

## Running the tests

You can run the tests using:

```
node node_modules/jest/bin/jest.js --collectCoverage
```

Just provides the test outcome and your code coverage table.

If you are using Visual Studio Code there are excellent extensions for [Jest](https://marketplace.visualstudio.com/items?itemName=Orta.vscode-jest) and [Gherkin syntax highlighting](https://marketplace.visualstudio.com/items?itemName=Blodwynn.featurehighlight).

I'll be adding another blog soon to cover non-Gherkin syntax testing with Jest and JestSpec and to show you how to use JestSpec with other test frameworks.
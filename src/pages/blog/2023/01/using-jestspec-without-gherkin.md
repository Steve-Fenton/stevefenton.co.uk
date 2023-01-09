---
layout: src/layouts/Default.astro
title: Using JestSpec without Gherkin
navMenu: false
pubDate: 2023-01-09
keywords: javascript,testing,jestspec,natural language
description: Find out how to use JestSpec to run a language-based Jest test without using Gherkin syntax.
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

This is the second in a short series on JestSpec. You might want to take a look at the [quick start for JestSpec](/blog/2023/01/getting-started-with-jestspec/) first. This article explains how you can write very plain text to write a test using JestSpec, which isn't usually possible with other Gherkin-based tools.

Firstly, JestSpec absolutely allows you to adhere to the Gherkin syntax. If you want to do that, just "do what you normally do". However, if you want to polish your prose beyond what Gherkin allows, you can do that, too.

## Gherkin vs plain language

Here's a reminder of the Gherkin syntax for a test. This uses the trusty "testing a calculator" example.

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

You may find this pretty readable already, especially if you are a programmer. It's got just enough structure without sounding too much like a robot. However, it is possible to go a bit further with a non-Gherkin specification.

```gherkin
Feature: Relaxed Scenario Language
    This feature demonstrates a Scenario with
    relaxed language, rather than strict Gherkin syntax

Scenario: Relaxed Specification
    Switch on the calculator
    Enter 12 and press the + button
    Enter 24 and press the = button
    The answer should be 36
```

This just reads like a simple set of instructions. There are no keywords at all here, just text. You might improve it further by moving the button presses onto a new line, or use a different style of writing. In the case of natural text, JestSpec really doesn't mind.

## Keyword stripping

One thing to note is that the code generator for missing steps only strips "given", "when", "then", and "and". These are stripped as it allows you to reuse a step in different places. For example "Given I'm happy" and "When I'm happy" can reuse the same step definition thanks to keyword stripping. In our relaxed version, it will still strip the keywords where they appear at the start of the line, but in most cases, you'll be matching based on the whole line, like this:

```javascript
    map(/Switch on the calculator$/i, (context) => {
        context.calculator = new Calculator();
        return context;
    });
```

Note that the line starts with the word "Switch" because it's not a Gherkin spec keyword. If you started the line with "Given", for example, it *would* be stripped.

You can still use variables, just like with the Gherkin version, like this:

```javascript
    map(/Enter (\d+) and press the \+ button$/i, (context, number) => {
        context.calculator.add(number);
        return context;
    });
```

## Summary

You don't have to abandon Gherkin to improve your prose. In the original example the text "Then the result should be 120 on the screen" could be improved by re-writing it as "Then screen should display 120". Making each line more human and better aligned with the language the users use is a great way to improve your specs.

In most cases, you'll probably want to stick with Gherkin. However, some teams working closely with business folks to specify a system might find it useful to be able to break out of the strict requirements. Where this makes the specifications closer to the business language and improves the quality of the specifications as documentation, I think this offers a great opportunity.
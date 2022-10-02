---
layout: src/layouts/Default.astro
navMenu: false
title: 'What is the difference between symbol, branch, and method code coverage'
pubDate: 2011-08-16T17:54:37+01:00
authors:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=914'
interface_sidebarlayout:
    - default
categories:
    - Programming
---

If you are using a code coverage tool, you will be familiar with the terms “Symbol Coverage”, “Branch Coverage” and “Method Coverage”. Each of these usually has its own statistic to demonstrate how much coverage you have, for example these coverage results from an application I am currently writing.

- Symbol Coverage: 99.12% (112 of 113)
- Branch Coverage: 78.95% (45 of 57)
- Method Coverage: 83.33% (35 of 42)

But what is the difference between Symbol Coverage, Branch Coverage and Method Coverage?

### Symbol Coverage

The most simple explanation for Symbol Coverage is that it tells you how many lines of code are covered. If you have 100 lines of code and 80 of them are covered by tests, you get 80% Symbol Coverage.

On a more complex level, symbol coverage is actually points in your code where the debugger can pause – so sometimes one line of code can be defined as being more than one symbol, so you may have more symbols than lines of code.

### Branch Coverage

If you have an if statement in your code, their are two different routes that can be taken through the code. One if where the if statement evaluates to true and the other is if it doesn’t. Each of these divergences is a branch in your code.

Branch coverage counts these paths through your code and reports on how many are covered. If you have a single if statement, you would have two branches and both paths would need to be covered by your tests to achieve 100% branch coverage.

This doesn’t just apply to if statements, but to any pathway through your code, for example a switch, or a loop.

### Method Coverage

This is the easiest one. Method Coverage counts how many methods you have in your application and how many get called as part of a test.

### Summary

So your application contains many methods, each method can have several logical branches and each of those can have many symbols.
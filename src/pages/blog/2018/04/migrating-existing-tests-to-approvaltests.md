---
layout: src/layouts/Default.astro
navMenu: false
title: 'Migrating existing tests to ApprovalTests'
pubDate: 2018-04-14T14:10:35+01:00
author:
    - steve-fenton
categories:
    - Programming
tags:
    - .net
    - 'c#'
    - tdd
    - testing
---

This is a short article to describe how I migrated a bunch of existing verbose tests to ApprovalTests. All of the examples in this article are based on my [Shameless Green in C#](https://github.com/Steve-Fenton/BottlesOfBeer) library, which will be familiar to reader’s of [99 Bottles of OOP](https://www.sandimetz.com/99bottles/).

Here are some quick links you might want once you finish reading.

- [Bottles of Beer branch using MSTest / Shouldly](https://github.com/Steve-Fenton/BottlesOfBeer)
- [Bottles of beer branch using MSTest / ApprovalTests](https://github.com/Steve-Fenton/BottlesOfBeer/tree/approvaltests)

### Starting code

I’m going to start with an existing test. This makes it easy to show the difference between a traditional unit test, and once that uses this library.

Here is the test before any changes. It is a pretty simple MSTest with Shouldly (ApprovalTests doesn’t care which test framework you are using). It is quite texty, and this is just one of the shorter tests. One of the benefits of the ApprovalTests library is that it moves the expectation into a file in its own right, but I’ll talk about some of the other benefits shortly.

```
<pre class="prettyprint lang-csharp">
[TestMethod]
public void TestTheFirstVerse()
{
    new Bottles().Verse(99).ShouldBe(
        "99 bottles of beer on the wall, " +
        "99 bottles of beer.\n" +
        "Take one down and pass it around, " +
        "98 bottles of beer on the wall.\n");
}
```

### Add ApprovalTests

To use ApprovalTests, you need to install the `ApprovalTests` package from NuGet (other flavours are available for your favourite language). It also pulls in a couple of dependencies.

The method needs an additional decorator to describe the reporter that will be used to compare the expected and actual results. The expected result is called a *gold copy*. When a test fails, this is the comparison view that will be opened.

```
<pre class="prettyprint lang-csharp">
[TestMethod]
[UseReporter(typeof(DiffReporter))]
public void TestTheFirstVerse()
{
    new Bottles().Verse(99).ShouldBe(
        "99 bottles of beer on the wall, " +
        "99 bottles of beer.\n" +
        "Take one down and pass it around, " +
        "98 bottles of beer on the wall.\n");
}
```

This attribute does nothing and your tests still pass! We can now introduce a verification call to ApprovalTests. This is where we see a difference to many other test workflows. When you first write a verification and run the test, it will fail. When it does this, it creates two files on the file system and opens them for comparison. You can choose to approve the text and save the result, at which point the test will go green. All future tests will be run against your approved gold copy.

In the test below, I have added the call to `Approvals.Verify`. Note that I have left my existing assertion in place. I won’t remove that until I have seen the verification fail, approved the text, and seen both the new verification and the old test go green together. This will ensure that the new approval is a good analog for the old one before I delete it.

```
<pre class="prettyprint lang-csharp">
[TestMethod]
[UseReporter(typeof(DiffReporter))]
public void TestTheFirstVerse()
{
    string result = new Bottles().Verse(99);

    Approvals.Verify(result);

    result.ShouldBe(
        "99 bottles of beer on the wall, " +
        "99 bottles of beer.\n" +
        "Take one down and pass it around, " +
        "98 bottles of beer on the wall.\n");
}
```

Running this for the first time opens up the diff tool.

![Test Verification Failure Diff Tool](https://www.stevefenton.co.uk/wp-content/uploads/2018/04/approvaltests-first-diff.png)

If the text is correct, I simply copy-right to move it into the gold copy and save the file. At this stage, the test window shows a failure:

![ApprovalTests Test Window Failure](https://www.stevefenton.co.uk/wp-content/uploads/2018/04/test-window.png)

But re-running the test now the gold copy is approved will turn it green.

![Test Window Pass](https://www.stevefenton.co.uk/wp-content/uploads/2018/04/green-test-window.png)

### The final version of the test

Now that everything is green, I can remove the old assertion.

```
<pre class="prettyprint lang-csharp">
[TestMethod]
[UseReporter(typeof(DiffReporter))]
public void TestTheFirstVerse()
{
    Approvals.Verify(new Bottles().Verse(99));
}
```

The gold copy is stored in a simple text file, so you can commit it to source control and track the versions just like your source code. You’ll see it if you enable all files in the solution explorer and can add it to the solution. The file is named to match the test it belongs to.

![Gold Copy Text File](https://www.stevefenton.co.uk/wp-content/uploads/2018/04/gold-copy-test-file.png)

By repeating this for each of the tests in the Bottles of Beer project, and effectively moving the text into separate gold copy files, the test file reduced from 400 lines of code to just over 60. Changes to the specified gold copies are now tracked separately to changes to the test code and they can be shared with a wider audience.

### Summary

You don’t just have to use this library to verify text states, it works with complex object types too. This makes it a powerful way to verify complicated states without writing multiple assertions.

ApprovalTests also has flavours to help you test specific project types, for example there is a technique that allows you to test MVC views.

[View the .NET flavour of the project on GitHub](https://github.com/approvals/ApprovalTests.Net).
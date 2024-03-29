---
title: 'Running sequence tests in Fitnesse'
navMenu: false
pubDate: 2013-10-25T10:40:08+01:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - Fitnesse
---

Following on from this week’s blog posts on [using Fitnesse in .NET](/blog/2013/10/using-fitnesse-for-dot-net/) and [debugging Fitnesse tests](/blog/2013/10/debugging-your-fitnesse-tests/), I thought I’d write up how I am using sequence tests to provide a domain-specific language to the Fitnesse test pages.

Normal Fitnesse tests take a bunch of data and throw it a method you wrote – like this:

```
!contents -R2 -g -p -f -h
!path C:\Source\AcceptanceTests\bin\Debug\AcceptanceTests.dll
!define COMMAND_PATTERN {%m -r fitnesse.fitserver.FitServer %p}
!define TEST_RUNNER {c:\Fitnesse\Fitsharp\Runner.exe}
!|AcceptanceTests.MyAcceptanceTests|
|FirstString|SecondString|Concatenate?|
|Hello      |World       |Hello World |
|Steve      |Fenton      |Steve Fenton|
```
In this example, all of the rows of data are run against the **Concatenate** method that can be found in the **AcceptanceTests.MyAcceptanceTests class**. The column in the data table titled “FirstString” (which can also be titled “First String” in Fitnesse) sets a public property named “FirstString” on the class. The same goes for “SecondString” and the third column (which ends in a ?) is the output we expect from the method call.

Already, we can name our properties and methods in a way that makes sense to the Fitnesse test page if we keep in mind that they are public.

With a sequence test, you can extend this idea by carefully naming the methods on the class so that each row reads nicely.

```
!| AcceptanceTests.SequenceTest |
| Set Target | https://integration-test-box/API/ | Test User | Test Password |
| Create Session | AdminUser |
| Request | CustomersForProject | 1 |
| Check Result | Count | 15 |
| Check Result | Contains | 19872 |
| Request | Customer | 19872  |
| Check Result | Contains | John Smith |
| Test Finished |
```

In a sequence test, the first column is the method name and the subsequent columns are the parameters, so for example the method “CreateSession” is called with “AdminUser” to start a session, then the “Request” method is called with “CustomersForProject” and “1”, then we check results and so on.

This isn’t even the best example – but you can see how you can start naming methods and argument values in a way that starts to make the tests read. Perhaps you’ll massage it into a particular format that you already familiar with or *maybe the team will invent the language as they go* – but sequence tests allow you to run a whole scenario through and check the outcomes of several requests.
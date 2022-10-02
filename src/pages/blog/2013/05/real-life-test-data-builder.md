---
layout: src/layouts/Default.astro
navMenu: false
title: 'Real-life Test Data Builder'
pubDate: 2013-05-10T14:32:39+01:00
author:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=592'
interface_sidebarlayout:
    - default
categories:
    - Programming
tags:
    - .net
    - 'c#'
    - tdd
---

So having listened to Ian Cooper talking about Test Mothers and Test Data Builders and carefully considering both options (and trying them out without checking in any code) – I decided to go with the Test Data Builder for the project I am currently working on.

The difference between the two is that a Test Mother just has factory methods that give pre-configured test objects, so you would ask for “ClientWithOutstandingInvoice” or “ClientWithZeroBalance” and that is what you would get. My main concern with this was the exact one that Ian explained in his talk: eventually you will have a lot of callers depending on “ClientWithOutstandingInvoice” and making a small change to that canned client will cause a nasty ripple of broken tests.

The Test Data Builder on the other hand allows you to ask explicitly for what you want, using a fluent interface, so more like `TestClientBuilder.Get().WithInvoice(invoice).Build()`. So now you have the flexibility to control the amount outstanding to give you what you need to test – and you can string together exactly what you need… `WithInvoice(invoice).WithAddress(address).Build()`. This is particularly useful if you are creating an immutable object.

So what difference does it make to the test code?

Well, you call the test builder and customise the parts that are important to you, saving you unnecessary lines of code.

```
<pre class="prettyprint lang-csharp">
[TestMethod]
[ExpectedException(typeof(InvalidEntityException))]
public void Before()
{
    var user = new User((SessionId)123, DateTime.Parse("31/01/2013"));
    user.SetPassword("Test Password");
    target.Persist(user);
}

[TestMethod]
[ExpectedException(typeof(InvalidEntityException))]
public void After()
{
    var user =  TestUserBuilder.Get().WithPassword("Test Password").Build();
    target.Persist(user);
}
```
A few notes. When I was creating the test data by hand, I had to supply stuff I really don’t care about for my test – stuff that doesn’t affect the outcome. That is a saving you would get from either a Test Mother or a Test Data Builder – the Test Data Builder starts to pay off when your next test needs a slightly different looking object.

This was already a simple test – I have some tests where the Test Data Builder will save many more lines of code and that is where I will get the real benefits, but from a readability point of view this is much better.

Here is a basic example of the Test Data Builder.

```
<pre class="prettyprint lang-csharp">
public class TestUserBuilder
{
    private User user;
    
    public static TestUserBuilder Get() {
        return new TestUserBuilder();
    }
    
    public TestUserBuilder()
    {
        user = new User((SessionId)999, DateTime.Parse("31/01/2013"));
    }
    
    public TestUserBuilder WithId(UserId id)
    {
        user.Id = id;
        return this;
    }
    
    public TestUserBuilder WithPassword(string password)
    {
        user.SetPassword(password);
        return this;
    }
    
    public User Build()
    {
        return user;
    }
}
```
In this example, I am simply updating properties on some object, but you can also store up the required values in order to build an immutable object, for example.
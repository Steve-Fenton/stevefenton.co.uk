---
id: 802
layout: src/layouts/Default.astro
title: 'Mocking a service proxy in .NET with Rhino Mocks'
pubDate: 2012-05-10T16:12:30+01:00
author:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=802'
permalink: /2012/05/mocking-a-service-proxy-in-net-with-rhino-mocks/
interface_sidebarlayout:
    - default
categories:
    - Programming
tags:
    - 'c#'
    - rhino
---

If you are calling a service via a service proxy, how do you mock the service call and ensure it was called with the correct parameters? Here is an example using Rhino Mocks to capture the call via the proxy and then test that it is the correct call.

```
<pre class="prettyprint lang-csharp">
namespace Fenton.Example
{
    public class ExampleClass
    {
        private readonly IServiceProxy<IExampleService> _exampleService;
        public ExampleClass() : this(new ServiceProxy<IExampleService>())
        {
        }
       
        public ExampleClass(IServiceProxy<IExampleService> exampleService)
        {
            _exampleService = exampleService;
        }
       
        public ExampleResult ExampleMethod(string exampleArgument)
        {
            return _exampleService.Call(s => s.MakeThingsHappen(exampleArgument));
        }
    }
}
```

First of all, here is an example of the kind of thing we want to test. This example has just the basic structure to demonstrate what we are trying to test – in real life the service proxy call could just be a part of a larger method.

So here is how we can test this method. The example appears verbose because many of the items set up in the test would normally be done in a SetUp method and the explanatory comments would also be absent in real life.

```
<pre class="prettyprint lang-csharp">
namespace Fenton.ExampleTests
{
    [TestFixture]
    public class ExampleClassTests
    {
        [Test]
        public void ExampleMethodExpectCallToServiceWithCorrectArguments() {
            // Set up the mock service and the mock proxy
            var exampleServiceMock = MockRepository.GenerateMock<IExampleService>();
            var exampleServiceProxyMock = MockRepository.GenerateMock<IServiceProxy<IExampleService>>();
           
            // Define the arguments and return values
            const string exampleArgument = "Example";
            var expectedReturn = MockRepository.GenerateStrictMock<ExampleResult>();
           
            // Set up the class to be tested
            var target = new ExampleClass(exampleServiceProxyMock);
           
            // Create a Func (or and Action if there is no return value) that will be used to capture the service call
            // In this example, we expect IExampleService to be called and the return value is an ExampleResult
            Func<IExampleService, ExampleResult> serviceCall = null;
           
            // Stub the proxy call. The Callback is where we capture the service call and assign it to the serviceCall we created above
            exampleServiceProxyMock.Stub(s => s.Call(Arg<Func<IExampleService, ExampleResult>>.Is.Anything))
                .Callback<Func<IExampleService, ExampleResult>>(a => { serviceCall = a; return true; })
                .Return(expectedReturn)
                .Repeat.Once();
               
            var result = target.ExampleMethod(exampleArgument);
           
            Assert.AreSame(expectedReturn, result);
           
            // We can now use the call we captured and run it against the exampleServiceMock we created
            serviceCall(exampleServiceMock);
           
            // We can verify the the mock service was called with the correct arguments
            exampleServiceMock.AssertWasCalled(s => s.MakeThingsHappen(exampleArgument));
        }
    }
}
```
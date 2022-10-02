---
id: 12187
title: 'Introducing an async pipeline in C#'
pubDate: '2021-10-25T16:45:09+01:00'
author: 'Steve Fenton'
layout: post
guid: 'https://www.stevefenton.co.uk/?p=12187'
permalink: /2021/10/introducing-an-async-pipeline-in-c/
categories:
    - Programming
tags:
    - 'c#'
---

Pipelines are an interesting way to implement your code to prevent complex inter-relationships between components. Having used pipelines on some simple synchronous code, I wanted to see what happens when you try it with async code.

Using a real app is a useful way to explore this, but I warn you now; there are some bad practices in this code both before and after the changes. Hopefully there are fewer after the changes, as our goal is to make things better each time we touch it.

The scenario is that the same check configuration is passed through a number of different kinds of test utility. There’s one for uptime, another to check certificates, and another to look up and check DNS records. The initial code is quite procedural and it shows signs of leaks as it checks before each test whether the organisation is allowed to perform this type of check. Once all the checks are done, it stores the outcome and logs some information.

```
<pre class="prettyprint lang-csharp">
UptimeChecker uptimeCheck = new UptimeChecker();
TlsChecker tlsCheck = new TlsChecker();
DnsChecker dnsCheck = new DnsChecker();

foreach (var info in checkinfo)
{
    AggregateCheckResult result = new AggregateCheckResult();

    if (info.AllowanceForUptimeChecks && info.CheckUptime)
    {
        result = uptimeCheck.Check(info, result).Result;
    }

    if (info.AllowanceForTlsChecks && info.CheckTls)
    {
        result = tlsCheck.Check(info, result).Result;
    }

    if (info.AllowanceForDnsChecks && info.CheckDns)
    {
        result = dnsCheck.Check(info, result).Result;
    }

    data.SetCheckResult(info, result, DateTime.MinValue);

    Console.WriteLine("HTTP: Checked {0} after waiting {1}: {2}", info.Url, GetSinceText(info), result.Success);
}
```

Each of the test utilities has a similar method, which in this case comes from an interface.

```
<pre class="prettyprint lang-csharp">
Task<AggregateCheckResult> Check(CheckInfo check, AggregateCheckResult result);
```

### Resolving the leak

Before we introduce a pipeline, let’s push all those checks down into the respective method. When we call `uptimeCheck.Check` it can easily decide if there is an allowance and whether it should run. In other words, if we always call it and it decides whether or not to run, we no longer need to take care of that decision. There are other ways to shave that yak.

The code after this change has already starting morphing into something that looks a bit more like a pipeline, but there’s still a way to go.

```
<pre class="prettyprint lang-csharp">
UptimeChecker uptimeCheck = new UptimeChecker();
TlsChecker tlsCheck = new TlsChecker();
DnsChecker dnsCheck = new DnsChecker();

foreach (var info in checkinfo)
{
    AggregateCheckResult result = new AggregateCheckResult();

    result = uptimeCheck.Check(info, result).Result;

    result = tlsCheck.Check(info, result).Result;

    result = dnsCheck.Check(info, result).Result;

    data.SetCheckResult(info, result, DateTime.MinValue);

    Console.WriteLine("HTTP: Checked {0} after waiting {1}: {2}", info.Url, GetSinceText(info), result.Success);
}
```

### Let async be async

The next thing I don’t link about this code is all that `.Result` shenanigans. Isn’t this supposed to be async? If we could use the `Task` all the way through, we wouldn’t need to keep pulling the result out.

As we want to make this all pipelinable, we should also think about the parameter order. To leverage a common set of pipeline extension methods, it helps to have our target type first.

So, let’s update the interface to return a task, and to accept the same task type as the first input. I’m using Visual Studio, so I can safely refactor the order of parameters using <kbd>CTRL</kbd> + <kbd>R</kbd> + <kbd>O</kbd> to run the reorder parameter refactoring. It will update all of the implementations of this interface for me. Our check methods now have the adjusted signature:

```
<pre class="prettyprint lang-csharp">
Task<AggregateCheckResult> Check(Task<AggregateCheckResult> result, CheckInfo check);
```

We can now crush all the checks into the pipeline, passing in the additional parameter as shown below. This gives us a partial pipeline, because there are still lines afterwards that save the result and write a message. Side note… I decided to rename `info` to `check` in this step too.

```
<pre class="prettyprint lang-csharp">
UptimeChecker uptimeCheck = new UptimeChecker();
TlsChecker tlsCheck = new TlsChecker();
DnsChecker dnsCheck = new DnsChecker();

foreach (var check in checkinfo)
{
    Task<AggregateCheckResult> tempResult = Task.FromResult(new AggregateCheckResult())
        .Pipe(uptime.Check, check)
        .Pipe(tls.Check, check)
        .Pipe(dns.Check, check);

    AggregateCheckResult result = tempResult.Result;

    data.SetCheckResult(check, result, DateTime.MinValue);

    Console.WriteLine("HTTP: Checked {0} after waiting {1}: {2}", check.Url, GetSinceText(check), result.Success);
}
```

These other methods just need to be subjected to a similar treatment. We don’t have to change the original method signature, we can create a new method with a suitable signature that calls the existing one (rather than trigger a mass change throughout the application).

As long as there is a method that accepts the type that came out of the last step, we can continue to chain our pipeline.

Let’s create a `Save` method that accepts the arguments in the correct order (and hides our `DateTime.MinValue`) and a `LogCheck` method that writes our message to the console. We can then add them to the pipeline.

```
<pre class="prettyprint lang-csharp">
UptimeChecker uptimeCheck = new UptimeChecker();
TlsChecker tlsCheck = new TlsChecker();
DnsChecker dnsCheck = new DnsChecker();

foreach (var check in checkinfo)
{
    Task<AggregateCheckResult> result = Task.FromResult(new AggregateCheckResult())
        .Pipe(uptime.Check, check)
        .Pipe(tls.Check, check)
        .Pipe(dns.Check, check)
        .Pipe(data.Save, check)
        .Pipe(LogCheck, check)
        .Result;
}
```

We have now replaced all our code with a neat pipeline.

There is more work to do, but you can hopefully see the progression from a kind of procedural method towards a more pipeline-based method. The next step might be to bring that loop into the pipeline, or challenge that final remaining `.Result` by making this whole method async.

### The pipeline code

This example uses pipeline code originally created by [Scott Wlaschin](https://fsharpforfunandprofit.com/pipeline/) who also has a neat slide set on the subject. He might also want to convert you to F# along the way, but he’s super-gentle about it.

I’m using a set of overloads to give me various numbers of parameters. You could add more, or maybe just remove some parameters. Add this class to your app to get `.Pipe` added to all your types.

```
<pre class="prettyprint lang-csharp">
public static class PipelineExtensions
{
    public static TOut Pipe<TIn, TOut> (this TIn input, Func<TIn, TOut> fn)
    {
        return fn(input);
    }

    public static TOut Pipe<TIn, TParam1, TOut> (this TIn input, Func<TIn, TParam1, TOut> fn, TParam1 p1)
    {
        return fn(input, p1);
    }

    public static TOut Pipe<TIn, TParam1, TParam2, TOut>(this TIn input, Func<TIn, TParam1, TParam2, TOut> fn, TParam1 p1, TParam2 p2)
    {
        return fn(input, p1, p2);
    }
}
```

You may also find this basic test class useful in understanding the pipeline extensions.

```
<pre class="prettyprint lang-csharp">
[TestClass]
public class PipelineTests
{
    [TestMethod]
    public void AddPipeline()
    {
        5
            .Pipe(Add, 3)
            .Pipe(Add, 7)
            .ShouldBe(15);
    }

    [TestMethod]
    public void AddAsyncPipeline()
    {
        Task.FromResult(5)
            .Pipe(AddAsync, 3)
            .Pipe(AddAsync, 7)
            .Result.ShouldBe(15);
    }

    public int Add(int number1, int number2)
    {
        return number1 + number2;
    }

    public async Task<int> AddAsync(Task<int> number1, int number2)
    {
        return await number1 + number2;
    }
}
```

### Feedback welcome

This is a real-life example, so it’s not perfect. Real life never is, but we have Stoicism to help us with that. However, if something isn’t clear or you feel I’ve enraged you with something bad I’ve done, I’m happy to improve on this example. You can find current ways to get in touch on my [contact page](https://www.stevefenton.co.uk/contact/).
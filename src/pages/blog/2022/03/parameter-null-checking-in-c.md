---
layout: src/layouts/Default.astro
title: Parameter Null Checking in C#
navMenu: false
pubDate: 2022-03-04T15:39:44+00:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - C-Sharp
---

Last month, some eagle-eyed folk spotted a change in the C# 11 pipeline. This triggered a [fair bit of discussion](https://github.com/dotnet/runtime/pull/64720) about the new feature. In this post I’ll dig a bit into the decision and explain a bit more about the feature.

## What is parameter null checking?

Let’s start by looking at the feature. For a couple of decades we have been writing the following code to check that an argument we were passed isn’t `null`:

```csharp
public void RunSomething(object myParam)
{
    if (myParam is null)
    {
        throw new ArgumentNullException(nameof(myParam));
    }

    // Code I want to read
}
```

The more parameters a method has, the further you have to scroll to get to the code you want to read. This is the driver behind the parameter null checking feature.

Parameter null checking provides a syntax for achieving the same checks without writing all the code. You just add `!!` to the end of the parameter name.

```csharp
public void RunSomething(object myParam!!)
{
    // Code I want to read
}
```

Now the code I want to read is right at the top of the method. Hooray. Algorithmically, I save `(4 lines <em>x</em> parameters) - (2 characters <em>x</em> parameters)` across my whole codebase. That’s approximately a *gazelle-ian* lines of code.

Under the hood, it doesn’t generate exactly the same code you might have written yourself, it generates a more performant version. This interests me, so here’s what the compiler turns the code into…

```csharp
public void RunSomething(object myParam)
{
    <PrivateImplementationDetails>.ThrowIfNull(myParam, "myParam");

    // Code I want to read
}
```

The `PrivateImplementationDetails` alluded to in the above output is below. You could implement a version of this in your own codebase right now if you really wanted to.

```csharp
[CompilerGenerated]
internal sealed class <PrivateImplementationDetails>
{
    internal static void Throw(string paramName)
    {
        throw new ArgumentNullException(paramName);
    }

    internal static void ThrowIfNull(object argument, string paramName)
    {
        if (argument == null)
        {
            Throw(paramName);
        }
    }
}
```

## Why?!

If you followed the discussion, you will have found many questions or comments relate to the choice of adding two exclamation marks to the parameter name. This can be broken down into the following component questions:

To summarise the main theme of the questions, the choices that people didn’t understand were:

- Why did they choose `!!`
- Why does the `!!` go on the parameter *name* not the parameter *type*?

The answers to both questions came from Jared Parsons, who joined the Languages and Runtime Community Stand-up to discuss this topic.

[Watch the Languages and Runtime Community Stand-up from February](https://www.youtube.com/watch?v=Fz4hViH5bGc)

Why was `!!` chosen? There is a chance that this feature might be made available inside methods – not just for the parameters. The syntax choice had to allow for this possible future development. The single exclamation mark syntax `!` already exists within method bodies since C’# 8. This is the null suppression operator (or *unary postfix `!` operator* to its friends). This operator forgives nulls, so the so the use of the double `!!` for holding a grudge against nulls falls into line with this concept without clashing with the existing feature. `myParam!` forgives and `myParam!!` would want revenge (or, throw an exception).

It might be used something like the below code, which is not (yet) valid in any version of C#.

```csharp
public void RunSomething(object myParam)
{
    if (_someCondition) 
    {
        myParam!!;
        // Use myParam
    }

    // Code that doesn't need to use myParam
}
```

Why does the `!!` go on the parameter *name* not the parameter *type*? Because this isn’t type information; it’s a modification of the behaviour in response to the value.

With this little insight into the choice of syntax, we can understand a bit more how it fits into the language. It might not be perfect, but it does make sense.

> This syntax \[…\] didn’t have people jumping up in the room saying: ‘This is perfect, we have found the solution, this is great!’ \[…\] this was the syntax we found that worked. <cite>Jared Parsons</cite>

## Summing up

If you take great exception to this syntax, you can carry on without it. You can write your conditional checks, or use the equivalent to the compiler generated, which is `ArgumentNullException.ThrowIfNull(myParam);`. You’ll at least reduce the lines of code by 66%. Just remember the amazing maths presented before!

```
(4 lines <em>x</em> parameters) - (2 characters <em>x</em> parameters)
```
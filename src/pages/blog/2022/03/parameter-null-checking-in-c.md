---
title: Parameter Null Checking in C#
navMenu: false
pubDate: 2022-03-04
modDate: 2022-10-15
keywords: parameters,null checking,c#
description: 
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - C-Sharp
---

Last month, some eagle-eyed folk spotted a change in the C# 11 pipeline. This triggered a [fair bit of discussion](https://github.com/dotnet/runtime/pull/64720) about the new feature. In this post, I’ll dig into the decision and explain more about parameter null checking in C#.

## The difference between parameters and arguments

Occasionally I find confusion around the difference between parameters and arguments. Parameters are the named items you accept in a method, and arguments are the values passed to the method.

In the real world, the volume of your speakers is a parameter. The current volume is the argument you passed by turning a dial. In a system, you might see this represented as below, `volume` is the parameter, and `11` is the argument:

```csharp
SetVolume(11)

void SetVolume(int volume) {
    //...
}
```

## What is parameter null checking?

Let’s start by looking at the parameter null checking feature. For a couple of decades, you have probably written the following code to check that an argument isn’t `null`:

```csharp
public void RunSomething(object myParam)
{
    if (myParam is null)
    {
        throw new ArgumentNullException(nameof(myParam));
    }

    // Code you want to read
}
```

The more parameters a method has, the further you scroll to get to the code you want to read. This is one driver behind the parameter null checking feature.

Parameter null checking provides a syntax for achieving the same check without writing the code. Just add `!!` to the end of the parameter name:

```csharp
public void RunSomething(object myParam!!)
{
    // Code you want to read
}
```

Now the code you want to read is at the top of the method. Hooray. You can save thousands of lines of code across your codebase with this. Here's a quick algorithm for the savings.

```
(4 lines <em>x</em> parameter count) - (2 characters <em>x</em> parameter count)
```

Under the hood, it doesn’t generate *exactly* the same code you might have written. It generates a more performant version. Here's the compiled equivalent to the `!!` code:

```csharp
public void RunSomething(object myParam)
{
    <PrivateImplementationDetails>.ThrowIfNull(myParam, "myParam");

    // Code you want to read
}
```

The `<PrivateImplementationDetails>` alluded to in the above output is below. You could implement this in your codebase if you really wanted to. You'd just need to name the class.

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

## Why use `!!`?

If you followed the discussion, you would have found many questions or comments about the choice of adding two exclamation marks to the parameter name. This can be broken down into the following component questions:

To summarise the central theme of the questions, the choices that people didn’t understand were:

- Why choose `!!`
- Why does the `!!` go on the parameter *name* rather than the parameter *type*?

The answers to both questions came from Jared Parsons, who joined the Languages and Runtime Community Stand-up to discuss this topic.

[Watch the Languages and Runtime Community Stand-up from February](https://www.youtube.com/watch?v=Fz4hViH5bGc)

### Why was `!!` chosen?

There is a chance that this feature might be made available inside methods – not just for the parameters.

The syntax choice had to allow for this potential scenario. The single exclamation mark syntax `!` already exists in method bodies since C# 8. This is the *null suppression operator* (or *unary postfix operator* to its friends). This operator forgives nulls, so the use of the double `!!` for holding a grudge against nulls falls into line with this concept without clashing with the existing feature.

In other words, `myParam!` forgives and `myParam!!` demands revenge.

It might be used something like the below code, which is not (yet) valid in any version of C#. The code only checks the null-ness of `myParam` conditionally. A real world example would be "if this post has an image, the alt text can't be null".

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

### Why annotate the name, not the type?

This is a shorter explanation. The `!!` goes on the parameter *name* not the *type* because this isn’t type information. It’s a modification of the behaviour in response to the value.

## Summing up

With these insights into the choice of syntax, you can understand how it fits into the language. It might not be perfect, but it does make sense.

> This syntax \[…\] didn’t have people jumping up in the room saying: ‘This is perfect, we have found the solution, this is great!’ \[…\] this was the syntax we found that worked. <cite>Jared Parsons</cite>

If you take exception to this syntax, you can carry on without it. You can continue to write conditional checks or use the code like the compiler-generated code, which reduces your lines of code by 66%.

Once the initial reactions fade, most people will move to the new parameter null-checking syntax. It's easier to learn and remember than the long-form lines of code for checking for `null`, and it makes code more readable.
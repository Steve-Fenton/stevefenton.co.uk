---
title: Raw string literals in C#
navMenu: false
pubDate: 2022-02-17
modDate: 2022-10-16
keywords: C#,raw string literals,string syntax
description: Find out how to use the amazing C# raw string literals feature, which makes working with strings nicer.
authors:
    - steve-fenton
bannerImage:
    src: /img/2022/02/raw-string-literals.jpg
    alt: Raw string literals
categories:
    - Programming
tags:
    - C-Sharp
---

There's a new feature in C# 11 that I think will become highly popular. That feature is *raw string literals*. We have gained several ways to wrap strings over the years, plain old strings `"c:\\temp"`, or strings that don't need to be escaped `@"c:\temp"`, or template literals `$` that interpolate variables. However, in all these cases you still have to escape *something* (quotes in particular).

That means you end up with…

```csharp
string example = @"
    This is an ""example"" of a multi-line string, but I still have to escape all the ""quotes"".
";

Console.WriteLine(example);
```

The output for this program is:

```
>
>    This is an "example" of a multi-line string, but I still have to escape all the "quotes".
>
```

## Enabling the preview feature

At the time of writing, this is a preview feature. To try this out for yourself, you need to have Visual Studio 17.2.0 or higher and have preview language enabled:

```xml
<LangVersion>preview</LangVersion>
```
While this is in preview, you shouldn’t use it for your day job. You can explore the feature in preparation for general and supported availability.

I am using a “>” in the output examples to help visualise white-space treatment, as there are some features that allow you to control this.

## Using a raw string literal

Lets update this example with C# 11 to use raw string literals. To use a raw string literal, start the string with *at least* three quotes:

```csharp
string example = """
    This is an "example" of a raw literal string, and I don't have to escape all the "quotes".
""";
```

We still get the same output, but we don’t need to escape anything, *and it has no leading or trailing line breaks*.

```
>    This is an "example" of a raw literal string, and I don't have to escape all the "quotes".
```

The string will continue until those three closing quotes – and there’s a bit of magic available here, too. If your string needs to contain three quotes in a row, you can change the start and end sections to have more quotes. Basically, you can add as many quotes as you need to ensure that your content doesn't have a series of consecutive quotes that looks like the string's end. Make sure the number of quotes at the end matches the number of quotes at the start, the exact number is up to you.

```csharp
string example = """""""""""""""""""""""""
    This is an "example" of a raw literal string, and I don't have to escape all the "quotes", even if I have three in a row, such as """.
""""""""""""""""""""""""";
```

## Indentation

Another notable feature is baked into raw string literals to handle surplus whitespace. By indenting the closing quotes, you can unindent the contents of the string. As you can see in the above example, our output contains the four spaces that result from indenting the string for readability in the source code. However, if we also indent the closing quotes, the additional indentation gets stripped:

```csharp
string example = """
    This is an "example" of a raw literal string, and I don't have to escape all the "quotes".
    """;
```

Our output now has no extraneous indentation.

```
>This is an "example" of a raw literal string, and I don't have to escape all the "quotes".
```

This is particularly useful if your string contains meaningful indentation, as that will remain in the output; only unnecessary additional indentation from your code file is removed.

Here’s an example using :abbr[OCL]{title="Octopus Configuration Language"}, which is a variant of :abbr[HCL]{title="Hashicorp Configuration Language"}.

```csharp
string example = """
    step "Greetings World" {
        script_action {
            channels = ["Release", "Beta"]
            environments = ["Production"]
            worker_pool = "Ubuntu 2018.4"
            syntax = "Bash"
            body = <<EOT
                echo "#{Greeting} World!"
            EOT
        }
    }
    """;
```

All the meaningful indentation remains, but the additional four spaces (in this case) have been removed.

```
>step "Greetings World" {
>    script_action {
>        channels = ["Release", "Beta"]
>        environments = ["Production"]
>        worker_pool = "Ubuntu 2018.4"
>        syntax = "Bash"
>        body = <<EOT
>            echo "#{Greeting} World!"
>        EOT
>    }
>}
```

Important note: You get to choose how much indentation to remove with your placement of the quotes, so if you want the whole block moved out by four spaces, just move the closing quote block left by four spaces. The compiler will warn you when the closing quote is indented more than the “least indented line”.

:::figure{.inset}
:img{src="/img/2022/02/indentation-warning.jpg" alt="Indentation Warning" loading="lazy"}
::figcaption[Indentation warning]
:::

As you can see in the above example, the closing quote group is *more* indented than one of the lines in the string. This is an error condition, usually solved by moving the closing quote group to the left.

## Can I use string interpolation

You can combine string interpolation with raw string literals using the normal `$` prefix:

```csharp
string tokenValue = "(my value)";

string example = $"""
    This is an "example" of a raw literal string with a token: {tokenValue}, and I don't have to escape all the "quotes".
    """;
```

As you expect, this outputs:

```
>This is an "example" of a raw literal string with a token: (my value), and I don't have to escape all the "quotes".
```

## Summary

When this feature moves into general availability, you are likely to have a whole bunch of string literals that you can improve thanks to this feature:

- Using 3 or more quotes to avoid having to escape quotes within the string
- Indenting the closing quote set to remove the “readability” indentation that is useful in your code file but not in the string itself

Remember you can use more than 3 quotes if your string contains a series of three consecutive quotes to ensure your string literal doesn’t clash with its contents.

## Appendix A – Example console code

The below example can be pasted into a simple .NET 6 console application to demonstrate the different handling of strings as described above. Sometimes just running some code can answer a lot of questions. The output is numbered and wrapped in `>>` and `<<`.

```csharp
string example;
string tokenValue = "(my value)";
int counter = 0;

example = @"
    This is an ""example"" of a multi-line string, but I still have to escape all the ""quotes"".
";

Console.WriteLine($"{++counter}>>{example}<<");

example = """
    This is an "example" of a raw literal string, and I don't have to escape all the "quotes".
""";

Console.WriteLine($"{++counter}>>{example}<<");

example = """""""""""""""""""""""""
    This is an "example" of a raw literal string, and I don't have to escape all the "quotes", even if I have three in a row, such as """.
""""""""""""""""""""""""";

Console.WriteLine($"{++counter}>>{example}<<");

example = """
    This is an "example" of a raw literal string, and I don't have to escape all the "quotes".
    """;

Console.WriteLine($"{++counter}>>{example}<<");

example = $"""
    This is an "example" of a raw literal string with a token: {tokenValue}, and I don't have to escape all the "quotes".
    """;

Console.WriteLine($"{++counter}>>{example}<<");

example = """
        step "Greetings World" {
            script_action {
                channels = ["Release", "Beta"]
                    environments = ["Production"]
                    worker_pool = "Ubuntu 2018.4"
                    syntax = "Bash"
                    body = << EOT
                        echo "#{Greeting} World!"
                    EOT
                }
        }
        """;

Console.WriteLine($"{++counter}>>{example}<<");

Console.ReadKey();
```

<details>
<summary>Example output</summary>
```
1>>
    This is an "example" of a multi-line string, but I still have to escape all the "quotes".
<<
2>>    This is an "example" of a raw literal string, and I don't have to escape all the "quotes".<<
3>>    This is an "example" of a raw literal string, and I don't have to escape all the "quotes", even if I have three in a row, such as """.<<
4>>This is an "example" of a raw literal string, and I don't have to escape all the "quotes".<<
5>>This is an "example" of a raw literal string with a token: (my value), and I don't have to escape all the "quotes".<<
6>>step "Greetings World" {
    script_action {
        channels = ["Release", "Beta"]
            environments = ["Production"]
            worker_pool = "Ubuntu 2018.4"
            syntax = "Bash"
            body = << EOT
                echo "#{Greeting} World!"
            EOT
        }
}<<
```
</details>
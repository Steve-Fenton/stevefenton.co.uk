---
layout: src/layouts/Default.astro
navMenu: false
title: 'Raw string literals in C#'
pubDate: 2022-02-17T20:00:41+00:00
author:
    - steve-fenton
image: /wp-content/uploads/2022/02/raw-string-literals.jpg
categories:
    - Programming
tags:
    - 'c#'
---

New in C# 11, there is a feature that I think will become highly popular. That feature is *raw string literals*. There have been a few different modifiers for string literals before now that work in various scenarios such as changing `"c:\\temp"` to `@"c:\temp"` or using template literals with a `$`. However, in all these cases you still have to escape things (quotes in particular).

That means you end up with…

```
<pre class="prettyprint lang-csharp">
string example = @"
    This is an ""example"" of a multi-line string, but I still have to escape all the ""quotes"".
";

Console.WriteLine(example);
```

The output for this program is:

```
<pre class="prettyprint">
>
>    This is an "example" of a multi-line string, but I still have to escape all the "quotes".
>
```

### Enabling the preview feature

At the time of writing, this is a preview feature. To try this out for yourself you need to have Visual Studio 17.2.0 or higher, and have preview language enabled:

```
<pre class="prettyprint lang-xml">
<LangVersion>preview</LangVersion>
```

While this is in preview, you shouldn’t use it for your day job, just to explore in preparation for general and supported availability.

I am using a “&gt;” in the output examples to help visualise white-space treatment, as there are some features that allow you to control this.

### Using a raw string literal

We can update this example with C# 11 to use raw string literals. We just start the string with *at least* three quotes:

```
<pre class="prettyprint lang-csharp">
string example = """
    This is an "example" of a raw literal string, and I don't have to escape all the "quotes".
""";
```

We still get the same output, but we don’t need to escape anything, *and it has no leading or trailing line breaks*.

```
<pre class="prettyprint">
>    This is an "example" of a raw literal string, and I don't have to escape all the "quotes".
```

The string will continue until those three closing quotes – and there’s a bit of smart magic available here because if your string needs to contain three quotes in a row, you can change the start and end sections to have more quotes. Basically, you can add as many quotes as you need to ensure that your content won’t contain the closing set of quotes. You just need to make sure the number of quotes at the end matches the number of quotes at the start.

```
<pre class="prettyprint lang-csharp">
string example = """""""""""""""""""""""""
    This is an "example" of a raw literal string, and I don't have to escape all the "quotes", even if I have three in a row, such as """.
""""""""""""""""""""""""";
```

### Indentation

There is one other special feature baked into raw string literals. By indenting the closing quotes, you can unindent the contents of the string. As you can see in the above example, our output contains the four spaces that result from indenting the string for readability in the code. However, if we also indent the closing quotes, the additional indentation within the string gets stripped out:

```
<pre class="prettyprint lang-csharp">
string example = """
    This is an "example" of a raw literal string, and I don't have to escape all the "quotes".
    """;
```

Our output now has no extraneous indentation.

```
<pre class="prettyprint">
>This is an "example" of a raw literal string, and I don't have to escape all the "quotes".
```

This is particularly useful if your string contains useful indentation, as that will remain in the output; just the unnecessary additional indentation from your code file is removed.

Here’s an example using <abbr title="Octopus Configuration Language">OCL</abbr> which is a variant of <abbr title="Hashicorp Configuration Language">HCL</abbr>.

```
<pre class="prettyprint lang-csharp">
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
<pre class="prettyprint">
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

Important note: You get to choose how much indentation to remove with your placement of the quotes, so if you want the whole block moved out by four spaces, just move the closing quote block four spaces left! The compiler will warn you when the closing quote is indented more than the “least indented line”.

[![Indentation Warning](https://www.stevefenton.co.uk/wp-content/uploads/2022/02/indentation-warning.jpg)](https://www.stevefenton.co.uk/?attachment_id=12748)

As you can see in the above example, the closing quote group is *more* indented than one of the lines within the string. This is an error condition, usually solved by moving the closing quote group to the left.

### Can I use string interpolation

You can combine string interpolation with raw string literals, using the normal `$` prefix:

```
<pre class="prettyprint lang-csharp">
string tokenValue = "(my value)";

string example = $"""
    This is an "example" of a raw literal string with a token: {tokenValue}, and I don't have to escape all the "quotes".
    """;
```

As you expect, this outputs:

```
<pre class="prettyprint">
>This is an "example" of a raw literal string with a token: (my value), and I don't have to escape all the "quotes".
```

### Summary

When this feature moves into general availability, you are likely to have a whole bunch of string literals that your can improve thanks to the two key parts of this feature:

- Using 3 or more quotes to avoid having to escape quotes within the string
- Indenting the closing quote set to remove the “readability” indentation that is useful in your code file, but not in the string itself

Remember you can use more than 3 quotes if your string contains a series of three consecutive quotes to ensure your string literal doesn’t clash with its contents.

### Appendix A – Example console code

The below example can be pasted into a simple .NET 6 console application to demonstrate the different handling of strings as described above. Sometimes just running some code can answer a lot of questions. The output is numbered and wrapped in &gt;&gt; and <summary>Example code</summary>

```
<pre class="prettyprint lang-csharp">
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

<details><summary>Example output</summary>```
<pre class="prettyprint">
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
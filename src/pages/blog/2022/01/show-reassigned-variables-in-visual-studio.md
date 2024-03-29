---
title: Show Reassigned Variables in Visual Studio
navMenu: false
pubDate: 2022-01-04
modDate: 2022-10-16
keywords: reassigned,variables,visual studio
description: Find out how to highlight reassigned variables in Visual Studio.
authors:
    - steve-fenton
bannerImage:
    src: /img/2022/01/reassigned-variable.jpg
    alt: Reassigned variable
categories:
    - Programming
    - 'Visual Studio'
tags:
    - C-Sharp
---

There is a really neat new feature in Visual Studio 2022, which is switched off by default. So, I thought I’d tell you about it to encourage you to switch it on. The feature will highlight variables that get reassigned by underlining them in the editor.

When you enable this feature, variables assigned once are left alone, but if a variable is later given a new value, it will be underlined in all locations.

Examples that will *not* be highlighted:

```csharp
// Example 1 - this is never reassigned, so isn't highlighted
int example1 = 1;

// Example 2 - although this is assigned on a different line, it is never reassigned, so isn't highlighted
int example2;

example2 = 2;
```

Examples that *will* be highlighted:

```csharp
// Example 1 - this is reassigned later, so will be highlighted
int example1 = 1;

// Example 2 - this is assigned on another line, but it is the later reassignment that means it will be highlighted
int example 2;

example 2 = 2;

example1 = 10;
example2 = 20;
```

Here is a screenshot to show this in action. You’ll see the `notAfter` variable is underlined because it is reassigned. The other variables are not highlighted because they are never reassigned.

:::figure{.inset}
:img{src="/img/2022/01/reassigned-variable.jpg" alt="Screenshot showing a variable underlined because it is reassigned" loading="lazy"}
::figcaption[Reassigned variables are underlined]
:::

## How to enable this feature

You can enable this feature in **Tools -> Options** by navigating to **Text Editor -> C# -> Advanced** and selecting the option **Underline reassigned variables**.

:::figure{.inset}
:img{src="/img/2022/01/underline-reassignments.jpg" alt="Finding the underline reassigned variables option in the options dialog" loading="lazy"}
::figcaption[The reassigned variables option]
:::
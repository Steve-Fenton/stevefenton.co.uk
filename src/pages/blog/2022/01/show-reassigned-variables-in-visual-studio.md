---
layout: src/layouts/Default.astro
navMenu: false
title: 'Show Reassigned Variables in Visual Studio'
pubDate: 2022-01-04T13:16:00+00:00
author:
    - steve-fenton
image: /wp-content/uploads/2022/01/reassigned-variable.jpg
categories:
    - Programming
    - 'Visual Studio'
tags:
    - 'c#'
---

There is a really neat new feature in Visual Studio 2022, which is off by default. So, I thought I’d tell you about it to encourage you to switch it on. The feature will highlight variables that get reassigned by underlining them in the editor.

When you enable this feature, variables that are assigned once are left alone, but if a variable is later assigned a new value, it will be underlined in all locations.

Examples that will *not* be highlighted:

```
<pre class="prettyprint lang-csharp">
// Example 1 - this is never reassigned, so isn't highlighted
int example1 = 1;

// Example 2 - although this is assigned on a different line, it is never reassigned, so isn't highlighted
int example2;

example2 = 2;
```
Examples that *will* be highlighted:

```
<pre class="prettyprint lang-csharp">
// Example 1 - this is reassigned later, so will be highlighted
int example1 = 1;

// Example 2 - this is assigned on another line, but it is the later reassignment that means it will be highlighted
int example 2;

example 2 = 2;

example1 = 10;
example2 = 20;
```
Here is a screenshot to show this in action, you’ll see the `notAfter` variable is underlined, because it is reassigned. The other variables are not highlighted because they are never reassigned.

[![Screenshot showing a variable underlined because it is reassigned](/img/2022/01/reassigned-variable.jpg)](/2022/01/show-reassigned-variables-in-visual-studio/reassigned-variable/)

### How to enable this feature

You can enable this feature in **Tools -&gt; Options** by navigating to **Text Editor -&gt; C# -&gt; Advanced** and selecting the option **Underline reassigned variables**.

[![Finding the underline reassigned variables option in the options dialog.](/img/2022/01/underline-reassignments.jpg)](/2022/01/show-reassigned-variables-in-visual-studio/underline-reassignments/)
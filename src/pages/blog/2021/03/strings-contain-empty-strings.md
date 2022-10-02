---
layout: src/layouts/Default.astro
navMenu: false
title: 'Strings contain empty strings'
pubDate: 2021-03-16T11:13:21+00:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - 'c#'
---

This is just one of those philosophical moments in programming where one small details can have a big impact. In C# / .NET you will find that when you ask if a string contains an empty string (`string.Empty`), the answer is yes. This may seem logically surprising so it is worth bearing in mind should you be comparing strings.

```
<pre class="prettyprint lang-csharp">
// True
bool isMatch = "some string".Contains(string.Empty);
```
A more realistic example is below, imagine you have a config file with some value, and the value isn’t set for some environment… every comparison made will match.

```
<pre class="prettyprint lang-csharp">
private string GetItem(string item) {
  // True
  bool isMatch = item.Contains(_config.RudeWord);

  return isMatch ? string.Empty : item;
}
```
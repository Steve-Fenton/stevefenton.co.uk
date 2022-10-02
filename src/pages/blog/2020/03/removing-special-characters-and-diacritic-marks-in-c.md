---
id: 7989
title: 'Removing special characters and diacritic marks in C#'
pubDate: '2020-03-26T13:18:16+00:00'
author: 'Steve Fenton'
layout: post
guid: 'https://www.stevefenton.co.uk/?p=7989'
permalink: /2020/03/removing-special-characters-and-diacritic-marks-in-c/
categories:
    - Programming
tags:
    - .net
    - 'c#'
---

I did this trick in [JavaScript to remove diacritic marks](https://www.stevefenton.co.uk/2019/09/simplify-strings-for-comparison-by-removing-special-characters-and-diacritic-marks/) a while back and the need to perform a similar transformation in C# came up this week.

The following method simplifies strings such as “façade” into simple string like “façade”.

```
<pre class="prettyprint lang-csharp">
private static string Simplify(string input) 
{
    string normalizedString = input.Normalize(NormalizationForm.FormD);
  
    StringBuilder stringBuilder = new StringBuilder();

    foreach (char c in normalizedString)
    {
        UnicodeCategory unicodeCategory = CharUnicodeInfo.GetUnicodeCategory(c);
      
        if (unicodeCategory != UnicodeCategory.NonSpacingMark)
        {
            stringBuilder.Append(c);
        }
    }

    return stringBuilder.ToString().Normalize(NormalizationForm.FormC);
}
```
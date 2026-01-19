---
title: Removing special characters and diacritic marks in C#
navMenu: false
pubDate: 2020-03-26T13:18:16+00:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - .net
    - C-Sharp
description: Simplify strings for comparison in C# by removing diacritic marks and special characters. A code snippet for normalizing text.
---

I did this trick in [JavaScript to remove diacritic marks](/blog/2019/09/simplify-strings-for-comparison-by-removing-special-characters-and-diacritic-marks/) a while back and the need to perform a similar transformation in C# came up this week.

The following method simplifies strings such as “façade” into simple string like “façade”.

```csharp
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
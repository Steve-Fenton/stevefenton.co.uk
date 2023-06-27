---
title: Change an Excel cell's colour based on data
navMenu: false
pubDate: 2020-12-21T08:30:41+00:00
authors:
    - steve-fenton
banneImage:
    src: /img/2020/12/excel-rgb-cells-preview-background-color.jpg
    alt: An Excel spreadsheet with cells coloured based on RGB cell values
categories:
    - Programming
tags:
    - Excel
    - VBA
---

This might be a bit niche, but I needed to collect :abbr[RGB]{title="red, green, blue"} values in an Excel spreadsheet and I though it would be neat to preview the colour in another cell. To cut a long story short, the only way I could make this happen was with a bit of Visual Basic for Applications. It’s old school, but I can respect that!

My set up is that I have Red, Green, and Blue in cells E, F, and G. I want to leave a gap and then fill cell I based on the input in those cells.

:::div{.inset}
:img{src="/img/2020/12/excel-rgb-cells.jpg" alt="Excel RGB Cells (Before)" loading="lazy"}
:::

So, we need to listen for changes to the worksheet with `Worksheet_Change`, grab the values from the three cells in the row that changed, and fill in the cell in the same row.

```vb
Private Sub Worksheet_Change(ByVal Target As Range)
   If Target.CountLarge > 1 Then Exit Sub
   If Intersect(Target, Range("E:G")) Is Nothing Then Exit Sub
   With Range("I" & Target.Row)
      .Interior.Color = RGB(.Offset(, -4).Value, .Offset(, -3).Value, .Offset(, -2).Value)
   End With
End Sub
```

Important notes… because I want to leave a gap after the RGB cells before I fill a cell, my offsets are -4 (red), -3 (green), and -2 (blue). If you were filling the cell directly after the RGB values, you’d use -3, -2, -1 because this is basically how far away from the coloured cell the values can be found.

You need to specify the cell range containing the RGB colour value (in my case `E:G`) and the cell you want to paint (for me `I`).

The result is a preview of each value that updates automatically whenever you edit a value.

:::div{.inset}
:img{src="/img/2020/12/excel-rgb-cells-preview-background-color.jpg" alt="Excel RGB Cells with Colour Preview in Background" loading="lazy"}
:::

---
title: Extract an Excel column to a text file with PowerShell
navMenu: false
pubDate: 2020-04-11T07:50:03+01:00
authors:
    - steve-fenton
categories:
    - Office
    - Programming
tags:
    - Excel
    - PowerShell
---

Having opened up the same Excel spreadsheet to copy out a list of domain names into a text file for my test automation tools to consume for the third time, I wrote a PowerShell script to do it for me. Yes, it’s the same spreadsheet I mentioned before, it is full of interesting data and is super useful for pumping into a ton of different kinds of test automation that I wrote. I would hazard a guess that my test automation is equivalent to two people checking stuff full time.

You’ll need to set the source and destination files, and a couple of numbers that represent row and column locations… and the script takes care of the rest.

Use `$startRow` to start at row 2 if you have a header row. Otherwise, set it to 1.

Use `$col` to set the column. Column A is 1, Columns B is 2, and so on. Excel starts from 1, not zero… so don’t get caught out. The script works out how far to run down the rows and it writes out the range being used, so you can check that it’s the right column and rows.

```powershell
& {
    $sourceFile = "C:\Temp\data.xlsx"
    $outFile = "C:\Temp\data.txt"

    $startRow = 2
    $col = 1

    $usedCellType = 11

    $excelApp = New-Object -ComObject Excel.Application 

    try {
        $excelApp.visible = $false;
        $excelApp.DisplayAlerts = $false 

        $workbook = $excelApp.Workbooks.Open($sourceFile) 
        $worksheet = $workbook.WorkSheets.item("Properties")
        $endRow = $worksheet.UsedRange.SpecialCells($usedCellType).Row

        $rangeAddress = $worksheet.Cells.Item($startRow, $col).Address() + ":" + $worksheet.Cells.Item($endRow, $col).Address()
        Write-Host "Using range $($rangeAddress)"

        $worksheet.Range($rangeAddress).Value2 | Out-File -FilePath $outFile
        $workbook.Close($false) 
    }
    finally {
        $excelApp.Quit()
    }
}
```
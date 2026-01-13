---
title: Copy Excel to CSV with PowerShell
navMenu: false
pubDate: 2020-04-10T07:50:16+01:00
authors:
    - steve-fenton
categories:
    - Office
    - Programming
tags:
    - Excel
    - PowerShell
description: Automate converting Excel files to CSV with PowerShell. A simple script to save worksheets as CSV files without opening Excel.
---

Having opened up the same Excel spreadsheet to save the data as a CSV for the third time, I wrote a PowerShell script to do it for me.

Simply set the source and destination files and the script takes care of the rest.

```powershell
& {
    $sourceFile = "C:\Temp\data.xlsx"
    $outFile = "C:\Temp\data.csv"

    $excelApplication = New-Object -ComObject Excel.Application 

    try {
        $excelApplication.visible = $false;
        $excelApplication.DisplayAlerts = $false 

        $workbook = $excelApplication.Workbooks.Open($sourceFile) 
        $workbook.WorkSheets.item("MySheetName").Activate()
        $workbook.SaveAs($outFile, [Microsoft.Office.Interop.Excel.XlFileFormat]::xlCSV)
        $workbook.Close() 
    } finally {
        $excelApplication.Quit()
    }
}
```
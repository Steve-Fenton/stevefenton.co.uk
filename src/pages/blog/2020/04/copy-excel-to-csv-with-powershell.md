---
id: 8160
layout: src/layouts/Default.astro
title: 'Copy Excel to CSV with PowerShell'
pubDate: 2020-04-10T07:50:16+01:00
author:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=8160'
permalink: /2020/04/copy-excel-to-csv-with-powershell/
categories:
    - Office
    - Programming
tags:
    - excel
    - powershell
---

Having opened up the same Excel spreadsheet to save the data as a CSV for the third time, I wrote a PowerShell script to do it for me.

Simply set the source and destination files and the script takes care of the rest.

```
<pre class="prettyprint">
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
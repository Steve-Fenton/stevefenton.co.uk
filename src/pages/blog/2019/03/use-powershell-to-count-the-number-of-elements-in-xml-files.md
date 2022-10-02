---
id: 5599
layout: src/layouts/Default.astro
title: 'Use PowerShell to count the number of elements in XML files'
pubDate: 2019-03-12T07:30:24+00:00
author:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=5599'
permalink: /2019/03/use-powershell-to-count-the-number-of-elements-in-xml-files/
categories:
    - Programming
tags:
    - powershell
---

I needed to know how many pictures were being sent in a collection of XML documents, so I wrote a PowerShell script to count the number of picture elements.

The element I’m looking for is in the `$element_xpath` variable. The example below is any `picture` element, anywhere in the document. You could limit this by location or attribute if you wanted to (but I’m always counting elements).

xml-element-counter.ps1

```
<pre class="prettyprint lang-powershell">
$element_xpath = "//picture"

$total = 0
Get-ChildItem -Recurse -Filter "*.xml" | % {
    [System.Xml.XmlDocument] $document = New-Object System.Xml.XmlDocument
    $document.load($_.FullName)
    $found_elements = $document.selectnodes($element_xpath)
    $total += $found_elements.count
    Write-Host $found_elements.count.ToString("n0") elements in $_.Name
}
Write-Host "---------------------"
Write-Host Total $total.ToString("n0")
```

This outputs a list of files with the count per file, with a total at the end of the list.

For example, running `.\xml-element-counter.ps1` will output:

```
<pre class="prettyprint">
320 elements in a.xml
111 elements in b.xml
0 elements in c.xml
334 elements in d.xml
1,465 elements in e.xml
508 elements in f.xml
412 elements in g.xml
2,923 elements in h.xml
1,162 elements in i.xml
4,867 elements in j.xml
230 elements in k.xml
250 elements in l.xml
978 elements in m.xml
---------------------
Total 13,560
```

So there were 13,560 elements found in all those XML files.
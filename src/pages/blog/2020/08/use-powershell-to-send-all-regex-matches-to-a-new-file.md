---
layout: src/layouts/Default.astro
title: Use PowerShell to send all regex matches to a new file
navMenu: false
pubDate: 2020-08-14T17:19:22+01:00
authors:
    - steve-fenton
categories:
    - Automation
    - Programming
tags:
    - powershell
    - regex
---

Yesterday I had to look at a list of stuff on a third-party website and match it up to a list of stuff we control. It took quite a bit of time and some Excel shenanigans to complete the task and as I know it’s going to crop up again, I decided to employ PowerShell to do it in the future.

Rather than go through the whole process, we’ll just look at the common bit that you might want to use, which is grabbing a file (in my case an HTML source file, but it can be any text file) and stripping out the regex matches into a new clean file.

## PowerShell commands

We’re going to use the following:

1. `Get-Content` to grab the text from the source file
2. `Select-String` to regex match the content we want
3. `ForEach-Object` to iterate matches
4. `Out-File` to chuck it into a new file
5. … and most importantly, lots of `|` to pipe everything along the conveyor belt

In the example below I’m sending it all into a CSV – this is arbitrary as it is just a new line for each match. In my case, treating it as a CSV data source is useful in the next step. You could send it to a plain text file too.

## Complete PowerShell script

```powershell
$sourcePath = "example.txt"
$outPath = "example.csv"

$regexPattern = "([A-Z]{2}\-[0-9]{2,4})"

Get-Content $sourcePath | 
    Select-String -Pattern $regexPattern -AllMatches | 
    ForEach-Object {$_.matches.groups[1].value} | 
    Out-File $outPath
```

The regex happens to be looking for a particular pattern I’m interested in – you can <abbr title="Bring Your Own Regex">BYOR</abbr>.

## Input / output

This is a brief example of input and output.

*Input*

```html
<div class="checkbox_block">
  <input type="checkbox" id="f_projects_box2205109" value="2205109">
  <label for="f_projects_box2205109">
    <span class="text">
        KT-2002 Some description here
    </span>
  </label>
</div>
<div class="checkbox_block">
  <input type="checkbox" id="f_projects_box2205208" value="2205208">
  <label for="f_projects_box2205208">
    <span class="text">
        Some additional description AR-9999 etc.
    </span>
  </label>
</div>
```

*Output*

```
KT-2002
AR-9999
```
## Summary

Whenever I have a task that has distinct steps, I automate it. Even running this once would make it worth the effort because (a) I’m a human not a robot, so writing a PowerShell script is a better use of my time than doing manual repetitive work (which is [boring and not aligned to the way of the punk](/2020/07/the-software-punk-revolution/)), (b) the process results in a task being automated *and* my brain containing more knowledge as the more I PowerShell the more I learn about it and the faster I am the next time I automate something, and (c) I get to share this with my future self so if I need to do something similar later, I won’t be starting from scratch.

It is a common misconception that it is only worth automating work if it “looks like the hours spent will be more than the time to automate” – but I suggest you rethink your strategy before all eight hours of your day get eaten by stuff your computer could do for you. Or, to put it another way… if someone asks me to do something manual and I automate it *every time*, I am setting a standard about what I am (and am not) willing to do with my ~27,375 days on the planet, ~15,435 of which are no longer open to choice. It’s not just about economics… it’s about quality of life. Go automate that thing now!
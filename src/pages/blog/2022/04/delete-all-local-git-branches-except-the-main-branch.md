---
layout: src/layouts/Default.astro
title: Delete all local git branches except the main branch
navMenu: false
pubDate: 2022-04-07T14:41:30+01:00
modDate: 2022-10-14
keywords: delete,git,branches
description: Find out how to clean up your local git branches with a script to delete everything except main.
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - Git
    - PowerShell
---

If you’re a bit like me, you like to keep your desk clear. The same goes for all those pesky git branches you accumulate over time. Whether you are using Visual Studio, VSCode, or some other editor, it would be nice if you could burn it all down except for trunk or main.

The good news is there’s a neat PowerShell command for this, which I’m using in Visual Studio Code to clean up my virtual desk space.

**Note: please read the information about the branch name in the script to avoid deleting you main branch where it has a different name – an example is included to help.**

If you want to ditch all branches except your mainline, you can run the PowerShell command below:

```powershell
git branch | %{ $_.Trim() } | ?{ $_ -ne 'trunk' -and $_.Substring(0,1) -ne '*' } | %{ git branch -D $_ }
```

If your main branch isn't called `trunk`, update your copy to use the correct name. For example, if it's called `main` change the name used in the not equal `-ne` filter:

```powershell
git branch | %{ $_.Trim() } | ?{ $_ -ne 'main' -and $_.Substring(0,1) -ne '*' } | %{ git branch -D $_ }
```

For every branch that is removed, you’ll see the message “Deleted branch *branchname* (was xxxxxxxx).”
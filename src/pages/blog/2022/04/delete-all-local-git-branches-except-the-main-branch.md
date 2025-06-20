---
title: Delete all local git branches except the main branch
navMenu: false
pubDate: 2022-04-07T14:41:30+01:00
modDate: 2025-06-19
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

## Linux / Mac

Here's a script to delete everything except `main` for Linux and Mac users. You can change the word "main" in the expression `grep -v '^main$'` if you have a different branch name.

```bash
git branch | sed 's/^[ *]*//' | grep -v '^main$' | xargs -I {} git branch -D {}
```

## Windows

Here's a script to delete everything except `main` for Windows users. You can change the word "main" in the expression `-ne 'main'` if you have a different branch name.

```powershell
git branch | %{ $_.Trim() } | ?{ $_ -ne 'main' -and $_.Substring(0,1) -ne '*' } | %{ git branch -D $_ }
```

## Output

Whichever version of the script you use you’ll see the message “Deleted branch *branchname* (was xxxxxxxx)” for each branch that gets deleted.

---
title: 'Universal tasks in Visual Studio Code'
navMenu: false
pubDate: 2015-07-22T07:30:21+01:00
authors:
    - steve-fenton
categories:
    - 'Visual Studio'
tags:
    - LESS
    - PHP
    - VSCode
---

This is a little trick that allows you to do pretty much whatever you like in a Visual Studio Code task. If you can put it in a batch file, you can do with VSCode.

All you need is this “I’ll run a batch file for you” task (and possibly add a problem matcher so it can detect issues).

```json
{
    "version": "0.1.0",
    "command": "compile-less.bat"
}
```

Pretty simple right – it just calls a batch file named “compile-less.bat”, which as you can guess compiles my local less files into css. Your batch file can do whatever you want to do.
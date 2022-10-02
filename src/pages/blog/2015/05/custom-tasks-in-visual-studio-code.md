---
id: 57
layout: src/layouts/Default.astro
title: 'Custom tasks in Visual Studio Code'
pubDate: 2015-05-04T00:03:26+01:00
author:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=57'
permalink: /2015/05/custom-tasks-in-visual-studio-code/

categories:
    - 'Visual Studio'
tags:
    - php
    - python
    - vscode
---

I was asked how to create a custom task in Visual Studio Code. It comes with a bunch of built-in tasks that you can add to the tasks.json file – but what if you need something else…

The example below enables PHPLint (in a not-very-sophisticated way) – but the technique would work for anything you can call on the command line…

```
<pre class="prettyprint lang-json">{
    "command": "C:\\Code\\phplint\\phpl.bat",
    "version": "0.1.0",
    "args": [
    "C:\\Code\\php\\index.php"
    ],
    "problemMatcher": {
        "fileLocation": ["relative", "${workspaceRoot}"],
        "pattern": {
            "regexp": "^(.*):(.*)$",
            "message": 1
        }
    }
}
```

The most interesting part is the custom problem matcher. You specify a regular expression to parse the output text (the example above is actually far too basic) – you can then map each of the matches to a property, such as:

- file
- line
- column
- message
- severity

This then allows you to generate errors and warnings that integrate nicely into the VSCode window.

So it is as simple as specifying the command and any arguments, and then creating a sophisticated regular expression to map the output to the possible data expected by Visual Studio Code.

And here is another basic one for Python in Visual Studio Code…

```
<pre class="prettyprint lang-json">
{
    "version": "0.1.0",
    "command": "c:\\Python34\\python",
    "args": ["app.py"],
    "problemMatcher": {
        "fileLocation": ["relative", "${workspaceRoot}"],
        "pattern": {
            "regexp": "^(.*)+s$",
            "message": 1
        }
    }
}
```
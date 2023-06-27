---
title: 'Getting started with CoffeeScript'
navMenu: false
pubDate: 2012-04-20T16:19:33+01:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - CoffeeScript
---

If you are reading this, it isn’t very likely that you need to be told what CoffeeScript is, but that’s not going to stop me from doing it anyway. CoffeeScript is just JavaScript (officially). It is actually an abstraction of JavaScript that allows you to write shorthand CoffeeScript statements that get compiled into tide JavaScript – which means at runtime it really is just JavaScript.

There are lots of examples and snippets online, but when I came to properly use CoffeeScript on Windows to rage some code I found that there wasn’t a joined up list of what I needed to do – so here it is.

## Download node.js

You can [download node.js from the official node.js website](https://nodejs.org/). Download it. Install it. Done.

## Download coffee for node.js

If you want to make life a bit easier, register the path to node.js as an environment variable. This means you don’t need to keep typing the full path, which will be the equivalent on your machine of:

```
c:/Program Files/nodejs
```

You can do this in Start > Computer > Properties > Advanced > Environment Variables. Add “node” with a value of “c:/Program Files/nodejs” (check your file system for the exact path – it will contain node.exe

Now you have made your life easier, you can install coffee for node.js with the following command, so open command prompt and type:

```powershell
npm install -g coffee-script
```

Take a note of the path that the command outputs, and add an environment variable for coffee too – “coffee” with a value of the path you noted from the above command.

Write Some Code

You can now write some CoffeeScript. When you need to compile it into JavaScript, bearing in mind you’ve registered the environment variables, you can run the following command…

```powershell
cd c:\path\to\your\project\
coffee --output js/ --compile src/
```

Where your CoffeeScript files are in the “src” folder and you want your JavaScript files in your “js” folder.
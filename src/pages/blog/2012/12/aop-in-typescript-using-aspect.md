---
layout: src/layouts/Default.astro
navMenu: false
title: 'AOP in TypeScript using Aspect'
pubDate: 2012-12-01T22:41:47+00:00
authors:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=685'
interface_sidebarlayout:
    - default
categories:
    - Programming
tags:
    - aop
    - typescript
---

Update! I am actually using decorators for this kind of thing these days. Original article below.

I recently wrote about using an existing JavaScript AOP framework with TypeScript, but in this article I’m going to talk about using Aspect, an AOP framework written for, and in, TypeScript.

### Why?

Aspect is small, completely stand alone and really easy to use. It is 2kb minified and you only need to learn four operations that all have identical signatures!

Of course, if you mean “Why AOP”, then the answer is separation of concerns. Rather than adding logging code to all of your modules and classes in your TypeScript program, you can leave them devoid of logging entirely and then have a separate file that adds all of the logging.

If you aren’t sure if something is a candidate for AOP, try to imagine what would happen if you forgot to use AOP and the operation didn’t happen. If your code carries on happily without it, it could be a good candidate for AOP. If your code would behave differently, it isn’t.

For example, if I added Auditing using AOP and I switched off all Auditing, the code would carry on working regardless – just without Auditing. This is a good candidate. If I wanted to change how a calculation worked without editing the original code, I might be tempted to perform a transformation using AOP, but if I switched it off, the code would work differently and it would be a disaster.

### Code Folds

AOP adds extra behaviour to a fold in your code. These folds are points in the execution of the code that you can insert additional code to be run. Aspect currently has four extension points that let you use some natural folds in your TypeScript code.

**Before**

The “before” fold lets you execute some code before the original code is run.

**After**

The “after” fold lets you execute some code after the original code is run, on the condition that the original code worked. This could be interpreted as “after successful call”.

**AfterAll**

The “afterAll” fold lets you execute some code after the original code is run, no matter what the outcome of the original code was.

**Error**

The “error” fold lets you execute some code if the original code throws an error.

You take advantage of code folds by registering a function to be executed on particular method call. In the example below, you ask Aspect to raise an alert if ModuleName.ClassName.methodName raises an error at any point, on any instance of ModuleName.ClassName.

```
Aspect.Weaver.error(
    ModuleName.ClassName,
    'methodName',
    function () { alert('Error!'); }
);
```
### Example

For this example, I am going to write a really simple module that can be used to play with AOP. The Boxes module contains some code that lets us add and remove boxes to to an HTML page. When you instantiate a BoxManager, you tell it where on the page you want boxes to be added, then you simply call addBox or removeBox to add and remove div elements.

*Boxes.ts*

```
module Boxes {
    export class BoxManager {
        private container: HTMLElement;
        constructor (containerId: string) {
            this.container = document.getElementById(containerId);
        }

        exists(id: string) : bool {
            return !!document.getElementById(id);
        }

        addBox(id: string, text: string = 'box') : HTMLElement {
            var box = document.createElement('div');
            box.id = id;
            box.innerHTML = text;
            this.container.appendChild(box);
            return box;
        }

        removeBox(id): void {
            if (this.exists(id)) {
                var box = document.getElementById(id);
                this.container.removeChild(box);
            }
        }
    }
}
```
You might call this code like this:

*app.ts*

```
var boxManager = new Boxes.BoxManager('example');
var box = boxManager.addBox('box', 'A new box!');
```
So let’s look at some AOP for the Boxes module!

### Audit

What if we wanted to audit or monitor the number of times boxes were added and removed? We could add code to the BoxManager class that calls some function to do this – but then our BoxManager starts getting bloated with code that deals with concerns that don’t really belong to a module that should have the single purpose of dealing with Boxes.

So we use AOP.

In our Audit .ts file we create a function named “handler” that logs a message to the console. This function is quite simple – it just creates a string out of all of the arguments and writes the details to the console.

I am then adding the handler to the “afterAll” fold of the addBox and removeBox methods.

*Audit.ts*

```
(function() {
    var handler = (e: Aspect.WeaveEvent, a: any[]) => {
        var args = a.join(',');
        if (typeof console !== 'undefined') {
            console.log(e.toString() + ' Args: ' + args);
        }
    };

    Aspect.Weaver.afterAll(
        Boxes.BoxManager,
        'addBox',
        handler
    );

    Aspect.Weaver.afterAll(
        Boxes.BoxManager,
        'removeBox',
        handler
    );
} ());
```
Now after the methods on the boxManager is called the console will get a message about the call. I could use this to count the number of times the method is called, log the usage to the server, display a graph – whatever I want really.

The important point here is that I can add in auditing without changing the original module and without changing the calling code. It is completely invisible to both. This also means I can switch it off and on in a single place, for example if I only wanted to run auditing while testing, I could exclude it when I put the program live – all without changing the original module or any calling code.

```
<pre class="prettyprint lang-html">

<html lang="en">
<head>
    <meta charset="utf-8" />
    <title>AOP Example App</title>
    <link rel="stylesheet" href="app.css" type="text/css" />
</head>
<body>
    <h1>AOP Example App</h1>
    <form id="boxAdd">
        <fieldset>
            <legend>Boxes</legend>
            <label>Id:<br />
                <input type="text" id="boxId" /></label><br />
            <label>Color:<br />
                <input type="color" id="boxColor" /></label><br />
            <label>Text:<br />
                <input type="text" id="boxText" /></label><br />
            <button>Add</button>
        </fieldset>
    </form>
    <div id="example">
    </div>
    <script src="Boxes.js"></script>
    <script src="Aspect.js"></script>
    <!-- Try removing Audit.js - it all still works -->
    <script src="Audit.js"></script>
    <script src="app.js"></script>
</body>
</html>
```
</body></html>
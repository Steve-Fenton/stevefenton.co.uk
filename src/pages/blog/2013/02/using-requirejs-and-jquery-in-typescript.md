---
layout: src/layouts/Default.astro
title: 'Using RequireJS and jQuery in TypeScript'
navMenu: false
pubDate: 2013-02-05T22:12:19+00:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - jQuery
    - RequireJS
    - TypeScript
---

A common question I have come across on various TypeScript communities is how to use RequireJS to load jQuery. Of course, you could substitute “jQuery” here for pretty much anything.

Here is a simple example to explain the concept, which you can use to load pretty much anything you like using require.js.

## Downloads

You’ll need to download files from the following sources.

- require.js from the [official RequireJS website](http://requirejs.org/).
- jquery.js from the [official jQuery website](http://jquery.com/).
- require.d.ts from [Definitely Typed](https://github.com/borisyankov/DefinitelyTyped).
- jquery.d.ts from [Definitely Typed](https://github.com/borisyankov/DefinitelyTyped).

For the purposes of the example, all the scripts are in the root folder of my project, but they can easily be in various paths as you see fit.

## Wiring It All Up

So jQuery isn’t really analogous to a TypeScript module. If it was, you could actually just load it up using TypeScript’s import syntax.

```typescript
import * as $ from 'jquery';
```

If it was that easy though, you wouldn’t be here. So let’s see what you really have to do. It isn’t actually too tricky.

First of all, you need to reference the type definitions. This will bring you static typing for RequireJS and jQuery.

```typescript
///<reference path="require.d.ts" />
///<reference path="jquery.d.ts" />
```

And then you load jQuery and supply the function to execute on success.

```typescript
require(['jquery'], function ($) {
    $(document).ready(() => {
        alert('Your code executes after jQuery has been loaded.');
    });
});
```

So your whole file looks like this (app.ts):

```typescript
///<reference path="require.d.ts" />
///<reference path="jquery.d.ts" />
require(['jquery'], function ($) {
    $(document).ready(() => {
        alert('Your code executes after jQuery has been loaded.');
    });
});
```

Now all you need to do is add a single JavaScript file to your HTML page and RequireJS takes care of loading everything up. Remember, our code is in ‘app.ts’, so we want to load ‘app.js’ – you don’t need to put the extension in the data-main attribute:

```html
<script data-main="app" src="require.js"></script>
```

And that is all there is to it. No need to load multiple scripts or combine files and no need to try and force jQuery to be like a module.
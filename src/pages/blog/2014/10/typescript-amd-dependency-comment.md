---
layout: src/layouts/Default.astro
navMenu: false
title: 'TypeScript AMD dependency comment'
pubDate: 2014-10-20T20:27:46+01:00
author:
    - steve-fenton
interface_sidebarlayout:
    - default
categories:
    - Programming
tags:
    - amd
    - typescript
---

This TypeScript feature doesn’t have much official text surrounding it, but it does (currently) work (and to be honest is so useful it would be a shame if were to be removed).

Basarat illustrates the problem when he describes this feature…

> “This feature is badly documented, but oh-so-useful!” – Basarat Ali Syed

### So what is it?

If you are using <abbr title="Asynchronous Module Definitions">AMD</abbr> in TypeScript you may come across a situation where you depend on a module being loaded even though you don’t directly use the module. Even if you add an import, the compiler cleverly removes unnecessary modules. For example…

```
import ko = require('./knockout');
import Other = require('./other');

var x = new Other();
```
Results in the following JavaScript:

```
<pre class="prettyprint lang-javascript">define(["require", "exports", './other'], function(require, exports, Other) {
    var x = new Other();
});
```
Oh no! Knockout has gone missing. Changing the statement to a reference comment doesn’t help either:

```
///<reference path="./knockoutd.d.ts" />
```
So you end up going on the fiddle, like this:

```
import ko = require('./knockout');
import Other = require('./other');

var meh = ko; // scuzzy fix
var x = new Other();
```
Which gets the expected output, but with a bit of code noise:

```
<pre class="prettyprint lang-javascript">
define(["require", "exports", './knockout', './other'], function(require, exports, ko, Other) {
    var meh = ko;
    var x = new Other();
});
```
### Noiseless Solution

So this is where the badly documented but rather useful feature comes in.

```
///<amd-dependency path="./knockout" />
import Other = require('./other');

var x = new Other();
```
This results in the required output:

```
<pre class="prettyprint lang-javascript">
define(["require", "exports", './other', "./knockout"], function(require, exports, Other) {
    var x = new Other();
});
```
So go ahead and use this at your own risk – it isn’t in the current specification so there are no guarantees it will remain in the compiler. Don’t say I didn’t warn you.
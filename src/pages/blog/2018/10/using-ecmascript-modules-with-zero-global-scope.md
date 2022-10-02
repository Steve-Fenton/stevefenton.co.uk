---
layout: src/layouts/Default.astro
navMenu: false
title: 'Using ECMAScript modules with zero global scope'
pubDate: 2018-10-09T20:13:09+01:00
author:
    - steve-fenton
medium_post:
    - 'O:11:"Medium_Post":11:{s:16:"author_image_url";s:75:"https://cdn-images-1.medium.com/fit/c/400/400/1*eXkhfEuF41g5W_xnc_ydLA.jpeg";s:10:"author_url";s:38:"https://medium.com/@steve.fenton.co.uk";s:11:"byline_name";N;s:12:"byline_email";N;s:10:"cross_link";s:3:"yes";s:2:"id";s:12:"10155af6bf00";s:21:"follower_notification";s:3:"yes";s:7:"license";s:19:"all-rights-reserved";s:14:"publication_id";s:2:"-1";s:6:"status";s:5:"draft";s:3:"url";s:51:"https://medium.com/@steve.fenton.co.uk/10155af6bf00";}'
categories:
    - Programming
tags:
    - typescript
---

 I had a question from Bruce about ECMAScript modules following on from my post on [not mixing namespaces and modules in TypeScript](https://www.stevefenton.co.uk/2017/08/stop-mixing-typescript-modules-and-namespaces/). The question was:

> How can a module create something that can be used in browser without creating a variable on the global scope?

 This is a great question, so here is a quick example, starting at the bottom of the program. Side note: this example works in modern browsers with plain old JavaScript files too.

 The first file is called `mod.ts` and contains a simple line of code:

 ```
<pre class="wp-block-code prettyprint lang-typescript">```
export const b = 2;
```
```
 Our second file is called `app.ts` and is similarly small:

 ```
<pre class="wp-block-code prettyprint lang-typescript">```
import { b } from './mod.js'; console.log(b);
```
```
 Now, if we simply reference a JavaScript file from our HTML page, the contents are treated as inline, which means things start to creep into the global scope if we haven’t thought about it. When it comes to modules, though, we just have to use the module type in our script tag. You can do this using `type="module"` on the script tag, thus:

 ```
<pre class="wp-block-code prettyprint lang-html">```
&lt;script src="app.js" type="module">&lt;/script>
&lt;script>
// Fails: b is not defined... which proves it isn't in the global scope
alert(b);
&lt;/script>
```
```
If you run this full example, the “app” module will load the “mod” module and then log the value within “b” to the console. The alert, though, fails, because there is no “b” in the global scope.

This shows how the code in the “app” module is executed without being in, or adding to, the global scope.

This example is “The ECMAScript Way” – i.e. you don’t need to run any special steps to combine your files or anything like that. If you’ve been cornered by me on this subject you’ll know that I think letting ECMAScript modules remain independent is my preferred deployment strategy. I don’t like squashing all the files into a single big file, or converting modules into “something else” when modules bring a number of benefits. Make sure you have a full glass before asking me about that topic.
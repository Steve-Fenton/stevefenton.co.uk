---
layout: src/layouts/Default.astro
navMenu: false
title: 'Comments are a clue'
pubDate: 2014-11-16T20:05:39+00:00
authors:
    - steve-fenton

categories:
    - Programming
tags:
    - JavaScript
    - JSDoc
---

JSDoc comments, like many comments in software, can be a great clue for those who want to refactor their program. Take this common example, variations of which can be found easily online:

```
<pre class="prettyprint lang-javascript">
/**
* Check input object is a string
* @param {Object} s
*/
function check(s) {
    return typeof s === 'string';
}
```
If you are using a smart IDE, this comment will give you important clues about what the “check” method does and what the parameter “s” is.

Although… if the method was renamed, perhaps we wouldn’t need a clue about what it does…

```
<pre class="prettyprint lang-javascript">
/**
* @param {Object} s
*/
function isStringType(s) {
    return typeof s === 'string';
}
```
And if we rename the parameter, we no longer need a clue about what is expected…

```
<pre class="prettyprint lang-javascript">
function isStringType(objectToCheck) {
    return typeof objectToCheck === 'string';
}
```
So if your reason for using JSDoc is that it helps people to use your code, consider making your code more helpful instead.
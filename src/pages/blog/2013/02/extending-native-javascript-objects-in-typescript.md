---
title: 'Extending native JavaScript objects in TypeScript'
navMenu: false
pubDate: 2013-02-16T22:04:27+00:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - JavaScript
    - TypeScript
---

I wrote yesterday about how to [extend native JavaScript objects](/blog/2013/02/extending-native-javascript-objects-in-typescript/). Today, I’m going to show you the extra bits you need to do to use the same code in TypeScript – and get static typing for your extensions.

The plain JavaScript looks like this:

```javascript
NodeList.prototype.onclick = function (handler) {
    for (var i = 0; i < this.length; i++) {
        this[i].onclick = handler;  
    }
};

document.querySelectorAll('.myClass').onclick(function () {
    alert(this.innerHTML);
});
```

In TypeScript, you’ll get compiler warnings if you just try to add directly to built-in objects, so you’ll need to extend the TypeScript definitions with the new information. This is really simple to do because in TypeScript, interfaces are open.

```typescript
interface NodeList {
    onclick: (handler: Function) => void;
}
```

This simple type definition extends the NodeList interface that found in the standard TypeScript library with the extra function we want to add. Our existing JavaScript can now be used error-free in our TypeScript program.
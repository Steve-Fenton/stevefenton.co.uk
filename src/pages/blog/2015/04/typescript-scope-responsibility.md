---
layout: src/layouts/Default.astro
title: 'TypeScript scope responsibility'
navMenu: false
pubDate: 2015-04-19T00:22:36+01:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - TypeScript
---

I wrote about this originally in Pro TypeScript, but the question seems pretty common, so I am repeating it here with greater emphasis.

> When you need to preserve the scope of a callback, prefer to preserve it when setting up the callback, not by adjusting the class itself. <cite>Steve Fenton, just this second</cite>

Here is an example that demonstrates the problem. I have used a simple timeout, but this applies to events (like onclick).

```typescript
class Example {
    private text = "Example";
    
    showText() {
        alert(this.text);
    }
}

var example = new Example();
window.setTimeout(example.showText, 50);
```

The result of this code example is an alert with the text “undefined”. This is because the scope of *this* when the “showText” method is called is the event target, not the class. This is useful because you often need to access the element that an event acted on. In our example, though, we want to access “this.text”, which is part of the class scope.

There are two simple ways to preserve the class scope in this example – both use a simple arrow function.

## Option 1: Change the event registration.

By changing the event registration (by introducing an arrow function) we have preserved the scope of “this” in the event handled. Most importantly, the class has not changed – we didn’t need to touch it.

Is this the right answer? Of course – imagine if you had to change a class each time you called it in a different way: that would be insane. Any practitioner of object-orientation should be appalled at the thought of changing a class just because of how you are calling it.

```typescript
class Example {
    private text = "Example";
    
    showText() {
        alert(this.text);
    }
}

var example = new Example();
window.setTimeout(() => example.showText(), 50);
```

## Option 2: Change The Class.

This answer is also a valid way to preserve the scope – but if you can avoid it, you should (for the reasons mentioned above). You can see that we have used an arrow function on the class, instead of in the event registration.

```typescript
class Example {
    private text = "Example";
    
    showText = () => {
        alert(this.text);
    }
}

var example = new Example();
window.setTimeout(example.showText, 50);
```

## The Conflict

Of course, life isn’t quite this simple. There are compelling arguments each way, which are important to understand.

My argument for changing the event registration is that you shouldn’t have to change a class just because of how you call it. You also break the typical behaviour of the class by changing the method into a property, because you force sub-classes to implement a property rather than a method also. You also won’t be able to call the super class from the arrow-function-property that you replaced the method with. Make your own SOLID check-list – and tick off all the violations!

There is also an argument that says “the calling code shouldn’t have to know the details of the class implementation”. i.e. you have to know if the method is using “this” inside in order to choose whether to use an arrow function. If you had a working application and changed a method that didn’t previously use “this” so that it now did, it could break existing event registrations.

The answer to this question is that you should have tests that give you the confidence that a change you make doesn’t affect the behaviour of your program. You can also answer the second argument by always using arrow function in event registrations – you can still access event targets, as I show in the next section. If you are concerned about the performance implications of always using arrow functions for event registrations, I have only the same old answers for you: you never have a performance problem until you have measured it and identified where the cost it – and this performance cost (if there is one) is a trade-off against the cost of software maintenance.

## Preserve Scope and Get HTML Element

If you need to preserve the scope of the class and capture the event details, you can do that too. In this example, I have taken care not to pass the event to the class, because it shouldn’t care about how it is called – it simply accepts an element.

```typescript
class Example {
    private text = "Example";
    
    showText(elem: HTMLElement) {
        elem.innerHTML = this.text;
    }
}

var example = new Example();
document.body.onclick = (e) => example.showText(e.target);
```

## Both Of This

You can also use a normal anonymous function (not an arrow function) to access both “this” (the event) and within the class “this” (the class scope). Like this:

```typescript
class Example {
    private text = "Example";
    
    showText(elem: HTMLElement) {
        elem.innerHTML = this.text;
    }
}

var example = new Example();

document.body.onclick = function() {
    example.showText(this);
};
```

So to summarise, my recommendation is:

> When you need to preserve the scope of a callback, prefer to preserve it when setting up the callback, not by adjusting the class itself.
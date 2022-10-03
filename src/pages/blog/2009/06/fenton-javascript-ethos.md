---
layout: src/layouts/Default.astro
title: Fenton JavaScript Ethos
navMenu: false
pubDate: 2009-06-20T20:35:52+01:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - JavaScript
---

When JavaScript was first created (hurriedly) by Brendan Eich, the idea was to allow people to add a bit of interaction to a web page. Since its inception, JavaScript has grown into a massive part of the Internet and, like all technologies, it has sometimes been used in a bad way.

Here’s the thing about JavaScript: it’s a great idea. How fed up are we all of the constant need to download the latest version of the Adobe Flash Player or Microsoft’s Silverlight plugin (or indeed one of the many other plugins) just to see the menu move around a bit when we put our mouse near it?! JavaScript, used correctly, works silently without any downloads and makes the user experience better.

In fact, both Flash and Silverlight are probably more abused than JavaScript (so I won’t mourn their loss). Just because people can make little movies, they suddenly feel a need to show you an “intro” consisting of the individual bits of the company logo slowly fading in and moving into position – or conceive menus that can only be intended to prevent people making any selection due to animation.

So, what am I preaching about today?

I’m basically trying to spread my JavaScript ethos. It’s a really simple one and it’s made up of four rules.

1. If people don’t have JavaScript, everything should still function.
2. Like CSS, JavaScript shouldn’t appear inline in your HTML.
3. JavaScript should add something useful and pleasing to the user experience.
4. Stay out of the Global scope

## Rule Number 1

> If people don’t have JavaScript, everything should still function.

Before you add JavaScript to your page, make the page work. Imagine an in-browser picture gallery; of course you want to do lots of funky stuff with it and your users will want lots of funky stuff to happen. Don’t get carried away though.

Start off by writing a plain HTML gallery. Stick some thumbnails in there and link each one to the big-version of the image so it opens in the browser when you click on it. Now we can see it working without any JavaScript, we know we’re safe to add the funk!

Add your roll-overs and click events as we’ve discussed and make that gallery look stunning by animating all those lovely pictures. There’s no JavaScript in the HTML and there’s functionality for that bloke that visits your website from his retro mobile phone… or for people who use a text-only browser. Great!

As an added bonus, you’ve done your part for the World Wide Web as your page will work for everyone in the whole world!

## Rule Number 2

> Like CSS, JavaScript shouldn’t appear inline in your HTML attributes.

Remember when you used to do this..?

```html
<p align="center">
    <font family="Arial" size="3" color="Black">
        <b>Hello!</b>
    </font>
</p>
```
I think we all agreed that this was nasty, especially when the marketing department decided to change the typeface on the whole site and a million font tags had to be changed. The next day, they decided to change the colour!

So we all moved to this…

```html
<p class="hello">Hello!</p>
```

With a separate .css file that contained the style…

```css
.hello {
    font-family: Arial;
    font-size: 3;
    color: Black;
    font-weight: bold;
}
```

Much better! The main reason this works is because it makes it easier to change the style of the website. The other important reason, which is less obvious, is that HTML is supposed to semantically describe parts of your page. A H1 tag should be used to tell people that the text is the main heading on the page, not to make it big and bold and tags like the font tag and bold tag don’t actually add any meaning or describe what the content is about.

So apply the same to your JavaScript and life will become much better!

We used to do this…

```html
<a href="javascript: alert('Hello World!');">Alert</a>
```

Or this…

```html
<a href="#" onclick="alert('Hello World!');">Alert</a>
```

Or this…

```html
<a href="javascript: void(0);" onclick="alert('Hello World!');">Alert</a>
```

But now we do this…

```html
<a href="a_real_page.html" id="alert">Alert</a>
```

And then we do with JavaScript what we’ve been doing with CSS since we got our adult teeth…

```javascript
function myFunction() {
    alert("Hello World!");
    return false;
}

document.getElementById("alert").onclick = myFunction;
```

The “return false” bit is quite important, as it tells the browser that you’ve done something clever and that the actual link doesn’t need to be followed. If JavaScript is disabled, the link will be followed – so everyone sees something happen, which means we have abided by rule number 1.

## Rule Number 3

> JavaScript should add something useful and pleasing to the user experience.

In our gallery example, there’s a lot of good reasons to add a bit of flair. Partly, it’s just nicer to show a series of images with a bit of animation – but you can also add functionality that makes the page more usable.

In our non-JavaScript version, you have to hit your back button to return to the thumbnail gallery from a large-image. With JavaScript, we can open the large image on the current page and supply some handy navigation buttons to make it faster to get from image to image. We’ve made the page better and we can sleep well tonight.

If you can’t think of a reason why the JavaScript has made the page more usable or more attractive to the actual visitor you probably shouldn’t be using it on that page.

Classic blunders include chuff that follows your mouse around the page, animated seasonal snow-showers, messing around with people’s status-bar text and some really dodgy DHTML drop-down menus.

## Rule Number 4

> Stay out of the global scope. Give your JavaScript a home.

Your JavaScript doesn’t belong in the global scope of the document. You need to give it a home. It is really easy to place everything you need into a container that will prevent naming conflicts and messy sprawling functions.

There is a basic example below that demonstrates how to “namespace” your JavaScript, with private variables and function that are only available to your namespace and a list of public variables and functions (the stuff contained in the return statement).

```javascript
const MyNamespace = (function() {
    const myPrivateVariable = "Fenton";
    return {
        MyPublicVariable : "SomeValue",
        sayHello : function(name) {
            alert("Hello " + name + "!");
        },
        sayGoodbye : function(name) {
            alert("Message from " + myPrivateVariable + " - Goodbye " + name + "!");
        }
    };
}());
MyNamespace.sayHello("Steve");
MyNamespace.sayGoodbye("Steve");
```

And even better… you can use modules to keep absolutely everything out of the global scope in all the modern browsers.

## And then…

And in true Colombo style… there’s just one more thing! If you are using JavaScript right, you will probably never need to use a No Script tag – so never (seriously NEVER) use a No Script tag like this…

```html
<noscript>
    <p>This document works best with script enabled browsers</p>
</noscript>
```
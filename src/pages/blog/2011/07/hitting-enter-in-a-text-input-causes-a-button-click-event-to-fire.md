---
title: 'Hitting enter in a text input causes a button click event to fire'
navMenu: false
pubDate: 2011-07-15T17:57:59+01:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - HTML
    - JavaScript
---

So you have a textbox, followed by a button to kick off the search, but if you press the enter key when you are typing in the text box, some other button fires an event. What’s going on?

The simple rule for this is that forms are designed to be used by keyboard users. People shouldn’t have to use a mouse to make things happen! So if you have a form like this, you should be able to hit enter to submit it:

```html
<form method="post" action="">
    <p><label>Search <input type="text" name="search"></label>
     <input type="submit" value="Search"></p>
</form>
```

This works in almost all browsers. Type in some stuff and hit enter and off it goes. You may notice that in one particular old browser (come on people, upgrade to the latest version) that this doesn’t actually allow you to hit enter. If you need to support this browser, you can use this fix…

```html
<form method="post" action="">
    <div style="display: none;"><input type="text" name="dumbfix"></div>
    <p><label>Search <input type="text" name="search"></label>
     <input type="submit" value="Search"></p>
</form>
```

The browser in question will only behave like all the others if there are more than one input on the form, so you need to have a hidden fake field to trick it into behaving normally.

But what about the other issue of strange events being fired when you hit enter? Well, to be honest, you have probably JavaScripted yourself into a corner on this one – but don’t worry, I will show you how to solve your issue…

Here is an example of a form that only works if you have JavaScript enabled…

```html
<form method="post" action="">
    <p><label>Search <input type="text" name="search"></label>
    <button onclick="doAjaxSearch();">Search</button></p>
</form>
```

Naughty. This only works with JavaScript in full flight. However, in most browsers, hitting the enter key in the search box will cause the onclick event to fire on the button and everything looks reasonably normal.

That is, until one day you add more stuff to the same form…

```html
<form method="post" action="">
    <button onclick="alert('surprise');">Click for a small surprise.</button>
    <p>And the stuff below is search related.</p>
    <p><label>Search <input type="text" name="search"></label>
    <button onclick="doAjaxSearch();">Search</button></p>
</form>
```

You normally only really see this in ASP.NET applications, because the entire page is wrapped in a form, but you could technically create this scenario just by being a terrible web developer. What happens when you hit enter now is that the browser chooses *the first button in the form* and fires the click event!

In most cases, you would solve this issue by having a single purpose for each form, rather than cramming in many uses. In ASP.NET you can either change the order of things, or add a dummy button right at the top that does nothing. Remember though, you are doing something fundamentally wrong if everything needs JavaScript to even work.

```html
<form method="post" action="">
    <button style="display: none;">Dummy</button>
    <button onclick="alert('surprise');">Click for a small surprise.</button>
    <p>And the stuff below is search related.</p>
    <p><label>Search <input type="text" name="search"></label>
    <button onclick="doAjaxSearch();">Search</button></p>
</form>
```

The other downside to the dummy button is that, while it stops the wrong button from being included in the enter-key event, it means that the right button is also excluded – so you need to make sure things still happen when people use a keyboard.

Recommendation?! Don’t work in this way!
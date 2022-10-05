---
layout: src/layouts/Default.astro
title: 'jQuery Get Text While Excluding Children'
navMenu: false
pubDate: 2010-07-05T21:06:23+01:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - JavaScript
    - jQuery
---

I recently came across a problem while obtaining the text from an HTML label element, based on the fact that I knew the form element that related to the label. This came about because there are two valid ways to use a label. The first way is to use the “for” attribute on the label to tell the page the id of the form element the label relates to, the second is to wrap the entire form element with the label element.

The problem I had was that when the latter of these two methods is used, I need to obtain the first bit of text from the label, without all of the text from the form element, which in my case was a select list. While it isn’t obvious, there is a way to get the text from an element using jQuery without also getting the text of all the children – and this is how.

First of all, here are the two valid ways you can mark up your form with a label. Firstly, using the “for”attribute.

```html
<label for="mySelectList">Select a day</label>
<select name="mySelectList" id="mySelectList">
    <option value="Monday">Monday</option>
    <option value="Tuesday">Tuesday</option>
</select>
```

And secondly, by wrapping the form element with the label.

```html
<label>Select a day
    <select name="mySelectList" id="mySelectList">
        <option value="Monday">Monday</option>
        <option value="Tuesday">Tuesday</option>
    </select>
</label>
```

To get the text, you need to take into account both of these methods, in this example we demonstrate how to do this, while also demonstrating the next problem.

```javascript
var myId = "mySelectList";

// Get the label text based on the "for" attribute
var labelText = $("label[for='" + myId + "']").text();

if (labelText === "") {
    // Get the label text based on it being the parent element
    $("#" + myId).parents("label").text();
}
```

We have successfully obtained the right element in this example, but if the label is wrapping the form element in our example, instead of getting “Select a day” we end up getting “Select a day Monday Tuesday”, because `jQuery.text()` brings back the text from the selected element and all of its descendants.

So here is how you get the text from just the parent element while excluding all of the child element text.

```javascript
var myId = "mySelectList";

// Get the label text based on the "for" attribute
var labelText = $("label[for='" + myId + "']").text();

if (labelText === "") {
    // Get the label text based on it being the parent element
    $("#" + myId).parents("label").clone().children().remove().end().text();
}
```

So we still get hold of the label in the same way, but then we clone it, remove all child elements from the cloned version and get the text from the cloned version, which no longer has any children.
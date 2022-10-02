---
id: 1007
layout: src/layouts/Default.astro
title: 'Beginners Guide To JavaScript Form Validation'
pubDate: 2010-08-23T20:46:26+01:00
author:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=1007'
permalink: /2010/08/beginners-guide-to-javascript-form-validation/
interface_sidebarlayout:
    - default
categories:
    - Programming
tags:
    - html
    - javascript
---

Update! You may want to [check out some native HTML validation attributes](https://www.stevefenton.co.uk/2011/05/HTML-5-Form-Elements-New-Attributes/) that are way better than JavaScript validation!

JavaScript form validation is a great way to hint to your users what they should be typing into your web page. It isn’t a replacement for validation on the server, as it can be bypasses incredibly easy – but if you want to tell people that they’ve missed a field or that the value in a field isn’t acceptable without round-tripping to the server, JavaScript is a really easy way to check input values

### Adding Validation

Let’s start with a simple form, such as this:

```
<pre class="prettyprint lang-html">
<form method="post" action="">
    <p><label>Name<br><input type="text" name="Name"></label></p>
    <p><label>Email<br><input type="text" name="Email"></label></p>
    <p><input type="submit" value="Submit"></p>
</form>
```

So let’s start by adding a validation function to the page.

```
<pre class="prettyprint lang-html">
<form method="post" action="" onsubmit="return Validate(this);">
    <p><label>Name<br><input type="text" name="Name"></label></p>
    <p><label>Email<br><input type="text" name="Email"></label></p>
    <p><input type="submit" value="Submit"></p>
</form>
<script>
function Validate(form) {
    alert("There's no logic here yet!");
    return false;
}
</script>
```

This isn’t much of a validation sample, but here are the really important bits.

1. We have added an onsubmit event to the form. Note that we don’t just call the validate function, we return its value to the onsubmit event. This means if we return true from the Validate function, the form will submit and if we return false, it won’t submit.
2. We are passing “this” into the Validation function, this means that the validation function will instantly have a handle on the form element, which makes things easier.
3. In our validation function, we are returning false. Try out this example and the form will never submit.

If you ever find that your validation isn’t firing when you submit a form, the most likely reason is that you missed the “return ” bit in “return Validate(this);”.

Let’s make it a bit more useful. We will make the Name field mandatory, if the name isn’t typed in, the form won’t submit.

```
<pre class="prettyprint lang-javascript">
function Validate(form) {
    if (form.Name.value.length === 0) {
        alert("Please enter a Name");
        return false;
    }
    return true;
}
```

And that’s all you need to know to make validation work.

Here are some improvements on this simple example that make the experience a bit slicker.

### Improvement 1: Style the failed element

You can make it clear what elements have failed by styling them as an error, like this.

```
<pre class="prettyprint lang-javascript">
function Validate(form) {
    if (form.Name.value.length === 0) {
        form.Name.style.border = "1px solid red";
        form.Name.style.backgroundColor = "#FFCCCC";
        return false;
    }
    return true;
}
```

### Improvement 2: Don’t mess up your HTML

I don’t like having JavaScript attributes in my HTML, it makes things messy. So rather than putting the onsubmit attribute on the form, add the event handler like this.

```
<pre class="prettyprint lang-html">
<form method="post" action="" id="myForm">
    <p><label>Name<br><input type="text" name="Name"></label></p>
    <p><label>Email<br><input type="text" name="Email"></label></p>
    <p><input type="submit" value="Submit"></p>
</form>
<script>
function Validate(form) {
    if (form.Name.value.length === 0) {
        form.Name.style.border = "1px solid red";
        form.Name.style.backgroundColor = "#FFCCCC";
        return false;
       }
    return true;
}

document.getElementById("myForm").onsubmit = function () {
    return Validate(this);
};
</script>
```

### Improvement 3: Supply some feedback without using an alert

It is nice to tell people exactly what they have done wrong without popping up a nasty alert box. Here is an example of adding a message to the form, which could contain details of every failed validation point. By adding errors to a message, we can test 10 rules and tell the user about all of them, rather than fail on the first error without telling them about the next error they may encounter.

```
<pre class="prettyprint lang-html">
<form method="post" action="" id="myForm">
    <div id="validation"></div>
    <p><label>Name<br><input type="text" name="Name"></label></p>
    <p><label>Email<br><input type="text" name="Email"></label></p>
    <p><input type="submit" value="Submit"></p>
</form>
<script>
function Validate(form) {
    var errors = "";
    if (form.Name.value.length === 0) {
        form.Name.style.border = "1px solid red";
        form.Name.style.backgroundColor = "#FFCCCC";
        errors += "<li>Please enter a Name</li>";
    }
    if (errors.length > 0) {
        document.getElementById("validation").innerHTML = "<ul>" + errors + "</ul>";
        return false;
    }
    return true;
}
document.getElementById("myForm").onsubmit = function () {
    return Validate(this);
};
</script>
```

### Summary

This is just a beginners guide to validation. I strongly recommend that you start with the last example on this page, which has a nicer way of telling the user what the errors are, highlights the problem fields and prevents the form submission until all validation passes.

Don’t forget that you still need to check the values on the server side as JavaScript can be switched off in just two clicks of a mouse.
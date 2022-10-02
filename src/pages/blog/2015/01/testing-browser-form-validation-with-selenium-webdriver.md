---
id: 216
title: 'Testing browser form validation with Selenium WebDriver'
pubDate: '2015-01-10T16:47:31+00:00'
author: 'Steve Fenton'
layout: post
guid: 'https://www.stevefenton.co.uk/?p=216'
permalink: /2015/01/testing-browser-form-validation-with-selenium-webdriver/
interface_sidebarlayout:
    - default
categories:
    - Automation
    - Programming
tags:
    - .net
    - 'c#'
    - selenium
    - testing
    - webdriver
---

No sensible person is using JavaScript to perform simple form validation any more. If an input element is required, you just add a required flag. If you need to validate minimum and maximum values, there are attributes for that. If you need to check a complex pattern, you can supply an attribute for that. Essentially, you can get really good quality validation by using the correct HTML elements with the correct HTML attributes.

So let’s assume you have a simple form, like this:

```
<pre class="prettyprint lang-html">
<form id="example">
    <fieldset>
        <legend>Example Form</legend>
        <div><label for="name">Name</label></div>
        <div><input id="name" type="text" name="name" size="20" required /></div>
        <div><label for="email">Email</label></div>
        <div><input id="email" type="email" name="email" size="40" required /></div>
        <div><button id="submit">Submit</button></div>
    </fieldset>
</form>
```

The browser will prevent submission in the following circumstances:

- The name is not entered
- The email is not entered
- The email isn’t an email address

So how do you test these HTML form validation items with Selenium WebDriver?

Luckily it is pretty simple. You can get a collection of invalid elements using the “:invalid” CSS pseudo class. I have the following property in my Page Object base class (as you can have these elements on any page at all).

```
<pre class="prettyprint lang-csharp">
[FindsBy(How = How.CssSelector, Using = "input:invalid")]
public IList<IWebElement> InvalidInputElements { get; set; }
```

Now I can check that I have the correct number of invalid elements after I attempt to submit the form and I have access to each one if I need it.
---
layout: src/layouts/Default.astro
navMenu: false
title: 'HTML required attribute works on select elements'
pubDate: 2013-11-20T10:05:00+00:00
authors:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=485'
interface_sidebarlayout:
    - default
categories:
    - Programming
tags:
    - html
---

If you are using the HTML required attribute, you may need to adjust how you are writing select elements to make it work correctly. It is a very common pattern to start your HTML select element with an option that prompts the user to select from the list, for example “Please select…” or “Select your country…” or something similar.

This pattern requires a quick bit of validation to ensure that the user has selected an option, rather than leaving the “Please select…” option selected.

The great news is that you can combine the HTML 5 “required” attribute with an empty value on the first option to get browser-validated input. Here is an example of the technique in action – zero JavaScript required and no hassle at all – the important bits are the “required” attribute on the select element and the empty value on the first option.

```
<pre class="prettyprint lang-html">
<form method="post" action="">
    <select required>
        <option value="">Please select</option>
        <option value="1">One</option>
        <option value="2">Two</option>
    </select>
    <button>Submit</button>
</form>
```
If you are living it long-hand, use the following:

```
<pre class="prettyprint lang-html">
<select required="required">
```
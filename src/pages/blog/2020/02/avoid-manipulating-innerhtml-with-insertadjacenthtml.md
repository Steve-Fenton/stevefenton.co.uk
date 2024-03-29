---
title: Avoid expensive innerHTML manipulation with insertAdjacentHTML
navMenu: false
pubDate: 2020-02-29T15:45:07+00:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - JavaScript
    - TypeScript
---

It is pretty well known these days that fiddling with `innerHTML` is terribly inefficient. It triggers serialization, and it can result in invalid markup. Nevertheless, you’ll still find this being done in many applications.

```javascript
elem.innerHTML = elem.innerHTML + '<a href="https://www.example.com">Visit Example Dot Com</a>';

// or

elem.innerHTML += '<a href="https://www.example.com">Visit Example Dot Com</a>';
```

You can avoid many of the downsides to this approach using `insertAdjacentHTML`. Here’s a quick example that is equivalant to the previous operation, but without serialization or potential runiation.

```javascript
elem.insertAdjacentHTML('beforeend', '<a href="https://www.example.com">Visit Example Dot Com</a>');
```

That first parameter needs a little explanation. It just allows you to place your new HTML in one of four locations:

<dl><dt>beforebegin</dt><dd>Immediately before the element</dd><dt>afterbegin</dt><dd>Immediately inside the element</dd><dt>beforeend</dt><dd>Immediately before the closing tag of the element</dd><dt>afterend</dt><dd>Immediately after the closing tag of the element</dd></dl>So, if we take this HTML:

```html
<div id="example">
    <div>Existing Element Content</div>
</div>
```

And we run all of the possible variations, as shown below:

```javascript
const elem = document.getElementById('example');

elem.insertAdjacentHTML('beforebegin', '<div>Before Begin</div>');

elem.insertAdjacentHTML('afterbegin', '<div>After Begin</div>');

elem.insertAdjacentHTML('beforeend', '<div>Before End</div>');

elem.insertAdjacentHTML('afterend', '<div>After End</div>');
```

We end up with the following HTML:

```html
<div>Before Begin</div>
<div id="example">
  <div>After Begin</div>
  <div>Existing Element Content</div>
  <div>Before End</div>
</div>
<div>After End</div>
```
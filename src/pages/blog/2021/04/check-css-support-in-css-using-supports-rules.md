---
title: Check CSS support in CSS using @supports rules
navMenu: false
pubDate: 2021-04-20T13:15:19+01:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - CSS
---

For many years, [Can I Use?](https://caniuse.com/mdn-css_properties_aspect-ratio) has been the go-to place to find out whether a browser supports a certain feature, like CSS aspect-ratio. However, what do you do when you need to add some additional styling if the browser doesn’t support a feature? Well, in an almost paradoxical way – you can use the `@supports` rule, erm, [if your browser supports it](https://caniuse.com/css-featurequeries).

What does this mean… let’s use a simple HTML element to show what it can do…

```html
<div id="test">
</div>
```

We are going to use two flavours of the `@supports` rule, and there will be three outcomes.

- When the browser supports `aspect-ratio` you’ll see “yes”
- When the browser does not support `aspect-ratio` you’ll see “no”
- Where the browser doesn’t support `@supports` you’ll see nothing at all

```css
@supports (aspect-ratio: auto) {
  #test:after {
    content: 'yes';
  }
}

@supports not (aspect-ratio: auto) { 
  #test:after {
    content: 'no';
  }
}
```

In this example you can see the positive test for `@supports` and the negative test for `@supports not`, which sounds Shakespearian! “Supports not the cause; your enemy doth thwart your plans.”

At the time of writing, 97% of all users have a working `@supports` rule. At this point, any browser that doesn’t support this is an abandoned browser.
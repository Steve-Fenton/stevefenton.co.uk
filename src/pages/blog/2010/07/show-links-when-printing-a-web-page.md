---
title: 'Show Links When Printing a Web Page'
navMenu: false
pubDate: 2010-07-07T21:02:19+01:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - CSS
    - HTML
---

Despite all of the technological advances of the past 100 years, people still print web pages for many reasons. They might need to take some information into a meeting, find it easier to work off of printed instructions or even just want to frame an excellent blog article that has inspired them and put it on the wall next to their desk.

Whatever the reason, printing still happens quite a lot. One downside of the printed version of a web page is that the links don’t work (obviously!), which leads to the second drawback, you can’t tell where the links were pointing in the first place.

Well, here is a handy rule you can add to your print stylesheet to output the contents of each link if you want to show it on the printed page.

```css
a:after {
    content: " [" attr(href) "] ";
}
```

When used on this hyperlink:

```html
<a href="https://www.stevefenton.co.uk/">Click Here</a>
```

…it will transform `Click Here` into `Click Here [https://www.stevefenton.co.uk/]`. By adding this to your print-style-sheet, you can ensure that people have all the information they need.

You can add print-specific stylesheets like this:

```html
<link rel="stylesheet" type="text/css" href="print.css" media="print">
```
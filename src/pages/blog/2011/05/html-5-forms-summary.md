---
layout: src/layouts/Default.astro
navMenu: false
title: 'HTML5 forms summary'
pubDate: 2011-05-23T19:07:50+01:00
authors:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=941'
interface_sidebarlayout:
    - default
categories:
    - Programming
tags:
    - html
---

n case you’ve missed it, I’ve been talking about the new HTML 5 forms goodies. You can catch up by checking out the demo and these handy articles on the specific topics I’ve covered.

I have divided the information into attributes, special input types, date-related input types and numeric input types – but don’t be put off as there isn’t a great deal to learn.

Note: the demo works differently in different browsers, this is part of the demo really as you can see the backwards-compatible rendering. Use any really up-to-date browser if you want to see all the cool widgets.

- [HTML 5 Forms – New Attributes](/2011/05/HTML-5-Form-Elements-New-Attributes/)
- [HTML 5 Forms – Special Input Types](/2011/05/HTML-5-Forms-Special-Input-Elements/)
- [HTML 5 Forms – Date And Time Input Types](/2011/05/HTML-5-Forms-Date-Input-Elements/)
- [HTML 5 Forms – Numeric Input Types](/2011/05/HTML-5-Forms-Number-Input-Elements/)

So now we deal with the question everyone asks about HTML 5. Can I use it yet?

The great thing about all of these HTML 5 forms elements is that they are all backwards compatible. There is a note in the [HTML 4 specification](https://www.w3.org/TR/html401/interact/forms.html#h-17.4) that says if the input type is not recognised the browser should assume the input type is text. This means that all of the new input types will either appear as funky new widgets or as plain text inputs.

The main implication of this is that you cannot rely on the client-side validation that is offered by these controls – but we all know that you shouldn’t rely on client-side validation, even if all browsers fully supported these new HTML 5 input types.

So you might want to do some feature detection and add the odd date picker or uppy-downer or some other kind of widget, but there is absolutely no reason not to use these new elements immediately.
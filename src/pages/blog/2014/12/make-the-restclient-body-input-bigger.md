---
layout: src/layouts/Default.astro
title: 'Make the RESTClient body input bigger'
navMenu: false
pubDate: 2014-12-01T19:51:49+00:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - CSS
    - RestClient
    - Stylish
---

[RESTClient](https://addons.mozilla.org/en-US/firefox/addon/restclient/?src=stevefenton.co.uk) is a useful Firefox extension for sending HTTP REST messages to a service. As well as a useful and simple interface for sending requests, it also lets you store requests to re-use again later. If you are writing REST services, it is a useful tool to have lying around.

The only problem I have with it is the request content input box, which is too short for my liking.

Update! Some time after this post, Stylish changed hands and got banned by multiple browsers after it started sending data up to a server. I don’t recommend using it and I recommend uninstalling it if you have it.

<del>So I downloaded [Stylish](https://addons.mozilla.org/en-US/firefox/addon/stylish/?src=stevefenton.co.uk) (another great Firefox extension)</del>... Stylish ended up changing hands, and then hacked, and so it was removed from the extension store. There's a note on achieving this without Stylish below.

```css
@namespace url(http://www.w3.org/1999/xhtml);
@-moz-document url("chrome://restclient/content/restclient.html") {
  #request-body {
    min-height: 20em;
  }
}
```

You could do this without Stylish by creating a userContent.css file and placing it in the appropriate location.

Now I have an appropriately sized content box for my REST testing!
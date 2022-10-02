---
layout: src/layouts/Default.astro
navMenu: false
title: 'Make the RESTClient body input bigger'
pubDate: 2014-12-01T19:51:49+00:00
authors:
    - steve-fenton

medium_post:
    - 'O:11:"Medium_Post":11:{s:16:"author_image_url";s:75:"https://cdn-images-1.medium.com/fit/c/400/400/1*eXkhfEuF41g5W_xnc_ydLA.jpeg";s:10:"author_url";s:38:"https://medium.com/@steve.fenton.co.uk";s:11:"byline_name";N;s:12:"byline_email";N;s:10:"cross_link";s:3:"yes";s:2:"id";s:12:"553dadadf84d";s:21:"follower_notification";s:3:"yes";s:7:"license";s:19:"all-rights-reserved";s:14:"publication_id";s:2:"-1";s:6:"status";s:5:"draft";s:3:"url";s:51:"https://medium.com/@steve.fenton.co.uk/553dadadf84d";}'
categories:
    - Programming
tags:
    - css
    - restclient
    - stylish
---

[RESTClient](https://addons.mozilla.org/en-US/firefox/addon/restclient/?src=stevefenton.co.uk) is a useful Firefox extension for sending HTTP REST messages to a service. As well as a useful and simple interface for sending requests, it also lets you store requests to re-use again later. If you are writing REST services, it is a useful tool to have lying around.

The only problem I have with it is the request content input box, which is too short for my liking.

Update! Some time after this post, Stylish changed hands and got banned by multiple browsers after it started sending data up to a server. I don’t recommend using it and I recommend uninstalling it if you have it.

<del>So I downloaded [Stylish](https://addons.mozilla.org/en-US/firefox/addon/stylish/?src=stevefenton.co.uk) (another great Firefox extension)</del> and added the following custom rule…

```
<pre class="prettyprint lang-css">@namespace url(http://www.w3.org/1999/xhtml);
@-moz-document url("chrome://restclient/content/restclient.html") {
  #request-body {
    min-height: 20em;
  }
}
```
You could do this without Stylish by creating a userContent.css file and placing it in the appropriate location.

Now I have an appropriately sized content box for my REST testing!
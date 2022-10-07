---
layout: src/layouts/Default.astro
navMenu: false
title: 'Cross-domain iframe resizing'
pubDate: 2015-09-24T07:00:41+01:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - HTML
    - JavaScript
---

:::div{.inset}
:img{src="/img/2015/09/iframe-resize1.png" alt="iframe Resize"}
:::

If you have ever integrated third party components on your website, you will have found a dazzling variety of integration methods, from JavaScript snippets, to iframes, to server-side APIs. Many of the integrations seek to inject content onto your page, but I sincerely advise against this. You don’t need to spend long reading the [OWASP Top Ten Application Security Risks](https://www.owasp.org/index.php/Category:OWASP_Top_Ten_Project) to see that allowing people to place content on your website is a recipe for disaster.

So despite its falling out of favour, the humble iframe is one of the more secure ways you can give over a portion of your website to a third party without inadvertently handing them the keys to the castle.

The main problem that affects almost every iframe integration is size. This has always been a problem, but it is an even bigger problem now we have responsive designs and things need to fit no matter what screen people are using. This is where [David Bradshaw’s iframe resizing script](https://github.com/davidjbradshaw/iframe-resizer) comes in.

The script is made up of two components, one to run on your website and one to run within the iframe. This set up means that the script works even when the request is cross-domain (which it almost always is with such integrations). There are lots of options, but getting started requires minimal code.

On your host page, you need the following:

```html
<script src="iframeresizer.min.js"></script>
<script>
    iFrameResize();
</script>
```

And in the page hosted in the iframe you need:

```html
<script src="iframeResizer.contentWindow.min.js"></script>
```

You can also narrow down the scope of the integration by specifying the iframe and limiting the domains:

```html
<script src="iframeresizer.min.js"></script>
<script>
    iFrameResize({}, '#myid');
</script>
```

And in the page hosted in the iframe you need:

```html
<script>
    window.iFrameResizer = {
        targetOrigin: 'http://www.example.com'
    }
</script>
<script src="iframeResizer.contentWindow.min.js"></script>
```
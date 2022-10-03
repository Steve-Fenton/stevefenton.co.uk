---
layout: src/layouts/Default.astro
title: 'HTML loading attribute for lazy loading images and iframes'
navMenu: false
pubDate: 2019-09-16T14:15:35+01:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - HTML
    - JavaScript
---

If you have been writing websites or web apps for any length of time, you will almost certainly have implemented some form of lazy-loading using JavaScript. I recently worked on a web app that implemented a search that benefitted to the tune of half-a-gig by deferring the loading of images until those images were actually likely to be shown to a user. While you still need to keep these implementations for a little longer, there is an interesting new HTML loading attribute on the horizon that allows you to defer image and iframe loading until they are close to being shown. The WHATWG have a [pull request](https://github.com/whatwg/html/pull/3752) for this feature, and it’s already [part of Chromium (as of v76)](https://web.dev/native-lazy-loading).

## Native lazy loading

You can use the new HTML loading attribute to take advantage of browser-native lazy loading, using the value `lazy`.

```html
<img src="defer.png" loading="lazy" alt="An Awesome Image" width="500" height="400">
```

You could implement this now, and adjust your custom lazy-loading to take over if native lazy loading isn’t available. That way, more and more of the work will end up being done by the browser. This will mostly involve using the “\[loading=lazy\]” selector to grab the images, rather than using whatever custom class you’re using now.

You can feature-detect images to see if lazy loading is natively supported.

```javascript
if ('loading' in HTMLImageElement.prototype) {

} else {
    // You put your fallback version here...
}
```

If you are thinking of introducing lazy loading using the new attribute, adding it has no negative consequence to existing browsers… they will just load the image as they always have done.

The native version will be able to take into account the connection, as well as the scroll, in order to determine when to start fetching the image. That means it can start sooner on a slower connection. This in itself will beat all of the custom scripts we’ve written to do this.

## Native and fallback

Here is an example that will prefer the native implementation, but fall back to a scripty one if the browser won’t do it for you.

In this example, we’re not setting the `src` of the image at all unless JavaScript is running… that might not be okay in all cases. If it’s not okay, read back up and accept that older browsers won’t perform as well as those that have native lazy loading. (If we set the source in HTML, the browser is going to download it… maybe we can use a placeholder image as a fallback rather than have no source whatsoever – that’s fine too.)

```html
<img data-src="lazy-cat.jpg" alt="Cat sitting in a teacup" loading="lazy">

<script>
if ('loading' in HTMLImageElement.prototype) {
    // This uses the browser's own native lazy load
    const imageElements = document.querySelectorAll('img[loading="lazy"]');
    imgElements.forEach(img => { img.src = img.dataset.src; });
} else {
    // This downloads a polyfill from Cloudflare's CDN and makes it happen without the browser
    const lazyScript = document.createElement('script');
    lazyScript .src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/4.1.8/lazysizes.min.js';
    document.body.appendChild(lazyScript);
}
</script>
```

## Eager loading for lightweight browsing mode

There are plans for a lightweight browsing mode that will lazy load all the things by default. If you need an image to load in all cases, you need to specify the HTML loading attribute once again, but with a value of `eager`.

```html
<img src="eager.png" loading="eager" alt="An Awesome Image" width="500" height="400">
```
## HTML loading attribute best practices

You should consider adding this attribute to your website. It’s going to make a significant user-visible positive impact in many, many cases.

I recommend falling back on default browser behaviour, especially if you haven’t yet implemented lazy loading. When the feature is accepted and browsers add it, you’ll get the payback (instantly for a large number of users).

Avoiding using fall-backs will mean your website works for all your users, rather than them having no images, or placeholder images.
---
layout: src/layouts/Default.astro
navMenu: false
title: Little scripts: Checking web page images
pubDate: 2020-07-28T13:43:07+01:00
authors:
    - steve-fenton
categories:
    - Automation
tags:
    - javascript
---

This is a note-to-future-self as I just threw together a little script to test images on a web page. Specifically, it highlights:

- Images that are not lazy loaded
- Images that are much bigger than their display size

As images sizes aren’t reliable until the image is displayed, you will need to run it if your page is updated (i.e. hidden images are displayed or background requests add content).

Just paste this whole thing into your browser console… and then call `checkAllImages()` each time you want to re-check.

```javascript
window.checkAllImages = (function () {

    // We're going to look for images more than 20% bigger than their display...
    let checkLimit = 20;

    let borderTimer = null;
    let borderColor = 'orange';
    let sizeAllowance = 1;
    let badImages = [];
    let messages = [];

    function run() {
        cleanUp();
        calculateSizeAllowance();
        checkImages();
        logSummary();
        drawAttention();
    }

    function blink() {
        borderColor = (borderColor === 'orange') ? 'aqua' : 'orange';
        badImages.forEach(function (img) {
            img.style.borderColor = borderColor;
        });
    }

    function cleanUp() {
        window.clearInterval(borderTimer);
        let warningElements = document.getElementsByClassName('dynamic-warning');
        for (let warningElement of warningElements) {
            warningElement.remove();
        }
    }

    function calculateSizeAllowance() {
        sizeAllowance = (1 / 100) * (100 + checkLimit);
    }

    function checkImages() {
        console.log('Checking Images')
        badImages = [];
        messages = [];
        Array.prototype.slice.call(document.getElementsByTagName('img')).forEach(checkImage);
    }

    function checkImage(imageElement) {
        const loadingAttr = imageElement.getAttribute('loading');
        const displayHeight = imageElement.height;
        const displayWidth = imageElement.width;
        const naturalHeight = imageElement.naturalHeight;
        const naturalWidth = imageElement.naturalWidth;

        const isNotLazy = loadingAttr !== 'lazy';
        const isTooWide = (naturalHeight > (displayHeight * sizeAllowance));
        const isTooHigh = (naturalWidth > (displayWidth * sizeAllowance));

        if (isNotLazy || isTooWide || isTooHigh) {
            const message = ((isNotLazy) ? 'Not Lazy Loaded <br />' : '') + 'Shown ' + displayWidth + 'x' + displayHeight + '<br />Natural ' + naturalWidth + 'x' + naturalHeight;
            messages.push(message.replace(/<br \/>/g, ''));

            const text = document.createElement('div');
            text.className = 'dynamic-warning';
            text.innerHTML = message;
            text.style.position = 'absolute';
            text.style.backgroundColor = 'red';
            text.style.color = 'white';
            text.style.zIndex = '10000000';
            imageElement.parentNode.insertBefore(text, imageElement);

            let borderWidth = 1;

            if (isNotLazy) borderWidth++;
            if (isTooWide) borderWidth++;
            if (isTooHigh) borderWidth++;

            badImages.push(imageElement);
            imageElement.style.border = (borderWidth * 2) + 'px solid orange';
        }
    }

    function logSummary() {
        console.log(messages.join('\r\n'));
    }

    function drawAttention() {
        borderTimer = window.setInterval(blink, 1000);
    }

    return run;
}());

checkAllImages();
```

Here’s an example of it running against my home page:

:img{src="/img/2020/07/check-images.jpg" alt="Result of Checking Images" loading="lazy"}

Yikes! I need to go fix those images.
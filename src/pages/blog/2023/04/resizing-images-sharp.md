---
title: 'Automatically optimise and resize images with Sharp'
navMenu: false
pubDate: 2023-04-02
keywords: node,image,optimisation,resize,sharp
description: Generate optimised and resized image sets using Sharp and Node.
bannerImage:
    src: /img/topic/cats/the-reverend-douglas-donaldson.jpg
    alt: The Reverend Douglas Donaldson
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - Node
    - JavaScript
---

Recently I highlighted problems with [WEBP images in Open Graph data](https://www.stevefenton.co.uk/blog/2022/10/webp-opengraph-images/). This post demonstrates how you can manage your site's images, including automatically generating optimised and resized versions using the [Sharp](https://www.npmjs.com/package/sharp/v/0.5.2) package.

Does this article look familiar... I did the same with a Sqoosh package, but it has been discontinued. However, this turned out to be a good thing as Sharp does seem to give comparable results and runs a little faster.

## Image workflow

To ensure there is an *old format* image that can be used as a fallback image and for open graph consumers that don't yet support modern formats, I work with images in PNG format. Some older images are JPEG format, so I also need to support those.

My source image is never used on my website. Even my fallback images are passed through an optimisation process. This allows me to reduce the file size of the fallback images. This is worth doing, even though they are rarely used.

After creating a smaller version of the image as a fallback, I make a series of modern format images of standard sizes. These are currently WEBP images, but I'm keeping an eye on AVIF support in browsers and may change this later. Because I can regenerate images my decision can be changed at the appropriate time.

## imagemin alternative

The imagemin library and its plugins became a popular way to work with images in JavaScript. I have a great deal of love for imagemin, but it is no longer supported or maintained. As a result, you'll receive multiple warnings when you use it because of vulnerable dependencies. The correct number of npm security warnings is zero, so you can't use imagemin now.

The alternative to imagemin endorsed by its former maintainers is Squoosh. However, they discontinues their package for this and left me back on the hunt for an alternative. I don't want to use a REST service to resize images, I want to run it locally (i.e. in my dev container).

This led me to Sharp, which has a great API and is available on [GitHub](https://github.com/lovell/sharp).

## Optimising and resizing with Sharp

I updated my working [image optimization example](https://github.com/Steve-Fenton/astro-accelerator/blob/main/src/themes/accelerator/utilities/img.mjs) to use Sharp and it reduced the file by a good 20-ish lines.

Here's the step-by-step guide.

### Install Sharp

You can add Sharp to your project with npm:

```cmd
npm install sharp --save
```

### Optimise images

You can now use Sharp's simple API to grab an image, convert it, and send it to a file.

```javascript
import sharp from 'sharp';

const source = 'sourceimage.png';
const destination = 'destinationimage.webp';

sharp(source)
    .webp({ quality: 80 })
    .toFile(destination);
```

### Resize and optimise images

You can add a resize operation to your pipeline, which is nice. You can provide a width and height. Aspect ratio changes have a similar API to CSS, so you can choose options such as "cover" when you resize to a different aspect ratio. Alternatively, you use a null to ask Sharp to maintain the aspect ratio. Specify either the width, or the height, and set the other to null and it will preserve it.

In this example, we want the image to be 1,000 pixels wide, and however high it needs to be.


```javascript
import sharp from 'sharp';

const source = 'sourceimage.png';
const destination = 'destinationimage.webp';

sharp(source)
    .resize(1000, null)
    .webp({ quality: 80 })
    .toFile(destination + '.webp');
```

## Summary

Sharp is your replacement for imagemin or Squoosh, letting you auto-generate image sets (and regenerate them later when you pivot from one format to another). You can loop all images in a source directory and create images of different sizes and formats to use in responsive image tags.

You can see an example of this where:

- There is a list of target sizes
- There is a directory filled with source images
- Source images are organised into sub-folders

[Look at the Astro Accelerator image resize example](https://github.com/Steve-Fenton/astro-accelerator/blob/main/src/themes/accelerator/utilities/img.mjs)

By automating the generation of optimised and resized images, you can ensure sets of images are available for responsive image tags. You can also lower your page size, reduce bandwidth, and speed up your site. The automation lets you shift all images to a newer format as new smaller options like AVIF and JPEG-XL gain browser support.

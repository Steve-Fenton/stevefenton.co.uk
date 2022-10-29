---
layout: src/layouts/Default.astro
title: 'Automatically optimise and resize images with Squoosh'
navMenu: false
pubDate: 2022-10-21
keywords: node,image,optimisation,resize,squoosh
description: Generate optimised and resized image sets using the Squoosh API in Node.
bannerImage:
    src: /img/topic/squoosh/squoosh.png
    alt: The Squoosh website
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - JavaScript
    - Node.js
---

Recently I highlighted problems with [WEBP images in Open Graph data](https://www.stevefenton.co.uk/blog/2022/10/webp-opengraph-images/). This post demonstrates how you can manage your site's images, including automatically generating optimised and resized versions using the [Squoosh](https://squoosh.app/) API.

## Image workflow

To ensure there is an *old format* image that can be used as a fallback image and for open graph consumers that don't yet support modern formats, I work with images in PNG format. Some older images are JPEG format, so I also need to support those.

My source image is never used on my website. Even my fallback images are passed through an optimisation process. This allows me to reduce the file size of the fallback images. This is worth doing, even though they are rarely used.

After creating a smaller version of the image as a fallback, I make a series of modern format images of standard sizes. These are currently WEBP images, but I'm keeping an eye on AVIF support in browsers and may change this later. Because I can regenerate images my decision can be changed at the appropriate time.

## imagemin alternative

The imagemin library and its plugins became a popular way to work with images in JavaScript. I have a great deal of love for imagemin, but it is no longer supported or maintained. As a result, you'll receive multiple warnings when you use it because of vulnerable dependencies. The correct number of npm security warnings is zero, so you can't use imagemin now.

The alternative to imagemin endorsed by its former maintainers, is Squoosh.

## Optimising and resizing with Squoosh

However, Squoosh is an open-source experimental project from [Google Chrome Labs](https://github.com/GoogleChromeLabs/squoosh) that can replace imagemin. Though it's marked experimental, Squoosh is a safer bet than imagemin. Because it's early days, the documentation isn't the clearest in the world, but it works well.

### Install Squoosh

You can add Squoosh API to your project with npm:

```cmd
npm install @squoosh/lib --save
```

### Optimise images

You can optimise images using an `ImagePool` supplied by Squoosh. The pool can be set to run multiple processes, but I'm generating images once when they are added rather than in large batches.

```javascript
import fs from 'fs';
import { ImagePool } from '@squoosh/lib';

// Create an image pool
const imagePool = new ImagePool(1);

// Read the source image
const file = await fs.promises.readFile('/img/example.png');

// Give the image to Squoosh
const image = imagePool.ingestImage(file);

// Ask Squoosh to process it as a PNG
await image.encode({ oxipng: {} });

// Get the raw image data
raw = (await image.encodedWith.mozjpeg).binary;

// Write the image data to a new file
await fs.promises.writeFile('/i/example.png', raw);

// Close the image pool
await imagePool.close();
```

By passing an empty PNG configuration, we use the default settings in Squoosh. `oxipng: {}`.

### Resize and optimise images

To resize an image, you perform a pre-processing step. In the example below, the code resizes the PNG *and* saves it as a WEBP image.

```javascript
import fs from 'fs';
import { ImagePool } from '@squoosh/lib';

const imagePool = new ImagePool(1);
const file = await fs.promises.readFile('/img/example.png');
const image = imagePool.ingestImage(file);

// Get the decoded image info
const info = await image.decoded;

// Resize the image if it's larger than the target size
if (info.width > size[key]) {
    // Resize the image to 400px wide
    const options = {
        resize: {
            width: 400
        }
    };
    await image.preprocess(options);
}

// Encode as a WEBP
await image.encode({ webp: {} });

// Read the WEBP image
raw = (await image.encodedWith.webp).binary;

// Save the 400px WEBP image
await fs.promises.writeFile('/i/400/example.webp', raw);

await imagePool.close();
```

By setting only the image width, the aspect ratio will be preserved. You can also keep the aspect ratio by only supplying a height. You can override this by setting both width and height.

## Summary

Squoosh is your replacement for imagemin, letting you auto-generate image sets (and regenerate them later when you pivot from one format to another). You can loop all images in a source directory and create images of different sizes and formats to use in responsive image tags.

You can see an example of this where:

- There is a list of target sizes
- There is a directory filled with source images
- Source images are organised into sub-folders

[Look at the Astro Accelerator image resize example](https://github.com/Steve-Fenton/astro-accelerator/blob/main/src/utilities/img.js)

By automating the generation of optimised and resized images, you can ensure sets of images are available for responsive image tags. You can also lower your page size, reduce bandwidth, and speed up your site. The automation lets you shift all images to a newer format as new smaller options like AVIF and JPEG-XL gain browser support.
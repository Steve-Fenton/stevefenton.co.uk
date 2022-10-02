---
layout: src/layouts/Default.astro
navMenu: false
title: 'TypeScript Pixel Counter'
pubDate: 2018-01-21T20:00:23+00:00
author:
    - steve-fenton
categories:
    - Programming
tags:
    - images
    - typescript
---

In the process of writing an article on Pie Charts, I was faced with a situation where I needed to programmatically count the pixels on the pie chart in order to reverse-engineer the original values. To do this, I wrote a quick utility in TypeScript to do the following:

1. Load an image
2. Read each pixel
3. Determine the exact colour of the pixel
4. Total up the different colours

I introduced a few neat tricks along the way, so I thought I’d share them. The complete code is on the [Pixel Counter GitHub page](https://github.com/Steve-Fenton/PixelCounter).

I tested the process using a pie chart that had labels, so I could determine the accuracy of the script.

### Colour Noise

The first thing I discovered is that there is a lot of colour noise. You don’t immediately get a result for “the blue segment” or “the red segment”. What you get are hundreds of colours where the edges are dithered. To fix this, I rounded the colours by introducing five stops for each red, green, and blue value.

The size of these colour brackets is arbitrary, but I decided 20% was a good number and it gave reasonable results on the test image.

```
    private round(num: number) {
        return Math.round(num / 51) * 51;
    }
```
### Blocking the UI

The next problem was that my tight loop of pixel searching was blocking the UI – to the extent that the browser offered to kill the script for me. I fixed this by allowing other code to run between each recursive call to the main method.

```
window.setTimeout(() => this.processPixel(image, rowNumber, columnNumber), 0);
```
This negatively impacted the duration of the script significantly enough to convince me to use scout-steps (I was once told that scouts alternately run 30 paces and walk 30 paces; getting a good trade off between speed and endurance).

In the code below, I’m tight looping for 50 pixels before letting other code have a turn. Again, 50 is arbitrary, but arrived via experimentation.

```
        if ((columnNumber + rowNumber) % 50 === 0) {
            // Let someone else have the UI for a while
            window.setTimeout(() => this.processPixel(image, rowNumber, columnNumber), 0);
        } else {
            this.processPixel(image, rowNumber, columnNumber);
        }
```
### Speed

Because I was interested in the relative allocation of pixels, I wondered whether I could resize the image down and get a similar result. At full size, the values came out +/- 0.8% compared to the labels on the test chart.

Resizing the image down to a minuscule 25px wide gave a similarly accurate +/- 0.6%, but took much less time.

In comparative performance testing, the full size image took over an hour, a resize of 200px wide took 700 seconds (about 11 minutes) – whereas the small version took less than 10 seconds. Given the accuracy of the small image, the time advantage made the small version the natural choice.

### Noise

I also tested several other intermediate sizes before landing on 25px, but until you get below the 25px number the accuracy didn’t suffer – meaning there is no benefit to spending longer working out the answer.

At 25px, ~5% of pixels are “noise” (i.e. they ought to contribute to one of the colour blocks, but come from a dithered area that makes them more than 20% different to their supposed colour) – but this seems evenly spread across all colours. If the noise goes over 5% it can affect the results. At full size, noise was ~3%.

Significant noise items have been highlighted in the output image below, and following those are a number of minor noise items.

The speed optimisation, combined with the non-blocking optimisation resulted in a final time of 200 milliseconds for the image.

If you were analysing images that didn’t contain pie charts, you would need to optimize the results in a similar way. Photographs would be exceptionally tricky as a solid wall colour lit from an angle would effectively be a gradient containing many different shades.

### Pixel Counter output

The UI is pretty unrefined for the Pixel Counter – I gave it a progress bar (which seemed necessary when things were taking more than 10 minutes) and I output the colours, counts, and indicate the relative size. The Pixel Counter is relative, so the exact pixel count is not important, it is the share of the count that matters.

Here is an example of the output.

![Pixel Counter Output](/img/2018/01/output.png)

### Enhancements

Often, the most common colour in an image is not the main colour. Even with the pie-charts, the most common colour is the background, not a particular colour from the chart. In most cases, the most common colour could be discounted. Additionally, you could score pixels based on location. Pixels in the bulls-eye, or that lay on the golden ratio could be premium pixels and count for more than pixels at the edges.

For the analysis on unlabelled pie charts, though, the numbers were sufficient.

### Code

You can [see the latest version of the code on GitHub](https://github.com/Steve-Fenton/PixelCounter).
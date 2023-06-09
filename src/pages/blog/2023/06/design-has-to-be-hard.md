---
layout: src/layouts/Default.astro
title: 'Design has to be hard for web developers'
navMenu: false
pubDate: 2023-06-09
keywords: web,design,css
description: Having watched web design trends from the sharp end (HTML/CSS), here's a fundamental principle of design... It has to be hard.
bannerImage:
    src: /img/2023/06/apple-website.png
    alt: The Apple website circa 2007. It has gradients, shadows, a sheen on the text, and rounded corners everywhere.
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - HTML
    - CSS
---

I've watched web design trends from the sharp end of the stick (having to try and make things look like the design) for a long time. I'm a long way from being a designer, as you'll know if you're reading this on my website! One thing I've noticed is there's a fundamental principle of web design: it has to be hard.

When it becomes easy for a design to be implemented, it becomes widespread and loses its appeal.

I'm going to pick one example of this to illustrate the point, but trust me - it's a never ending cycle.

## An example of hard design

If you designed websites in ecommerce around the turn of the century, you'd get hit with the Apple stick regularly. Stakeholders were obsessed with Apple's website and each time it received an update, teams across the globe were asked "can we make it more like Apple?"

There are two reasons for this insatiable desire to look like Apple:

1. Everyone wanted Apple's Mac, iPod, iPhone success. Of course they did. They might not have realised the website was a minor contributor to the Apple success machine.
2. Apple created really hard designs to implement. It was hard to copy. Folks who tried to emulate it created grey-smudge websites.

Here's the website in 2007.

:::figure
:img{ src="/img/2023/06/apple-website.png" alt="The Apple website circa 2007. It has gradients, shadows, a sheen on the text, and rounded corners everywhere" loading="lazy" }
::figcaption[The Apple website around 2007]
:::

Look at this site. It's like glass - the text has a glossy sheen, there are gradients just about everywhere, shadows subtly enhance the elements.

Looking back at this design, you might think it's no big deal... but it was. They had been using variations of this style for a while, but what you might not realise is that none of these features were supported by CSS.

What?!! You literally couldn't do this with CSS. There was no syntax for gradient backgrounds. Drop shadows didn't exist. Rounded corners. Nope.

To achieve this look in the early 2000s, you had to do a ton of work. You could chop up images and use them as backgrounds if you were happy to spend hours fixing alignment and gapping. You could nest a worrying number of elements to create a rounded corner. There was a whole tool-chest filled with tricks that you could combine to do this.

This was hard design and people who copied it failed to create something that looked like it.

## What changed?

What killed this design style? It became easy to do. The CSS spec received features that made this look super-easy to achieve. You want rounded corners, just use `border-radius`. You want a shadow, just use `box-shadow`.

Just as all these things became a breeze, designers thoroughly rejected the trend. The whole of jQuery UI, with all it's built-in glossy styles, became unusable in a heart beat.

Design trends raced away from elements that were easy to copy.

## The cycle

And so it repeats. We are all using gradient-fill text right now, but be warned... this is now really easy to do thanks to `background-clip`, so its days are numbered. Gradient borders, though, will last a little longer as this isn't currently achievable in CSS. It will be killed, though, once it's easy.

Don't be sad. After getting dropped like an electric eel when it becomes too easy, these elements gradually work their way back into designs. They end up being used in more subtle ways, perhaps, but they do come back.

## Summary

If you're a web developer and you're having to invent a way to make a design come to life, don't be annoyed that it's hard work. It's supposed to be hard as designers are always pushing the limits of what can be done!

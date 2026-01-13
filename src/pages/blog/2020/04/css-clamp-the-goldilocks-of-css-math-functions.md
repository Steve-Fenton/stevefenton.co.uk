---
title: 'CSS Clamp: The Goldilocks of CSS math functions'
navMenu: false
pubDate: 2020-04-21T20:20:10+01:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - CSS
    - HTML
description: Control fluid typography and layouts with CSS Clamp. Learn how to use this math function to set minimum, preferred, and maximum values.
---

There is a problem I have wrestled with a couple of times, which was frustrating to solve… but can now be easily solved using `clamp`, which is currently in an Editors Draft of the CSS Values and Units Module Level 4 specification. It is sat alongside similar mathmatical CSS nuggets, such as `min` and `max` and behaves like a shorthand for a combination of the two (`clamp(a, b, c)` is equivalent to `max(a, min(b, c))`, but a little easier to read).

Let’s dash through the information, then grab a sample to try out at the end.

## Purely relative

We started to apply the trick of using units relative to the view width, but as you can see, things can get a little out of hand and you end up having to apply media queries to bump things around in frankly horrifying ways.

```css
article h1 {
  font-size: 4vw;
}

article p {
  font-size: 3vw;
}
```

When the screen is really big, the text gets really big. When the screen is really small, the text gets… well, it looks like centipede as viewed from several meters away. It certainly cannot be read.

## Clamp down

When you start introducing media queries to try and stop things getting too big or small, what you are really trying to do is clamp the view-relative size with a minimum and a maximum. So, let’s clamp!

Clamp takes three arguments, `clamp(min, size, max)`.

```css
article h1 {
  font-size: clamp(1.5em, 4vw, 4em);
}

article p {
  font-size: clamp(1em, 3vw, 2em);
}
```

The heading will now use 4 view widths to size, but stop before it goes below 1.5em, or above 4em.

## Not just text

And finally, it’s not just for text!

```css
article {
  width: clamp(350px, 50vw, 600px);
  margin: 0 auto;
}
```

## Browser support

Browser support is exactly what you’d expect with the usual collection of Edge, Chrome, and Firefox offering support along with Opera on desktop, and just Chrome making it available on mobile. However, it’s early days and it won’t be long before we’re all using it as commonly as we use `calc` now.

Check [Can I Use](https://caniuse.com/#feat=css-math-functions) for an up-to-date view on support.

## Full Example

You can stick this full example into your favourite code editor or online playground to try it out.

```html
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <title>CSS Clamp</title>
    <style>
        article {
            width: 50%;
            margin: 0 auto;
        }

        article h1 {
            font-size: clamp(1.5em, 4vw, 4em);
        }

        article p {
            font-size: clamp(1em, 3vw, 2em);
        }

        .small {
            font-size: 1.5em;
            text-align: center;
        }

        .large {
            font-size: 4em;
            text-align: center;
        }
    </style>
</head>

<body>
    <article>
        <h1>CSS Clamp Demonstration</h1>
        This is a demonstration of CSS clamp and how you can use it to Goldilocks your text... it's not too big, it's
            not too small, it's just right!
        References are shown below at fixed sizes.
    </article>

    <div class="small">1.5em example</div>
    <div class="large">4.0em example</div>
</body>

</html>
```
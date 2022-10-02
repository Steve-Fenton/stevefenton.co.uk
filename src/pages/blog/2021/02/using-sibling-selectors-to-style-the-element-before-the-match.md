---
layout: src/layouts/Default.astro
title: Using sibling-selectors to style the element before the match
navMenu: false
pubDate: 2021-02-25T14:03:59+00:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - css
    - html
---

The original question for the below answer was wanting to hide a link when a button that’s next to the link has a “selected” class. This is interesting because this requires a sibling selector, but sibling selectors in CSS are a bit funky… with a sibling selector, the target element is always *subsequent*. That means it’s always the right-hand argument.

In the examples, I’ll make the background change so you can see effect – but to “hide the link” you’ll want to set `display:none`.

Let’s demonstrate by doing it the wrong way around. If we were to add the “is-open” class to the anchor, we could easily affect the next button:

```css
    a.is-open + button {
        background-color: Aqua;
    }
```

```html
<a href="./index.html" class="logo-header"><span class="logo-part">Web</span>Project</a>

<button type="button" class="menu-button" aria-expanded="false" aria-controls="menu-container" data-menu-button>
    <svg class="menu-icons" width="40" height="40" aria-label="mobile menu control ">
        <use class="menu__nav-cross" href="./images/sprite.svg#nav-cross"></use>
        <use class="menu__nav-menu" href="./images/sprite.svg#nav-open"></use>
    </svg>
</button>

<a href="./index.html" class="logo-header is-open"><span class="logo-part">Web</span>Project</a>

<button type="button" class="menu-button is-open" aria-expanded="false" aria-controls="menu-container" data-menu-button>
    <svg class="menu-icons" width="40" height="40" aria-label="mobile menu control ">
        <use class="menu__nav-cross" href="./images/sprite.svg#nav-cross"></use>
        <use class="menu__nav-menu" href="./images/sprite.svg#nav-open"></use>
    </svg>
</button>

<a href="./index.html" class="logo-header"><span class="logo-part">Web</span>Project</a>

<button type="button" class="menu-button" aria-expanded="false" aria-controls="menu-container" data-menu-button>
    <svg class="menu-icons" width="40" height="40" aria-label="mobile menu control ">
        <use class="menu__nav-cross" href="./images/sprite.svg#nav-cross"></use>
        <use class="menu__nav-menu" href="./images/sprite.svg#nav-open"></use>
    </svg>
</button>
```

To do this “the right way around”, the button would need to be before the anchor – so if that’s an option you can switch them around and use

```css
   button.is-open + a {
        background-color: Aqua;
    }
```

If not, you can wrap each pair in an enclosing element, such as a ‘div’ element wrapping the anchor and the button. If you set the “is-open” class on that div, you can easily have CSS selectors to do what you want.

```css
    div.is-open a {
        background-color: Aqua;
    }
```

```html
<div>
    <a href="./index.html" class="logo-header"><span class="logo-part">Web</span>Project</a>

    <button type="button" class="menu-button" aria-expanded="false" aria-controls="menu-container" data-menu-button>
        <svg class="menu-icons" width="40" height="40" aria-label="mobile menu control ">
            <use class="menu__nav-cross" href="./images/sprite.svg#nav-cross"></use>
            <use class="menu__nav-menu" href="./images/sprite.svg#nav-open"></use>
        </svg>
    </button>
</div>

<div class="is-open">
    <a href="./index.html" class="logo-header"><span class="logo-part">Web</span>Project</a>

    <button type="button" class="menu-button is-open" aria-expanded="false" aria-controls="menu-container" data-menu-button>
        <svg class="menu-icons" width="40" height="40" aria-label="mobile menu control ">
            <use class="menu__nav-cross" href="./images/sprite.svg#nav-cross"></use>
            <use class="menu__nav-menu" href="./images/sprite.svg#nav-open"></use>
        </svg>
    </button>
</div>

<div>
    <a href="./index.html" class="logo-header"><span class="logo-part">Web</span>Project</a>

    <button type="button" class="menu-button" aria-expanded="false" aria-controls="menu-container" data-menu-button>
        <svg class="menu-icons" width="40" height="40" aria-label="mobile menu control ">
            <use class="menu__nav-cross" href="./images/sprite.svg#nav-cross"></use>
            <use class="menu__nav-menu" href="./images/sprite.svg#nav-open"></use>
        </svg>
    </button>
</div>
```
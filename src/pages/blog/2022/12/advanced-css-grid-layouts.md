---
title: 'Advanced CSS grid layouts'
navMenu: false
pubDate: 2022-12-08
keywords: css,grid,layout
description: Look at a complex use case for CSS grid as a route to exploring some neat features.
bannerImage:
    src: /img/2022/12/css-grid-layout.png
    alt: A target layout with the head elevated from the article and displayed full width, with the navigation and content limited in how much they grow
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - HTML
    - CSS
---

This is the result of a long experiment to find a way to achieve a grid layout that satisfies the following:

1. Semantic HTML with an article that has a header
2. The header needs to be pulled out and displayed full-width (edge to edge)
3. The navigation and content need to be limited in size, with both
   - A viewport relative width, and
   - A maximum width for readability
4. The navigation and content need to be horitonally centered (i.e. equal margins left and right)

## Why is this CSS grid so difficult?

This is tricky, because you can't limit the size of the grid, you have to let it be full width. The only way in my experiments to do this was by adding additional columns that act as gutters - I couldn't find a way to use the standard grid gap to achieve this.

The additional challenge is that the heading is nested inside the article that is in the content area, which means you need a way to pull it out without breaking the DOM structure (it would be much easier to cut and past the header out, but this would break the page structure, inluding any structured data therein).

## Sample HTML

Prepare to scroll as here is the HTML for the content (I haven't included other stuff, like the website title, etc).

Key points:

- `.content-group` is the grid element
- `.content-group nav` is the navigation
- `.content-group main article header` is the header that needs to be pulled out and shown full-width
- `.content-group .page-content` is the content

Here's the full example.

```html
<div class="content-group">
  <nav>
    <h2>Navigation</h2>
    <ul>
      <li>Mercury</li>
      <li>Venus</li>
      <li>Earth</li>
      <li>Mars</li>
      <li>Jupiter</li>
      <li>Saturn</li>
      <li>Uranus</li>
    </ul>
  </nav>
  <main id="site-main">
    <article>
      <header>
        <h1>Header</h1>
        <p>Subtitle</p>
      </header>
      <div class="page-content">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
          dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
          ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
          nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
          anim id est laborum.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
          dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
          ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
          nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
          anim id est laborum.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
          dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
          ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
          nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
          anim id est laborum.</p>
      </div>
    </article>
  </main>
</div>
```

## Target layout

Here's the target layout, which was described in the intro.

:::figure{.inset}
:img{src="/img/2022/12/css-grid-layout.png" alt=" A target layout with the head elevated from the article and displayed full width, with the navigation and content limited in how much they grow" loading="lazy"}
::figcaption[Target layout]
:::

Let's look at the tricks!

## CSS grid tricks

To achieve the desired layout, the key parts are:

### Grid template columns

Our columns are where we get a bit clever. We are using several tricks here.

- `minmax` - for the gutters we are letting them have anything between `5` and `50` view widths. Because they make the same demand, they get given the same allocation of space. That's the first problem solved.
- `fit-content` - for the navigation, we have a specific size in mind, so we specify the maximum and let the grid give it as much as it needs
- `min-content` - for the content we set the width to be *the minimum amount of space needed to show the content without overflow* - more on this shortly


```css
grid-template-columns: minmax(5vw, 50vw) fit-content(250px) min-content minmax(5vw, 50vw);
```

The `min-content` part is where we obtain magic. As you can imagine, we can't set a maximum width for "the nav and content areas", which is what we really want to do. Instead, we will control the width of the content quite precisely to obtain the intended effect.

Before we do that, let's set up the grid areas.

### Grid template areas

Grid template areas are one of those neat CSS definitions that represents the layout textually in a way that matches the visual.

The below says all the columns in the first row are going to be part of a single area called "top".

Then we have a "left", "nav", "content", and "right" column. The left and right columns won't have anything inside them, they are going to be our gutters.

```css
grid-template-areas:
    "top top top top"
    "left nav content right";
```

### Full grid

The full definition for the grid is shown below.

To pull the header out of the article, the `main` and `article` must be set to `display: contents`. The elements have colourful backgrounds to show where they land on the page.

```css
.content-group {
    display: grid;
    gap: 1rem;
    grid-template-areas:
    "top top top top"
    "left nav content right";
    grid-template-columns: minmax(5vw, 50vw) fit-content(250px) min-content minmax(5vw, 50vw);
    grid-template-rows: repeat(auto);
}

header {
    background-color: #EEFFCC;
    grid-area: top;
    text-align: center;
}

nav {
    background-color: #CCEEFF;
    grid-area: nav;
    padding: 0 1rem;
}

main {
    display: contents;
}

main article {
    display: contents;
}

.page-content {
    background-color: #CCFFEE;
    grid-area: content;
}
```

### Content width

The final puzzle piece is to set the width of the content, and prevent it getting too bit. Otherwise it won't remain readable.

```css
.page-content {
    /* ... */
    width: 66vw;
    max-width: 900px;
}
```

## The full solution

Here's the full CSS solution, including a mobile breakpoint to switch the grid to a single column.

```css
body {
  margin: 0;
}

.content-group {
  display: grid;
  gap: 1rem;
  grid-template-areas:
    "top top top top"
    "left nav content right";
  grid-template-columns: minmax(5vw, 50vw) fit-content(250px) min-content minmax(5vw, 50vw);
  grid-template-rows: repeat(auto);
}

header {
  background-color: #EEFFCC;
  grid-area: top;
  text-align: center;
}

nav {
  background-color: #CCEEFF;
  grid-area: nav;
  padding: 0 1rem;
}

main {
  display: contents;
}

main article {
  display: contents;
}

.page-content {
  background-color: #CCFFEE;
  grid-area: content;
  width: 66vw;
  max-width: 900px;
}

@media (max-width: 800px) {
  .content-group {
    grid-template-areas:
      "top top top"
      "left content right"
      "left nav right";
    grid-template-columns: 1rem auto 1rem;
  }

  .page-content {
    width: unset;
    max-width: unset;
  }
}
```

This one needed writing down, because one day I'll be trying to do the same thing and I don't want to experiment my way to the solution again.

If you know a better way that achieves the layout while preserving the DOM - I'm open to suggestions.
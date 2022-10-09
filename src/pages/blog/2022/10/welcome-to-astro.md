---
layout: src/layouts/Default.astro
title: 'Welcome to my Astro site'
navMenu: false
pubDate: 2022-10-05
keywords: astro,static site generator,islands
description: A quick overview of Astro, which I'm now using for my website.
bannerImage:
    src: /img/2022/10/astro-accelerator.png
    alt: A screenshot from the Astro Accelerator
authors:
    - steve-fenton
categories:
    - Content Management
tags:
    - Astro
    - TypeScript
---

If you are reading this, the migration worked, and I've moved my website to Astro.

[Astro](https://astro.build/) is a static site generator built for the *islands architecture* era. It has drawn inspiration from the excellent stuff that emerged over the past decade to create a great way to build websites.

## A majestic archipelago

In Astro, each component is an island. Each one can be static or dynamic - so you can serve a static site that still has some interactive features, like allowing users to sign into their accounts. Dynamic islands are non-blocking and load when they scroll into view.

If you don't need dynamic islands, you get to serve majestic HTML and CSS. Astro doesn't add any runtime JavaScript. When users visit a page, they get a page (not a JavaScript framework that fetches data and renders it).

## Astro components

Components are just as valuable for static sites - you can define each component once and re-use it throughout your site, for example, that post metadata block with author and date; that's a tiny reusable component.

A component has a frontmatter block, which is TypeScript, and then an HTML block, which can contain tokens surrounded by curly braces like this:

```astro
---
type Props = {
  text: string;
};
const { text } = Astro.props as Props;
---
<p>{ text }</p>

```

You use the component by importing it, as shown in this example:

```astro
---
import Component from './Component.astro'
---
<Component text="Hello World" />
```

You can pass data instead of hard coding the text. Just leave out the quotes and use curly braces:

```astro
---
import Component from './Component.astro'
const helloWorld = 'Hello World';
---
<Component text={ helloWorld } />
```

## Astro layouts

Astro layouts are specialised components. Astro supplies the layout with information about the page it is processing.

Here's a cut-down example of a layout that calls a component.

```astro
---
import { Frontmatter } from '@config';
import Component from './Component.astro'

type Props = {
    frontmatter: Frontmatter;
}
const { frontmatter } = Astro.props as Props;
---
<html>
    <body>
        <Component text={ frontmatter.title } />
        <slot />
    </body>
</html>
```

In real life, you can cut up your page into components to create the `<`head>` element to render the header, navigation, and content area.

Wherever you want the parsed markdown to appear, you place your `<slot />`. This is the gap for the content to drop into.

## Markdown pages

You can then write pages using markdown. The frontmatter sets the layout and provides all your metadata. The content gets injected into your template.

```markdown
---
layout: src/layouts/Default.astro
title: 'Hello World'
---

## This is a title

And this is a paragraph.
```

The output of this layout would be:

```html
<html>
    <body>
        <p>Hello World</p>
        <h2>This is a title</h2>
        <p>And this is a paragraph.</p>
    </body>
</html>
```

## Summing up

And that's Astro in a nutshell. It can be super simple, or you can add utilities, plugins, extensions, and all kinds of fantastic stuff.

If you want to kickstart your fun with Astro, I have created an Astro Accelerator project, which is what I've used to jump-start this website.

:::figure{.inset}
:img{src="/img/2022/10/astro-accelerator.png" alt="A screenshot of Astro Accelerator" loading="lazy"}
:figcaption[Astro Accelerator]
:::

You can [see the Astro Accelerator in action](https://astro.stevefenton.co.uk/) or grab the [Astro Accelerator on GitHub](https://github.com/Steve-Fenton/astro-accelerator).

The demo site also contains documentation for all the [Astro Accelerator features](https://astro.stevefenton.co.uk/features/) you get on top of the empty project template. You can pull the code, delete the example content, and get up and running in the time it takes to `npm install`!

---
layout: src/layouts/Default.astro
title: Adding multiple attributes with Kramdown
navMenu: false
pubDate: 2022-09-06
keywords: kramdown,markdown,jekyll,attributes,attribute lists
description: Find out how to add attributes to HTML in Jekyll using kramdown inline attribute lists.
bannerImage:
    src: /img/2022/09/html-with-attributes.png
    alt: HTML elements with attributes added via markdown
authors:
    - steve-fenton
categories:
    - Content Management
tags:
    - Jekyll
    - Kramdown
    - Markdown
---

Jekyll's default markdown parser is *kramdown*. One of the custom features of kramdown lets you add attributes to HTML elements using *inline attribute lists*, or [IALs](https://kramdown.gettalong.org/syntax.html#inline-attribute-lists).

Using an IAL, you can add attributes to block elements or inline elements.

## Block element IALs

To add attributes to block elements, add the IAL on the next line:

```markdown
This is a paragraph of text.
{:class="highlighted"}
```

The attributes will be added to the block element in the HTML output.

```html
<p class="highlighted">
    This is a paragraph of text.</p>
```

## Inline element IALs

For inline elements, you need to add the IAL on the right-hand side of the content.

```markdown
This is a paragraph of text with an *italic*{:class="subtle"} word.
{:class="highlighted"}
```

You can see the inline attribute is added to the `<em>` element, and the block attributes are added to the '<p>' element.

```html
<p class="highlighted">This is a 
  paragraph  of text with an 
  <em class="subtle">italic</em> 
  word.</p>
```

:::aside{.note}
## Attribute merging

Any standard attributes added by the markdown parser are merged with the attributes you supply in your IAL.
:::

## Short-hand IALs

You can use the short-hand notation for class names (`.class`) and ids (`#id`).

```markdown
This is a paragraph of text with an *italic*{:.subtle} word.
{:#para-one}
```

Output:

```html
<p id="para-one">This is a 
    paragraph of text with an 
    <em class="subtle">italic</em> 
    word.</p>
```

## Multiple attributes with IALs

You can use long-hand or short-hand notation to add multiple attributes in kramdown. You can also mix them.

```markdown
This is a paragraph of text with an *italic*{:.subtle #italic-id} word.
{:title="Title attribute" data-test="value" .test-class}
```

Output:

```html
<p
  title="Title attribute"
  data-test="value"
  class="test-class">This is a 
  paragraph of text with an 
  <em class="subtle" id="italic-id">italic</em>
  word.</p>
```

## kramdown IALs

Using kramdown means you get a healthy form of additional control. You can easily control your components using IALs to add class names to elements. There is the slight risk of someone adding a `style` attribute, so watch out for that!
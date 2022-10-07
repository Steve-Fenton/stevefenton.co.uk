---
layout: src/layouts/Default.astro
title: Adding multiple attributes with Kramdown
navMenu: false
pubDate: 2022-09-06
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - Jekyll
    - Kramdown
    - Markdown
---

If you are using kramdown (the default markdown parser in Jekyll) there are some neat features that aren’t available in standard markdown. One of these features is *inline attribute lists*, or [IALs](https://kramdown.gettalong.org/syntax.html#inline-attribute-lists).

## Block element IALs

Here’s a basic use of IAL for a paragraph. For any block element, you just add the IAL on the next line.

```markdown
This is a paragraph of text.
{:class="highlighted"}
```

Output:

```html
<p class="highlighted">This is a paragraph of text.</p>
```

## Inline element IALs

For inline elements, you can add the IAL right after the element. In this example you’ll see attributes are merged with any standard values.

```markdown
This is a paragraph of text with an *italic*{:class="subtle"} word.
{:class="highlighted"}
```

Output:

```html
<p class="highlighted">This is a paragraph of text with an <em class="subtle">italic</em> word.</p>
```

## Short-hand IALs

You can use the short-hand notation for class names (`.class`) and ids (`#id`).

```markdown
This is a paragraph of text with an *italic*{:.subtle} word.
{:#para-one}
```

Output:

```html
<p id="para-one">This is a paragraph of text with an <em class="subtle">italic</em> word.</p>
```

## Multiple attributes with IALs

You can use long-hand or short-hand to add multiple attributes in kramdown. You can also mix them.

```markdown
This is a paragraph of text with an *italic*{:.subtle #italic-id} word.
{:title="Title attribute" data-test="value" .test-class}
```

Output:

```html
<p title="Title attribute" data-test="value" class="test-class">This is a paragraph of text with an <em class="subtle" id="italic-id">italic</em> word.</p>
```

## kramdown IALs

Using kramdown means you get a healthy form of additional control. If you use IALs to add class names to elements, you can easily control your components. There is the slight risk of someone adding a `style` attribute… so watch out for that!
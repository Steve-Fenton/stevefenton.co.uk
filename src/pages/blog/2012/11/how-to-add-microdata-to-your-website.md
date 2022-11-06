---
layout: src/layouts/Default.astro
title: 'How to add Microdata to your website'
navMenu: false
pubDate: 2012-11-28T22:48:31+00:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - HTML
    - 'Structured Data'
---

Everyone is talking about microdata these days (or indeed, [RDFa Lite](/blog/2012/11/how-to-add-rdfa-lite-to-your-website/)), but you may be wondering where to start with it.

First off, microdata and RDFa Lite are competing specifications, but they work almost identically. If you want to use RDFa Lite instead of microdata you can totally do it and it even works off of the same definitions (at [schema.org](http://schema.org/)).

So here is my mark-up before I added microdata:

```html
<article>
    <header>
        <h3><cite>Introducing HTML 5 (Voices That Matter)</cite></h3>
        <p><a href="http://www.brucelawson.co.uk/">Bruce Lawson</a> and <a href="http://remysharp.com/">Remy Sharp</a></p>
    </header>
    <p>This is a seriously good book on HTML 5 that turns the whole subject inside out to look at the real guts of what HTML 5 is, how it works and what other stuff you can put with it to make it great. It has great technical depth, but keeps things light and easy to absorb.</p>
    <footer>
        <p><a href="http://www.amazon.co.uk/Introducing-HTML-Voices-That-Matter/dp/0321687299/">Check out Introducing HTML 5 on Amazon</a>.</p>
    </footer>
</article>
```

So let’s start adding some attributes. The first attribute is “itemscope”. You add this to the element that contains the item. In my case, I have an “article” element for each book on my recommended reading list, so by adding the “itemscope” attribute to the article element I’m saying “each article is an item”.

```html
<article itemscope>
    ...
</article>
```

The second attribute is “itemtype”. This describes the type of the item – and you stick it on the same element as your “itemscope” attribute. In my case, I’m using the “Book” type, but there are many, many types to choose from on [schema.org](http://schema.org/). By adding this attribute to the article, we are now saying “each article describes a book”.

```html
<article itemscope itemtype="http://schema.org/Book">
    ...
</article>
```

Now we have defined the kind of thing we are describing, we can pick out the bits of data that are within the article. I have picked out the book’s “name”, the “author” and the “url” of the book.

```html
<article itemscope itemtype="http://schema.org/Book">
    <header>
        <h3><cite itemprop="name">Introducing HTML 5 (Voices That Matter)</cite></h3>
        <p><a href="http://www.brucelawson.co.uk/about/" itemprop="author">Bruce Lawson</a> and <a href="http://remysharp.com/about/" itemprop="author">Remy Sharp</a></p>
    </header>
    <p>This is a seriously good book on HTML 5 that turns the whole subject inside out to look at the real guts of what HTML 5 is, how it works and what other stuff you can put with it to make it great. It has great technical depth, but keeps things light and easy to absorb.</p>
    <footer>
        <p><a href="http://www.amazon.co.uk/Introducing-HTML-Voices-That-Matter/dp/0321687299/" itemprop="url">Check out Introducing HTML 5 on Amazon</a>.</p>
    </footer>
</article>
```

Before you crack on, though, you might want to also [read my article on RDFa Lite](/blog/2012/11/how-to-add-rdfa-lite-to-your-website/).
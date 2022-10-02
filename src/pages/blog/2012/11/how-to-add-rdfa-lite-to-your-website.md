---
id: 687
layout: src/layouts/Default.astro
title: 'How to add RDFa Lite to your website'
pubDate: 2012-11-29T22:44:53+00:00
author:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=687'
permalink: /2012/11/how-to-add-rdfa-lite-to-your-website/
interface_sidebarlayout:
    - default
categories:
    - Programming
tags:
    - html
    - rdfa
---

This is really the second half of my [article on microdata](https://www.stevefenton.co.uk/2012/11/How-To-Add-Microdata-To-Your-Website/), because there are two competing specifications (Microdata and RDFa Lite). I personally believe that if RDFa Lite wants to be the one true specification, they need to re-brand the specification to “RDFa Lite Microdata” – because everyone is talking about microdata and it just sounds cooler. Given the choice between the two and the lack of substantial differences in the specifications, developers will choose the one that sounds cool and “RDFa” just isn’t sexy enough.

So this article follows the same process as my microdata article, but adds “RDFa Data-Tome” attributes rather than microdata attributes.

So here is my mark-up before I added RDFa Lite:

```
<pre class="prettyprint lang-html">
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

So let’s start adding some attributes. The first attribute is the vocab. This tells people where the schema is defined.

```
<pre class="prettyprint lang-html">
<article vocab="http://schema.org/">
    ...
</article>
```

The second attribute is “typeof”. This describes the type of the item – and you stick it on the same element as your “vocab” attribute. In my case, I’m using the “Book” type, but there are many, many types to choose from on schema.org. By adding this attribute to the article, we are now saying “each article describes a book”.

```
<pre class="prettyprint lang-html">
<article vocab="http://schema.org/" typeof="Book">
    ...
</article>
```

Now we have defined the kind of thing we are describing, we can pick out the bits of data that are within the article. I have picked out the book’s “name”, the “author” and the “url” of the book.

```
<pre class="prettyprint lang-html">
<article vocab="http://schema.org/" typeof="Book">
    <header>
        <h3><cite property="name">Introducing HTML 5 (Voices That Matter)</cite></h3>
        <p><a href="http://www.brucelawson.co.uk/about/" property="author">Bruce Lawson</a> and <a href="http://remysharp.com/about/" property="author">Remy Sharp</a></p>
    </header>
    <p>This is a seriously good book on HTML 5 that turns the whole subject inside out to look at the real guts of what HTML 5 is, how it works and what other stuff you can put with it to make it great. It has great technical depth, but keeps things light and easy to absorb.</p>
    <footer>
        <p><a href="http://www.amazon.co.uk/Introducing-HTML-Voices-That-Matter/dp/0321687299/" property="url">Check out Introducing HTML 5 on Amazon</a>.</p>
    </footer>
</article>
```

And we’re done. This example is hardly any different to the microdata example. Only time will tell which specification will gain the wider adoption, but I suppose everyone is going to have to end up supporting both, which is kind of ridiculous!

### Additional notes

Bear in mind that the types are case sensitive, so use “Book” not “book”. You can check this by adding the vocab and typeof attributes and pasting them into a browser – in this case “http://schema.org/Book”.

You can [test your RDFa code on the RDFa](http://rdfa.info/play/) Playground to make sure it is valid and makes sense.

Lastly, the author links should ideally point to a page about the author, so in this example the links should point to “http://www.brucelawson.co.uk/about/”, not just the home page. I have updated the final example to show this, but is isn’t obvious unless I point it out (which I’ve just done).

Massive thanks to [Manu Sporny](http://manu.sporny.org/) for his help in making this article as accurate as possible. Manu is the man on the inside when it comes to RDFa. Thank you also to Stephane Corlosquet for double checking the article.
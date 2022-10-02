---
layout: src/layouts/Default.astro
navMenu: false
title: 'HTML5 Page Layout'
pubDate: 2010-07-03T21:10:02+01:00
author:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=1022'
interface_sidebarlayout:
    - default
categories:
    - Programming
tags:
    - html
---

HTML5 is now just around the corner. I have already [tested HTML 5 on a myriad of browsers](/2009/07/HTML-5-Browser-Test/) and with a tiny JavaScript and CSS fix, it works in every major player – so if you are a web developer you need to start thinking about your HTML in a subtly different way.

The big change is that in HTML 5, you can use specific and meaningful containers instead of generic and meaningless div-tags. So instead of having a div for your header, a div for your menu and a div for your content, you can use the header, nav and article tags to really describe your web page.

Below is a really simple example of an HTML 5 page with semantic tags that help to describe the page.

This example was last updated on 16/08/2011 with changes to the use of the section element.

```
<pre class="prettyprint lang-html">

<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>An Example Of Semantic HTML 5</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta name="generator" content="Steve Fenton's Fingers">
        <meta name="language" content="en">
        <meta name="keywords" content="HTML 5, Semantic, Tag, Use">
        <meta name="description" content="An example of semantic HTML 5 tag usage">
        <meta name="copyright" content="Steve Fenton 2010">
    </head>
    <body>
        <header>
            <h1>An Example Of Semantic HTML5</h1>
        </header>
        <nav id="navigation">
            <ul>
                <li><a href="https://www.stevefenton.co.uk/">Home</a></li>
                <li><a href="https://www.stevefenton.co.uk/blog/">My Blog</a></li>
                <li><a href="https://www.stevefenton.co.uk/contact/">Contact me</a></li>
            </ul>
        </nav>
        <section>
            <header>
                <h2>Articles</h2>
            </header>
            <article>
                <header>
                    <h3>This is an article</h3>
                </header>
                <aside>
                    <p>If you have any comments on this article, please
                    <a href="https://www.stevefenton.co.uk/contact/">contact me</a>!</p>
                </aside>
                <p>In this example you'll notice that the page has a header and footer of its own, and that each
                article (and there can be more than one article on a page) can also have its own header and
                footer. Technically in HTML 5, each article header can contain a h1 tag, but for backwards
                compatibility it is better to stick with a hierarchical nesting of these tags, which is why this
                article has a h2 tag instead.</p>
                <p>Each of the new HTML5 elements in this example can be used just like the good old
                (meaningless) div tag, except that they mean a lot more to the page. You can style them
                exactly you did with div tags.</p>
                <p>Here is a quick run down of the elements used on the page.</p>
                <p>The header element is used as a contextual header. It applies to the "article" or web page
                that it is contained within.</p>
                <p>The footer element is also contextual and applies to the article or web page that is is
                inside of. For a page it might contain copyright information and privacy policy links, for an
                article it might contain related links or information about the author of the article.</p>
                <p>The nav element contains the main page navigation links.</p>
                <p>The article element contains a unique story or piece of content. The article should have
                its own header and can also contain a footer.</p>
                <p>The aside element can be used whenever you want to go off on a tangent or make a related
                comment that isn't part of the main article.</p>
                <footer>
                    <p>This article was written by Steve Fenton</p>
                </footer>
            </article>
            <article>
                <header>
                    <h3>This is another article</h3>
                </header>
                <aside>
                    <p>If you have any comments on this article, please
                    <a href="http://www.stevefenton.co.uk/contact/">contact me</a>!</p>
                </aside>
                <p>This is just an example of another article within the section.</p>
                <footer>
                    <p>This article was written by Steve Fenton</p>
                </footer>
            </article>
        </section>
        <footer>
            <p>© Copyright 2010 Steve Fenton</p>
        </footer>
    </body>
</html>
```
</body></html>
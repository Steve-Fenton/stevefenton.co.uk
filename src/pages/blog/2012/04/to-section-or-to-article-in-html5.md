---
layout: src/layouts/Default.astro
title: 'To section or to article in HTML5'
navMenu: false
pubDate: 2012-04-05T16:26:06+01:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - HTML
---

A friend of mine recently pointed out that the many explanations of section and article elements in HTML5 leave a lot of questions unanswered and it makes it hard to choose the correct element that has the best semantic representation of the content.

My understanding is based on a brief online conversation with the mighty [Bruce Lawson](http://www.brucelawson.co.uk/), author of [Introducing HTML5](https://www.amazon.co.uk/Introducing-HTML-Voices-That-Matter/dp/0321687299/brucelawson-21), who said:

> A section can contain many articles and an article can contain many sections.

This is a great explanation because it shows the strong relationship between these two elements.

So as a quick reminder, an article is a stand alone chunk of content. Imagine lifting the article off of the web page and it still makes sense in its own right. Most web pages could be divided into one or more of these independent articles.

So what is a section for? The first use is to group similar articles together. If you had a list of articles related to “music” and a list or articles related to “film”, you could group these articles into two section elements. The section then gives additional meaning to your mark-up. It says “whilst each of these articles are independent, they are also related to each other”. So a section adds a relationship between articles.

The second use is inside of an article. You can use sections to divide an article into meaningful chunks. This can be useful if you have a large article and the sections at as “chapters” inside of the article. You could even pop an id on each section and provide hyperlinks to jump to the various chapters.

In my opinion, the section element is not a semantic element until it relates to one or more article elements. A section element on a page without any article elements has no meaning. As soon as it surrounds some articles it has meaning. As soon as some section elements are surrounded by an article, they have meaning. Otherwise they are just division elements.

You can read more on [the section element on HTML5 Doctor](http://html5doctor.com/the-section-element/).
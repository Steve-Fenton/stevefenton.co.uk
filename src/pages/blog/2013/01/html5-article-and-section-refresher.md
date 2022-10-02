---
layout: src/layouts/Default.astro
navMenu: false
title: 'HTML5 article and section refresher'
pubDate: 2013-01-13T22:35:36+00:00
author:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=673'
interface_sidebarlayout:
    - default
categories:
    - Programming
tags:
    - html
---

Despite being among the earliest of HTML5 elements, article and section elements still crop up in questions when I’m talking to people about HTML5. I think the reason people ask is because they imagine that these elements are more restrictive than they really are.

So to help clarify how these elements work, a quick example of some of the ways they can be used.

The article element is for stand-alone chunks of content. Imagine adding a 4px dashed border to the article in CSS, now get a pair of scissors, cut the entire article element out of the page along the dashed line and paste it on a blank piece of paper… does it still make sense on its own? It is a good use of an article element if the answer is yes.

The example given in the specification is a blog post. The blog itself would be an article and each user-submitted comment could be an article nested within the blog post article. This is a good example, but ties the article element a bit too closely to a written “article”. It might be more useful to remember that a “loan calculator” widget could be enclosed in an article element – the “cutting it out and using it its own right” is a handy way to think about these things.

The section element works in two ways. You can use it group things together and you can use it to separate things.

Imagine a page full of reviews. You might use section elements to group the “music” reviews together and the “film” reviews together. Each section would have multiple reviews. This is an example of grouping many things using a section.

- section (Music reviews) 
    - article (Troublegum review)
    - article (Infernal Love review)
    - article (Crooked Timber review)
- section (Film reviews) 
    - article (Yes Man review)
    - article (Mr Deeds review)
    - article (Elf review)

The flip-side use of a section would be to divide a single article into several chapters.

- article (Academic Brilliance) 
    - section (Introduction)
    - section (Chapter 1 – brilliant stuff)
    - section (Chapter 2 – more excellence)
    - section (Epilogue)

Usually, in both of these cases, each article and each section would have a heading element that contained the text in brackets.

Of course, if you had a really substantial page, you might combine both of these and have sections containing articles containing sections – but not many pages are that big!

Part of understanding how to use these elements to ignore the word “article” and instead think “stand alone” and the other part is to think of “section” also as “group”.

### Quick Example

So here is an example HTML5 page outline…

- body 
    - header
    - nav
    - main 
        - article 
            - header
            - section
            - section
            - footer
    - aside
    - footer

In this example…

The page itself has a header, nav, main, aside and footer. This is a pretty typical page layout. The header and footer are tops and tails for your page. The nav element contains your primary site navigation. The aside element is for information related to the content nearby, but not a part of that content. The main element (at the time of writing this is a new one) is for identifying explicitly the primary content that the page is there for – in some cases this can be determined by removing all the elements you know are NOT the main content, but in some cases that doesn’t work – so the main element makes it absolutely clear.

Inside the main element, we have an article that is divided into a couple of sections and topped and tailed with a header and footer. You would leave out the sections if there wasn’t a great deal of content in the article and just put the content directly after the header and before the footer. Equally, the footer may not be required if you don’t have anything to tail your article with.
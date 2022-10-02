---
layout: src/layouts/Default.astro
navMenu: false
title: 'Fractality of Flocking Rules'
pubDate: 2018-03-13T08:58:58+00:00
authors:
    - steve-fenton
medium_post:
    - 'O:11:"Medium_Post":11:{s:16:"author_image_url";s:75:"https://cdn-images-1.medium.com/fit/c/400/400/1*eXkhfEuF41g5W_xnc_ydLA.jpeg";s:10:"author_url";s:38:"https://medium.com/@steve.fenton.co.uk";s:11:"byline_name";N;s:12:"byline_email";N;s:10:"cross_link";s:3:"yes";s:2:"id";s:12:"dd3163eb1d00";s:21:"follower_notification";s:3:"yes";s:7:"license";s:19:"all-rights-reserved";s:14:"publication_id";s:2:"-1";s:6:"status";s:5:"draft";s:3:"url";s:51:"https://medium.com/@steve.fenton.co.uk/dd3163eb1d00";}'
image: /wp-content/uploads/2018/03/flocking-rules.jpg
categories:
    - Programming
tags:
    - ood
---

![A Flock of Starlings](/img/2018/03/flocking-rules.jpg)

I spent something like $50 on [99 Bottles of OOP](https://www.sandimetz.com/99bottles/) when it came out. That could have bought me 60 Mars Bars, or even 0.005 Bitcoins! But I have been telling people to buy this book as it is an investment in their career. I’m going to share some of that value here, but to get the full benefit you’ll still need to buy the book yourself.

To get the full benefit of this article, why not listen to Pavement’s [Starlings in the Slipstream](https://youtu.be/-xGtwy39QYY) while you read!

### SOLID Principles

Let’s set the scene for Flocking Rules by first talking about SOLID principles (a good reference for these is *Agile Principles, Patterns, and Practices in C#* by Uncle Bob, and Cousin Micah). When I read about the SOLID principles, it took me a long time to start *making them happen* in my code. I stumbled around for a good couple of years in a state where I could repeat every principle, describe it in detail, draw pictures… but somehow my code wasn’t living up to my expectations of the principles.

Eventually the magic happened!

Everything started to click into place and the principles assisted me to make better choices about where to put code. After a while, I noticed that these principles were also helping me to make better choices in less granular areas. The concepts worked on a method, a class, a module, or an entire architecture. They worked on software, and they worked on my wardrobe. I realised the SOLID principles were fractal… each time you zoom out, they can be applied just as successfully as before.

### Flocking Rules

But how does this relate to Flocking Rules? Well, flocking rules provide a very clear and simple mechanism for refactoring code that ensures that after each tiny change, everything still works. The rules are very simple, like those followed by migrating birds; you maintain a particular distance and direction based on the birds immediately next to you – and this allows a very complex group behaviour. With a bit of practice, and with good tool support (like Visual Studio live testing), you can pick up the rules after just a couple of code katas.

But then some more magic happened!

I realised that the principle at work is fractal, just like the SOLID principles. Having practised the Flocking Rules on code, I started seeing opportunities to apply them at other levels. You can apply the concepts to modules, and architectures – leaving everything in a working state the whole time; even when undertaking a large change. I have now applied it to my code, while splitting deployment units, and while migrating huge amounts of infrastructure from the UK to Australia – all with no interruption to service. You can design many “moves” in this way once you start seeing the pattern.

### But Steve…

If you were hoping for me to supply a TL;DR of either SOLID principles or Flocking Rules in this post, I’m sorry to disappoint you. Yes, I could sum them up with a bullet list; but that would do you no good at all. The only way to really understand these concepts is to read the books and deliberately apply the ideas until they click.

Here are non-affiliate links if you need them:

- [99 Bottles of OOP](https://www.sandimetz.com/99bottles/) by Sandi Metz and Katrina Owen.
- [Agile Principles, Patterns, and Practices in C#](https://www.amazon.co.uk/Principles-Patterns-Practices-Robert-Martin/dp/0131857258/) by Robert C Martin and Micah Martin.

[Starling shapes in the evening sky](http://www.geograph.org.uk/photo/1065181) by Walter Baxter and licensed for reuse under this [CC BY-SA 2.0 license](https://creativecommons.org/licenses/by-sa/2.0/).
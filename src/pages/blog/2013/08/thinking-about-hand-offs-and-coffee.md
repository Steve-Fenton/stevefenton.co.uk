---
id: 522
layout: src/layouts/Default.astro
title: 'Thinking about hand offs and coffee'
pubDate: 2013-08-09T11:23:51+01:00
author:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=522'
permalink: /2013/08/thinking-about-hand-offs-and-coffee/
interface_sidebarlayout:
    - default
medium_post:
    - 'O:11:"Medium_Post":11:{s:16:"author_image_url";s:75:"https://cdn-images-1.medium.com/fit/c/400/400/1*eXkhfEuF41g5W_xnc_ydLA.jpeg";s:10:"author_url";s:38:"https://medium.com/@steve.fenton.co.uk";s:11:"byline_name";N;s:12:"byline_email";N;s:10:"cross_link";s:3:"yes";s:2:"id";s:12:"9a8e4dd77806";s:21:"follower_notification";s:3:"yes";s:7:"license";s:19:"all-rights-reserved";s:14:"publication_id";s:2:"-1";s:6:"status";s:5:"draft";s:3:"url";s:51:"https://medium.com/@steve.fenton.co.uk/9a8e4dd77806";}'
categories:
    - Process
---

Coffee shops are a great place to sit and think about software development problems. You could probably write a whole series of posts drawing parallels between delivering software and stuff that happens in your local coffee shop… and this should fill you with some degree of dread! I promise not to flog a dead horse.

Here is one thing I noticed though. The modern coffee shop applies Henry Ford style production line processing. A server takes your order and hands it off to a barista who will make your drink. There are many practical reasons for this hand off. The server may not be trained yet. There isn’t much room for the server to follow the customer down the processing line (especially if there were others returning from a completed transaction to get to the till). So it is understandable that they have chosen to place a hand-off in between the server and barista.

What this gives us, though, is an opportunity to see the problems created by a hand-off.

Without discrediting the skilled job of good coffee-making, it is fair to say there are limited options. You choose your style of coffee, the blend, number of shots, syrups, whipped cream and whether you are after a take-out. This is all handled using a small sticker-template with a domain-notation. So T-C-L gets you a Tall Caramel Latte and the cup it is stuck on tells you the size and whether it is a take out. All the information is compressed into a shared notation system. Without the shared notation system (or when someone makes a mistake within this system) incorrect orders are generated that need to be re-done.

So job number one is to learn the notation system and we have all helped the new server when they don’t know how to note down the blend selection! “Just whack a ‘GA’ below the ‘T’!”.

Another issue is that all of these orders can back up fast when there are lots of customers. It is much faster to take an order for a coffee than it is to make it. When it gets busy, the cups start to collect and occasionally things start getting processed out of order. This causes another hand-off issue as the customers are used to collecting their drinks in order, so if your T-C-L pops out ahead of an earlier customers plain latte, they’ll walk off with it because they aren’t really listening to the barista. This can cause failure demand when people realise they have the wrong order.

This is just a really simple look into the pains of hand offs. If it becomes problematic when making coffee, it is going to be problematic when trying to solve complex problems with software. This is why Agile encourages teams to work closely so the tacit knowledge gets shared around – in software, the “notation systems” are not as well rehearsed and fixed as they are in the coffee shop.

Avoiding hand offs is desirable if you want to deliver great software that is going to delight your customers.
---
id: 868
layout: src/layouts/Default.astro
title: 'Stop passing laws about things you don&#8217;t understand'
pubDate: 2012-01-24T17:03:49+00:00
author:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=868'
permalink: /2012/01/stop-passing-laws-about-things-you-dont-understand/
interface_sidebarlayout:
    - default
categories:
    - Opinion
---

With all the fuss over SOPA and PIPA recently, I had almost forgotten the ridiculous law passed by the EU in respect of cookies, and “other similar technologies” such as local storage. Cookies are used by websites for many reasons. Most commonly, they are used by statistics applications to make sure they only count a visitor once, by login-pages to store a token linked to your session, by interface components to store their current state and by advertising agencies to track you across The Web in order to target their advertising based on what you search for.

It is the latter of these that causes the most discomfort by surfers. The idea of someone keeping a list of all your searches in order to display adverts targeted specifically for you is just a bit creepy.

The other problem with cookies is when someone puts actual real life information in them, like user names and passwords. This is just plain reckless.

On the whole, though, cookies are nothing to worry about. They are a part of how things work online and without them, you would need to type in your user name and password on every single page of your Internet bank or social network not just once at the start of your session.

So this is where the [Privacy and Electronic Communications Regulations](http://www.legislation.gov.uk/uksi/2011/1208/pdfs/uksi_20111208_en.pdf), which essentially means:

> UK businesses and organisations running websites in the UK need to get  
> consent from visitors to their websites in order to store cookies on  
> users’ computers.

This all encompassing lack of wisdom has only one exception. You don’t need to ask for permission to store cookies essential to the operation of the website, which means login cookies and those that help to track shopping carts. This means, for example, that the “visitorid” cookie I use to prevent my statistics package from counting a visitor more than once per day requires me to obtain permission! There is no personal information, literally just a number. The statistics package looks for this cookie on each page load and if it is there, it doesn’t count it – that’s all.

This would be okay, except the regulations want us to interrupt the visit to ask for permission – so instead of just landing on one of my web-pages and reading some stuff, you would be presented with a screen asking for permission for me to store cookies. I would then have to avoid using cookies if you didn’t give me permission (presumably I would remember your selection *BY STORING IT IN A COOKIE*?! At least this cookie would be legal as it would be necessary for the correct operation of the site.)

I actually have things quite easy compared to other websites. I only store my own cookie. If you use a third party service for website statistics or for advertising, how are you supposed to control the process of consent for the cookies they store – or will each of them start adding alerts to your website asking for permission?

Bearing in mind that this law is intended to protect privacy, surely it should distinguish between the following:

- Cookies that store, or provide a pointer to, personal data
- Cookies that have nothing to do with personal data

This would then exempt many website using trivial cookies from having to prompt the user to accept or reject cookies. Do we really want to be interrupted on every website we visit with a notice explaining what cookies are being used, for what purpose and whether we accept them? Not really. Maybe if we were only prompted if the cookies were going to be shared across many websites, or if they linked in any way to personal data.

So how can I implement a compliant solution to this problem? Well, in the future we will be allowed to rely on browser settings. We will be able to assume that if their browser allows cookies on our website, we can use them. Sadly, we cannot yet do this as surfers aren’t yet considered savvy enough to understand all this complicated stuff, bless them.

So my solution will be to add a message, warning or banner that advises users that I use a cookie to avoid double-counting them in my website statistics and give them the option to accept this, or reject it – whereby they will be redirected to a search engine to find the information elsewhere.

In the future, hopefully governments around the world will consider learning more about a subject before creating insane regulations.
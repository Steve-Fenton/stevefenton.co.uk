---
layout: src/layouts/Default.astro
navMenu: false
title: 'Open Redirection Attack'
pubDate: 2011-04-09T19:36:28+01:00
authors:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=963'
interface_sidebarlayout:
    - default
categories:
    - Programming
---

This is a typical example of coming up with an idea that seems really helpful, but ending up opening up your site to simple attacks. An Open Redirection Attack is made possible when you have a page that accepts a redirection parameter in the query-string.

For example, if you attempt to visit a page on a website that requires you to log-in, you are often sent to a log-in page along with a parameter that tells the log-in page where to send you once you’ve been verified. For example, if you attempted to visit `http://www.sohnee.co.uk/Secure-Area/`  
 you could be redirected to… `http://www.sohnee.co.uk/Login/?redirect=http://www.sohnee.co.uk/Secure-Area/`.

The idea is that once you log-in, you are redirected to the page you originally wanted to see.

The problem with this idea is that you could become a victim of an Open Redirection Attack. The attack is as simple as this… I send a spoof email with the following link… `http://www.sohnee.co.uk/Login/?redirect=http://www.neonvice.com/Secure-Area/`.

To casual web users, this looks like a trusted address and it actually points to the website that I do trust. However, once I follow the link and log-in, I get redirected to a different website, which could be used to fool users into divulging information in the mistaken belief that they are still on the original website. If they are particularly clever, they will present a web page that looks just like the log-in page and show a message like “User name or password incorrect” – resulting in the unwitting visitor typing in their log-in credentials and sending them straight to the bunch of crooks that set up the attack.

This is a major vulnerability, which is actually very simply to prevent. All you have to do is validate the address before you redirect, preferably using a white-list.
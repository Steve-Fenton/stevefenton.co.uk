---
layout: src/layouts/Default.astro
navMenu: false
title: 'Event code 3005: An unhandled exception has occurred'
pubDate: 2011-01-18T19:57:45+00:00
authors:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=977'
interface_sidebarlayout:
    - default
categories:
    - Programming
tags:
    - .net
    - 'c#'
    - iis
    - wcf
---

If you have come across this rather vague message (`Event Code 3005: An Unhandled Exception has Occurred`), you will have spotted that there are very few resources that give any reasonable answers on the root cause of the issue – that’s probably why you are here, so I will do my best to help.

For starters, your error message will look a bit like this:

> Event code: 3005  
> Event message: An unhandled exception has occurred.  
> …  
> Exception information:  
> Exception type: FaultException  
> Exception message: An error has occurred while consuming this service.

I have trimmed this down to the pertinent, but sketchy details.

Now, the answer I’m about to give isn’t alone in the suggestions I have seen. Some people say that if you turn off monitoring it might fix the problem, others point towards issues in the way you handle Session\_End in your Global.asax and yet more people point to a number of other issues that all potentially get disguised by this 3005 event code.

My answer, however, is based on the one scenario I have come across – which turned out to be a really simple fix. This occurred in a WCF service hosted in IIS and the problem was that the connection string wasn’t right.

So before you try anything else, check that your connection string is definitely correct and see if this solves the issue.
---
layout: src/layouts/Default.astro
navMenu: false
title: 'Do I need to validate my HTML?'
pubDate: 2011-08-07T17:56:37+01:00
author:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=918'
interface_sidebarlayout:
    - default
categories:
    - Programming
tags:
    - html
---

I get asked this a lot. Seriously. Do I need to validate my <abbr title="Hyper-Text Markup Language">HTML</abbr> (or <abbr title="Extensible Hyper-Text Markup Language">XHTML</abbr>).

The answer is 100%, categorically yes. You should validate your HTML when you write a page. You should validate it each time you change you page. Sometimes you should validate it even when you haven’t changed your page. Valid HTML isn’t just something you need for special projects or for client’s that demand it – you need it for every page you write.

I think that’s pretty clear. But why do you need to validate your HTML? Validating your HTML does several handy things. It means that your page will be rendered the same in all browsers, give or take the odd box-model inconsistency or layout error. More importantly, it means you page will render the same in all future browsers, which is something you cannot test, even if you decide to test every current available browser, including Fireweasel.

Now this isn’t to say that the validator must be obeyed in all cases. There are certain scenarios that the validator can actually be wrong about. But my advice is, if you don’t know what these are (in great detail) it is better to do what the validator tells you. There is only one thing worse than having a validation error on your web page and that’s having a validation error that was flagged, but you ignored because you couldn’t be bothered to work out how to achieve the same result in a standards-compliant way. In fact, most people who ask me if they need to validate their HTML are doing so because they want to use something like a “center” element in their page and can’t be bothered to learn how to get the same result using CSS margins.

So when do I ignore a validation error? Mostly, I ignore a validation error if the validator isn’t yet up to speed with the draft specification. HTML5 is maturing nicely, but aspects of it change all the time as people discuss and decide on how to use each element semantically. If the draft spec says I can do something, but the validator says I can’t, I ignore the validator. This is because the official specification won’t actually be signed off until people are actually using the draft anyhow – so to avoid the impasse of W3C specifications, people have to be pioneers. There are other good reasons to ignore a validator, some of which I covered in my article about [Google’s ultra-optimised home-page](/2010/08/Google-Deliberately-Write-Awful-HTML/).

So use the validator to learn how to do things the right way – and break the rules when you know and understand the repercussions of what you are doing.
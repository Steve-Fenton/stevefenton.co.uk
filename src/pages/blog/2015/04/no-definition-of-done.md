---
id: 84
layout: src/layouts/Default.astro
title: 'No definition of done'
pubDate: 2015-04-05T00:33:54+01:00
author:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=84'
permalink: /2015/04/no-definition-of-done/

medium_post:
    - 'O:11:"Medium_Post":11:{s:16:"author_image_url";s:75:"https://cdn-images-1.medium.com/fit/c/400/400/1*eXkhfEuF41g5W_xnc_ydLA.jpeg";s:10:"author_url";s:38:"https://medium.com/@steve.fenton.co.uk";s:11:"byline_name";N;s:12:"byline_email";N;s:10:"cross_link";s:3:"yes";s:2:"id";s:12:"3a7c07764dc9";s:21:"follower_notification";s:3:"yes";s:7:"license";s:19:"all-rights-reserved";s:14:"publication_id";s:2:"-1";s:6:"status";s:5:"draft";s:3:"url";s:51:"https://medium.com/@steve.fenton.co.uk/3a7c07764dc9";}'
categories:
    - Process
tags:
    - scrum
---

Have you even been on a new team and before you start your first iteration, you create a definition of done? Don’t do that.

The purpose of the definition of done is to capture stuff that you would otherwise have to repeat on nearly all of your story cards. You absolutely don’t know what the stuff is before you see it being repeated.

The stuff that people put on their premature definition of done falls into a few categories.

### Duh!

The first category is stuff that you would do even if it wasn’t written as acceptance criteria. Some of it is automatic and some of it is implicit – you don’t need it listed in your definition of done because you don’t need it listed as an acceptance criteria – because it will happen without being written at all.

Examples are hard to create, because all teams are different – but “code must be checked in to source control” is the kind of thing that you shouldn’t have to add to the definition of done – in fact anything classed as “if you aren’t doing this, you aren’t doing your job” should be absent.

### Technical

Your team can have coding standards and technical practices – whatever the team does that brings quality to the product being developed. This stuff doesn’t need to be listed in the definition of done. The definition of done is like a contract between the business people and the technical people. The business people probably don’t care about the technical details. Nobody asks for “A special inbox rule to highlight emails from my family… oh and there shouldn’t be any methods with a cyclomatic complexity higher than 4”.

### Narrow

Some definition of done items seem really plausible when you talk about them up front, but in practice it doesn’t apply in all cases. If you need to keep excusing particular stories from stuff in the definition of done, it probably should be part of the definition of done.

### A Better Way

So here is the better way.

- Start with no definition of done
- As you work on stories, look for repetitive acceptance criteria and consider whether they should be part of the definition of done
- If you discover quality issues that can’t be solved naturally by improved practices, consider them for the definition of done
- Help the business people to specify what they want rather than assuming (including if they want something to perform fast or be guaranteed to behave in the same way going forwards) – starting off by requiring that the obvious is stated means you won’t waste time doing things that turn out not to be important
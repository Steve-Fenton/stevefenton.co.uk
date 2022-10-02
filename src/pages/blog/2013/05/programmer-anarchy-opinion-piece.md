---
id: 578
layout: src/layouts/Default.astro
title: 'Programmer Anarchy opinion piece'
pubDate: 2013-05-27T12:15:39+01:00
author:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=578'
permalink: /2013/05/programmer-anarchy-opinion-piece/
interface_sidebarlayout:
    - default
medium_post:
    - 'O:11:"Medium_Post":11:{s:16:"author_image_url";s:75:"https://cdn-images-1.medium.com/fit/c/400/400/1*eXkhfEuF41g5W_xnc_ydLA.jpeg";s:10:"author_url";s:38:"https://medium.com/@steve.fenton.co.uk";s:11:"byline_name";N;s:12:"byline_email";N;s:10:"cross_link";s:3:"yes";s:2:"id";s:12:"d6c22b442a72";s:21:"follower_notification";s:3:"yes";s:7:"license";s:19:"all-rights-reserved";s:14:"publication_id";s:2:"-1";s:6:"status";s:5:"draft";s:3:"url";s:51:"https://medium.com/@steve.fenton.co.uk/d6c22b442a72";}'
categories:
    - Process
tags:
    - 'programmer anarchy'
---

Programmer Anarchy, a term coined by Fred George, has been described in many different ways including “post-agile” amongst other giddy and gushing terms. I just wanted to clear up a little about what it is, what is new, what isn’t and where I think it is headed.

Firstly, one lesson that definitely hasn’t been learned here is how to name a methodology. “Programmer Anarchy” will suffer far worse than “Extreme Programming” when it comes to spreading fear. Extreme Programming sounds like jumping out of a plane with a computer. The word “extreme” is firmly associated with high-risk and people struggle to realise that the term actually refers to a level of discipline – taking good practices and turning the knobs up to 10. So if Extreme Programming has suffered a little because of its name, I imagine Programmer Anarchy is going to be the hardest sell ever.

But all of this is just naming.

So what is Programmer Anarchy all about? It is based on Agile principles and XP principles, but essentially ditches many of the roles and practices. In some ways Programmer Anarchy is to Agile what Kanban is to Scrum. Strip away the rules and processes and build on top of what you have left.

Is this a replacement for Scrum or Kanban or XP or any other method? Nope. This is another option. In my opinion this isn’t post-agile, it is another option within the realms of agile.

I take no issue with the concept here – but the sales pitch is all wrong. The naming is going to scare people off – it shouldn’t, but it will – and many of the descriptions that start with “unlike in Agile…” should actually start with “unlike in Scrum…”, for example. Also, the number of logical-fallacies used to undermine other methodologies seems to account for far-too-high a proportion of the marketing material – for example, talking about how estimating in Agile suffers from problems such as the individual doing the task ignores the fact that the problem has been solved via [relative sizing](https://www.stevefenton.co.uk/2013/05/Estimating-With-Time-And-Relative-Sizes/) (amongst other techniques). There was even a solution to this issue in Extreme Programming Explained, published in 2001.

So the developer-lead aspect of Programmer Anarchy reminds me a lot of what happens when a self-organising Agile team matures – and you would probably need to team to be a highly functional Agile team for Programmer Anarchy to work.

So here is a quick breakdown of elements of the method that are either existing in Agile, discarded (but perhaps shouldn’t be) and new to Programmer Anarchy.

### Existing

- Reduced roles
- Safe environment (failure allowed)
- Self-organising teams

### Discarded

Many practices are discarded, but in some cases this could end up destructive. I think the reason for their removal lacks either sound reasoning or sufficient context. In most cases the removal was liked to an assumption, but I think the general population will misunderstand these assumptions, or falsely believe unsound assumptions to be true or otherwise lack the understanding of the context.

Stand-ups, story narratives and retrospectives are discarded. The reason given is that teams should be talking all the time.

Estimates, iterations and mandatory-pairing are discarded (but not pairing in general). The reasons these are removed is because they are tools for blame. Perhaps they are in dysfunctional organisations. Not in any organisation I have worked in.

Unit-tests, acceptance-tests, refactoring and patterns are discarded. This is done because the team were specifically writing small, short-lived applications. If this is true, maybe you can get away with it. If it turns out an application is larger than expected or lives longer than anticipated this will be a costly mistake.

Continuous integration actually survives under the “continuous deployment” moniker.

Management is discarded because all the decisions are made by programmers.

### Summary

I’m sure all of this will work itself out (except maybe the name, that could well stick, which means you’ll have to achieve the method without telling people what it is called). This method will work given the right team inside the right organisation and this will prove to be the major limitation. We are very much talking about another process to add to the tool-box that will be useful in the right context – and the boundaries are not well known yet.

The wrong people will be attracted to this method because of the name and the people who would benefit will be put off by the name. This is a sad fact. However, even if you think that this method isn’t right for your situation, there are still reminders in here that can help your existing Agile method.

So what could you take from Programmer Anarchy if you aren’t in “the right context” to use it as dictated?

- Safe environment  
    It should be allowable for people to fail. Failure is not a waste of time, it is an acquisition of knowledge. Anything that involves beating people up when they make a mistake should be stopped.
- Allow experimentation  
    Let people use different languages, let people re-write existing stuff, let people create stuff. This means letting people make decisions, but also means giving them the time to do it – like, really giving them time to do it.
- Eliminate waste  
    This Lean principle seems pretty core to Programmer Anarchy. If you don’t have a reason to follow a process you should question it and possibly eliminate it. (Retrospectives supply a good opportunity to make these decisions!)
- Listen to programmers  
    … and all the other roles. Most people want to make things a success so if they are bringing up some issue it is because they think it is impairing the potential for success.
- Measure success  
    The measure in Programmer Anarchy is a commercial measurement. If an idea makes money it flies. This might not be the exact measure you need, but you should know how you will measure success.
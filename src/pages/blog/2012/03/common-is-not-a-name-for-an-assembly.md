---
layout: src/layouts/Default.astro
navMenu: false
title: 'Common is not a name for an assembly'
pubDate: 2012-03-05T16:39:05+00:00
authors:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=837'
interface_sidebarlayout:
    - default
categories:
    - Programming
tags:
    - .net
    - 'csharp'
    - java
---

On almost every occasion where a developer is introduced to an existing code-base, they are given a tour of the application that includes am assembly or name-space called “Common”. Now, it isn’t necessarily called “Common” specifically, although more often than not it is, it can also be found under such names as “Core”, “Shared” and heaven forbid “ClassLibrary1”. On some occasions, you may even find you have more than one of these, for example you may have both “Shared” and “Common”, or you find that every sub-domain in your name-space contains a “Core”.

Why is this wrong?

The whole point of organising your code in name-spaces and assemblies is to divide it in a logical way. This assumption is baked into the fact that used the phrase “organising your code” in the previous sentence, which proves my point even if you disagree with the latter half of that statement.The second you place code into “Common” or “Shared” or whatever general name you’ve come up with, you are basically naming it “all the stuff we couldn’t be bothered to think about”.

Even if you are tempted to put just one or two classes into this miscellaneous collection, be warned. Come back 12 months later and you’ll find hundreds of homeless code files have sheltered under your “Common” archway. The very existence of a project with a careless name encourages the biggest open-season of thoughtless structure imaginable.

So what can you do about it?

Step one is to take action to prevent the project from growing. Nothing should be added to the infectious area.

Once you have prevent any new code from being added, you need to start organising what is already present. All you need to do is ask what a code file does and a name-space should become instantly obvious. Is it data-access related? Does it deal with network communication? Is it validation? For each code file, you should be able to either identify an existing logical area that would happily home the poor little orphan, or a new area that needs to be created to house it.

Of course, your best bet is to never create a project, name-space or assembly that doesn’t have a name that tells people what it does. If you don’t write classes called “Logic” with methods called “DoStuff()”, don’t create a name-space called “Common”.
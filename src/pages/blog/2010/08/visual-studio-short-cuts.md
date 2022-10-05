---
layout: src/layouts/Default.astro
title: 'Visual Studio Short Cuts'
navMenu: false
pubDate: 2010-08-14T20:52:39+01:00
authors:
    - steve-fenton
categories:
    - 'Visual Studio'
tags:
    - Productivity
---

This week I was lucky enough to attend Guathon 2010 in Covent Garden, London and as I found out so much amazing information, I’m chopping it into small pieces and putting it up here for those who missed out. In this article I’m going to divulge a few of the awesome Visual Studio short-cuts that Scott Guthrie shared with a packed Screen 2 at the Odeon. Please note, some of these will only work in Visual Studio 2010!

Before I get onto the short-cut keys, I will quickly explain some impressive changes to intellisense in VS 2010. We’re all familiar with the code-completion in older versions of Visual Studio, where you start typing “HttpC” and “HttpCachePolicy” pops up for selection. Well, there are some improvements to help those of us who can’t remember by heart every element of the .NET framework. The first one is that you don’t have to remember the exact name, if you remember that there’s a Cache Policy, but have forgotten the http bit, typing “CachePol” will now bring “HttpCahcePolicy” up as a suggestion. If you do know everything off by heart, you can type “HCP” as a short-cut instead. You can always hit CTRL + , to search for a class, member, field etc.

Another nice feature in Visual Studio 2010 is that when you highlight a  
property, all other instances of that property are highlighted, and you can skip between them.

So here are a couple of short-cut keys that you might not know about, but which make life a heck of a lot easier. Some of these work in older versions of Visual Studio, so don’t be afraid to try them out.

Here’s an obvious one to start. If you perform a search or bring up a task list in Visual Studio, rather than double clicking on each item, use F8 to move through each result (or SHIFT+F8 to go in reverse).

A lot of people know that one, so here’s something a bit more obscure. You can hold down ALT while you make a selection with your mouse to “box-select” an area. This allows you to select a box of text across multiple lines, without selecting entire lines. For example, you could just select all of the “private” declarations in this code block…

```csharp
private int Id { get; set; }
private string Title { get; set; }
private string FirstName { get; set; }
private string LastName { get; set; }
```

Once you have elected them, you can over-type them, for example with “public”, so you end up with this.

```csharp
public int Id { get; set; }
public string Title { get; set; }
public string FirstName { get; set; }
public string LastName { get; set; }
```

My favourite short-cut in Visual Studio is `CTRL` + `K` followed by `CTRL` + `D`, this formats the entire document according to my configured layout rules are tidies up all the nasty formatting left behind by other developers.

[MSDN has a full list](https://docs.microsoft.com/en-us/visualstudio/ide/default-keyboard-shortcuts-in-visual-studio?WT.mc_id=DT-MVP-5002938), it is massive!

You can also look up shortcuts at any time by opening the “Options” dialogue box, expanding the “Environment” node, and then choosing “Keyboard”.

This article is just a summary, the important concept to take from this is that if you are doing a task repetitively, find out if there is a short-cut for it as it could save you a lot of time.
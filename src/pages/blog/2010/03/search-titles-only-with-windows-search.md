---
layout: src/layouts/Default.astro
navMenu: false
title: 'Search Titles Only with Windows Search'
pubDate: 2010-03-09T22:03:14+00:00
author:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=1053'
interface_sidebarlayout:
    - default
categories:
    - Windows
---

Revised, July 2014. Just a note to say this still works on later versions of windows, so although this article talks about the old Windows Search – give these tricks a go!

If you’ve got your hands on Windows Search (formally known as “Windows Desktop Search”), you’ll probably agree that it is much better and faster than the old “Search For…” utility in Windows. Because it indexes the files in locations that you select, it can return results almost instantly.

However, one problem you might have come across is that you get too many results! This is because Windows Search is performing a complex search of entire files, not just the title.

So how do you refine your search results?

Well, the first and most useful tip I’d like to share is “title-only searching” for Windows Search. All you need to know is this… Add “title: ” before your search term to find results where the file name matches your search (rather than any text in the file).

`title: Accounts`

The above example will give you any file with the word “accounts” in the title (which is the file name for most documents and the folder name for directories).

You can actually use this syntax for any file-property, such as “size: “, “extension: ” or “author: ” – very handy and demonstrated below:

Get all MP3 files: `extension: mp3`

Get all Word 2007 files: `extension: docx`

Get all Word files (doc and docx as docx contains the search term “doc”) `extension: doc`

Get all documents where I am the author: `author: "Steve Fenton"`

Notice that in this last example I’ve put quotes around the search term – that’s because I want exact matches. You can use the following to adjust your search behaviour:

### Quotes

Put quotes around a phrase to get an exact match: `author: "Steve Fenton"`

### AND

Use AND to get matches that contain BOTH terms (this will give results for “Steve Fenton” and also for “Steve M Fenton”, which you wouldn’t get for a quoted search): `author: Steve AND Fenton`

### OR

Use OR to find results with either term (this will find results for “Steve Smith” and for “Bob Fenton”, for example). `author: Steve OR Fenton`

I hope that this article helps you to get more out of your Windows Search experience.
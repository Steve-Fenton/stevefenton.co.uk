---
title: 'Navigate to type deserves a keyboard shortcut'
navMenu: false
pubDate: 2012-10-01T23:52:11+01:00
authors:
    - steve-fenton
categories:
    - 'Visual Studio'
---

**Update**! If you’re using Visual Studio 2015 or newer, `CTRL` + `,` (yes, the second key is a comma) opens “Navigate To Type” for you!

One of my favourite Visual Studio search features is the Navigate To Type. You enter the type or use its upper-case letters as a search short-cut and you can open it instantly without having to poke around the solution explorer to find it. Strangely, this isn’t mapped to a keyboard short-cut by default (note: see the update at the top of this article!).

Let’s look at a search example to start off with. We want to open “PersonRepository” but can’t be bothered to find it by expanding nodes on the solution explorer. Without the keyboard short-cut, you go to **Edit > Navigate To…**

In the dialog we start entering the type we want to discover, for example “PersonRep” or just the upper case elements of the type such as “PR”. Matches are added to the dialog and the top item is selected by default, so if it is the correct one, hit enter and you’ll have “PersonRepository.cs” open. If it isn’t the top one, use the arrow keys to select the right one – or your mouse if you prefer.

That’s all great. But it would be even better if we didn’t have to use the tool-bar menu to open the dialog. Let’s set up a keyboard short-cut.

Go to **Tools > Customise > Keyboard**.

In the dialog, filter the list of commands by typing in “NavigateTo” in the text box for “Show commands containing”. You should now be able to select “Edit.NavigateTo” from the list of results.

In the box beneath the phrase “Press short-cut keys”, hit the combination you want to assign, for example CTRL+T.

Once you’ve saved this change, you will be able to use CTRL+T to open the Navigate To dialog and find your stuff fast!
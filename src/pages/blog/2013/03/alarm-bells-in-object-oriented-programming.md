---
id: 635
title: 'Alarm bells in object oriented programming'
pubDate: '2013-03-06T15:46:29+00:00'
author: 'Steve Fenton'
layout: post
guid: 'https://www.stevefenton.co.uk/?p=635'
permalink: /2013/03/alarm-bells-in-object-oriented-programming/
interface_sidebarlayout:
    - default
categories:
    - Programming
tags:
    - .net
    - 'c#'
    - ood
---

I had a great discussion with a friend on the kind of things that can act as early indicators of poor code design in object oriented programming and I was surprised at how different our views were on this topic.

I routinely get alerted to problems in code design by certain patterns that, while not bad practices in themselves, indicate a strain on how the code has been organised. These are the code-equivalents of a suspiciously placed rug. There is nothing wrong with having a rug, but where the rug is placed can make the difference between the decorative addition to a room and the coffee-stain that lies beneath.

The common example I normally cite are `if` and `switch` statements. They are not in themselves a sign of bad design, but it depends on where you find them. What they do provide is a hint about your design.

For example, the following switch statement is clearly covering a nasty area of burned shag-pile…

```
<pre class="prettyprint lang-csharp">
foreach (var media in allMedia) {
    switch (media.MediaType) {
        case MediaType.Audio:
            queueAudio(media);
            break;
        case MediaType.Video:
            queueVideo(media);
            break;
        case MediaType.Interactive:
            queueInteractive(media);
            break;
    }
}
```

Can you see it? Can you detect the problem with this code? There is a nasty leak here and we need to fix it while it is still just a trickle. Getting the plumber in now will save a lot of money when this damp patch turns into a flood.

Let’s explore where this is headed first. If you don’t fix this, you’ll find that similar switch statements will appear elsewhere. Perhaps a similar switch statement for saving the media as it needs to be stored in different locations based on the type. Perhaps an if statement that pulls a single media type into an RSS feed. Before long we have three or four of these switch statements all operating on the media type.

Then we add a new media type.

Our new media type needs to be chased through the program. We need to update all of these switch statements. We have multiplied our change by the number of times we `if` or `switch` on the enum. In some cases, this change is massive because we didn’t see the leaky abstraction. A simple change like adding a new media type ends up taking a long time to do.

So what could have been done to prevent this?

The fix is really simple. In this case, we should have pushed any differences into the media object. This is what the code should have looked like:

```
<pre class="prettyprint lang-csharp">
foreach (var media in allMedia) {
    media.queue();
}
```

And this would be backed up using a simple MediaBase class, with AudioMedia, VideoMedia and InteractiveMedia specialisations. The differences between these media types would be encapsulated in these classes and adding a new media type is as simple adding a new class with the required behaviour, such as HolographicMedia. None of the calling code needs to change anywhere else in the program, because all of the differences are hidden away in this simple class structure.

Does this mean all `if` and `switch` statements are bad? Not at all. It is all about where you find the statement within its environment that sets the alarm bells ringing.
---
layout: src/layouts/Default.astro
navMenu: false
title: 'Reacting to Clarity insights'
pubDate: 2022-10-08
keywords: microsoft,clarity,insights,dead clicks
description: See how you can improve your website by reacting to insights from Microsoft Clarity.
bannerImage:
  src: /img/2022/10/clarity-dead-clicks.png
  alt: A chart on Microsoft Clarity showing dead clicks
authors:
    - steve-fenton
categories:
    - Analytics
tags:
    - Clarity
---

## What is Clarity?

Microsoft Clarity is a behaviour analytics tool that helps you understand how people use your website. It's a GDPR and CCPA compliant analytics tool, which is the reason I'm migrating to it, and it has some neat features that help you move from visitor-counting to usable insights.

Clarity isn't like-for-like with other web analytics platforms, it's more like tools such as HotJar and FullStory in terms of the features. However, it does have key information such as:

- Users
- Sessions
- Referers
- Popular pages
- User technology

The more important features are the ones that help you improve your website. You can get a view of these key insights (there are more, but these are the ones I love)...

:::figure{.inset}
:img{src="/img/2022/10/clarity-scroll-map.png" alt="A scroll map of my website" loading="lazy"}
:figcaption[Hot areas have been seen more than cold areas]
:::

### Dead clicks

Users are clicking or tapping on an element that isn't interactive. Something about the element must suggest interactivity.

A common cause of this is a list page with images that aren't clikable. Forcing users to click only on the title of the list items isn't very friendly, so maybe make those images clickable, too!

### Rage clicks

A rage click is when a user hits an interactive item and thinks it didn't work. They then hit the same item again... and again... and so on until their mouse button breaks. Either something is broken, or super-slow - so it's worth investigating.

A common cause of this is an async fetch that is taking longer than you imagined. Maybe that data file you are grabbing with AJAX has grown bigger than anticipated, or the API you call is down.

### Quick backs

The user followed a link and very quickly backed up. There is an expectation mismatch here.

This might be caused by bad link text, or a link that points to the wrong page. In some cases, it might even be because you created a really awful page and users are running away from it.

### JavaScript errors

Clarity picks up the errors that happen in your client-side JavaScript. You can investigate these and find issues in your code. This is a form of *testing in production* where your users might be able to create more inventive test scenarios than you did!

### Other cool stuff

Clarity also has other cool stuff, but for brevity I've not attempted to list everything. Scroll depth and pages per session can be an indication of engagement and it's always useful to segment audiences if you have a good reason to do so. There are also maps for clicks and scrolls. Plenty for you to explore.

## Using the insights

Each insight is accompanied with a replay that shows the interaction with your website. The replay uses *masking* on screens to ensure you don't record any sensitive or personal information.

When you see something interesting on your dashboard, you can review some of the recordings to form a picture of what users are doing.

:::note
The default settings for masking are pretty aggressive (which is a good thing), but you can also control what is classed as personal information to ensure it never gets recorded.

Head to **Settings -> Masking** to change these settings.

- Strict: masks all data
- Balanced: only masks sensitive data
- Relaxed: doesn't mask any text and should only be used on static sites with no forms or profiles
:::

Let's take a look at an example.

## Resolving a dead clicks issue

Clarity suggested I had a problem with dead clicks. More than 30% of sessions had dead clicks, so I spent some time reviewing the replays to see what was going on.

:::figure{.inset}
:img{src="/img/2022/10/clarity-dead-clicks.png" alt="A chart on Microsoft Clarity showing dead clicks" loading="lazy"}
:figcaption[High instances of dead clicks]
:::

Without Clarity, it's not uncommon to metaphorically gather around the campfire to tell stories about why something isn't working. When you can just watch what happened, you can avoid the narrative fallacy.

Here are some of the causes of dead clicks on my site.

- People sometimes select a chunk of text to copy. I assume they are collecting pearls of wisdom. I have many.
- Similarly, some people highlight a small chunk of text in the same way you might turn over the corner of a book to save your place.
- On touch screens, it's quite common for an indecisive finger to trigger a dead click when a user is thinking about scrolling. They hover for a bit and accidentally touch the screen. *Click!*
- Code blocks. Lots of people visit the site to find code or a command because that's the problem they are solving.

:::note
It is sometimes hard to make sense of what a user is doing. Their mouse is flying across the screen in seemingly random directions. However, this could be the result of their input device (we don't all use a mouse) or it might just represent their "I'm thinking" dance, like tapping fingers or wiggling your hand while you absorb the amazing content you found. Jigglers, wigglers, and alternate input devices... you are all welcome.
:::

This last item, code blocks, is telling me that users want to copy the code samples and commands that I've put on my website. Some do this by dragging to highlight code in the code blocks, expert users do a similar drag motion in the left margin (as this grabs entire lines at a time).

This isn't a *problem* (the website works and they achieve their goal), but it could be *better*. I could make these code blocks more useful to this common need.

The specific fix I implmented was to provide a shortcut for copying an entire block of code. Rather than an image, here's a working example:

```
You can copy all this mess
Using just one icon press
Go top-right for clipboard fun
Waiting for you. Touch. Click. Done.
```

This may make less sense if I later redesign things. However, you can try out the copy feature on that block to see how this is easier than selecting text and either right-clicking or use keyboard commands. It's also keyboard navigable for those who don't want to touch or click.

## Why I selected Clarity

This post is really about *using* the data you are collecting. Too many organisations are collecting the data, but fail to take any meaningful action in response to it. However, you might want to know why I switched over to Clarity rather than some other tool.

I'm a big privacy fan. I don't want to track *you*, I just want to make my website better. I have no plans to advertise to you or target you to "come back and finish reading my amazing article". I'd like to know what pages people look at and I definitely want to know if my website is annoying people.

Clarity lets me respect user privacy while still getting information about my website.

Here's some key points:

- Clarity has a great out-of-the-box set up
- It doesn't kill website performance
- You can see data now (not tomorrow)
- You see all sessions, not a sample of sessions

## Summing up

Even in the time it took to write the article, the dead clicks metric was dropping. Just 24% when I took the screenshot and under 20% when I finished typing. The fix was working.

Don't just collect data; do something with it. If you can detect small sources of friction on your website and remove them, you'll make The Web better. Rather than everyone being frustrated with this amazing planet-spanning source of information, we can bring back the joys of discovery.

Let's all spend one hour this week making something better!

## Further reading

- Find out [more about Microsoft Clarity](https://learn.microsoft.com/en-us/clarity/?WT.mc_id=DT-MVP-5002938)
- Visit [the Clarity website](https://clarity.microsoft.com/)
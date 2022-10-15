---
layout: src/layouts/Default.astro
title: 'Examples of WEBP format issues with Open Graph images'
navMenu: false
pubDate: 2022-10-15
keywords: webp,images,open graph
description: Some examples of WEBP format images failing for Open Graph uses and what to do to fix it.
bannerImage:
    src: /img/2022/10/open-graph-webp.png
    alt: A Twitter card showing open graph images and data
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - HTML
    - Open Graph
---

I currently use WEBP format images because they offer the best profile in the trade-off between image quality, file size, and browser support. Newer formats, like AVIF and JPEGXL, could perform better against this profile when browser support increases.

Despite opting for WEBP for images displayed on my site, I'm still using older formats for Open Graph images. Prompted by a quick online conversation with [John Reilly](https://blog.johnnyreilly.com/), I thought I should explain why with examples.

## What is Open Graph

When you shared links on the first social media platforms, they were just links. Then someone had the idea of expanding the link into what we now call *social cards*. You'll be familiar with social cards as they are super-common.

The social media platform had to crawl your web page to find a title, image, and description to use in the social card. A certain amount of educated guesswork was needed to obtain this information from the page. You'd often find links next to unrelated images taken from the sidebar.

The solution to this haphazard collection of information was Open Graph. A set of meta-tags site owners can place in the `<head>` of a page to supply the data. Here's an example of Open Graph without the content values (which change for each page):

```html
<meta property="og:type" content="website">
<meta property="og:url" content="...">
<meta property="og:title" content="...">
<meta property="og:description" content="...">
<meta property="og:image" content="...">
<meta property="og:image:alt" content="...">
```

When you supply Open Graph data, this can be used to create social cards, like this example from Facebook.

:::figure{.inset}
:img{src="/img/2022/10/social-cards.png" alt="A Facebook social card with image, title, and description" loading="lazy"}
:figcaption[A Facebook social card]
:::

For some social networks, there are more tags you have to add. For example, Twitter prefers to use its own `twitter:card` meta tags. There are some popular Open Graph debugging tools at the end of this post.

:::figure{.inset}
:img{src="/img/2022/10/twitter-card.png" alt="A Twitter social card with image, title, and description" loading="lazy"}
:figcaption[A Twitter social card]
:::

## WEBP images on The Web and social

All social media's household names support WEBP images in Open Graph tags. They are also supported by almost all web browsers. Only Internet Explorer (not actively developed) and KaiOS Browser (used on keypad feature phones) are missing support.

WEBP isn't the only thing that doesn't work in older browsers. Plenty of recent CSS features are also missing. Grid and flex, to name just two. However, 0.48% of The Web's population is still more people than you can fit into a football stadium.

It's easy to support these users with an older format in the `src` of your responsive images.

```html
<img
  src="/image.png"
  alt="A scroll map of my website"
  loading="lazy"
  srcset="/400/image.webp 400w, /700/image.webp 700w, /1000/image.webp, 1000w"
  sizes="(max-width: 860px) 100vw, 66vw">
```

Most users will see a WEBP image appropriate to their display size, but an Internet Explorer user will see the PNG.

I mention this to demonstrate that you probably already have a fallback image available unless you've decided to bias your website against people accessing the web on older devices. Bruce Lawson refers to this bias as the <em>Wealthy Western Web</em>.

Bruce's comments on this should pop into your head whenever someone says, "we don't need to worry about that because everyone upgrades their phone every two years anyway". In 2015, [Business Insider](https://www.businessinsider.com/iphone-price-vs-average-hourly-wage-worldwide-2015-9) reported that the cost of a phone was less than a week's wages in New York or London. In Jakarta, it was twelve-weeks wages.

## WEBP images elsewhere

Open Graph isn't just used by social media. Other tools, such as feed readers, note-taking apps, and automation services, can also use the data. This is where support for WEBP images remains sketchy.

Here's an example from a music site, which usually pushes PNG images in Open Graph, but added a WEBP for the article "Yeah Yeah Yeahs - Cool It Down":

:::figure{.inset}
:img{src="/img/2022/10/feed-with-webp-missing.png" alt="The missing image is a WEBP" loading="lazy"}
:figcaption[WEBP image is missing]
:::

We know Open Graph images increase engagement on social, attracting more clicks, favourites, and shares than posts without images (source: [Buffer](https://buffer.com/resources/the-power-of-twitters-new-expanded-images-and-how-to-make-the-most-of-it/)). Why miss out on this in all the other places Open Graph is used?

Anyone getting notifications about your new content via an app or publishing a link to your content via a social hub <em>might</em> be using one that can't handle WEBP. You can support these tools with your existing fallback image.

## Conclusion

You don't need to use a WEBP image in Open Graph tags. Images supplied in Open Graph aren't loaded in browsers. They don't impact your page speed or user experience. Social networks don't hotlink to your image and will process it to change its size, aspect ratio, and format if they wish.

You should already have a fallback image because The Web is for everyone. Using it in your Open Graph tags makes your images work everywhere these tags are used.

## Open Graph test tools

These tools can be helpful when checking your Open Graph information is as expected:

- [LinkedIn post inspector](https://www.linkedin.com/post-inspector/)
- [Twitter card validator](https://cards-dev.twitter.com/validator)
- [Facebook sharing debugger](https://developers.facebook.com/tools/debug/)
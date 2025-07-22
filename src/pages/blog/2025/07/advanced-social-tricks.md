---
title: Some useful advanced Mastodon tricks
navMenu: false
pubDate: 2025-07-22
keywords: social media,mastodon,advanced,tricks
description: Some advanced features you can set up on Mastodon.
bannerImage:
    src: /img/topic/social/mastodon.png
    alt: The elephant-styled Mastodon logo
authors:
    - steve-fenton
categories:
    - Other
tags:
    - Social Media
---

There are a bunch of Mastodon features I've accumulated over time and I realized I should write them down before I forget how I did them. There's a mix of post and profile features.

## Verified Mastodon links

Mastodon uses a neat handshake to verify links on your profile. The simplest way to make it happen is link from your target page back to your Mastodon profile, making sure to include a rel attribute that confirms its you.

```html
<a href="https://mastodon.social/@stevefenton" rel="me">Mastodon</a>
```

Once you have the meta tag in place, you can add the link to your profile and you'll get the verified icon and colour.

:::figure{.inset-medium}
:img{src="/img/topic/social/mastodon-verified-links.png" alt="Verified links on a Mastodon profile get a tick icon and a green background" loading="lazy"}
::figcaption[Verified links on a Mastodon profile get a tick icon and a green background]
:::

If you're using [Astro Accelerator](https://astro.stevefenton.co.uk/), you can add this to your author links, so when you link to your author profile it will validate.

```yaml
---
layout: src/layouts/Author.astro
title: Steve Fenton
id: steve-fenton
...
links:
 - text: Mastodon
      url: https://mastodon.social/@stevefenton
      rel: me
---
```

## Tag links in your profile

You can show off your interests using tags in your profile, just like you do on posts.

```text
🧷 Software Punk

🐙 Swabbie / Octonaut at #OctopusDeploy
✂️ Yak Stylist
🔬 DORA Community Guide
🏆 Microsoft MVP
🔁 #ContinuousDelivery and #DevOps
👟 #Agile #Lean and #PlatformEngineering
🛡 Deputy Head Boy (BPCS)
🧠 Opinions are my own
```

Once you save your profile, you'll see the tags are clickable. People can find you with these tags.

:::figure{.inset-medium}
:img{src="/img/topic/social/profile-tag-links.png" alt="Tags in your profile are clickable and help people find you by interest" loading="lazy"}
::figcaption[Tags in your profile are clickable and help people find you by interest]
:::

## Author link on Mastodon previews

While it takes a bit of coordination, this is a neat feature of Mastodon. You can signal through your web pages that you are known to the Fediverse. When you do this, any links to content you create get a little link to your Mastodon profile.

All you need to add to the pages you author is a meta tag:

```html
<meta name="fediverse:creator" content="@stevefenton@mastodon.social">
```

Once your fediverse creator meta tag is on place on all your articles, any link to these pages will get the link to your profile.

:::figure{.inset-medium}
:img{src="/img/topic/social/mastodon-author-link.png" alt="If the target page has the right meta tag, you get a link to your profile" loading="lazy"}
::figcaption[If the target page has the right meta tag, you get a link to your profile on the bottom of the post]
:::

If you use the [Astro Accelerator](https://astro.stevefenton.co.uk/), you can add it to your author front-matter and it will all be taken care of.

```yaml
---
layout: src/layouts/Author.astro
title: Steve Fenton
id: steve-fenton
...
meta:
 - name: 'fediverse:creator'
      content: '@stevefenton@mastodon.social'
links:
 - text: <i class="fa-brands fa-mastodon" aria-label="Mastodon"></i>
      url: https://mastodon.social/@stevefenton
      rel: me
---
```

## Organized tags

This one is easy. Put your tags last when you write a post on Mastodon. When you add them on their own line at the end of a post they get organized into a neat collection of tag boxes.

:::figure{.inset-medium}
:img{src="/img/topic/social/post-tags.png" alt="Tags are elevated from text links to nice boxes" loading="lazy"}
::figcaption[Tags are elevated from text links to nice boxes]
:::

## Sample post

Here's a post I just wrote that uses the features I just described.

```text
Stop chasing the "productivity delusion"! My new article explains why focusing on typing speed and multitasking is a trap and how to achieve twice the impact with half the work.

Dive in: https://octopus.com/blog/productivity-delusion

#TechIndustry #ProductivityTips #SoftwareDev #OctopusDeploy
```

This demonstrates all the features in one hit:

:::figure{.inset-medium}
:img{src="/img/topic/social/post-features.png" alt="A post showing the author link and the organized tags" loading="lazy"}
::figcaption[A post showing the author link and the organized tags]
:::

And here's the profile with all the green stuff.

:::figure{.inset-medium}
:img{src="/img/topic/social/profile-features.png" alt="A profile with tag links and verified links" loading="lazy"}
::figcaption[A profile with tag links and verified links]
:::

Have fun leveling-up your Mastodon game.

---
layout: src/layouts/Default.astro
title: 'The 1024 Byte Parable'
navMenu: false
pubDate: 2011-05-10T19:23:46+01:00
authors:
    - steve-fenton
categories:
    - Programming
---

```
So I ended up buying everyone cakes. How on Earth did that happen? Sadly, it happened all too easily and I have to put my hands up to two mistakes made along the way. I was investigating an error that occurred in a software system and at the all important point I was examining some code with my work colleagues. We were looking at streamed messages, which were being read in chunks of 1024 bytes. The code appeared to handle the scenario of having less than 1024 bytes and the scenario of having more than 1024 bytes. So the question posed to me was 'What if the message is exactly 1024 bytes', to which I replied: 'The chances of it being exactly 1024 bytes is pretty slim - if it is exactly 1024 bytes I will buy everyone cakes'. So we examined the messages being sent. Initially, it looked like I was off the hook. The message in the log was 1026 bytes - it was almost a relief. The problem was, as I looked down at the output from the log file I saw that the logger had enclosed the message with brackets. Cakes bought!
```

And just for the purposes of double checking… if you do paste this into a [byte counter](https://mothereff.in/byte-counter), watch out for any of the simple quotes and dashes being converted into curly special versions.

:::figure{.inset}
:img{src="/img/2011/05/byte-counter.png" alt="Byte Counter" loading="lazy"}
::figcaption[Byte counter]
:::
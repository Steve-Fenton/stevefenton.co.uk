---
layout: src/layouts/Default.astro
title: 'Bundling is the new parrot word'
navMenu: false
pubDate: 2016-02-15T06:00:40+00:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - Bundling
    - Modules
    - TypeScript
---

TypeScript has immediate and first class support for two mechanisms of code delivery. You can merge the whole application into a single output file, or you can take advantage of modules and load them asynchronously on demand.

Folklore in the web industry has firmly imprinted the idea that “bundling is best” and it wouldn’t surprise me if this was baked into many scripted interviews the world over. For TypeScript, though, I’d like to suggest that bundling is second-best.

Let’s talk about bundling to start with. It is *usually* good for small applications because the queue time for many individual files is typically longer than the actual download time. By delivering a single file, there is less queue time. Of course, you’d need to test your application at different bandwidths and with various parallel settings to simulate different browsers to see if your application would benefit from a single file approach… and you’d need to re-calculate this if your application changed in size.

However, bundling is laughable if you diligently bundle and minify your two small script files, while doing nothing with the 30 images that are being served at “larger than displayed” sizes, and “before they are visible to a person” (i.e. banner rotators). If you want to improve the *perceived* load time and you haven’t yet reached the Pareto Paradox\*, you should first take advantage of the Pareto Principle (around 80% of the perceived load time is caused by just 20% of the content… and big images are usually prominent members of that 20%).

Now let’s cover loading modules asynchronously on demand. When you need to use the “AwesomeLibarary”, it is requested and your code executes once it has loaded. This technique can scale to very large applications, because you only need to load what you are using, when you need to use it. All of the modules are cached, so as the cache populates, this becomes instant (as far as you can perceive it).

With modules, you also get the benefit of the code starting to run earlier. The first module starts to execute as soon as it is loaded, rather than when an entire bundle file is loaded. If you think that this is a marginal gain, please compare it to bundling before you make up your mind. If you have a very large application, bundling will in fact be working against you (for example, as big as the Azure Management Portal, or Visual Studio Team Services).

The difference between bundling and module loading is less visible at the far left of the scale (i.e. small amounts of code) and ends massively in favour of modules at the far right of the scale. So if you are going to do something by default (let’s face it, you are bunding because of folklore, not empirical evidence – or because you only compared bundling to “not having any strategy at all”). Don’t let the folklore tell you that bundling is better than asynchronous module loading.

\* The Pareto Paradox is caused by the Pareto Principle. The principle states that roughly 80% of effects will come from 20% of the causes, but the paradox is caused when the 20% becomes over-managed – meaning diminishing returns being obtained in this area while the ignored 80% contains bigger effects.
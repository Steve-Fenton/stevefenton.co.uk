---
title: "Developers don't trust AI, and that's good"
subtitle: "Encouraging people to increase their trust in AI can reduce agency, diminish personal responsibility, and lower vigilance."
pubDate: 2026-10-05
description: "Encouraging people to increase their trust in AI can reduce agency, diminish personal responsibility, and lower vigilance."
keywords: "ai,trust,developers"
navMenu: false
bannerImage:
  src: /img/topic/architecture/barbed-wire.jpg
  alt: Photo by Steve Fenton. A rusted barbed wire fence is a vivid orange against the blurry olive green countryside in the background.
authors:
  - steve-fenton
categories:
  - Opinion
tags:
  - AI
meta:
  - name: canonical
    content: "https://thenewstack.io/developers-do-not-trust-ai-and-thats-a-good-thing/"
---

One of my old hobbies was writing for independent music magazines, such as Spill Magazine (distributed free at music venues) and DV8 (distributed free at hair salons). Over the years, I saw hundreds of unsigned bands and learned a crucial lesson: Amplification makes everything you do really loud, but it doesn't fundamentally change whether what you're doing is good or bad.

This law of amplification applies equally to software development, according to [DORA's State of AI-assisted Software Development report](https://dora.dev/research/2025/). AI is an amplifier that will boost the volume of your software delivery capability, whether good or bad.

And this is why I find the report's findings on trust so reassuring.

## We don't trust AI

The report found that AI is being used practically everywhere. Almost everyone (90%) is using AI for their work and believes it increases their productivity (80%) and code quality (59%). But they don't trust it. In fact, when asked whether they trust AI-generated output, the response was an overwhelmingly subdued "somewhat".

This has led many people to ponder how we can increase trust in AI. There's a perception that if we can get technical people to trust it, we'll get even bigger gains. However, this is not an outcome we should strive for.

One factor contributing to the successful adoption of AI is undoubtedly a healthy level of scepticism regarding the answers it provides. Encouraging people to increase their trust in AI can reduce agency, diminish personal responsibility, and lower vigilance.

## Absolute trust not required

Successful software developers have acquired critical thinking skills that enable them to envision potential pitfalls and anticipate how things might go wrong. When you create software used at scale, scenarios you perceive as atypical occur frequently.

When I worked on a platform used by global automotive giants, we would process over 4 million requests in just five minutes. We were working on a feature, and my mind was working through potential failure scenarios and edge cases. When I highlighted a potential bear trap, the business folks would often dismiss it. "The chances of that happening are a million to one," they said. However, that meant it could happen more than 1,152 times each day, so we had to accommodate it.

When developers have a sceptical mindset, it's healthy. They are thinking at scale and preventing a constant series of disruptive events. My team was following the "you build it, you run it" pattern, so we were highly motivated to silence the pager by creating robust software.

Great developers can think ahead and prevent problems before they write a single line of code. Having low trust in AI-generated output is a key aspect of this mindset.

## The AI playbook is the same as the Q&A one

Though AI is often considered disruptive, it usually turns out that existing models can (and should) be applied. Those who don't understand this are relearning lessons on small batches and user-centricity, as AI only exacerbates the problem of changing too much at once and over-investing in a feature idea before learning whether it's helpful to users.

Similarly, we have an existing model we can apply to AI-generated code. The Q&A model.

When you find an answer on Stack Overflow, you don't just copy and paste it into your application. Answers on these sites often contain a few crucial lines of code that directly address the question, as well as many additional lines that complete the example. There is some risk in taking those essential lines and even more in taking the wrapping ones.

You'll see occasional comments from developers highlighting the dangers of those wrapping lines, and while they're not wrong, the answers would be less helpful if they contained more and better code in the wrapping lines.

Experienced developers use the answer to understand how to solve their problem and then write their own solution, or make substantial adjustments to the code in the answer. We should apply these same reservations to all code we didn't author, whether it's from a Q&A site or from an AI-assistant. There's no reason to trust the AI-generated code more than you would the answer on a Q&A site that likely formed a part of the training data in the first place.

## AI warned you

Scepticism over AI-generated code shouldn't be a controversial stance. The tools themselves provide these warnings when you start using them. Everyone using coding assistants and AI chat has clicked past a message such as: "ChatGPT can make mistakes. Check important info."

We'd be foolish to place high trust in them and the outcomes would be worse if we did.

While AI-assistance is relatively new, experienced software developers are applying healthy models for handling the code it produces. That's why enthusiasm for toil-reduction is best served by muted trust levels.

---
title: Why maturity models are fundamentally broken
subtitle: "Maturity models make complex things appear simple, but we need to acknowledge the circumstances behind them being imposed on so many organizations."
pubDate: 2026-09-28
description: Maturity models make complex things appear simple, but we need to acknowledge the circumstances behind them being imposed on so many organizations.
keywords: "maturity model,maturity models,broken"
navMenu: false
bannerImage:
  src: /img/topic/architecture/steps-safety-paint.jpg
  alt: Photo by Steve Fenton. A winding set of concrete steps edged in a bright yellow paint.
authors:
  - steve-fenton
categories:
  - Process
tags:
  - Capabilities
meta:
    - name: canonical
      content: https://thenewstack.io/why-maturity-models-are-fundamentally-broken/
---

There's a certain appeal to maturity models. They take a lot of complexity and arrange it neatly into simple steps called maturity levels. Just tick off everything in the first level to move on to the next.

Maturity models owe their traction to the way they make complex things appear simple. In particular, they can take a subject and present it to someone with no expertise in the subject in a way that they can understand.

The simplicity of the maturity model is also its greatest weakness. Still, if we're to move past them, we need to acknowledge the circumstances that result in them being imposed on teams in so many organizations.

Let's quickly summarize why maturity models are fundamentally flawed, and then explore what you should do instead.

## 'Best' is always contextual

I worked for an organization in the health-care industry that needed to create a new software product. Thanks to an overzealous sales team, a suitable crisis had been created that meant the organization was willing to give the team whatever it needed to deliver the first version of the product.

We formed a small team that included everyone needed to deliver the software, including a clinically trained nurse. We experimented with the process to enable a highly collaborative approach with single-piece flow and fast feedback loops. We used a retrospective process after each feature to fine-tune the process.

After several iterations, we could deliver a feature every three hours. Over the course of six months, we delivered many working versions of the software with zero regression defects.

Having the autonomy to devise our own process allowed the team of clinical and technical people to create a process that perfectly fits the complex and challenging environment. It was the best process we could have applied to the problem at hand.

:img{ src="/img/2014/05/CrankedProcess.png" alt="The Cranked process. Impact Mapping and Specification by Example lead to increments of automating specification, fast iterations, internal PR, release, and retrospectives." loading="lazy" }

When the managers in the organization saw how well this process worked, they couldn't wait to roll it out to all the other software teams. There are several problems with this kind of standardization effort.

The process and capabilities don't bring the magic. It was a mixture of these practices and the close collaboration between the clinical and technical team members. We also had total commitment to the process because we created and adjusted it. The drivers for each change and the evidence of what worked and what didn't meant we understood why we were working this way.

The crucial factor that made this team so successful was autonomy.

And this is the heart of the problem. The one thing that is so important in creating a successful team and a working process is the very thing a maturity model removes.

## Maturity models only work in the lab

Maturity models are not unreasonable. As statistician George Box once said, all models are wrong, but some are useful. They are based on specific starting and target conditions. Each model is created in response to an undesirable situation and a vision for a desired future state. They capture the steps to move between two defined points.

If you have the same undesirable starting point, a maturity model will likely bring you the described outcomes. For example, the Software Capability Maturity Model (CMM) gained traction in the movement to bring professionalism to software development because so many organizations shared the same untenable starting position.

Even with high traction, results are highly variable because organizations adopting maturity models have different contexts to those the model's authors had experienced. Designing a single model that produces the same results in the face of different products, industries, people and organizational cultures is impossible.

Many attempts to introduce maturity models fail in the change management process. Some managers drop copies of "Who Moved My Cheese" on every desk, letting employees know they are the problem. Others attempt to run an internal marketing campaign, which results in eye rolls and collective lethargy. No slogan written on a pen ever saved a company from self-destruction.

When attention isn't paid to the process of change, it fails. Because maturity models have "we know better than you" baked in, they are a disaster for transformational efforts.

This brings us back to the key ingredient of a working software delivery process: autonomy.

Instead of defining precisely how professional software developers work, they should be allowed to solve this problem themselves. Where there are constraints, developers will find creative ways to meet the needs of the business. If you are in a safety-critical or regulated industry, they will achieve the necessary conditions.

The best process for the team and the organization will be the one they create. It will remain the best way to solve the problem if they regularly adapt the process to improve it.

To counter George Box's statement about models being wrong, we can turn to statisticians Peter McCullagh and John Nelder, who said:

"All models are wrong; some, though, are better than others, and we can search for the better ones. At the same time, we must recognize that eternal truth is not within our grasp."

## A way forward

If you measure the impact of each practice listed in a maturity model, you'd know whether they improved outcomes, made no difference to outcomes or made things worse. You'd end up not adopting all the practices, just the effective ones. This is the basis of a capability model.

Capability models encourage continuous improvement. You can tailor the capability model to your context and adjust as circumstances change. Instead of applying a required set of practices, you look for capabilities that will improve outcomes.

For software delivery, the best example of this is the [DORA capability model](https://dora.dev/research/). There are no maturity levels or sequence of steps. You don't even have to adopt every item listed in the model.

Instead, you reflect on your future desired state and use the model as a source of ideas. By tracking outcomes, you can avoid making things worse and spot potential problems. Throughput and stability metrics are common measurements, as they balance competing demands well.

You may introduce additional metrics to track specific improvements. If you focus on making the deployment pipeline faster, you might track the time it takes to build or test the software. Any measurements you collect must be retired when they are no longer needed or converted into fitness functions that will alert you if a problem resurfaces.

A capability model provides hints on practices that predict certain outcomes. You are encouraged to confirm that this relationship applies in your case, rather than applying capabilities on faith alone.

You must also develop each skill rather than meeting a minimal evidential bar. Introducing a practice like test automation will likely slow things down for a while as the skills are developed. Once sufficient mastery is achieved, the difference becomes visible.

Stay Away from DevOps Maturity Models
Adopting a technique or practice requires some investment. Maturity models disregard the cost/benefit trade-off. While some models are based on academically rigorous research, it's still essential to orient improvement efforts to the context of your team and organization.

If someone offers you a DevOps maturity model based on the DORA research, remind them that many members of the DORA team, including its co-founder [Dr. Nicole Forsgren](https://www.youtube.com/watch?v=n2ppyuTJiPM), have said it's a bad idea.

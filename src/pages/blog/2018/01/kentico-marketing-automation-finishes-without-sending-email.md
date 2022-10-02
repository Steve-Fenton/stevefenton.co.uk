---
layout: src/layouts/Default.astro
navMenu: false
title: 'Kentico marketing automation finishes without sending an email'
pubDate: 2018-01-25T19:00:58+00:00
author:
    - steve-fenton
categories:
    - Automation
    - CMS
tags:
    - kentico
---

I found this problem while investigating a marketing automation issue in Kentico. The problem reported was that the standard abandoned basket feature wasn’t sending the configured email. I must admit, my first checks were to ensure the SMTP configuration was correct – and that the scheduled task within Kentico was running. The actual fix was much simpler.

Here is a mock-up of the marketing automation steps:

![Marketing Automation- Fail](/img/2018/01/marketing-automation.png)

While it *looks* okay, there is a fundamental problem. The clue to this is the red-circle sat behind the “Send transactional email” step. That circle means that the step hasn’t be connected up. If we re-arrange the diagram, we can see the problem even more clearly.

![Marketing Automation the Clear Version](/img/2018/01/marketing-automation-clear-issue.png)

Although you can place the steps over the top of a line, that doesn’t mean anything until you connect it up. If you are used to tools such as Microsoft Visio, which re-routes lines to make this kind of problem obvious, the marketing automation doesn’t have this feature (yet).

The correct flow is shown below, note that the visual clues are highlighted – the semi-circular connectors and the line-arrows.

![Marketing Automation Working](/img/2018/01/marketing-automation-working.png)

So when you are setting up marketing automation in Kentico there are a few tricks you can use to avoid mistakes like this. They are especially important if you create flows with more than one intermediate step.

- Use geography to avoid lines hiding behind steps (see the image below)
- Don’t drag and drop a step over a line – a messy layout that works beats a tidy one that doesn’t
- Look out for hanging connector circles (they are three-quarter circles at the bottom right of the step)
- Look out for missing line-arrows – it usually means they are behind a step

![Marketing Automation with Geography](/img/2018/01/marketing-automation-geography.png)

The geography of the above image would make it clear if the Start and Finish steps were directly connected.
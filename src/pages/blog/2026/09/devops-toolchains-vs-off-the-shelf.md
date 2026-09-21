---
title: DevOps Toolchains Beat Off-the-Shelf Platforms
subtitle: "Many organizations search for a single platform they can buy and standardize on, but often teams struggle with a platform that doesn't work for them."
pubDate: 2026-09-15
description: Many organizations search for a single platform they can buy and standardize on, but often teams struggle with a platform that doesn't work for them.
keywords: "devops,toolchain,platforms"
navMenu: false
bannerImage:
  src: /img/topic/architecture/rai-amsterdam.jpg
  alt: Photo by Steve Fenton. The curved roof of a large hall at RAI Amsterdam, with steel beams, roof sections, and windows all following the organic lines of the roof.
authors:
  - steve-fenton
categories:
  - Opinion
tags:
  - Culture
meta:
    - name: canonical
      content: https://thenewstack.io/devops-toolchains-beat-off-the-shelf-platforms/
---

The search for an enterprise DevOps platform is on, but there are signs that these platforms will fail to outperform a DevOps toolchain that combines best-in-class tools. Platform engineering is likely to further widen the gap between platforms and toolchains by providing developers with pre-assembled toolchains tailored to the organization.

## DevOps Platforms

The concept of a DevOps platform pre-dates [DevOps](https://thenewstack.io/devops/) by a few years. Many existing all-in-one tools for work item management, version control and continuous integration builds aligned with DevOps when it became the must-have label in the marketplace.

For those paying close attention to the DevOps movement, there was a distinct lack of "ops" in the feature sets of these tools. The platforms don't include features for runbooks, observability or managing infrastructure.

It's tempting to believe labeling these tools with "DevOps" was a cynical marketing ploy. However, the idea behind using the DevOps moniker was to help people see the product could help with an essential part of the DevOps toolchain.

General purpose DevOps platforms often span planning, development, version control and builds, with some covering fewer of these activities than others. The broader the platform is, the more work you must do to make things happen.

To illustrate this point, you could create a platform that was essentially a task runner that executed arbitrary commands. This could satisfy the enterprise definition of a DevOps platform. Your deployment pipeline would comprise an ordered sequence of scripts to perform each step using command-line interfaces and calls to APIs. The value of such a platform is low.

All popular DevOps platforms have a core strength in areas such as work item management or continuous integration builds. Their features are less useful the further you get from the core. This isn't a weakness, as successful organizations use a DevOps platform to get the basics in place and then supplement it with specialized tools that improve their ability to deliver software. They don't depend on using it as the sole tool for DevOps.

This is why all these platforms provide a mechanism for integrations and extensions.

## Intuition and Research

When you use a greater number of more specialized tools, a certain amount of integration is needed. The combined feature set must bring productivity and performance improvements that offset the interoperability work. If you use a single DevOps platform, you'd have no interoperability issues, but your feature set would be limited to what's available in a general purpose tool.

But how big is the interoperability problem compared to the benefits of the richer feature set?  
If you create a deployment pipeline comprising separate tools for work item management, version control, builds, and deployments, you can form a tidy sequential toolchain with a clear hand-off at each stage. The commit references the work item. The build is triggered for each commit. The artifact created by the build process is uploaded to the deployment tool and can result in a zero-touch deployment to the first environment.

With such lightweight hand-offs, it's not surprising that toolchains comprised of multiple tools outperform general purpose platforms. This is the proverbial toolbox versus Swiss army knife scenario, except we're talking about tools fundamental to software delivery. You might take a Swiss army knife on a camping trip for unplanned use. However, if your builder arrived on site with nothing but a small multi-purpose tool, you would be forgiven for having reservations about the outcome.

The "[State of Continuous Delivery Report 2023](https://cd.foundation/state-of-cd-2023/)" confirms our intuition. The report found that you are twice as likely to be a top performer if you use more tools. You'll have shorter lead times, deploy more frequently and restore service faster. The report found CI/CD tools predicted higher performance and made it significantly less likely you'd be a low performer.

One cautionary tale from the report was that self-hosting too many CI/CD tools reduced performance. This was evident where teams self-hosted more than two CI/CD tools, suggesting the operational burden becomes a distraction. As most of these tools are available as hosted solutions, there is an opportunity to reduce the load by moving away from self-hosted tools.

## Platform Engineering Can Help

[Platform engineering](https://thenewstack.io/platform-engineering/) is deeply connected to the DevOps movement. The concept is based on Matthew Skelton and Manuel Pais' work on [Team Topologies](https://teamtopologies.com/), where a platform team's purpose is to "enable stream-aligned teams (such as feature teams) to deliver work with substantial autonomy."

A platform engineering team seeks to reduce the cognitive load on development teams by abstracting away some of the complexity they must handle. One key area the platform team might focus on is the deployment pipeline. Suppose developers have access to a smooth DevOps toolchain comprising a DevOps platform supplemented by many best-in-class tools. In that case, they can deliver software without the interoperability and operational burden. This allows teams to get the positive benefits from the "State of Continuous Delivery" report without the adverse side effects.

The internal developer platform could generate an entire deployment pipeline on demand, with deployment and infrastructure automation ready to go. Developers can create a pipeline and project skeleton and start working on their first feature. You might call this "instant hello world," as you could immediately deploy the empty application to production.

In contrast to a one-size-fits-all product bought off-the-shelf, an internal developer platform is tailored to your organization's needs and can respond to necessary changes.

Based on our assessment of DevOps toolchains, you can see why platform engineering is present in 48% of high-performing DevOps organizations, according to the [Puppet "State of Platform Engineering Report](https://www.puppet.com/resources/state-of-platform-engineering)."

## You Need A Toolchain

Adopting a toolchain at enterprise-scale is a daunting task. For this reason, many organizations are searching for a single platform they can buy and standardize on. This will provide a low return on investment as teams struggle to achieve high performance using a platform that doesn't work for them.

DevOps platforms solve well-explored problems well but are shallow at the edges. High-performers create a DevOps toolchain using best-in-class tools that accelerate their software delivery. Platform engineering teams can smooth the pathway by providing well-supported DevOps toolchains as part of the internal developer platform.

---
title: Best of KubeCon Europe 2026
navMenu: false
pubDate: 2026-03-25
keywords: kubecon,kubernetes,argo cd,ci/cd,deployments
description: "Let me share some of the best moments from KubeCon Europe 2026 at RAI in Amsterdam."
bannerImage:
    src: /img/topic/argo/argo-the-right-way.png
    alt: Argo CD the right way book cover. A colourful argonaut, which is like a red octopus with a blue shell.
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - Conference
    - Kubernetes
---

The waves of technology are crashing over me at KubeCon Europe and I can't hold the excitement in, so I'm going to share the best parts of Kubecon as well as the ArgoCon and Platform Engineering co-located events.

## Co-located events

### ArgoCon

### Platform Coffee

### Platform Engineering Day

## KubeCon day one

On day one I got excited about creating a cool toolchain that includes some shiny new things that I've been learning about from their creators.

### Cloudsmith

[Cloudsmith](https://cloudsmith.com) sits at the end of your build process and deals with artifact management, supply chain security, package scanning and policies. The idea is that instead of generating SBOMs that don't get used, you make sure every package meets policy before you start distributing it.

With the digital operational resilience act and the recent cyber resilience act, this is a hot topic in Europe. Cloudsmith acts as your artifact authority, guarding the door and checking whether your packages meet the dress code (and you set the policy with Rego).

If you haven't seen Rego before, here's a quick door policy to deny trainers and athletic shoes of various kinds. If you're dealing with security and compliance, you're going to be meeting Rego at some point as this is the de-facto language for defining policies.

*No trainers! Rego definition:*

```rego
package dresscode

import rego.v1

# Default deny
default allow := false

# Allow if the outfit passes all dress code checks
allow if {
    not violation
}

# A violation exists if any forbidden item is worn
violation if {
    some item in input.outfit
    is_trainer(item)
}

# Define what counts as a trainer
is_trainer(item) if {
    item.category == "footwear"
    item.type in trainer_types
}

trainer_types := {
    "trainer",
    "sneaker",
    "running shoe",
    "athletic shoe",
    "sports shoe",
    "canvas shoe",
}

# Provide a helpful message when denied
deny contains msg if {
    some item in input.outfit
    is_trainer(item)
    msg := sprintf("'%v' are not permitted — trainers and athletic footwear are not allowed.", [item.name])
}
```

Cloudsmith sits right in the middle of CI/CD, so helps you keep the CI and CD decoupled (because [CI is not CD](https://thenewstack.io/ci-is-not-cd/)). If you have teams using different CI tools, you can funnel everything into Cloudsmith to create a single artifact authority for all your packages.

### Argo CD and Octopus

Argo CD landed in Octopus in October 2025, adding to the Kubernete API and Kubernetes Agent options. Previously, I've preferred the Kubernetes Agent as it's the easiest way to crack on with container deployments.

When I looked more closely at GitOps in the State of GitOps report, the data painted a very clear picture that the Open GitOps principles have a deeply positive impact on many of the things I care about: Software delivery performance, security, compliance, auditability, reduced access, and drift prevention.

![The GitOps model shows 9 capabilities that lead to 3 DevOps outcomes and 5 GitOps outcomes](/img/topic/gitops/gitops-model-full.png)

Combining Argo CD, which is designed for GitOps, with the powerful modeling in Octopus gives you a scalable way to manage deployments. In Platform Hub, Octopus uses Rego to set policies and powerful template management so you can make it easy for teams to meet the policy requirements.

Octopus is the number one maintainer of Argo CD and (through Codefresh) was the first commercial maintainer when Intuit opened a call for maintainers, after they acquired Argo creators, Applatix.

#### Argo CD timeline

- 2016: Codefresh public launch. The first Kubernetes-native CI/CD tool.
- 2017: [The initial Argo CD commit by Applatix](https://github.com/argoproj/argo-workflows/commit/3ed1dfeb073829d3c4f92b95c9a74118caaec1b4)
- 2018: [Intuit acquire Applatix](https://web.archive.org/web/20221129061438/https://www.intuit.com/blog/news-social/welcome-applatix-to-the-intuit-team/)
- 2018: Codefresh joins the Argo CD project as the first commercial contributors.
- 2024: Octopus acquires Codefresh and their superstar Argo CD maestros.
- 2025: Argo CD in Octopus (yay).

#### The Cloudsmith and Octopus toolchain

This is where Cloudsmith pops back up, as you can make sure you check back with Cloudsmith to get the green light on policies and perform artifact attestation before you let the package progress through your deployment pipeline to production.

#### Argo CD the right way

A related highlight was getting a copy of *Argo CD the right way* by Kostis Kapelonis. This book lets you know about 30 wrong turns people often make with Argo CD. For each one, it explains the pain you're going to get if you apply the anti-pattern and it lets you know how to do it the right way instead.

The whole stack of books got snapped up

### Datadog

### Akamas

### Kratix





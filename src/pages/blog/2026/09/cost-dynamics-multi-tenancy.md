---
title: The cost dynamics of multi-tenancy
subtitle: "Can software multi-tenancy equal infrastructure multi-tenancy when it comes to fair pricing?"
pubDate: 2026-09-21
description: Trying to manage software multi-tenancy to the same level as infrastructure multi-tenancy results in high spending on instrumentation and increases code complexity.
keywords: "multi-tenancy,saas,cloud"
navMenu: false
bannerImage:
  src: /img/topic/architecture/st-ives-skyline.jpg
  alt: Photo by Steve Fenton. A view of the humble St. Ives skyline in Cornwall, with distinctive orange moss across the rooftops and the yellow sand bordering the famous bright green sea.
authors:
  - steve-fenton
categories:
  - Opinion
tags:
  - Architecture
meta:
    - name: canonical
      content: https://thenewstack.io/the-cost-dynamics-of-multitenancy/
---

When you buy software as a service (SaaS), you expect low overheads and predictable pricing in the face of uncertain usage. Ideally, you purchase a service tier based on a known quantity, such as the number of users, so you can budget for the year.

This presents a challenge for SaaS providers who must develop a competitive pricing strategy that remains profitable over the long term. While cost attribution is a complex topic in its own right, [multi-tenancy](https://thenewstack.io/the-past-present-and-future-of-multitenancy/) can affect the pricing strategy by forcing you to adopt suboptimal proxy measures to determine the cost per tenant.

Let's look at how multi-tenancy affects the cost attribution and dynamics of SaaS. To explore the topic, there's a refresher on some SaaS economics concepts.

We'll treat each customer as a tenant. This might not be the case; a single customer might have many subscriptions that are each treated as a tenant, but the concepts relate just as well to this situation.

## The cost attribution paradox

The task of measuring an island's coastline seems simple enough, but it turns out to be a fiendishly tricky problem. You can get a rough idea of the distance using straight lines, but this doesn't reflect the nature of the cliffs and shores, which have the seemingly random twists and turns of nature.

As you increase the precision of your measurement, the distance around the coastline increases. There seems to be no limit to this relationship, making the distance practically infinite. This is known as the coastline paradox.

When you increase the precision of measurement from 100 to 50 kilometre units, the coastline of Great Britain becomes 600 kilometre longer.

A similar paradox exists for cost attribution in software products. To obtain a precise cost for a tenant, you need to introduce an increasing number of business and technical costs along with the telemetry needed to accurately assign them to a tenant. Without common sense, the cost of collecting the information will significantly contribute to the cost itself. This is the cost attribution paradox.

With this in mind, we can accept that a perfect cost per tenant isn't the goal of cost attribution. We need a reasonable model supported by reliable outlier detection.

## Per-tenant cost attribution

The first element of cost attribution is the cost itself. In general, organizations exclude one-off costs, such as acquisition. Imagine you stopped taking on new customers and operated a closed-book business; which costs would remain? These are the costs to use in your calculations.

The simplest attribution technique is to calculate an average. You divide the cost by the number of tenants to obtain the mean cost. The benefit of this approach is that it always adds up to the right number, but it also introduces significant risks.

<figure>

:img{ src="/img/2026/09/cost-distribution.png" alt="A chart showing a tenant distribution between profit-and-loss buckets. Most tenants are profitable, with only a small number that cost more than they pay (8%)." }

</figure>

Each tenant uses your software differently. These differences typically follow a Pareto distribution, where most tenants fall below the mean and a few land significantly above the mean. Using a mean cost attribution model requires smaller tenants to overpay, subsidizing the tenants with excessive usage.

Using a mean cost attribution model can trigger a death spiral, where smaller tenants who aren't getting value for their money leave the service. When you rebalance your pricing, the cost increases and the smaller tenants pay a higher subsidy to cover the costs of excessive use by a few large tenants. This encourages more small tenants to churn, and the spiral continues.

<figure>

:img{ src="/img/2026/09/profit-loss.png" alt="Although the number of tenants reduces for each bracket, the cost of outliers means you often lose more money toward the end of the tail. In this example, tenant overuse represents $1.6 million lost." }

</figure>

Creating a model that reasonably represents reality is necessary to avoid this cost imbalance. This is where software and infrastructure multi-tenancy provide different options for attribution and different cost dynamics.

Any model should make it possible to:

- See the distribution of tenant costs.
- Design a pricing strategy that is profitable and competitive.
- Set up limits to keep tenants within their pricing tier.
- Provide predictable pricing for tenants without creating losses for you.

## Attribution and multi-tenancy

The most common cost attribution model for software multi-tenancy is to use a domain concept as a proxy for usage. For example, an e-commerce provider might use the number of products listed to approximate different usage.

The proxy is imperfect, as the number of products doesn't predict the number of visitors or transactions, but it provides a way to reduce the subsidy paid by small tenants to fund larger ones, which makes your software more competitive.

With infrastructure multi-tenancy, you should be able to use the actual infrastructure cost assigned to a tenant instead of a proxy.

This leaves the problem of cost dynamics, as software multi-tenancy has different bumps compared to infrastructure multi-tenancy. These bumps are the points at which you need to increase costs to take on more tenants.

There are two considerations for cost dynamics: the additional cost and the delay before the cost can be recovered by adding tenants.

## Cost dynamics

Isolating tenants with infrastructure has a higher initial cost, especially as you discover the right size for tenant workloads. Once you understand the cost for a tenant, it provides a very stable cost per tenant. Any unevenness in the cost profile represents a choice of timing. For example, if you use containers per tenant, you must decide when to commission your next cluster.

Software-based multi-tenancy has an early advantage as it keeps the initial product price low. The marginal economics of onboarding a tenant are very low — almost zero.

There comes a point when the initial design can no longer manage the load. The first port of call is vertical scaling — adding more power to the infrastructure to handle the load. This increases the cost per tenant but enables further tenants to be added.

Eventually, you run out of vertical scaling options and look to horizontal scaling. This requires more investment as you need to handle load balancing, re-architect stateful interactions and introduce technologies such as shared cache. This requires substantial infrastructure and software investment.

Horizontal scaling adds immediate costs of re-architecting components, introducing new concepts and adding infrastructure. It also increases the complexity of the software, which is harder to put a number on.

Even horizontal scaling has limitations. You'll eventually identify a key component of the software that constrains the system's performance, and further investment is needed to resolve the problem. The database often emerges as a bottleneck, and advanced database strategies are needed to achieve the required performance levels. Separating read and write operations, adding replication and sharding the database add further complexity.

This gives software multi-tenancy a low early cost with significant future investment requirements.

## Early choices could limit you

Choices you make for multi-tenancy may limit your ability to properly manage per-tenant costs, introduce relevant pricing tiers and limit use for each tenant.

Planning for the long term will lead you to favour infrastructure multi-tenancy, where the software's usage and costs are more easily managed. Attempting to manage software multi-tenancy to the same level as infrastructure multi-tenancy results in high spending on instrumentation and increases code complexity.

You'll still need to build the other technical and business costs into your model to reflect the true cost of running the software for tenants. These costs are more amenable to a per-tenant average.

Read more in my white paper, [a modern view of multi-tenancy](https://octopus.com/whitepapers/modern-view-of-multi-tenancy), which you can download free thanks to [Octopus](https://octopus.com/).

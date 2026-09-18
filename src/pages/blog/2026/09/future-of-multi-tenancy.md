---
title: The past, present and future of multi-tenancy
subtitle: "Stronger data isolation without the drawbacks of earlier forms of dedicated infrastructure"
pubDate: 2026-09-18
description: We can have stronger data isolation without the drawbacks of earlier forms of dedicated infrastructure.
keywords: "multi-tenancy,saas,cloud"
navMenu: false
bannerImage:
  src: /img/topic/architecture/london-night-water.jpg
  alt: A view across the Thames in London near Westminster Bridge. Lights from the city across the water are reflected in long coloured lines in the dark water.
authors:
  - steve-fenton
categories:
  - Opinion
tags:
  - Culture
meta:
    - name: canonical
      content: https://thenewstack.io/the-past-present-and-future-of-multitenancy/
---

Multi-tenanted software arrived alongside agile software development, Software as a Service (SaaS) and cloud computing. To understand modern multi-tenancy, we must look at how existing practices shaped early multi-tenancy and dig into the technological advancements that mean we must revise how we approach it.

Let's look at how software was built around the turn of the century. You'd likely create a gold copy of your application once or twice a year. This would be burned onto CD-ROMs that systems administrators and end users would use to install the software.

For line-of-business applications, you'd use a network location instead of a disc and a checklist instead of an installation wizard.

Instead of self-hosting your purchased software, you could pay an application-service provider to manage it. The provider would manage the infrastructure and installations for you. This led to the idea of the software vendor offering a managed instance on your behalf, which we now call SaaS.

## SaaS and multi-tenancy

Once the same organization builds and operates the software, it inevitably found that it could reduce infrastructure and license costs by sharing the software between many customers.3

A customer self-hosting an application could use virtualization to reduce the operational cost of the software, but a SaaS provider could reduce costs even further by sharing application instances between many customers.

The three hosting models are shown below, along with the non-shared costs that can be attributed to a single tenant.

### Dedicated infrastructure

- Nothing is shared
- Non-shared costs: Power, racks, networking, servers, operating systems, application licenses

### Virtual machines

- Servers are shared
- Non-shared costs: Operating systems, application licenses

### Multi-tenanted software

- Application instance shared
- Non-shared costs: Application licenses

This comparison to dedicated instances understandably influenced early multi-tenancy. Designs for multi-tenancy would attempt to replicate the boundary created by client-specific software installations by enforcing a perimeter around the users and data for each tenant. The concerns held by security-conscious organizations would have reinforced this design.

While it was easy to predict the infrastructure costs and savings, the total cost of multi-tenanted software also included intangible costs for operational complexity and code complexity.

The configuration must become more dynamic to support multiple tenants on a single application instance, and the information boundary must be carefully managed. This can result in an increased cost for new features.

Operationally, while there are fewer instances to manage, the instance must meet new scaling demands. A new class of problems emerged when tenant-specific data needed to be managed within a shared database.

The cost-benefit analysis for multi-tenanted software would have placed more weight on the tangible costs. For example, counting the number of servers and operating system licenses is a simple task compared to predicting the future costs associated with the additional code complexity.

## Technical advancements

Since the emergence of multi-tenanted software, several technical advancements have been made that directly affect it, namely containers, deployment automation and infrastructure automation.

Virtualization has been transformed with the arrival of containers, which provide isolation without the weight and cost of multiple operating systems. Deployment automation eliminates the costs of manually installing software and upgrades, which makes deploying a thousand instances as easy as deploying one. Infrastructure automation does the same for provisioning dedicated cloud infrastructure or containers for each tenant.

Combining these developments with the experience gained from two decades of multi-tenanted software architecture requires a new approach. The economics have changed dramatically.

## The future of multi-tenancy

The old dichotomy was multi-tenancy versus dedicated physical or virtual infrastructure. This led to a binary choice between single or multi-tenanted software. We must adjust this view by considering multi-tenancy as a whole-system design process.

There are two dimensions to consider in this new approach: layers of sharing and component-level granularity for decisions. Where we used to consider whether an application instance was multi-tenanted, we now look at each layer to decide if it should be shared. We can combine a tenant-specific database with a single application instance or share only the codebase and the CI/CD pipeline with tenant-specific infrastructure provisioned automatically.

Equally, we don't make this decision once for the whole system but per component. This allows us to design a system with tenant-specific instances that call shared multi-tenanted services. This can be particularly powerful if the service is tenant unaware, such as a stateless service or one whose state is not tenant-specific.

By broadening the view of multi-tenancy to apply to software, infrastructure and CI/CD pipelines, it is possible to design systems that take advantage of lightweight tenant-specific applications, isolated by modern virtualization and calling out to scalable shared services. A more thoughtful approach can be taken regarding data that should be protected for a tenant and data that isn't tenant-specific.

This new approach means we can get a better system-level outcome. We can have stronger data isolation without the drawbacks of earlier forms of dedicated infrastructure.

## Summing it up

While early multi-tenancy was defined by sharing an instance of the application and database, technological advancements require a broader perspective and a more granular decision-making approach. The only way to find the right balance between the trade-offs is to consider the widest range of options available.

You should no longer view a tenant as an analog for dedicated isolated instances of users and data. A tenant is a view of data that must be protected. It's common for sets of data to be stored outside the boundary of a tenant and for users to have access to multiple tenants.

Aside from the technology changes, businesses are more security-conscious than ever, as shown by the increase in ISO 27001 certifications since 2005.

Component-level decisions about the layers of sharing define modern multi-tenancy.

I also wrote the white paper, [a modern view of multi-tenancy](https://octopus.com/whitepapers/modern-view-of-multi-tenancy), which you can download free thanks to [Octopus](https://octopus.com/).

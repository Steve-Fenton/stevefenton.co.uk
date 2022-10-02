---
layout: src/layouts/Default.astro
navMenu: false
title: 'The Microservices vs Conway Test'
pubDate: 2019-10-26T17:00:54+01:00
author:
    - steve-fenton
image: /wp-content/uploads/2019/10/complexity.jpg
categories:
    - Programming
tags:
    - architecture
    - complexity
    - conway
---

Following on from my article on [Mescoservices](https://www.stevefenton.co.uk/2015/05/Mescoservice-Architecture/) back in 2015, this article expands on an idea I had last month on how monoliths, mescoservices, and microservices fit into organisation design. The microservices vs Conway test encodes a common piece of advice into a first-draft formula for testing your architecture against your organisation.

### Microservice advice

Microservices offer several benefits, and also some cost. In return for increased complexity, you get to mix different technology and scale up the number of autonomous teams working across the platform. A simple way to look at this is to imagine a successful team working on a monolith who need to either broaden the scope of their application or divide the work between themselves and another team. If they can find a seam that allows them to divide the monolith, each team can work autonomously on each of the two new parts that have been created.

Not only does each team get to work *how* they want, using *whatever* tech stack they choose; they also get to work at their own pace without tripping over or impacting the other team. All they need is a strong contract that makes any dependency explicit, for example if Team A needs to use the service used by Team B.

This is just one example of the *Inverse Conway Manoeuvre*. Whereas Conway’s Law states that any application’s architecture will end up looking a lot like the organisation’s communication structure, the Inverse Conway Manoeuvre utilises organisation design to take advantage of Conway’s Law. Putting it bluntly, you fix the communication structure of the organisation to ensure that when Conway’s Law strikes, it results in the software architecture you intended.

So, it’s pretty common for people to give advice that includes organisation design, and warnings about the complexity trade-off when microservices crop up.

### Microservices vs Conway Test

If we use the letter *m* to represent the number *active* microservices you have, and *t* to represent the number of teams you have, we can use the following test to determine how well your architecture fits into our organisation by testing the resulting complexity, which we’ll call *c*.

<math><mi>c</mi><mo>=</mo> (<mi>m</mi><mo>–</mo><mi>t</mi>)<msup><mn>²</mn></msup>  
</math>(This doesn’t just apply to microservices, but to service-oriented architectures or other component-based designs.)

If things go well, complexity will scale near-linearly. When this is the case, the calculated complexity will be zero. If you have too many active services compared to teams, or too many teams compared to active services, current wisdom says that things will be more complex than they need to be. Negative numbers indicate the complexity of multiple teams tripping over each other as part of the deployment pipeline, for example multiple teams attempting to service a monolith. Positive numbers represent complexity that is being introduced without benefit.

For example, one team on a monolith will score zero. Three teams working on three active services will score zero. This doesn’t mean zero-complexity; it means the complexity and benefit balance each other. So, zero really means you’ve hit the optimal balance.

To look at some negative cases, four teams working on a monolith will score 9, as will one team working on four active services.

The relationships can be described with the following examples.

The relationship for a single team is shown below. Complexity increases as more active services are managed by a single team. The more you hope to escape Conway’s Law, the more the complexity hurts.

![Complexity increases as more services are added to a single team](https://www.stevefenton.co.uk/wp-content/uploads/2019/10/complexity-for-single-team.jpg)

The relationship for a larger number of teams is illustrated below. Where we have five teams, we can survive give-or-take two either way. But if there are too-few services, or too-many services we increase the otherwise manageable complexity.

![For five teams, complexity increases beyond a manageable level when there are too many, or too few services.](https://www.stevefenton.co.uk/wp-content/uploads/2019/10/complexity-for-five-teams.jpg)

The complexity curve follows the assertion that the further you deviate from the team-per-service organisation design, the more complex things will become; no matter whether it is too many teams for the number of services, or vice versa.

![Complexity is symmetrical based on deviation from balanced team and service numbers.](https://www.stevefenton.co.uk/wp-content/uploads/2019/10/complexity-curve.jpg)

Comparing these figures to real-world examples, I would propose that single-digit complexity is likely to be necessary.

### Why does this work in both directions?

It is reasonable to look at this test and think… “I understand that having more teams than services will have people tripping over each other, but why does it matter that you have more services than teams?”

The answer is that there is some basic level of maintenance required for every service you operate. Dependencies need to be updated to keep the services secure. Language and tooling versions need to be updated to remain within long-term support. A whole bunch of little things need to be taken care of to keep each service in good shape.

You might be able to move the needle on these issues with some vigorous automation, some kind of robot that updated package versions where there is a security advisory or that updates your language version. However, the question really is about what benefit you are getting from the extra services. The primary benefit of services is to enable loosely coupled human groups by having loosely coupled software architectures… so once you achieve this, are you in fact now optimizing for some future bigger organization that doesn’t yet exist?

You *can* have more services than teams, just like you *can* have fewer. The core point is that there is a complexity trade off in both directions. Too many teams working on the same code introduces undesirable dependencies and communication overheads and too few teams means the technical complexity increases without the benefits associated with solving the original complexity of human interactions.

If you have more services than teams, you need to be using some other complexity limiting techniques to ensure they don’t drown in service maintenance and administration.

### Other complexity limiting techniques

I’ll add more examples as they emerge, but Monzo (who have more microservices than most organisations) undertook an exercise to limit the connections. By making connections explicit, they prevented a situation wherein any service could talk to any other. This massively reduces the total complexity. For example, if you have 100 services all able to talk to the others, you have the classic `(n x (n – 1)) ÷ 2` problem (4,950), but if you review and limit connections to a maximum of five dependencies, you limit the connections to just 500. If you review and limit connections, you can understand how much complexity a team has based on the exact number of connections a team must manage.

Another technique is to assess fixed contracts vs fluid contracts. If you have a service whose public interface is fixed, it is a dormant dependency that adds little complexity compared to a fluid contract that may require consumers to respond to changes.

### Summary

![Complexity: Microservices vs Conway Test](https://www.stevefenton.co.uk/wp-content/uploads/2019/10/complexity.jpg)

Having been careful to consider Conway’s law, I have avoided designing teams and architecture in isolation of each other. I believe this is the only way to ensure the design of both is successful. If you don’t balance the design on both sides (the technology on one side and the people on the other), the complexity is damaging to both.
---
layout: src/layouts/Default.astro
title: 'Surgical team vs foreman metaphors'
navMenu: false
pubDate: 2014-02-26T22:41:50+00:00
authors:
    - steve-fenton
categories:
    - Process
---

Robert Martin posted yet another thought-provoking article titled [where is the Foreman?](http://blog.8thlight.com/uncle-bob/2014/02/21/WhereIsTheForeman.html). It swam around in my head at the weekend and I thought is was worth thinking about the differences between the Foreman Metaphor and the Surgical Team metaphor.

## The Surgical Team

:img{src="/img/2015/07/surgical-team.png" alt="Surgical Team" loading="lazy"}

The Surgical Team was described in some detail in Fred Brooks’ classic book The Mythical Man Month.- although Brooks credits the idea to Harlan Mills. Starting on page 27, the description of the surgical team describes a team centred on a surgeon. The surgeon (AKA the *chief programmer*) makes all of the decisions and all of the cuts. He is assisted by a team that includes a co-pilot who is an aspiring surgeon (and replacement in the event of an incident involving a bus) and various helpers who deal with things for the surgeon to allow him to spend more time cutting things. This is shown in the organisation chart above.

## The Foreman

:img{src="/img/2015/07/foreman.png" alt="Foreman" loading="lazy"}

The Foreman seems subtly different to this model. The foreman is still the *chief programmer*, but instead of performing all of the tasks with support from a team of helpers the foreman performs a checking role enabling many other people to do the work and ensuring that it is done correctly. This is illustrated in the diagram above. In Robert Martin’s words:

> What would the foreman do on software project? He’d do the same thing he does on a construction project. He’d make sure everything was done, done right, and done on time. He’d be the only one with commit rights. Everybody else would send him pull requests. He’d review each request in turn and reject those that didn’t have sufficient test coverage, or that had dirty code, or bad variable names, or functions that were too long. He’d reject those that, in his opinion, did not meet the level of quality he demands for the project.

The Foreman ensures that a consistent quality threshold is met, which means the team can maintain their pace, because they are not being mired in a tar pit of legacy code.

Perhaps the difference between The Surgical Team and The Foreman are not as subtle as they initially seemed.
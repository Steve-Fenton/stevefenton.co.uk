---
layout: src/layouts/Default.astro
navMenu: false
title: 'Surgical team vs foreman metaphors'
pubDate: 2014-02-26T22:41:50+00:00
author:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=386'
interface_sidebarlayout:
    - default
medium_post:
    - 'O:11:"Medium_Post":11:{s:16:"author_image_url";s:75:"https://cdn-images-1.medium.com/fit/c/400/400/1*eXkhfEuF41g5W_xnc_ydLA.jpeg";s:10:"author_url";s:38:"https://medium.com/@steve.fenton.co.uk";s:11:"byline_name";N;s:12:"byline_email";N;s:10:"cross_link";s:3:"yes";s:2:"id";s:12:"101c100cb804";s:21:"follower_notification";s:3:"yes";s:7:"license";s:19:"all-rights-reserved";s:14:"publication_id";s:2:"-1";s:6:"status";s:5:"draft";s:3:"url";s:51:"https://medium.com/@steve.fenton.co.uk/101c100cb804";}'
categories:
    - Process
---

Uncle Bob posted yet another thought-provoking article titled [Where is the Foreman?](http://blog.8thlight.com/uncle-bob/2014/02/21/WhereIsTheForeman.html) It swam around in my head at the weekend and I thought is was worth thinking about the differences between the Foreman Metaphor and the Surgical Team metaphor.

### The Surgical Team

![Surgical Team](/img/2015/07/surgical-team.png)

The Surgical Team was described in some detail in Fred Brooks’ classic book The Mythical Man Month.- although Brooks credits the idea to Harlan Mills. Starting on page 27, the description of the surgical team describes a team centred on a surgeon. The surgeon (AKA the *chief programmer*) makes all of the decisions and all of the cuts. He is assisted by a team that includes a co-pilot who is an aspiring surgeon (and replacement in the event of an incident involving a bus) and various helpers who deal with things for the surgeon to allow him to spend more time cutting things. This is shown in the organisation chart above.

### The Foreman

![Foreman](/img/2015/07/foreman.png)

The Foreman seems subtly different to this model. The foreman is still the *chief programmer*, but instead of performing all of the tasks with support from a team of helpers the foreman performs a checking role enabling many other people to do the work and ensuring that it is done correctly. This is illustrated in the diagram above. In Uncle Bob’s words:

> What would the foreman do on software project? He’d do the same thing he does on a construction project. He’d make sure everything was done, done right, and done on time. He’d be the only one with commit rights. Everybody else would send him pull requests. He’d review each request in turn and reject those that didn’t have sufficient test coverage, or that had dirty code, or bad variable names, or functions that were too long. He’d reject those that, in his opinion, did not meet the level of quality he demands for the project.

The Foreman ensures that a consistent quality threshold is met, which means the team can maintain their pace, because they are not being mired in a tar pit of legacy code.

Perhaps the difference between The Surgical Team and The Foreman are not as subtle as they initially seemed.
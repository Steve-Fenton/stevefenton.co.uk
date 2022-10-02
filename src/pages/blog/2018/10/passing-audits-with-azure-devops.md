---
id: 4024
layout: src/layouts/Default.astro
title: 'Passing audits with Azure DevOps'
pubDate: 2018-10-07T08:00:37+01:00
author:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=4024'
permalink: /2018/10/passing-audits-with-azure-devops/
medium_post:
    - 'O:11:"Medium_Post":11:{s:16:"author_image_url";s:75:"https://cdn-images-1.medium.com/fit/c/400/400/1*eXkhfEuF41g5W_xnc_ydLA.jpeg";s:10:"author_url";s:38:"https://medium.com/@steve.fenton.co.uk";s:11:"byline_name";N;s:12:"byline_email";N;s:10:"cross_link";s:3:"yes";s:2:"id";s:12:"8c417301ea4c";s:21:"follower_notification";s:3:"yes";s:7:"license";s:19:"all-rights-reserved";s:14:"publication_id";s:2:"-1";s:6:"status";s:5:"draft";s:3:"url";s:51:"https://medium.com/@steve.fenton.co.uk/8c417301ea4c";}'
categories:
    - Process
tags:
    - audits
    - 'azure devops'
---

Azure DevOps (previous Visual Studio Team Services, Visual Studio Online, and Team Foundation Server) has many great features. We talk about the features all the time; source control, continuous integration, release management, task boards, reports! One of my favourite features is how it helps us to pass audits.

There are two ways to pass an audit. One is to spend half your work day collecting together the items you need to evidence that you are following a robust process. The other way is to use Azure DevOps well. The second option adds practically zero overhead to your day job, which means we can all go home on time.

Here’s a quick bit of guidance to help you pass the audit!

### Link all the Things

Seriously… put the card at the centre of your universe and make sure everything to do with that card is linked to it. If you’re not doing this, you’re missing out. Let’s look at this from the point of view of an actual audit.

Open up the latest release to your production environment. The history tab shows who approved that release into production. Tick. The commits tab shows the exact changes that were included in the release. Tick. The work items tab shows why those changes were made… and each work item shows that there was an appropriate segregation of duties along the way. Tick. Test cases are visible either as linked test cases, or in the commit tab if they are automated. Tick. You can show that the test cases passed. Tick. The code was peer reviewed. Tick.

Basically, by following the simple process of attaching all the related things to the card, you can prove that you are following a robust, secure development process – as long as you *are* following a robust, secure development process.

### Automation

If you have specific needs as part of what you are audited for, try to find a way of getting them into Azure DevOps. It already does a whole bunch of build, test, and release automation; so it can probably run the thing you need to show during an audit. Need to demonstrate some kind of security test is being run regularly? Why not run it as part of every release? If you can kick off the command, or write a test that calls out to *the thing* then it will also end up attached to the card, the build, or the release… which means you can prove you are doing what you said you’d do. It also means you won’t forget to do it manually once a year. It also means you’ll discover a problem sooner.

### Documentation

Depending on what you are being audited for, there may also be a requirement to show meta-documentation that describes the process. All you need to do here is document how Azure DevOps works as your control centre and explain how all the things are linked. It should be two sides of A4 and cover the lot. This isn’t too much for a new starter to digest.
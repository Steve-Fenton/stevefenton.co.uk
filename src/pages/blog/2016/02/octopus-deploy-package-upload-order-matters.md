---
layout: src/layouts/Default.astro
navMenu: false
title: 'Octopus Deploy package upload order matters'
pubDate: 2016-02-03T06:00:24+00:00
authors:
    - steve-fenton
categories:
    - Automation
tags:
    - Octopus
---

If you have a deployment in Octopus Deploy that contains multiple packages, and the deployment occurs automatically when one of those packages is updated; then the order you upload the packages matters.

For example, if you have packages A, B, and C – and you upload them in that order:

If you trigger based on package A, you will get the LATEST version of package A but the PREVIOUS version of package B and package C. This occurs because the trigger fires as soon as package A is uploaded, and the build begins before package B and C arrive. The times involved are marginal, but they make a big difference, especially if the three packages are interdependent.

Here is a quick timeline for this problem:

1. Package A v2.0 Uploaded
2. Release triggered (A v2.0, B v1.0, C v1.0)
3. Package B v2.0 Uploaded
4. Package C v2.0 Uploaded

So you should guarantee to upload these packages in the same order (easily done via your build system), and then use the last one as the trigger for the new release.

1. Package A v2.0 Uploaded
2. Package B v2.0 Uploaded
3. Package C v2.0 Uploaded
4. Release triggered (A v2.0, B v2.0, C v2.0)

### Alternative solutions

The obvious alternative is to look at your unit of deployment. Perhaps these three packages should actually be three deployments? Or maybe they should be one package.
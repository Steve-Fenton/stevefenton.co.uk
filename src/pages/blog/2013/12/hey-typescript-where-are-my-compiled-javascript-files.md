---
title: 'Hey TypeScript! Where are my compiled JavaScript files'
navMenu: false
pubDate: 2013-12-07T09:48:18+00:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - TypeScript
---

If you just upgraded to TypeScript 0.9.5 (if you haven’t done so, do it now!) you will notice that your TypeScript files no longer have all the JavaScript files and source maps nested underneath. So what happened to them?

The answer is quite straightforward – you don’t want them in your project.

If you are running continuous builds on a build server, some implementations baulk at over-writing files that are under source control. This is one reason why you don’t check in your binaries. Essentially, the JavaScript files and source maps that TypeScript spits out from your TypeScript program are just like binaries from your C# (or similar) program.

Another problem that is solved that you may notice is that your source control system would have kept picking up the various output files as changes – even if you hadn’t edited your TypeScript files – so you would be constantly fiddling about with those files without good cause.

So by not including these files in your project, your build server can create them without problems and you won’t need to continually check in files that you didn’t think you had changed.
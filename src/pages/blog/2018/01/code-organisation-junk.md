---
id: 3262
layout: src/layouts/Default.astro
title: 'Code organisation and junk'
pubDate: 2018-01-05T06:00:45+00:00
author:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=3262'
permalink: /2018/01/code-organisation-junk/
categories:
    - Programming
tags:
    - 'c#'
    - java
    - typescript
---

Code organisation feels like hard work at times; but there are some mental tricks you can apply to help break the inertia. This article contains a couple of ideas that will help you get moving when you don’t know where to start. I’m not going to go through the steps you need to take to refactor your code, I’m only going to share some tricks I use to decide what needs to move.

I’m going to try and be language agnostic, because I find these techniques apply widely. I might use words like *class* or *module*, but the ideas seem to apply to “code that is in the same place, that shouldn’t be”. You can think in terms of classes, or modules, or files, or you can mix and match.

### Too big

The essential problem is that we sometimes group code into units that are too big. If you think procedurally, it can happen on day one, but even if you have a more object-oriented approach the problem can sneak up on you over time. So, the starting point of the problem is a chunk of code that is massive, and that has no obvious starting point for breaking it up.

You can usually detect this problem when you open up a code file to find something, and have to sift through a lot of other stuff to find it. A bit like finding your screwdriver in your junk drawer:

![Junk Drawer](https://www.stevefenton.co.uk/wp-content/uploads/2018/01/junk-drawer.jpg)  
Junk Drawer, by [Liz West, Flickr](https://www.flickr.com/photos/calliope/)

### Using junk / importing junk

One of the easiest ways to find a seam in your code is to look at your imports, whether it is a `using` statement in your C# file, or `import` statements in your TypeScript code.

```
<pre class="prettyprint lang-csharp">
using YourApplication.DataAdapters;
using Microsoft.Azure.WebJobs;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using Microsoft.WindowsAzure.Storage.Queue;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Web;
```

In the above example, we could group these dependencies quite quickly and easily:

```
<pre class="prettyprint lang-csharp">
// Group 1: Your own code...
using YourApplication.DataAdapters;

// Group 2: We seem to interact with Web Jobs
using Microsoft.Azure.WebJobs;

// Group 3: We also use Azure Storage
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using Microsoft.WindowsAzure.Storage.Queue;

// Group 4: We're using a database
using System.Data.SqlClient;

// Group 5: Are we using the file system?
using System.IO;

// Group 6: We are using HTTP
using System.Net.Http;

// Group 8: We are using config
using System.Configuration;

// Group 7: Pretty basic stuff you use everywhere
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
```

Group 1 and Group 7 are probably natural dependencies that belong here… but every other grouping is an opportunity to break up this class. For example, it is a very common practice to distance yourself from things like persistence, which means Azure Storage dependencies, HTTP dependencies, Database dependencies, and file system dependencies can all be replaced with something less concrete.

To demonstrate that you can’t just make a rule up about this stuff, let’s quickly look at the `System.IO` dependency. It turns out that we are using `Path.Combine`, but there is no file system interaction. Perhaps we could leave that one in here for now as there are bigger fish to fry.

### Small steps

The goal is to improve the code organisation by moving some code out of the class, using the dependency list to both guide us and to measure our progress (don’t use this as the only measure of progress). You could shift the dependency with the most lines of code (i.e. go for the biggest impact), but you might find it more productive to pick a smaller one first to build some momentum.

As I mentioned before, the process of refactoring and the importance of tests isn’t covered here… but should still be considered.

This is also just one way that you can clean up your code and achieve better code organisation. Your expert judgement is still one of the best tools for this job, so if you have tidied up your imports, you can look through your new smaller code file and use techniques like *extract ’til you drop*, or judge how related/cohesive the remaining code is.
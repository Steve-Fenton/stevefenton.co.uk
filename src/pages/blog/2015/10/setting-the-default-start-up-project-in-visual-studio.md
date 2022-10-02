---
id: 1496
title: 'Setting the default start-up project in Visual Studio'
pubDate: '2015-10-28T08:12:59+00:00'
author: 'Steve Fenton'
layout: post
guid: 'https://www.stevefenton.co.uk/?p=1496'
permalink: /2015/10/setting-the-default-start-up-project-in-visual-studio/
categories:
    - 'Visual Studio'
---

If your Visual Studio solution keeps forgetting your start-up project, or you want to set a sensible default for your whole team, there is a clever trick you can use to remove dependence on your .suo file.

In case you didn’t know, when you select “Set as Start-Up Project”, your selection is jammed into a file normally found in a special `.vs` folder in your solution directory. Unlike every other file you’ll find lying around (like solution files and project files) this file isn’t much use if you open it inside a text editor. So if it is playing up, you can’t do much about it.

So Step 1 is “delete the .suo file” found here: <solution directory="">/.vs/<solution name="">/v<n>/.suo (in older versions of visual studio, it is right next to the solution file rather than in this special folder).</n></solution></solution>

Step 2 is to open up your solution file in a text editor.

```
<pre class="prettyprint lang-xml">...
...
Project("{GUID}") = "ProjectNameA", "ProjectNameA\ProjectNameA.csproj", "{ANOTHER-GUID}"
EndProject
Project("{GUID}") = "ProjectNameB", "ProjectNameB\ProjectNameB.csproj", "{ANOTHER-GUID}"
EndProject
Project("{GUID}") = "ProjectNameC", "ProjectNameC\ProjectNameC.csproj", "{ANOTHER-GUID}"
EndProject
...
...
```

You’ll see lots of information in here, but you are specifically interested in these projects.

Let’s assume that ProjectNameB is actually our UI and everything else is a class library. This is a safe bet to use as a whole team default start-up project. All we need to do is move it up the list so it appears first in the solution file… like this:

```
<pre class="prettyprint lang-xml">...
...
Project("{GUID}") = "ProjectNameB", "ProjectNameB\ProjectNameB.csproj", "{ANOTHER-GUID}"
EndProject
Project("{GUID}") = "ProjectNameA", "ProjectNameA\ProjectNameA.csproj", "{ANOTHER-GUID}"
EndProject
Project("{GUID}") = "ProjectNameC", "ProjectNameC\ProjectNameC.csproj", "{ANOTHER-GUID}"
EndProject
...
...
```

Unless your .suo file says differently (but remember, we deleted that in Step 1) ProjectNameB is now the default start-up project. This doesn’t affect how anything is displayed in the solution.
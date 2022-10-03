---
layout: src/layouts/Default.astro
navMenu: false
title: 'Exclude files from the Visual Studio Code file explorer'
pubDate: 2018-02-27T08:50:12+00:00
authors:
    - steve-fenton
categories:
    - Programming
    - 'Visual Studio'
tags:
    - TypeScript
    - VSCode
---

This is a quick note with an updated version on how to exclude files from the Visual Studio Code file explorer. I originally wrote about this in 2015 before the UI was as polished as it is now. I have also found I get asked about this a great deal due to conflicting information I have encountered on this subject (mostly related to the format for matching files by file extension).

### Workspace settings

The most appropriate place for the list of exclusions is in the Workspace Settings. The most appropriate way to add this file is to navigate to `File -> Preferences -> Settings` and select the all-caps “Workspace Settings” tab.

![VSCode Workspace Settings](/img/2018/02/vscode-settings.png)

Within this file, you can add a `files.exclude` setting, as shown below.

```
<pre class="prettyprint lang-json">
{
    "files.exclude": {
        "**/*.git": true,
        "**/*.js": true,
        "**/*.d.ts": true
    }
}
```
All of these exclusions are done by file extension, which is the most common way to do this, especially if you are a TypeScript programmer. You’ll want to see your TypeScript files listed, but you are totally too faded to deal with all the noise of the JavaScript files, and type definitions.

Save these settings to hide the files in the file explorer, which will now be free from the files you wanted to exclude.
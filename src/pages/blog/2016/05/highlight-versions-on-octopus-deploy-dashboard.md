---
layout: src/layouts/Default.astro
navMenu: false
title: 'Highlight versions on the Octopus Deploy dashboard'
pubDate: 2016-05-18T18:03:44+01:00
author:
    - steve-fenton
image: /wp-content/uploads/2016/05/octodash-pastel-1200x438.jpg
categories:
    - Automation
    - Programming
tags:
    - javascript
    - octopus
---

Some time ago, I wrote a JavaScript bookmarklet that you could use to highlight version numbers in your Octopus Deploy dashboard. This makes it easier to compare versions across your environments.

[![Octodash Output](https://www.stevefenton.co.uk/wp-content/uploads/2016/05/octodash-pastel-1024x374.jpg)](https://www.stevefenton.co.uk/2016/05/highlight-versions-on-octopus-deploy-dashboard/octodash-pastel/)

The code for the bookmarklet is below, but I am currently awaiting approval for a simple Google Chrome extension for this script, which adds a button to your browser that you can use to highlight the versions. I will link to the extension so you can install it in Chrome or Edge as soon as it is available.

### Chrome and Edge extensions

The [source code for the Chrome extension is available on GitHub](https://github.com/Steve-Fenton/octodash).

You can install it from the [Octodash Chrome Extension page](https://chrome.google.com/webstore/detail/octodash/fibfpjkgbnjceeblhkbmabfhebmdogcl).

Or, you can install it from the [Octodash Edge Extension page](https://microsoftedge.microsoft.com/addons/search/octodash).

[![Octodash Listing](https://www.stevefenton.co.uk/wp-content/uploads/2016/05/octodash-1024x238.png)](https://www.stevefenton.co.uk/2016/05/highlight-versions-on-octopus-deploy-dashboard/octodash/)

You can also find out more about [writing browser extensions](https://www.stevefenton.co.uk/2022/02/how-to-create-a-browser-extension-for-edge-or-chrome/).

### The original script

The original script is below, you can just run it via your browser tools’ console tab. You can change the `colors` array if you want a different colour set.

```
<pre class="prettyprint lang-javascript">
const colouring = function () {
    var colors = ['#fea3aa', '#f8b88b', '#faf884', '#baed91', '#b2cefe', '#f2a2e8'];
    var nextColorIndex = 0;
    var versions = [];

    var elems = document.querySelectorAll('[class^=style_version__');
    console.log(`Found ${elems.length} items`);

    for (var i = 0; i < elems.length; i++) {
        var version = elems[i].innerHTML;
        var color = null;
        for (var j = 0; j < versions.length; j++) {
            if (versions[j].version == version) {
                color = versions[j].color;
                break;
            }
        }
        
        if (!color) {
            color =  colors[nextColorIndex];
            versions.push({
                version: version,
                color: color
            });
            
            nextColorIndex++;
            if (nextColorIndex >= colors.length) {
                nextColorIndex = 0;
            }
        }

        elems[i].parentElement.parentElement.parentElement.style.backgroundColor = color;
    }
};

colouring();

window.octodashInterval = window.octodashInterval || null;
window.clearInterval(window.octodashInterval);
window.octodashInterval= window.setInterval(colouring, 10000);
```
This script has been updated for the latest version of Octopus (July 2020).

You can test the scriptlet on the [Octopus Demo](https://demo.octopusdeploy.com/app#/).
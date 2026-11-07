---
title: 'Highlight versions on the Octopus Deploy dashboard'
navMenu: false
pubDate: 2016-05-18T18:03:44+01:00
modDate: 2026-11-07
authors:
    - steve-fenton
bannerImage:
    src: /img/2026/octodash-after.png
    alt: Octodash highlights versions in the Octopus dashboard
categories:
    - Automation
    - Programming
tags:
    - JavaScript
    - 'Octopus Deploy'
---

Some time ago, I wrote a JavaScript bookmarklet that you could use to highlight version numbers in your Octopus Deploy dashboard. This makes it easier to compare versions across your environments.

:::figure
:img{src="/img/2026/octodash-after.png" alt="Octodash highlights versions in the Octopus dashboard"}
:::

The code for the bookmarklet is below, but if you use it frequently there's a browser extension that works with Chromium based browsers like Vivaldi, Chrome, and Edge. The extension adds a button to your browser that will trigger version highlighting.

## Chromium browser extensions (Vivaldi, Chrome, Edge, et al)

The [source code for the Chrome extension is available on GitHub](https://github.com/Steve-Fenton/octodash).

You can install it from the [Octodash Chrome Extension page](https://chrome.google.com/webstore/detail/octodash/fibfpjkgbnjceeblhkbmabfhebmdogcl).

Or, you can install it from the [Octodash Edge Extension page](https://microsoftedge.microsoft.com/addons/search/octodash).

:::figure
:img{src="/img/2016/05/octodash.png" alt="Octodash Listing" loading="lazy"}
:::

You can also find out more about [writing browser extensions](/blog/2022/02/how-to-create-a-browser-extension-for-edge-or-chrome/) if you want to understand how it's built.

## The original script

The original script is below, you can just run it via your browser tools' console tab. You can change the `colors` array if you want a different colour set.

```javascript
const colouring = function () {
    const colors = ['#fea3aa', '#f8b88b', '#faf884', '#baed91', '#b2cefe', '#f2a2e8'];
    const textColors = ['#5a1018', '#5c2406', '#473d00', '#144d18', '#0f2b66', '#52144b'];
    let nextColorIndex = 0;
    const versions = [];

    // Octopus v2026.4.10172
    const deployments = document.querySelectorAll('table > tbody > tr > td > div > a > div > div > span');
    console.log(`Octodash found ${deployments.length} items`);

    for (var i = 0; i < deployments.length; i++) {
        const version = deployments[i].innerHTML;
        let color = null;
        let textColor = null;

        for (let j = 0; j < versions.length; j++) {
            if (versions[j].version == version) {
                color = versions[j].color;
                textColor = versions[j].textColor;
                break;
            }
        }

        if (!color) {
            color = colors[nextColorIndex];
            textColor = textColors[nextColorIndex];
            versions.push({
                version: version,
                color: color,
                textColor: textColor
            });

            nextColorIndex++;
            if (nextColorIndex >= colors.length) {
                nextColorIndex = 0;
            }
        }

        const container = deployments[i].parentElement.parentElement.parentElement;
        container.style.backgroundColor = color;
        container.style.color = textColor;

        const descendants = container.querySelectorAll('*');
        for (var k = 0; k < descendants.length; k++) {
            descendants[k].style.color = textColor;
        }
    }
};

colouring();
```

This script has been updated for the latest version of Octopus (v2026.4).

You can test the scriptlet on the [Octopus Demo](https://demo.octopusdeploy.com/app#/).

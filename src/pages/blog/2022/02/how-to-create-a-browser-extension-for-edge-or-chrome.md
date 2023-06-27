---
title: How to create a browser extension for Edge or Chrome
navMenu: false
pubDate: 2022-02-08
modDate: 2022-10-15
keywords: browser extension,edge,chrome
description: Find out how to create a browser extension that can be installed on Edge or Chrome.
authors:
    - steve-fenton
categories:
    - Browsers
    - Programming
tags:
    - Extensions
---

Once upon a time, we used to write *scriptlets*, or *bookmarklets*, that would run a little utlity script on a page. That’s all old-school now, and the new way to do many different kinds of *thing* is to write a browser extension.

I’ve never done this before, so I spent five dollars to create a developer account and converted my [Octodash bookmarklet](/blog/2016/05/highlight-versions-on-octopus-deploy-dashboard/) into a proper browser extension.

You'll find out the implementation details for browser extensions as well as how to publish them in the official stores.

You can [download a sample zip file and make your own extension with it here](/img/2022/02/example.zip). The instructions for how it works are below.

## Anatomy of an extension

There isn’t too much to do to create a browser extension. The format for extensions is the same for both Chrome and Edge. Google and Microsoft operate separate extension marketplaces. Edge can install from both of these marketplaces.

Extensions ought to be given as few permissions as possible. You shouldn't request permissions unless you absolutely need them, and you may be rejected from a marketplace if you ask for more permissions than you need.

The example extension will be "click to run", so it won't access a web page until the user interacts with it. This is a great way to illustrate the concepts. Later, when you want to add a pop-over, you'll need an additional HTML file.

Here are the contents of your minimal extension.

- A `manifest.json` file
- An icon file (at least one 128px icon)
- A JavaScript file to be run

## Manifest

The current version for manifest files is `v3`. Manifest files contain the wiring to describe the extension, the files to run it, and the required permissions.

```javascript
{
    "name": "Example Extension", 
    "version": "0.0.1.0",
    "description": "A sample extension.",
    "action": {},
    "manifest_version": 3,
    "icons": {
        "128": "icon-128.png"
    },
	"background": {
        "service_worker": "worker.js"
    },
    "permissions": [
        "activeTab",
        "scripting"
     ]
}
```

The manifest points to the other two files, `icon-128.png` and `worker.js`.

## Worker

A worker is just a JavaScript file that contains the code for your extension. You'll need a function that does the work and an event listener that calls the function at the appropriate time. The example just logs `Hello World` to the console.

```javascript
function example() {
    console.log('Hello World');
}

chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: example
    });
});
```

Your `example` function could do much more, like look into the DOM or make requests to an API. This example shows how little code is needed to connect your code to the browser.

## Testing

To test your extension, open up the extensions manager in [Chrome](chrome://extensions) or [Edge](edge://extensions/) and enable developer mode.

You should now see an option called “Load unpacked”, which allows you to select the local folder with your extension files. Once you choose the directory, it will load your code as an extension, and you can make sure it works.

If there are any errors, they will be logged in extension manager, so you can review and fix them.

## Packaging

Packaging is pretty simple. Just add all the files to a ZIP archive.

## Publishing

You will need to [register as a developer](https://developer.chrome.com/docs/webstore/register/) for the Chrome Web Store.

Once registered, you can upload your ZIP file and fill in the forms to provide the information Google needs for the listing.

When completed, you can submit your extension for review. If it passes, it will be listed in the store.

You need to [register in the partner centre](https://partner.microsoft.com/) for the Microsft Edge marketplace.

The process for adding the extension is very similar to the Chrome Web Store and has a review stage before the extension is published.

### Publishing tips

You can upload additional images to be used in store listings. Watch out for the different size and format requirements. The forms won’t accept images that don’t match the criteria.

Be super-clear about what the extension is for. This helps people find and use the extension. It is also critical for the review stage too. Keep the review stage in mind when you create your code, as they might need to read and understand your code as part of the checks.

## Summary

Browser extensions are easy to create. They are only slightly more effort than a bookmarklet. Converting bookmarklets into extensions makes them work in modern browsers and gives users more confidence when installing them.

Bookmarklets depend on a click in the favourites bar. Browsers are trying to reduce distracting user interface, so toolbars are often minimised or hidden except when someone opens a new tab. Extensions remain visible even when other toolbars are closed.
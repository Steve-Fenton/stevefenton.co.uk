---
layout: src/layouts/Default.astro
navMenu: false
title: 'How to create a browser extension for Edge or Chrome'
pubDate: 2022-02-08T21:00:44+00:00
author:
    - steve-fenton
categories:
    - Browsers
    - Programming
tags:
    - extensions
---

Once upon a time we used to write *scriptlets*, or *bookmarklets*, that would run a little script on a page. That’s all old-school now and the new way to do many different kinds of *thing* is to write a browser extension. I’ve never done this before, so I spent five dollars to create a developer account and converted my [Octodash bookmarklet](https://www.stevefenton.co.uk/2016/05/highlight-versions-on-octopus-deploy-dashboard/) to be a proper extension (it highlights software version numbers on an Octopus Deploy dashboard).

I’ll share the technical details here as well as some information on how to list it in the official stores.

You can [download a sample zip file and make your own extension with it here](https://www.stevefenton.co.uk/wp-content/uploads/2022/02/example.zip).

### Anatomy of an extension

There isn’t too much to do to create a browser extension and the format is the same for both Chrome Extensions and Edge Extensions (there are separate marketplaces, but Edge does allow installs from the Chrome market as well as the Microsoft one).

The example will be a “click to run” extension, but this illustrates all the basics rather well. If you want to have a pop-over, you’ll need to add an extra HTML file for that.

- A `manifest.json` file
- An icon file (at least one 128px icon)
- A JavaScript file to be run

#### Manifest

The current version for manifest files if v3. They just contain the wiring to describe the extension what the included files are for.

```
<pre class="prettyprint lang-js">
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
The file points to the other two files, `icon-128.png` and `worker.js`.

#### Worker

The worker is just a JavaScript file that contains the code that does something. In the below example the script hooks into the onClicked event, which occurs when the user clicks the extension icon in the browser. It just logs a “Hello World” message, but it could traverse the DOM and do other things.

```
<pre class="prettyprint lang-javascript">
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
### Testing

Open up the extensions manager in [Chrome](chrome://extensions) or [Edge](edge://extensions/) and enable developer mode.

You should now see an option called “Load unpacked” that allows you to select the folder with your extension files. Once you choose the directory, it will load your code as an extension and you can make sure it works.

If there are any errors, they will be captured and stored against the extension in extension manager, so you can review and fix them.

### Packaging

Packaging is pretty simple. You just need to add all the files to a ZIP archive.

### Publishing

For the Chrome Web Store, you will need to [register as a developer](https://developer.chrome.com/docs/webstore/register/).

Once registered, you just need to upload your ZIP file and fill in the forms to provide the information needed for the listing.

When completed, you can submit your extension for a review. If it passes, it gets listed.

For the Microsft Edge marketplace, you will need to [register in the partner center](https://partner.microsoft.com/).

The process for adding the extension is very similar to the Chrome Web Store and has a review stage before the extension will be published.

#### Publishing tips

You can upload additional images to be used in the listings. Watch out for the different size and format requirements as the forms won’t accept images that don’t match the requirements.

Be super-clear about what the extension is for. This helps people find and use the extension, but is also important for the review stage too. You should have the review stage in mind when you create your code as they might need to read and understand the code as part of the review.

### Summary

Browser extensions are quite easy to create. They are only slightly more effort than a bookmarklet. Converting bookmarklets into extensions makes them work in modern browsers, gives users more confidence in installing them, and works in cases such as the common set up of only showing the favourites bar on new tabs.
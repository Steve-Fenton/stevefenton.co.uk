---
id: 787
title: 'Writing a mobile app using HTML5'
pubDate: '2012-06-16T15:57:01+01:00'
author: 'Steve Fenton'
layout: post
guid: 'https://www.stevefenton.co.uk/?p=787'
permalink: /2012/06/writing-a-mobile-app-using-html-5/
interface_sidebarlayout:
    - default
categories:
    - Programming
tags:
    - android
    - html
    - ios
    - javascript
    - php
---

![iPhone App](https://www.stevefenton.co.uk/wp-content/uploads/2015/07/iphone-app.png)Everyone is keen on writing apps these days. For an organisation, apps are the buzz. For consumers, apps are the convenience. The only problem is that writing apps that target every operating system (and then every version of an operating system that has a wide distribution between versions) can be quite a task.

This is where HTML5 can really rock, because you can write one version of your app and have it work on iPhone, Windows Mobile, Android, Boot2Gecko and WebOS.

At the time of writing, apps can be placed along a slider that runs from full native, to pure HTML – here are some examples:

- A native app on each operating system, written in the relevant language for that operating system
- An app written using a software development tool kit that generates the different native apps
- An app written for one of the operating systems, ported to the other ones
- An app written in HTML, but using an API that allows calls to native sensors
- An app written in HTML just like any web page

From a technical point of view, as of the start of 2012, if you want to access things like contacts, camera, proximity sensor or other on-board gadgets, you need some link back to the native operating system. This is all about to change though as JavaScript APIs that will allow access to these things (with the user’s permission) are being created and standardised, such as [the light sensor API](https://www.stevefenton.co.uk/2012/05/Using-The-Light-Sensor-API-In-Firefox/) and [the proximity sensor API](https://www.stevefenton.co.uk/2012/05/Using-The-Proximity-Sensor-API-In-Firefox/).

Enough talk. Let’s assume that you don’t need any of these gadgets but you want to write an HTML5 app that runs from the home screen and doesn’t look any different from any other native app on your phone.

This example is not just for iPhones. If you write this app it will work on any phone. I have tested it on iPhone 4S and Android 2.2.1 and the results are largely similar. The main difference you will notice is that it will look identical to native apps on the iPhone, whereas it will look a bit like a native app in most versions of Android. There are rumours that some later versions of Android have a more iPhone-esque behaviour. So let’s write a simple app.

### Nothing Special

The first thing to note about writing an HTML5 app is that there is nothing special about it. The HTML is just HTML, the CSS is just CSS and the JavaScript is just normal JavaScript. This means you already know how to write it, how to put your CSS and JavaScript into separate files, how to namespace your JavaScript and all that stuff. Just because it is an app for a phone, it doesn’t mean you should start getting into sloppy habits.

In our example, we’re going to write a really simple clock app that tells you the current time. It isn’t going to set the world on fire – especially given that you don’t need to open an app to see the time – but this is just a good way to demonstrate the process.

As you can expect, we create an HTML file, a CSS file and a JavaScript file for our boring old clock.

### Adding The Magic

There are just a few things to add to your normal web page to make it awesome on a mobile phone.

- Offline Cache
- Special Apple Tags

#### Offline Cache

This is a relatively new web standard that allows you to specify files that you would like the user’s machine to cache. Browsers already do some temporary caching to make browsing faster, but you can now explicitly request that a bunch of files get remembered.

This is handy, because we want our app to behave like it is native, which means it will still open and function if they are in their bunker!

To ask for your files to be cached, you need to specify a cache manifest.

In your HTML, you specify the location of the cache manifest on your html tag:

```
<pre class="prettyprint lang-html">
<html manifest="manifest.php">
```

My cache manifest is PHP, because I need to set the response type to be “text/cache-manifest”. You could also do this via your web server configuration. However you do it, it is important that your server the manifest with the correct content type.

Here is the file – the PHP block is only needed if you are setting the content type the same way as me:

```
<pre class="prettyprint lang-php">
<?php
    header('Content-type: text/cache-manifest');
?>CACHE MANIFEST
index.html
apple-touch-icon.png
page.png
script.js
splash.png
style.css
```

As you can see, I have included all of the files in my entire app because I want it to work even when the phone has no Internet connection available.

#### Special Apple Tags

To supply a custom icon and splash screen on an iPhone and to run in a chrome-less full screen window, you will need to add some special tags. Some versions of Android also use these tags.

```
<pre class="prettyprint lang-html">
<meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1.0, maximum-scale=1.0">
<meta name="apple-mobile-web-app-status-bar-style" content="black">
<meta name="apple-mobile-web-app-capable" content="yes">
<link rel="apple-touch-icon" href="apple-touch-icon.png">
<link rel="apple-touch-startup-image" href="splash.png">
<link rel="stylesheet" href="style.css" type="text/css" media="screen, mobile" title="main" charset="utf-8">
```

That may seem like a lot of fuss, but it really does make the app look awesome because it no longer looks like it is simply a shortcut to the web browser.

Important note, if you are having trouble getting items to stay in the offline cache, you may find that removing this tag helps:

```
<pre class="prettyprint lang-html">
<meta name="apple-mobile-web-app-capable" content="yes">
```

This will allow the content to be stored offline, but sadly results in the app not running full screen. This appears to be a difference between Safari, which has a reliable offline cache and the browser used for home screen apps on iPhone, which doesn’t.

### Images

One excellent bit of news for your icons is that the iPhone will funk them up for you if you use the tags to supply an icon, so you can supply a square icon 117px x 117px and on the iPhone it will get rounded off, highlighted edges and a nice glossy shine.

You could do this yourself and then specify a different attribute to stop the styling from being applied, but then your icon would look out of place either now or in the future if this style is updated.

In addition, if it takes a second to load up your app, the iPhone will display your 320px x 460px splash screen while its waking up.

### Opening Links

One thing you will notice on the iPhone is that if you are running in full-screen mode and click on one of the links to another part of your application, it wants to open Safari. There is a really simple fix for this that you can apply wherever you need to make the link open in the full screen window.

```
<pre class="prettyprint lang-javascript">
var anchors = document.getElementsByTagName('a');
for(var i = 0; i < anchors.length; i++)
{
    anchors[i].onclick = function()
    {
        window.location = this.getAttribute('href');
        return false;
    };
}
```

This effectively cancels the default behaviour of opening the link in Safari and will keep your application in full-screen mode. It also won’t affect the app on other devices – although you will have to be careful if you have other onclick events that this may replace, or that may replace this.

### Usability Improvements

Here are a couple of usability improvements I have found that make the app behave as users expect. I have found that once the web app is added to their home screen they largely expect it to work like a native application rather than a web page.

- **Loading**  
    Add a visible loading spinner that lets users know something is happening when they click on a link. You need to do this for standard navigations as well as AJAX background actions as there is no status bar in full-screen mode.
- **Paging**  
    Break down long lists of things into a logical paging structure. This means the size of data is smaller and the demand on the size of the screen is lower (the user can scroll, but if you are displaying a table of data it is nice to view it without scrolling.
- **Hovering**  
    It is worth remembering that there is no pointer on touch devices, so anything that you expose via hover or focus events needs to be re-worked.

### Summary

So it is really simple to create a native looking pure HTML5 app. All you need to do to add the app to your home page is…

- iPhone  
    Go to the web page you created and press the share icon. Select the “Add to Home Screen” option.
- Android  
    Go to the web page you created and press the menu button. Select “More” and then “Add shortcut to Home”. In some versions of Android you will need to add a bookmark before you’ll get the home screen option.

To test offline caching in your application, switch your phone to airplane mode, which switches off your Internet connection, and then open your app. It should load with all the scripts and images it needs because of the offline cache.

In a real application scenario, I have tended to ignore the offline requirement. This is because it makes the application more complicated and harder to maintain for little benefit (the applications in question require data from the server for nearly all functionality). The decision on whether to offline will be unique to each project, but think carefully about this subject before you add the extra complexity.

Useful Tools:

- [Manifest File Validator](http://manifest-validator.com/)
- In Firefox, use <about:cache> to view stored files, there is a dedicated Offline Cache section

### Questions And Answers

I have had some really good questions about some of the details of HTML5 phone apps, so here they are along with their answers.

What happens if there is no Internet connection when installing the app?

You need an Internet connection to install the app. This is no different to using the app store.

What happens if there is no Internet connection when running the app?

Once the app is installed, the cache manifest requests that the files are stored for offline use. This means it can run without an Internet connection. Your app should be written to handle an offline scenario if you are using AJAX calls to grab data.

What happens if the user clears their offline cache?

If the user clears their offline cache (which can be done via their settings) the app will need to re-cache the files on the next load, which will require an Internet connection. On the iPhone, your splash image will be displayed while the files are re-fetched whereas on Android it will be the same as opening a web page. You can test your app offline using the airplane mode on your phone.
---
layout: src/layouts/Default.astro
navMenu: false
title: 'JavaScript remote error logging'
pubDate: 2012-09-07T00:06:46+01:00
author:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=742'
interface_sidebarlayout:
    - default
categories:
    - Programming
tags:
    - javascript
---

If you have written an application, you’ll know how useful error and exception logging can be. When a user detects a problem, the logs can often explain how it happened better than the user and very often you can find problems before anyone realises something has gone wrong.

So wouldn’t it be nice if your error log contained JavaScript errors as well as all the problems that got logged on the server. Of course it would. The great news is that it is very easy to forward the JavaScript errors to your server for proper logging.

Here is a contrived full example, which shows errors be forwarded using an AJAX request. In addition to the AJAX request, there is logging to the console so you can see what is going on when you run the example. You will also notice that the existing window.onerror handlers are also called.

How you handle the request on the server is entirely up to you. You can use whatever technology you are already using to forward the event to your existing event log. You should also consider validating each error being sent, in case someone spots the error logging mechanism and starts using it as an attack vector by flooding you with error reports, or submitting error reports that contain injection attacks!

```
<pre class="prettyprint lang-javascript">
var ErrorHandling = (function() {
  var existingErrorHandler = window.onerror;
  var remoteLoggingUrl = 'http://localhost/logging/';

  var ajaxPost = function(data) {
    var httpRequest = false;
    if (window.XMLHttpRequest) {
      httpRequest = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
      httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
    }
    httpRequest.open('POST', remoteLoggingUrl, true);
    httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    httpRequest.onreadystatechange = function() {
      if (httpRequest.readyState === 4) {
        if (httpRequest.status !== 200) {
          logToConsole('Remote logging failed. Url: ' + remoteLoggingUrl + ' Data: ' + data, '', '');
        }
      }
    }
    httpRequest.send(data);
  };

  var logToRemote = function(message, url, lineNumber) {
    try {
      ajaxPost(
        'message=' + encodeURIComponent(message) +
        '&url=' + encodeURIComponent(url) +
        '&lineNumber=' + encodeURIComponent(lineNumber)
      );
    } catch (ex) {
      logToConsole(ex.message, ex.fileName, ex.lineNumber);
    }
  };

  var logToConsole = function(message, url, lineNumber) {
    if (typeof console !== 'undefined') {
      console.log('Error: ' + message);
      console.log('Source: ' + url);
      console.log('Line: ' + lineNumber);
    }
  };

  var logToExisting = function(message, url, lineNumber) {
    if (existingErrorHandler) {
      existingErrorHandler(message, url, lineNumber);
    }
  };
  return {
    logError: function(message, url, lineNumber) {
      logToConsole(message, url, lineNumber);
      logToRemote(message, url, lineNumber);
      logToExisting(message, url, lineNumber);
      return true;
    }
  };
}());

window.onerror = ErrorHandling.logError;

document.getElementById('test').onclick = function() {
  // Example of explicit logging
  try {
    var x = y;
  } catch (ex) {
    ErrorHandling.logError(ex.message, ex.fileName, ex.lineNumber);
  }

  // Example of implicit logging (handled by window.onerror)
  var a = b;
};
```
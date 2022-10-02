---
layout: src/layouts/Default.astro
navMenu: false
title: 'Adjusting Content for Network Speed'
pubDate: 2022-01-10T09:49:33+00:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - javascript
---

There is an experimental specification on the W3C for a `navigator.connection` [Network Information API](https://wicg.github.io/netinfo/) that provides a rough indication of connection speeds, which you can use to adjust your content. Like many of the modern API proposals, there is concern over it’s use in browser fingerprinting – but hopefully a course-grained version of this will survive in the long run – even if it just provides orders of magnitude indication of speed.

I have created a function that you can use below to get some information about the connection speed, normalised to a useful summary.

The summary contains three items:

- `saveData` – whether the user is requesting you to save data, usually due to billing / limits
- `speedInMB` – the effective connection speed in MB, from downlink, or downlinkMax, or effectiveType (in that order)
- `type` – the type used to get the connection speed

Here’s an example:

```
<pre class="prettyprint lang-javascript">
{
    "saveData": false,
    "speedInMB": 3.1,
    "type": "downlink"
}
```
To get this, we just need to use the `getConnectionSpeed` function, defined below:

```
<pre class="prettyprint lang-javascript">
function getConnectionSpeed() {
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection || null;

  const result = {
    saveData: false,
    speedInMB: 0,
    type: 'unsupported'
  }

  if (!connection) {
    return null
  }

  result.saveData = connection.saveData || false;

  const orderedTypes = [
    'downlink',
    'downlinkMax',
    'effectiveType',
  ];

  const effectiveTypeMap = {
    // In 2020 spec (speed also from spec)
    'slow-2g': 0.05,
    '2g': 0.07,
    '3g': 0.7,
    '4g': 100
  };

  const customHandler = {
    'effectiveType': (et) => effectiveTypeMap[et]
  };

  for (const t of orderedTypes) {
    if (connection[t]) {
      result.type = t;

      if (typeof customHandler[t] === 'function') {
        result.speedInMB = customHandler[t](connection[t]) || 0;
      } else {
        result.speedInMB = connection[t];
      }

      break;
    }
  }

  return result;
};
```
And here is how you might use it…

```
<pre class="prettyprint lang-javascript">
function onConnectionChange() {
    const elem = document.getElementById('result');
    elem.innerHTML = JSON.stringify(getConnectionSpeed(), null, 4);
}

onConnectionChange();


// Run again if the connection changes
if (navigator.connection) {
    navigator.connection.addEventListener('change', onConnectionChange);
}
```
You can check current browser support on [Can I Use… netinfo](https://caniuse.com/netinfo). Partial support is currently listed for Chrome and Edge, but the items used in the above function *are* supported (and the code itself works through a list to find a supported property).
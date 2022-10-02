---
layout: src/layouts/Default.astro
title: Here Maps scroll wheel temporary fix
navMenu: false
pubDate: 2021-03-08T16:00:38+00:00
authors:
    - steve-fenton
image: /wp-content/uploads/2021/03/colour-map.png
categories:
    - Programming
tags:
    - 'here maps'
    - html
    - javascript
---

As my grandma used to say, “there’s only one thing worse than a scroll-linked positioning effect and that’s not being able to scroll at all”. So, with this in mind I have written a temporary fix for the issue in the latest version of HERE Maps that prevents users from scrolling past the map with their mousewheel. No solution was available on [this Stack Overflow question](https://stackoverflow.com/q/63615994/75525) as of the date of writing.

Firstly, though, here’s the documented way to ask HERE Maps to let users scroll. This will hopefully start working again when they get to this on the roadmap.

```javascript
behaviour.disable(H.mapevents.Behavior.WHEELZOOM);
```

In the meantime, we’re going to stick an element on the page to catch the users scrolling and make it happen. Other solutions attempted included sticking an overlay on the map, but this stops other interactions like dragging and zooming, and even more bizarre (but worth a try) attempting to add another scroll listener that converted the mousewheel delta into a scroll position… but this had issues in terms of matching user configured speed, and problems knowing which direction a user had set scrolling in relation to the mouse wheel.

As lone survivor of the shortlist, this fix has two parts. An element that will completely cover the map and a JavaScript wheel listener that will display the element when scrolling and remove it when scrolling ends. The effect of this is to put an element under the mouse wheel to enable “normal scrolling” as the scroll won’t make it as far as HERE Maps event handler.

Here’s the element… we’re placing it as the first child of the container that contains the map. I’ve shown the container for illustration – only the “map-fixer” element is new. I’ve inlined the style so it will be deleted when the element is removed.

```html
    <div class="map-container">
        <div id="map-fixer" style="position: absolute; background-color: transparent; width: 100%; height: 100%; z-index: 1000; display: none;"></div>
    </div>
```

Now we just need a little JavaScript to display this when someone scrolls… with a little timer to remove it when scrolling is definitely ended.

```javascript
(function () {
    var scrolling = false;
    var scrollEnd = null;

    function heremapScrollEnd() {
        scrolling = false;
        window.clearTimeout(scrollEnd);
        document.getElementById('map-fixer').style.display = 'none';
    }

    window.onwheel = function() {
        if (scrolling) {
            window.clearTimeout(scrollEnd);
            window.setTimeout(heremapScrollEnd, 200);
	        return;
        }
        scrolling = true;
        document.getElementById('map-fixer').style.display = 'block';
        window.setTimeout(heremapScrollEnd, 1000);
    }
})();
```

If you give it a background colour temporarily, you’ll see the fix in action. When you use your mouse wheel it will appear and take all the scrolls. This makes the page scroll normally however the user has configured it. When they stop, there’s a short delay before the element is removed (to stop us cycling the display of the element during brief scroll pauses).
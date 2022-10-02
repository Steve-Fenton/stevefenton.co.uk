---
layout: src/layouts/Default.astro
navMenu: false
title: 'Background animation with JavaScript and CSS'
pubDate: 2013-02-20T21:53:12+00:00
author:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=649'
interface_sidebarlayout:
    - default
categories:
    - Programming
tags:
    - css
    - html
    - javascript
---

Creating a cool background effect on your web page is really easy and thanks to the innovation of the CSS working group, you can now create really smooth animations using JavaScript to handle events and CSS to do the heavy lifting.

A few years back, you would need to get highly mathmatical to get a smooth animation and you’d end up cranking out lines of code or resorting to including a library in order to make things look nice. This is no longer the case, so chuck your jQuery, mootools and scriptaculous in the bin and crank out great animations in just a couple of lines of code.

So why use JavaScript at all? I want to link my animation to the scroll event – so it will only animate if JavaScript is available. Because of this, I don’t even want to add the animatable images unless JavaScript is available. By adding the images and styles in the same script that adds the event, I end up with a self-contained unit – rather than having to add some HTML to my page, some CSS to my stylesheet and some JavaScript to my scripts – I can now just add the script and it takes care of everything.

I will start of simple and add layers only when I can justify the extra lines of code. Each layer that is added will have a good reason to be there. So let’s start with some scope.

### Scope

I want my script to be able to plug in to any website without causing name clashes with other scripts that may be on the page – so whenever I crank out a bit of JavaScript, I start with this:

```
<pre class="prettyprint lang-javascript">
(function () {

}());
```
Anything I put inside of this immediately invoked function expression will be restricted in scope to just this function. This means I can safely name things as I like without accidentally adding them into the global scope where they would be available all over the place and might interfere with other scripts. Here’s an example of this in action…

```
<pre class="prettyprint lang-javascript">
(function () {
    var example = 'This is an example';
}());

alert(example); // undefined
```
Only code inside the block can see the example variable, so as far as the alert is concerned (which is outside the block) it doesn’t exist.

### Adding the HTML

I want to add two elements to my page. When the user scrolls up or down, I will animate the bottom layer at half the speed of the top layer – this will create a cool parallax effect that will add depth to the animation. I am using a semi-transparent PNG image to allow the lower layers to show through, but you could just as easily control the opacity using CSS if you prefer.

```
<pre class="prettyprint lang-javascript">
(function () {
    var lowerElement;
    var upperElement = document.createElement('div');
    lowerElement = upperElement.cloneNode(false);
   
    document.body.appendChild(upperElement);
    document.body.appendChild(lowerElement);
}());
```
This drops two new elements on the page, but they aren’t yet styled – so now I need to add the styles to the elements.

### Adding the CSS

I am going to be adding a bunch of styles and some of them will be different for each element, so I’ll add a function to make that easier to do:

```
<pre class="prettyprint lang-javascript">
var applyStyles = function (element, styles) {
    for (var i = 0; i < styles.length; i++) {
        element.style[ styles[i][0] ] = styles[i][1];
    }
};
```
This function takes an element and an array of key-value pairs representing styles and applies them all. We can define a bunch of styles and pass them all in. I want to stick the elements underneath all the content, stick them to the top of the window and apply the background image.

```
<pre class="prettyprint lang-javascript">
styles = [
    ['position', 'fixed'],
    ['top', '0'],
    ['left', '0'],
    ['width', '100%'],
    ['height', '500px'],
    ['backgroundImage', 'url("' + image + '")'],
    ['backgroundRepeat', 'repeat-x'],
    ['zIndex', '-1']
];

applyStyles(upperElement, styles);
```
### The Story So Far

So here is the full script so far. If we run this, we end up with the additional background images on our page.

```
<pre class="prettyprint lang-javascript">
(function () {
    var image = 'bokeh.png';
    var lowerElement;
    var upperElement = document.createElement('div');
   
    var applyStyles = function (element, styles) {
        for (var i = 0; i < styles.length; i++) {
            element.style[ styles[i][0] ] = styles[i][1];
        }
    };
   
    styles = [
        ['position', 'fixed'],
        ['top', '0'],
        ['left', '0'],
        ['width', '100%'],
        ['height', '500px'],
        ['backgroundImage', 'url("' + image + '")'],
        ['backgroundRepeat', 'repeat-x'],
        ['zIndex', '-1']
    ];
   
    applyStyles(upperElement, styles);
   
    // Clone the upperElement as it has all the styles already applied
    lowerElement = upperElement.cloneNode(false);
   
    document.body.appendChild(upperElement);
    document.body.appendChild(lowerElement);
}());
```
### Scroll Event

Now I want to move our elements when the page is scrolled. To do this, I’ll listen to the scroll event on the window. The scrollHandler is the function that will be called each time the page is scrolled and we add this event listener to the scroll event. Inside the scrollHandler function, I just move the upper element by the distance scrolled and the lower element by half the distance scrolled.

```
<pre class="prettyprint lang-javascript">
var scrollHandler = function () {
    var position = window.pageYOffset;
    upperElement.style.backgroundPosition = position + 'px 0';
    lowerElement.style.backgroundPosition = (position / 2) + 'px 0';
};

if (window.addEventListener) {
    window.addEventListener('scroll', scrollHandler);
} else if (window.attachEvent) {
    window.attachEvent('onscroll', scrollHandler);
}
```
In some browsers, this would actually be enough – the scroll event would be called a great many times and the background would smoothly slide while we were scrolling. Not all browsers work this way, though and things will look jerky and unpolished. I’ll fix that next.

### CSS Animation

To get a smooth animation, we could write a bunch of JavaScript that moves the backgrounds gradually over many steps. We could use mathmatics to start the movement fast and decelerate it towards the end. We could write a lot of code! This is where CSS can do the heavy lifting for you – and because the browser implements the animation algorithms, it can be a whole lot more performant than one you hand-crank.

All I need to do is add a transition to my list of styles.

```
<pre class="prettyprint lang-javascript">
['transition', 'background ' + time + 's ease 0s']
```
Some browsers only have experimental support for transitions, so I will add prefixed versions for all the browsers to make sure it works in as many as possible.

```
<pre class="prettyprint lang-javascript">
['msTransition', 'background ' + time + 's ease 0s'],
['webkitTransition', 'background ' + time + 's ease 0s'],
['MozTransition', 'background ' + time + 's ease 0s'],
['OTransition', 'background ' + time + 's ease 0s'],
['transition', 'background ' + time + 's ease 0s']
```
I have kept the number of seconds for the animation in a variable, so I only ever need to change it in one place. Here is the complete script so far.

```
<pre class="prettyprint lang-javascript">
(function () {
    var image = 'bokeh.png';
    var time = 5;
    var lowerElement;
    var upperElement = document.createElement('div');
   
    var applyStyles = function (element, styles) {
        for (var i = 0; i < styles.length; i++) {
            element.style[ styles[i][0] ] = styles[i][1];
        }
    };
   
    styles = [
        ['position', 'fixed'],
        ['top', '0'],
        ['left', '0'],
        ['width', '100%'],
        ['height', '500px'],
        ['backgroundImage', 'url("' + image + '")'],
        ['backgroundRepeat', 'repeat-x'],
        ['zIndex', '-1'],
        ['msTransition', 'background ' + time + 's ease 0s'],
        ['webkitTransition', 'background ' + time + 's ease 0s'],
        ['MozTransition', 'background ' + time + 's ease 0s'],
        ['OTransition', 'background ' + time + 's ease 0s'],
        ['transition', 'background ' + time + 's ease 0s']
    ];
   
    applyStyles(upperElement, styles);
   
    lowerElement = upperElement.cloneNode(false);
   
    document.body.appendChild(upperElement);
    document.body.appendChild(lowerElement);
   
    var scrollHandler = function () {
        var position = window.pageYOffset;
        upperElement.style.backgroundPosition = position + 'px 0';
        lowerElement.style.backgroundPosition = (position / 2) + 'px 0';
    };

    if (window.addEventListener) {
        window.addEventListener('scroll', scrollHandler);
    } else if (window.attachEvent) {
        window.attachEvent('onscroll', scrollHandler);
    }
}());
```
We now have a smooth 5 second animation that looks really nice. You might think we are all finished – but there is still a bit of polishing to do to make this animation great.

### Flip the Background

Because I am repeating the same background image, as the animation runs there are points at which the two images converge. This is a distracting effect that can be easily fixed. I am opting to flip the lower image horizontally, which means the two images won’t have a point at which they converge. This works because the image is asymetrical. You could also offset the element by shifting it down slightly, again to stop the images converging. Once again I’m using CSS to do all the work:

```
<pre class="prettyprint lang-javascript">
styles = [
    ['msTransform', 'scaleX(-1)'],
    ['webkitTransform', 'scaleX(-1)'],
    ['MozTransform', 'scaleX(-1)'],
    ['OTransform', 'scaleX(-1)'],
    ['transform', 'scaleX(-1)']
];

applyStyles(lowerElement, styles);
```
To keep things working as I want, I need to flip the backgroundPosition for the lower element when I want to move it. Here is the final script:

```
<pre class="prettyprint lang-javascript">
(function () {
    var image = 'bokeh.png';
    var time = 5;
    var lowerElement;
    var upperElement = document.createElement('div');
   
    var applyStyles = function (element, styles) {
        for (var i = 0; i < styles.length; i++) {
            element.style[ styles[i][0] ] = styles[i][1];
        }
    };
   
    styles = [
        ['position', 'fixed'],
        ['top', '0'],
        ['left', '0'],
        ['width', '100%'],
        ['height', '500px'],
        ['backgroundImage', 'url("' + image + '")'],
        ['backgroundRepeat', 'repeat-x'],
        ['zIndex', '-1'],
        ['msTransition', 'background ' + time + 's ease 0s'],
        ['webkitTransition', 'background ' + time + 's ease 0s'],
        ['MozTransition', 'background ' + time + 's ease 0s'],
        ['OTransition', 'background ' + time + 's ease 0s'],
        ['transition', 'background ' + time + 's ease 0s']
    ];
   
    applyStyles(upperElement, styles);
   
    lowerElement = upperElement.cloneNode(false);
   
    styles = [
        ['msTransform', 'scaleX(-1)'],
        ['webkitTransform', 'scaleX(-1)'],
        ['MozTransform', 'scaleX(-1)'],
        ['OTransform', 'scaleX(-1)'],
        ['transform', 'scaleX(-1)']
    ];
   
    applyStyles(lowerElement, styles);
   
    document.body.appendChild(upperElement);
    document.body.appendChild(lowerElement);
   
    var scrollHandler = function () {
        var position = window.pageYOffset;
        upperElement.style.backgroundPosition = position + 'px 0';
        lowerElement.style.backgroundPosition = ((position / 2) * -1) + 'px 0';
    };

    if (window.addEventListener) {
        window.addEventListener('scroll', scrollHandler);
    } else if (window.attachEvent) {
        window.attachEvent('onscroll', scrollHandler);
    }
}());
```
### Summary

So I have created a simple chunk of stand-alone JavaScript, used CSS to do all the heavy lifting and got a really cool effect that is pretty easy to customise. I have used all of the vendor-prefixes for the CSS3 features that may only have experimental support and I’ve done a bit of polishing to make it look better than the unpolished version.
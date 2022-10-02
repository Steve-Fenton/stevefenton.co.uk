---
id: 839
title: 'How to include images in your CSS'
pubDate: '2012-03-04T16:41:07+00:00'
author: 'Steve Fenton'
layout: post
guid: 'https://www.stevefenton.co.uk/?p=839'
permalink: /2012/03/how-to-include-images-in-your-css/
interface_sidebarlayout:
    - default
categories:
    - Programming
tags:
    - css
    - html
---

When I created [Cruiser, a CruiseControl.NET Wall-board](https://www.stevefenton.co.uk/2012/02/cruiser-cruise-control-information-radiator/) I wanted to make it as easy as possible for people to use. I didn’t want to force people to download a zip archive and extract files into specific locations. I wanted people to be able to drop a single file onto their build server and get instant results.

Because you only need to load the page once, with all the updates happening via AJAX requests, I didn’t mind including all my JavaScript on the page, rather than within an include file. With most build servers running over a network and with the concept of a wall-board being that you switch it on and leave it running, I could live without the JavaScript being cached. In fact, the same was true for the CSS and for the images – but the question was how do you include your images in a single HTML file?

The answer is, you can include them in your CSS, or include them in the src attribute of an image tag. Here are some examples:

Here is a typical background-image declaration in CSS:

```
<pre class="prettyprint lang-css">
.icon_plus {
    background-image: url('/images/plus.png');
}
```

And sometimes, if the site is using [CSS image sprites](https://www.stevefenton.co.uk/2009/05/Google-Uses-Image-Sprites/), it will look like this:

```
<pre class="prettyprint lang-css">
.icon_plus {
    background-image: url('/images/spring.png');
    background-position: -80px -96px;
}
```

And here it is again, with the image included directly in the CSS:

```
<pre class="prettyprint lang-css">
.icon_plus {
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAhCAYAAABX5MJvAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAK8AAACvABQqw0mAAAABZ0RVh0Q3JlYXRpb24gVGltZQAwMi8yMi8xMq6ePc8AAAAgdEVYdFNvZnR3YXJlAE1hY3JvbWVkaWEgRmlyZXdvcmtzIE1Yu5EqJAAABOhJREFUeJzFVltIVGsU/mbvPcpsEM3ByjKtHGhwm9CLGuGlwC6gkFAk9GIK4oMghAphiBC9CAYhEwXRW0GZPitW9JKXh7wkjoqWZShoXiebcdqz5zsP57jPMbfjbxfOgvWw1/+t7//2+i/rtwEg/mdTfiYpISEBsbGx2LNnD2JiYuDz+bCysoKVlRUsLCz8lBCK+N69e1leXs7nz59zaWmJVrawsMCnT5+ytLSUTqdTiBcAbdhhOVRVRVVVFa5fv459+/YBAKanpzE8PAyv14tQKAS73Y709HRomoZDhw4BAGZmZnDnzh3cu3cP6+vrP1+JjIwM9vX1kST9fj9bWlqYk5NDh8NhiVdVlfn5+fR4PAwGgyTJ7u5uapq2UzWsBy5cuMDFxUWSZGtrK91ut3B5AVDTNLa3t5Mk5+bmePr06d2JyMvLYyAQIEnW19fvavIfvaGhgSS5vLzMzMxMMRFHjhzh58+fSZLV1dW/JGDD6+rqSJJTU1M8ePDgziI2StjU1PRbBGz43bt3SZJPnjyJLOLcuXMkyYGBASqKIkRus9mEcKqqcnR0lCSZk5NjLUKSJHZ0dJAkCwsLhSb3eDzs7e1lWVmZkJArV66QJNva2qxFuFwuGobB4eFhSpIkRNrf30+SvHXrlhDebrdzcnKSuq4zOTnZjEv4x86fPw9JktDa2opwOAwR+/btGwAIXUYAoOs6nj17BkVRUFBQYMZNEW63GwDQ09MjRAgAoVAIABAIBIRzNvgzMjLMmNnAjh49Cl3XMTIyYpnsdruRnJwMXddBEpIkIT4+3hzLzc2FLMuw2WwAgLdv32J1dXULz7t372AYBpKSkjbF6XA4OD4+zuXlZcbHx1uu5+PHjy2b1nZ25swZSx6n08m1tTW+ePFi856QJAnR0dEIh8MgaVkJWZYj1/kX8Arw98b6+PEjsrKyEBUVZQlsbGzEgwcPYBgGwuEwZFmGx+OBpml49OgRHj58CLvdDgCw2WwYGhqy5FFVFdHR0fj69etmEYZhYHx8HHl5eUhNTcXc3NyW5LGxMYyNjW2Kzc/PQ9M0jIyMCG9oTdOgKApmZmbMmHk63r9/DwA4efKkEBkA888dDodwTmZmJgBgdHR0q4iOjg4AQHFx8a5FKIrYK1GSJFy8eBEA0NnZuVWE1+tFT08PTp06hdzcXCFSn8+HQCAAv98vhD979ixOnDiBly9fYmpqatOYeVRKSkpIkq9evRK6hhMTE+lyuRgTEyPUa968ebNdb/r3Q1EUvn79miRZU1PzW1r4htfX15Mku7q6rHrTZvDx48e5trZGXdeFuqmIFxcX0zAMLi0t8dixY1aYrUlXr14lSa6vr/Py5cu/JKC0tNR89F66dGk7nHVyRUWFeQU3NzczNjZ2V5M7nU62tLSYHNeuXYuE356oqKiInz59IklOT0+ztraWhw8fjviaSk1N5Y0bNzg7O0uSnJiYYEFBQeRNu6FkO9u/fz9u3ryJyspKyLKMUCiEvr4+dHd3w+fzQdd12O12xMXFITs7G9nZ2ZBlGcFgEPfv38ft27fx5cuXSFMgYiX+62lpaWxsbOTQ0BC/f/9u2TmDwSAHBwfZ0NBAl8slvHQ7VuJHi4qKwoEDB5Ceno6UlBSoqgq/348PHz7A6/VidnYWuq7vhhK7FvEnTNoZ8uftL3UtYp92IkqzAAAAAElFTkSuQmCC);
}
```

The image itself is Base 64 encoded and included with the data: prefix (in our case data:image/png;base64,\[string\] – as our image is a PNG. You can [convert your images really simply online](http://www.dailycoding.com/Utils/Converter/ImageToBase64.aspx).

So why would you do this?!

The answer to this question is: “When you have carefully considered all the options”. If you include an image in your CSS, it will make your CSS quite a lot bigger, although your included CSS files will get cached. On the flip side, each image that is included in your CSS will be an HTTP request saved, which makes things faster – and you have to admit that they are easier to manage and less error-prone than image sprites!

You can do something similar with image tags too.

```
<pre class="prettyprint lang-html">
<img alt="Plus" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAhCAYAAABX5MJvAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAK8AAACvABQqw0mAAAABZ0RVh0Q3JlYXRpb24gVGltZQAwMi8yMi8xMq6ePc8AAAAgdEVYdFNvZnR3YXJlAE1hY3JvbWVkaWEgRmlyZXdvcmtzIE1Yu5EqJAAABOhJREFUeJzFVltIVGsU/mbvPcpsEM3ByjKtHGhwm9CLGuGlwC6gkFAk9GIK4oMghAphiBC9CAYhEwXRW0GZPitW9JKXh7wkjoqWZShoXiebcdqz5zsP57jPMbfjbxfOgvWw1/+t7//2+i/rtwEg/mdTfiYpISEBsbGx2LNnD2JiYuDz+bCysoKVlRUsLCz8lBCK+N69e1leXs7nz59zaWmJVrawsMCnT5+ytLSUTqdTiBcAbdhhOVRVRVVVFa5fv459+/YBAKanpzE8PAyv14tQKAS73Y709HRomoZDhw4BAGZmZnDnzh3cu3cP6+vrP1+JjIwM9vX1kST9fj9bWlqYk5NDh8NhiVdVlfn5+fR4PAwGgyTJ7u5uapq2UzWsBy5cuMDFxUWSZGtrK91ut3B5AVDTNLa3t5Mk5+bmePr06d2JyMvLYyAQIEnW19fvavIfvaGhgSS5vLzMzMxMMRFHjhzh58+fSZLV1dW/JGDD6+rqSJJTU1M8ePDgziI2StjU1PRbBGz43bt3SZJPnjyJLOLcuXMkyYGBASqKIkRus9mEcKqqcnR0lCSZk5NjLUKSJHZ0dJAkCwsLhSb3eDzs7e1lWVmZkJArV66QJNva2qxFuFwuGobB4eFhSpIkRNrf30+SvHXrlhDebrdzcnKSuq4zOTnZjEv4x86fPw9JktDa2opwOAwR+/btGwAIXUYAoOs6nj17BkVRUFBQYMZNEW63GwDQ09MjRAgAoVAIABAIBIRzNvgzMjLMmNnAjh49Cl3XMTIyYpnsdruRnJwMXddBEpIkIT4+3hzLzc2FLMuw2WwAgLdv32J1dXULz7t372AYBpKSkjbF6XA4OD4+zuXlZcbHx1uu5+PHjy2b1nZ25swZSx6n08m1tTW+ePFi856QJAnR0dEIh8MgaVkJWZYj1/kX8Arw98b6+PEjsrKyEBUVZQlsbGzEgwcPYBgGwuEwZFmGx+OBpml49OgRHj58CLvdDgCw2WwYGhqy5FFVFdHR0fj69etmEYZhYHx8HHl5eUhNTcXc3NyW5LGxMYyNjW2Kzc/PQ9M0jIyMCG9oTdOgKApmZmbMmHk63r9/DwA4efKkEBkA888dDodwTmZmJgBgdHR0q4iOjg4AQHFx8a5FKIrYK1GSJFy8eBEA0NnZuVWE1+tFT08PTp06hdzcXCFSn8+HQCAAv98vhD979ixOnDiBly9fYmpqatOYeVRKSkpIkq9evRK6hhMTE+lyuRgTEyPUa968ebNdb/r3Q1EUvn79miRZU1PzW1r4htfX15Mku7q6rHrTZvDx48e5trZGXdeFuqmIFxcX0zAMLi0t8dixY1aYrUlXr14lSa6vr/Py5cu/JKC0tNR89F66dGk7nHVyRUWFeQU3NzczNjZ2V5M7nU62tLSYHNeuXYuE356oqKiInz59IklOT0+ztraWhw8fjviaSk1N5Y0bNzg7O0uSnJiYYEFBQeRNu6FkO9u/fz9u3ryJyspKyLKMUCiEvr4+dHd3w+fzQdd12O12xMXFITs7G9nZ2ZBlGcFgEPfv38ft27fx5cuXSFMgYiX+62lpaWxsbOTQ0BC/f/9u2TmDwSAHBwfZ0NBAl8slvHQ7VuJHi4qKwoEDB5Ceno6UlBSoqgq/348PHz7A6/VidnYWuq7vhhK7FvEnTNoZ8uftL3UtYp92IkqzAAAAAElFTkSuQmCC">
```

As always, you should test out what this means for your pages, try out images, sprites and data-strings and decide which one is the fastest and which ones appear fastest to your visitors (i.e. how the different techniques affect the rendering of the page).
---
id: 2529
title: 'The CSS sibling selector'
pubDate: '2017-10-19T12:08:23+01:00'
author: 'Steve Fenton'
layout: post
guid: 'https://www.stevefenton.co.uk/?p=2529'
permalink: /2017/10/css-sibling-selector/
medium_post:
    - 'O:11:"Medium_Post":11:{s:16:"author_image_url";s:75:"https://cdn-images-1.medium.com/fit/c/400/400/1*eXkhfEuF41g5W_xnc_ydLA.jpeg";s:10:"author_url";s:38:"https://medium.com/@steve.fenton.co.uk";s:11:"byline_name";N;s:12:"byline_email";N;s:10:"cross_link";s:3:"yes";s:2:"id";s:12:"10d6ca3fb452";s:21:"follower_notification";s:3:"yes";s:7:"license";s:19:"all-rights-reserved";s:14:"publication_id";s:2:"-1";s:6:"status";s:5:"draft";s:3:"url";s:51:"https://medium.com/@steve.fenton.co.uk/10d6ca3fb452";}'
categories:
    - Programming
tags:
    - css
    - html
---

There is often a bit of confusion surrounding the CSS sibling selector, or `~` as it is known to its friends.

Here is how it works.

 ```
<pre class="wp-block-code prettyprint lang-css">```
div ~ p {
    color: red;
}
```
```

This CSS translated into English says:

> If there are is a paragraph next to another paragraph inside a division, make the text red

Here is an example HTML snippet that shows where the CSS sibling selector will apply. Effectively, only to the two paragraphs that are right next to each other, and within a division:

 ```
<pre class="wp-block-code prettyprint lang-html">```
    &lt;div>
        &lt;p>Not a sibling&lt;/p>
        &lt;div>Not a p&lt;/div>
        &lt;p>Sibling one&lt;/p>
        &lt;p>Sibling two&lt;/p>
    &lt;/div>
```
```

![CSS Sibling Selector](https://www.stevefenton.co.uk/wp-content/uploads/2017/10/css-sibling-selector.png)

### Doesn’t traverse up

A common misunderstanding is that you can use the sibling selector to traverse up to the parent in order to navigate to a sibling of the left-hand selector, so in the above example, people want the `div ~ p` selector to find the two paragraphs that are siblings of the inner `div` tag. This is still not possible in CSS yet, but we live in hope.

If you need to find the “Not a sibling” and “Sibling one” paragraphs as siblings of “Not a p”… you’ll need to resort to some JavaScript.
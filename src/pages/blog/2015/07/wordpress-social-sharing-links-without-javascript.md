---
layout: src/layouts/Default.astro
navMenu: false
title: 'WordPress social sharing links without JavaScript'
pubDate: 2015-07-11T20:56:19+01:00
authors:
    - steve-fenton
categories:
    - CMS
    - Programming
tags:
    - PHP
    - WordPress
---

If you, like me, find yourself staring at the network traffic spewing out of your website you will have noticed the JavaScript problem. No matter what plugin you use, it seems to require three or four JavaScript files. Want to show a picture of a cat on your website? You’ll need jQuery, React, and Meteor.

So one-by-one I’m eliminating them by updating my custom theme.

Here is my replacement for social sharing buttons. To avoid JavaScript, you essentially need to give up the counters that show how many times something has been shared, but if you miss the self-validation just ask and I’ll tell you that you are brilliant.

```
<pre class="prettyprint lang-php"><div class="social-sharing">
	<?php
		$link = urlencode(get_permalink());
	?>
	<ul>
		<li>Share this on...</li>
		<li class="twitter"><a href="https://twitter.com/intent/tweet?url=<?php echo $link; ?>" target="_blank">Twitter</a></li>
		<li class="facebook"><a href="https://facebook.com/sharer.php?u=<?php echo $link; ?>" target="_blank">Facebook</a></li>
		<li class="google-plus"><a href="https://plus.google.com/share?url=<?php echo $link; ?>" target="_blank">Google+</a></li>
		<li class="linkedin"><a href="http://www.linkedin.com/shareArticle?mini=true&url=<?php echo $link; ?>" target="_blank">LinkedIn</a></li>
		<li class="reddit"><a href="http://reddit.com/submit?url=<?php echo $link; ?>" target="_blank">Reddit</a></li>
		<li class="pinterest"><a href="http://pinterest.com/pin/create/button/?url=<?php echo $link; ?>" target="_blank">Pinterest</a></li>
	</ul>	
</div>
```
I have popped CSS classes on each link so the text can be replaced with an icon using a bit of CSS and Genericons.

This eliminated 7 HTTP requests from my website compared to the plugin I was using.
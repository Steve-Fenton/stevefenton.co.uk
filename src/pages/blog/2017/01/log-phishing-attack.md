---
layout: src/layouts/Default.astro
navMenu: false
title: 'Log phishing attack'
pubDate: 2017-01-18T08:23:43+00:00
author:
    - steve-fenton
medium_post:
    - 'O:11:"Medium_Post":11:{s:16:"author_image_url";s:75:"https://cdn-images-1.medium.com/fit/c/400/400/1*eXkhfEuF41g5W_xnc_ydLA.jpeg";s:10:"author_url";s:38:"https://medium.com/@steve.fenton.co.uk";s:11:"byline_name";N;s:12:"byline_email";N;s:10:"cross_link";s:3:"yes";s:2:"id";s:12:"4464d14c4775";s:21:"follower_notification";s:3:"yes";s:7:"license";s:19:"all-rights-reserved";s:14:"publication_id";s:2:"-1";s:6:"status";s:5:"draft";s:3:"url";s:51:"https://medium.com/@steve.fenton.co.uk/4464d14c4775";}'
categories:
    - Programming
    - Windows
tags:
    - operations
    - phishing
---

n an error log or HTTP log phising attack, a deliberately bad request is generated with a fake referer string.

The hope is that the referer string will be displayed in your cool web-based log aggregation and monitoring service as a hyperlink – tempting operations teams to click on the link as it might explain the issue. The link of course will lead to trouble.

 ```
<pre class="wp-block-code prettyprint">```
Exception type: MyCustomException
AbsoluteUri: http://www.example.com/
Referer: &lt;a href="http://phishing-site-address.com/">Windows FAQ&lt;/a>
```
```
If you are using a good monitoring service, they won’t display this input as a hyperlink – but beware of visiting pages that appear in your HTTP logs or event logs like this.
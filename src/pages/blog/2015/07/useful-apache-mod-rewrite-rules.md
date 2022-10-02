---
id: 1296
layout: src/layouts/Default.astro
title: 'Useful Apache mod rewrite rules'
pubDate: 2015-07-19T08:00:57+01:00
author:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=1296'
permalink: /2015/07/useful-apache-mod-rewrite-rules/
categories:
    - Programming
tags:
    - apache
    - php
---

I recently migrated my website to a different platform. I anticipated that this would require some redirection rules to send people to the correct content on the new website, but I failed to anticipate that number of links to legacy files (like some jQuery plugins and their static HTML example pages). As a result, I have been furiously created mod\_rewrite rules to try to help people find all of the content they are looking for. I thought these real-life examples would be useful to some people.

For all of these rules to work, I added the following line to the top of my .htaccess file:

```
<pre class="prettyprint lang-apache_conf">RewriteEngine On
```

The very first rule I created was to tell everyone about the temporary outage, by adding a 503 “Service Unavailable” response to any unrecognised URLs (i.e. ALL of the old ones). When I added more rules, I just put them before this so it acted as a back-stop to catch anything I hadn’t fixed yet.

```
<pre class="prettyprint lang-apache_conf">RewriteCond %{REMOTE_ADDR} !^111\.111\.111\.111$
RewriteCond %{REQUEST_URI} !\.(css|gif|ico|jpg|js|png|swf|txt)$
RewriteRule .* - [R=503,L]
```

The next rule was simple, but evolved over time. The redirection for all of my blogs.

Old:

```
<pre class="prettyprint lang-plain_text">https://www.stevefenton.co.uk/Content/Blog/Date/201210/Blog/TypeScript-Adds-Static-Typing-To-JavaScript/
```

New:

```
<pre class="prettyprint lang-plain_text">https://www.stevefenton.co.uk/2012/10/typescript-adds-static-typing-to-javascript/
```

I could have just tried to bend the new platform to my old URL scheme – but actually the new scheme is more discoverable. Because the old scheme was a series of key value pairs in disguise (Content=Blog, Date=201210, Blog=TypeScript-Adds-Static-Typing-To-JavaScript), half of the URL is wasted. In the new scheme, nothing is wasted.

I initially wrote quite a few rules to cover this – as you can see, I’m only interested here in pulling out the blog title and placing it into the new format. Everything else is simply hard coded. To keep the rules simple (and out of the main .htaccess file) I created a folder named “Content” and placed the .htaccess file in there. Any address that started with “Content” was an old URL, so this folder was a perfect place to put these rules. Because the server is case sensitive, I added a copy of the rules to another folder named “content” too. The rules themselves are set to case insensitive using the NC flag.

```
<pre class="prettyprint lang-apache_conf">
RewriteRule    ^Blog/Date/201001/Blog/([^/\.]+)/?$    https://www.stevefenton.co.uk/2010/01/$1/    [R=301,NC,L] 
RewriteRule    ^Blog/Date/201002/Blog/([^/\.]+)/?$    https://www.stevefenton.co.uk/2010/02/$1/    [R=301,NC,L] 
RewriteRule    ^Blog/Date/201003/Blog/([^/\.]+)/?$    https://www.stevefenton.co.uk/2010/03/$1/    [R=301,NC,L] 
RewriteRule    ^Blog/Date/201004/Blog/([^/\.]+)/?$    https://www.stevefenton.co.uk/2010/04/$1/    [R=301,NC,L] 
RewriteRule    ^Blog/Date/201005/Blog/([^/\.]+)/?$    https://www.stevefenton.co.uk/2010/05/$1/    [R=301,NC,L] 
RewriteRule    ^Blog/Date/201006/Blog/([^/\.]+)/?$    https://www.stevefenton.co.uk/2010/06/$1/    [R=301,NC,L] 
RewriteRule    ^Blog/Date/201007/Blog/([^/\.]+)/?$    https://www.stevefenton.co.uk/2010/07/$1/    [R=301,NC,L] 
RewriteRule    ^Blog/Date/201008/Blog/([^/\.]+)/?$    https://www.stevefenton.co.uk/2010/08/$1/    [R=301,NC,L] 
RewriteRule    ^Blog/Date/201009/Blog/([^/\.]+)/?$    https://www.stevefenton.co.uk/2010/09/$1/    [R=301,NC,L] 
RewriteRule    ^Blog/Date/201010/Blog/([^/\.]+)/?$    https://www.stevefenton.co.uk/2010/10/$1/    [R=301,NC,L] 
RewriteRule    ^Blog/Date/201011/Blog/([^/\.]+)/?$    https://www.stevefenton.co.uk/2010/11/$1/    [R=301,NC,L] 
RewriteRule    ^Blog/Date/201012/Blog/([^/\.]+)/?$    https://www.stevefenton.co.uk/2010/12/$1/    [R=301,NC,L]
```

And so on… for every year I had written a blog post! Once this was working, I compressed these twelve rules into the single rule. I did this by finding the month part of the URL and making that a parameter in the new URL.

```
<pre class="prettyprint lang-apache_conf">
RewriteRule    ^Blog/Date/2010([^/\.]+)/Blog/([^/\.]+)/?$    https://www.stevefenton.co.uk/2010/$1/$2/    [R=301,NC,L]
```

The surprise rule I needed to create was for a bunch of old HTML files that are still getting a lot of traffic. These were example files for some jQuery and JavaScript scripts I wrote a long time ago. I didn’t realise they were popular, but there were a lot of hits for these files arriving at the 503 rule. Once I uploaded these old files so people can access them once again, I realised there was a second problem… case sensitive folders! For some reason, half the traffic was hitting an upper-case “File” folder and the other half a lower-case “file” folder. So I added a rule to redirect the upper-case version to the lower-case version.

```
<pre class="prettyprint lang-apache_conf">
RewriteRule    ^cmsfiles/assets/File/(.*)    cmsfiles/assets/file/$1    [R=301,L]
```

Most of the other rules were to redirect a specific asset to a new address, but both sides of the rule are hard-coded so it would be too boring to list them all. Here are some examples of a page in the old world being transferred to a specific area in the new world. These are the easiest rules to read because both sides look pretty much exactly like the actual web addresses.

```
<pre class="prettyprint lang-apache_conf">
RewriteRule     ^The-Humans-Are-Dead/?$        https://www.stevefenton.co.uk/publications/the-humans-are-dead/   [R=301,NC,L] 
RewriteRule     ^TypeScript-Articles/?$        https://www.stevefenton.co.uk/tag/typescript/                     [R=301,NC,L] 
RewriteRule     ^Test-Automation-Articles/?$   https://www.stevefenton.co.uk/category/automation/                [R=301,NC,L]
```
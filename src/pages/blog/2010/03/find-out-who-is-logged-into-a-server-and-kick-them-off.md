---
id: 1055
title: 'Find Out Who is Logged In to a Server and Kick Them Off'
pubDate: '2010-03-06T22:04:27+00:00'
author: 'Steve Fenton'
layout: post
guid: 'https://www.stevefenton.co.uk/?p=1055'
permalink: /2010/03/find-out-who-is-logged-into-a-server-and-kick-them-off/
interface_sidebarlayout:
    - default
categories:
    - Windows
---

If you remote onto a Windows server with any kind of regularity, you will probably have come across a scenario where the number of concurrent connections has reached the limit. This is often followed by shouting across the office or sending an email asking people if they are connected and whether they can log off so you can get on.

Well, shout no longer as you can find out who’s logged onto a machine by running this simple command in command prompt. In this example, the server name is “YOURSERVERNAME”.

```
<pre class="prettyprint lang-powershell">query session /server:YOURSERVERNAME
```

And if you find out that someone has logged in and then left the country, you can kick them off too – the above command will tell you each user’s session id and you can use this to boot them off the box. In this example, the session id is 1.

```
<pre class="prettyprint lang-powershell">rwinsta /server:YOURSERVERNAME 1
```

There – problem solved!
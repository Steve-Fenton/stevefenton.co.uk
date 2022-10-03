---
layout: src/layouts/Default.astro
navMenu: false
title: 'Configure remote desktop connection disconnected session timeout'
pubDate: 2016-09-27T09:06:05+01:00
authors:
    - steve-fenton
categories:
    - Windows
tags:
    - 'Group Policy'
    - RDP
---

In older versions of Windows, you could set disconnected Remote Desktop Connections to timeout after a set period using the Remote Desktop Session Host Configuration.

In Windows Server 2012, you may find that Remote Desktop Session Host Configuration is missing from your Administration Tools – but don’t despair as you can configure this using group policy.

Open group policy admin and navigate to User Configuration -&gt; Administrative Templates -&gt; Windows Components -&gt; Remote Desktop Services…

![RDP Disconnected Session Step 1](/img/2016/09/rdp-disconnected-session-001.png)

Expand Remote Desktop Session Host Configuration -&gt; Session Time Limits and select “Set time limit for disconnected sessions”…

![RDP Disconnected Session Step 2](/img/2016/09/rdp-disconnected-session-002.png)

And finally, set the item to “Enabled” and select time limit that should elapse before ending the disconnected session…

![RDP Disconnected Session Step 3](/img/2016/09/rdp-disconnected-session-003.png)
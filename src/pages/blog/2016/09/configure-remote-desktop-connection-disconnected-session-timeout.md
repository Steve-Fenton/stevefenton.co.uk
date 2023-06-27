---
title: 'Configure remote desktop connection disconnected session timeout'
navMenu: false
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

Open group policy admin and navigate to User Configuration -> Administrative Templates -> Windows Components -> Remote Desktop Services…

:::div{.inset}
:img{src="/img/2016/09/rdp-disconnected-session-001.png" alt="RDP Disconnected Session Step 1" loading="lazy"}
:::

Expand Remote Desktop Session Host Configuration -> Session Time Limits and select “Set time limit for disconnected sessions”…

:::div{.inset}
:img{src="/img/2016/09/rdp-disconnected-session-002.png" alt="RDP Disconnected Session Step 2" loading="lazy"}
:::

And finally, set the item to “Enabled” and select time limit that should elapse before ending the disconnected session…

:::div{.inset}
:img{src="/img/2016/09/rdp-disconnected-session-003.png" alt="RDP Disconnected Session Step 3" loading="lazy"}
:::

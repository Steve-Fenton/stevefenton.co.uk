---
id: 716
title: 'Self-hosted WCF service with certificates'
pubDate: '2012-10-09T23:33:06+01:00'
author: 'Steve Fenton'
layout: post
guid: 'https://www.stevefenton.co.uk/?p=716'
permalink: /2012/10/self-hosted-wcf-service-with-certificates/
interface_sidebarlayout:
    - default
categories:
    - Programming
tags:
    - .net
    - 'c#'
    - wcf
---

If you are self-hosting a WCF service, exposed via HTTP and requiring certificates for transport security, you’ll probably need to learn a little bit about netsh.

If you are using IIS, you’ll just set up the certificates using inetmgr, but because you are self-hosting, you’ll need to run a command such as this:

```
<pre class="prettyprint lang-powershell">
netsh http add sslcert ipport=127.0.0.1:8000 certhash=c20ed305ea705cc4e36b317af6ce35dc03cfb83d appid={c9670020-5288-47ea-70b3-5a13da258012} clientcertnegotiation=enable
```

This will register the certificate against the URI and application.

“ipport” is the IP address and port number you are hosting the WCF service under.

“certhash” is the Thumbprint of the certificate. Using the MMC certificate snap-in, you can view the certificate and find the Thumbprint under the “Details” tab. Remove the spaces if there are any.

“appid” is the GUID from your AssemblyInfo file in your WCF host project.

```
<pre class="prettyprint lang-csharp">
[assembly: Guid("c9670020-5288-47ea-70b3-5a13da258012")]
```

“clientcertnegotiation” allows you to enable negotiation, which is disabled by default.

You can find information of all of the parameters on the [Microsoft Technet article on netsh](https://technet.microsoft.com/en-us/library/cc725882(v=ws.10).aspx#BKMK_2). Please let me know when this link dies, as all Microsoft links seem to do!
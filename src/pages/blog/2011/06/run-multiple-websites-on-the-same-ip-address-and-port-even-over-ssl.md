---
id: 933
title: 'Run multiple websites on the same IP address and port; even over SSL'
pubDate: '2011-06-06T18:09:23+01:00'
author: 'Steve Fenton'
layout: post
guid: 'https://www.stevefenton.co.uk/?p=933'
permalink: /2011/06/run-multiple-websites-on-the-same-ip-address-and-port-even-over-ssl/
interface_sidebarlayout:
    - default
categories:
    - Programming
tags:
    - iis
    - tls
---

TL;DR – the TLS SNI extention allows you to pick the right certificate if you have multiple secure host names on the same IP address and port, this is supported by all major browsers and by IIS8, and HAProxy (amongst others). Some of the below information is now a little dated – you shouldn’t really be running websites on IIS6 any more!

- - - - - -

I was setting up a test server that needed two web sites that normally wouldn’t reside on the same box. Not only did I want to run them on the same IIS6 server, I wanted them to both use port 80 for unsecured communications and I wanted them both to use port 443 for TLS.

### Two Web Sites With The Same IP Address And Port

I found that getting both to work on port 80 was reasonably simple. You just add host-headers to the two web sites and they behave perfectly. Here is how you do it.

1. Click “<span style="font-weight: bold;">Start</span>” &gt; “<span style="font-weight: bold;">Run</span>” and type in “<span style="font-weight: bold;">inetmgr</span>“, this will open IIS Manager.
2. Right-click on one of the websites you want to share the same IP and port and select “<span style="font-weight: bold;">Properties</span>“.
3. In the “<span style="font-weight: bold;">Web Site</span>” tab, click on “<span style="font-weight: bold;">Advanced</span>“.

In the “Advances Web Site Identification” screen, you will see an entry that by default reads:

- IP Address: Default
- TCP Port 80 (or 81 for your second web site)
- Host Header Value (nothing).

Click on this entry and hit the “<span style="font-weight: bold;">Edit…</span>” button. You can now enter the details you want to share:

Select the IP Address from the drop down list and type in the port number, for example “80”. Now type in the host-header value, which will be the address people type into their browser, for example: “test.stevefenton.co.uk”.

Click on “OK”, then click “OK” again, then click “Apply” in the properties window.

For the second web site, repeat the process, but enter the different host-header, so instead of “test.stevefenton.co.uk” enter “other.stevefenton.co.uk”.

So the request comes in on the shared IP address and on the same port, but IIS uses the web address to determine which web site to send the request to, all based on those host headers. So a request to http://test.stevefenton.co.uk/hello/world/” would be routed to web site 1 and a request to http://other.stevefenton.co.uk/hello/world/” would be sent to web site 2.

### Two Websites, One IP Address and TLS

Things aren’t quite as simple if you also introduce TLS into the equation. The problem here is that the host-header is now encrypted, so IIS can’t read the host-header to determine which web site to send the request to. The request can only be decrypted by using the certificate assigned to the relevant website, but we don’t know which one that is – so we’re stuck in a catch-22 scenario.

Luckily, there is a way to set this up in IIS. In order to do this, you will need a wild-card certificate, so in the case of the example we are using we need a certificate that can be used on both test.stevefenton.co.uk and other.stevefenton.co.uk – so we need:

\*.stevefenton.co.uk

The \* symbolises a wild-card certificate and it means it can work for \[anything\].stevefenton.co.uk.

So with your wild-card certificate neatly installed in IIS, you need to set it up against both web sites. To do this, head to the “Directory Security” tab in the web site properties (normally found right above the “Web Site” tab that we were using earlier).

Select “Server Certificate…”. This opens the Web Server Certificate Wizard. Click “<span style="font-weight: bold;">Next</span>” and select the relevant option (“Reuse existing certificate if it is already installed in IIS). Make sure you enter port 443 for the secure port.

Repeat this step for each web site for which you want to share the IP Address and Port.

Note: IIS may actually refuse to start your web sites at this point, but this is expected until we perform the final step!

Once the certificate has been set up on each web site, open up a new command prompt window.

Navigate to the IIS Admin Scripts folder, usually:

```
<pre class="prettyprint lang-powershell">
cd c:\Inetpub\AdminScripts
```

Then run this commend for each web site:

```
<pre class="prettyprint lang-powershell">
cscript adsutil.vbs set /w3svc/[Identifier]/SecureBindings ":443:[host-header]"
```

The “Identifier” is visible inside IIS Manager by clicking on the “Web Sites” folder.

So for our example, we would run:

```
<pre class="prettyprint lang-powershell">
cscript adsutil.vbs set /w3svc/1/SecureBindings ":443:test.stevefenton.co.uk"
cscript adsutil.vbs set /w3svc/2/SecureBindings ":443:other.stevefenton.co.uk"
```

If you make a mistake, for example if you spell the host header incorrectly, you can just run the script again with the correct spelling. The response to this message will look like this:

```
<pre class="prettyprint lang-powershell">
: <LIST> ":443:test.stevefenton.co.uk"
```

Once you have run this for each web site, you should run an IIS Reset and make sure that all of your web sites have started. If you have forgotten one of the steps listed in this article, one of your web sites will refuse to start with a message about not being able to write a file that already exists.

What this process changes is that it allows IIS to decrypt the host-header using the shared certificate before it decides which web site can service the request. With the decrypted host header, IIS can route the request to the correct web site.

### Multiple Certificates

You may also be thinking of using multiple certificates to run entirely different domains on TLS using a certificate for each domain. Up to IIS 7, you can’t do this because you have a chicken and an egg. You would need to perform the TLS handshake before you can see the host name (chicken) and you need the host name to know which certificate to use (egg). So you have to use one certificate for all requests on port 443. You can use a different certificate on a different port, or a multi-domain certificate, or a different server!

IIS 8 has support for Server Name Indication (SNI), which is a TLS extension that allows a virtual domain to be included in the handshake. This would make it possible to select the certificate based on this server name (as long as the browser also supports SNI).
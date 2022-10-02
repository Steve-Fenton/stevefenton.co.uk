---
id: 734
title: 'Convert a certificate from JKS format to PFX format'
pubDate: '2012-09-24T23:54:20+01:00'
author: 'Steve Fenton'
layout: post
guid: 'https://www.stevefenton.co.uk/?p=734'
permalink: /2012/09/convert-certificate-from-jks-format-to-pfx-format/
interface_sidebarlayout:
    - default
categories:
    - Programming
tags:
    - java
    - jks
    - pfs
---

I am currently hopping back and forth between the world of Java and the world of .NET and consequently I am learning a lot of little tricks that developers bridging these two worlds may find handy.

Today’s trick is to convert a certificate from a Java .jks file into a .pfx file so it can be imported into the machine certificate store.

For those who like that classic little black number (command prompt), you’re going to love this.

First of all, we are going to be using Java via the command line, so we’ll hop into the right folder:

```
<pre class="prettyprint lang-powershell">
cd "c:\Program Files\Java\jre6\bin"
```

And now we can do the good stuff – this command converts a .jks with a password into a .pfx with the same password. If you omit the passwords, you’ll be asked to get interactive and type them in.

```
<pre class="prettyprint lang-powershell">
keytool -importkeystore -srckeystore "C:\certs\test.jks" -srcstoretype JKS -srcstorepass SomePassword -destkeystore "C:\certs\test.pfx" -deststoretype PKCS12 -deststorepass SomePassword
```

Once you run this, you should get a .pfx file in the location you specified – so it is over to winhttpcertcfg to add the certificate into your machine key store (for [Windows Server 2003 onwards, don’t forget to give permission to Network Service](https://www.stevefenton.co.uk/2011/01/X509-Certificates-On-Windows-Server-2003/)!). If goes without saying that you might see some funky messages, but [you can probably find an answer to the common problems here](https://www.stevefenton.co.uk/2012/09/Java-Keytool-And-Keystores-Common-First-Timer-Problems/).
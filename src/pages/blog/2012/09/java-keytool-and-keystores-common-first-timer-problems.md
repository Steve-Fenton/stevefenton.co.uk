---
id: 740
title: 'Java keytool and keystores: Common first-timer problems'
pubDate: '2012-09-13T00:04:16+01:00'
author: 'Steve Fenton'
layout: post
guid: 'https://www.stevefenton.co.uk/?p=740'
permalink: /2012/09/java-keytool-and-keystores-common-first-timer-problems/
interface_sidebarlayout:
    - default
categories:
    - Programming
tags:
    - java
    - jks
---

I have used the Windows certificate store quite a lot over the years, including fixing a really gnarly issue caused by a minor change in Windows Server 2003, but I haven’t used the Java Keystore at all until recently. One thing I learned very quickly is that the error messages are utterly terrible most of the time and you can lose hours of your life labouring under the misguided belief that the error relates to the actual problem.

To help the next person who fires up command prompt to use the Java keytool for the first time, here are the problems I encountered on my first visit.

The first one is reasonably obvious. If the path to the keytool isn’t in your system paths, you’ll need to use the full path to use the keytool, which is `c:\Program Files\Java\jre6\bin>` or something similar (if you have multiple versions of JRE, see Additional Problems below!).

Once you are in the right place, you are likely to come across these errors:

> keytool error: java.io.IOException: Keystore was tampered with, or password was incorrect

The default password is *changeit*. You should probably follow that advice, but you’ll need to know this default password to get started.

> keytool error: java.lang.Exception: Input not an X.509 certificate

Sometimes this means you have forgotten to specify the alias when adding a certificate. Most of the time though, it is because it doesn’t like any content before the `-----BEGIN CERTIFICATE-----` or after the `-----END CERTIFICATE-----`. It is worth taking a back-up copy and then delete all the extra rubbish in the file other than these tags and the content in between – even white-space before and after.

> keytool error: java.io.FileNotFoundException: C:\\Program Files\\Java\\jre6\\lib\\security\\cacerts (Access is denied)

Browse the the file specified in the error message and give yourself permission to modify it – by default on Windows 7, SYSTEM has full access, but you will be read only.

### Additional Problems

As if that wasn’t enough, here are other pit-falls I found.

- If you are running 64 bit windows, you need to add to the “Program Files” flavour of the certificate store, not the “Program Files (x86)” flavour, unless you are specifically running your Java app in x86 mode.
- If you have multiple versions of JRE installed, you need to install to the one being used, i.e. “jre6” rather than “jre7”.

I hope this information helps you to have a smoother first encounter with the Keystore!
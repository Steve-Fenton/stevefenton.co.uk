---
id: 1051
layout: src/layouts/Default.astro
title: 'The Specified Directory Service Attribute or Value Does Not Exist'
pubDate: 2010-03-16T22:02:18+00:00
author:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=1051'
permalink: /2010/03/the-specified-directory-service-attribute-or-value-does-not-exist/
interface_sidebarlayout:
    - default
categories:
    - Programming
tags:
    - iis
---

“The specified directory service attribute or value does not exist”

If you’ve come across this problem while trying to use Active Directory, you may well be dancing the double-hop.

This issue can occur when you switch on “Integrated Windows Authentication” in IIS and then try to get some information from Active Directory for the logged-in user.

The reason for this error is that the credentials will only perform “one hop”, from the user’s local machine to the web server. When you try and carry these from the web server to Active Directory, this is a second hop and won’t work. The double-hop rule is there to stop your credentials from being passed around all over the place.

To see if you are suffering from the double-hop issue, change your IIS settings to “Basic Authentication”. This will solve the double-hop problem because this passes both the username and the password to the web server.
---
layout: src/layouts/Default.astro
title: 'Mixed content warnings on Kentico websites'
navMenu: false
pubDate: 2018-01-26T18:30:41+00:00
authors:
    - steve-fenton
categories:
    - CMS
tags:
    - Kentico
---

This can happen on any website, for the same reasons (there is usually a pesky non-secure image being loaded into your secure page) – but having seen the issue occur for the same reason on a couple of Kentico websites I thought I’d write down the fix.

:img{src="/img/2018/01/https-mixed-content-warning.png" alt="HTTPS Mixed Content Warning"}

It is quite common when combining Kentico and Azure to use an Azure CDN for images, which you store in Azure BLOB Storage. When you do this, the images get served from azureedge.net, or a custom domain attached to the CDN. If you haven’t set it up right, the URL will be:

`http://mediacdn-1.azureedge.net/media/image.png`

Because this is a `http` image on an `https` page, you get the surprised padlock.

Look in your `appSettings` for the key `CMSAzureCDNEndpoint` and you’ll probably find the endpoint has been set to:

`mediacdn-1.azureedge.net`

Simply change it to:

`https://mediacdn-1.azureedge.net`

## Mopping Up

Once you have done this, all future media added to the site will have the correct `https` address; but you’ll need to mop up any content that still refers to unsecure media.

You’ll know you are done when you see the happy padlock – and you can use the Network tab of your browser tools to identify unsecure resources on the page.

:img{src="/img/2018/01/https-all-good.png" alt="HTTPS All Good" loading="lazy"}
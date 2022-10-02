---
id: 1923
layout: src/layouts/Default.astro
title: 'Free up Windows Update disk space'
pubDate: 2016-08-24T14:42:13+01:00
author:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=1923'
permalink: /2016/08/free-up-windows-update-disk-space/
categories:
    - Windows
tags:
    - 'disk space'
    - updates
---

If you are regularly updating your servers, you may notice that after re-starting the disk space is not actually given back (i.e. the temporary files downloaded for the update remain).

This is because the files are typically still needed during the first re-start as the installation completes as part of this process.

The simple fix for this is to re-start a second time. On the second re-start the temporary files are removed.
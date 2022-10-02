---
layout: src/layouts/Default.astro
title: How Firefox Caching Works
navMenu: false
pubDate: 2009-07-23T22:30:52+01:00
author:
    - steve-fenton
categories:
    - Browsers
tags:
    - firefox
---

If you’re developing a website and you’re wondering how Firefox caches the files, here’s a run down of the behaviour. I’ve spend some time researching this for a project I’m working on and the information is surprising, but very useful.

## What’s In The Cache

In Firefox, you can see everything that has been cached by typing the following into your address bar:

> about:cache

On this page, you’ll see the three aspects of the Firefox cache; the Memory Cache, the Disk Cache and the Offline Cache.

If you want to truly understand why certain elements are refreshed and others aren’t when you’re debugging your web application (or optimising its performance) bear in mind the following cache-clearing pointers.

## Memory Cache

The Memory Cache can only be flushed by using SHIFT + Refresh.

## Disk Cache

The Disk Cache can be flushed by pressing Refresh (or F5).

## App Cache

The App Cache is part of the new offline web application functionality that was added in Firefox 3.
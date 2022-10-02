---
layout: src/layouts/Default.astro
navMenu: false
title: 'Getting a 404 response when using Chunked Encoding'
pubDate: 2013-09-30T10:49:43+01:00
authors:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=506'
interface_sidebarlayout:
    - default
categories:
    - Programming
tags:
    - chunked
    - http
---

I had an ASP.NET site hosted on IIS and I was getting a 404 response whenever I added a “Transfer-Encoding: chunked” HTTP header. The point of using chunked encoding on a request is that if you want to upload a large file you can do it in pieces and show a reasonable progress bar (rather than just a spinner). It is really only useful if you are sending large files – it makes the overall request larger.

But if the server didn’t support chunking (IIS does by default) I would expect either…

- A 500 range exception – the server would error because it might interpret the first chunk as the whole message
- A success response (you could get this if the server wasn’t using the body of the request).

But a 404 error seemed odd – it didn’t even feature the “x-powered-by: asp.net” response header, which suggested it hadn’t even got to the aspnet isapi dll.

[I tried asking on Stack Overflow](https://stackoverflow.com/questions/18920422/transfer-encoding-chunked-causes-404-the-system-cannot-find-the-file-specified), but nobody had come across this issue. Luckily, a clever chap I worked with a while back called James came to my rescue on social media and mentioned an IIS extension called URLScan.

A quick look at the documentation revealed that:

> “UrlScan v3.1 failures result in 404 errors and not 500 errors. Searching for 404 errors in your W3SVC log will include failures due to UrlScan blocking.”

And a check on the server confirmed that the extension was indeed installed (you can find it in a directory along the lines of… `C:\Windows\System32\inetsrv\URLScan`

In this folder, you will find a file named “URLScan.ini”, which you can fire up in a text editor. There will be a section headed “\[DenyHeaders\]”, which most likely contains “transfer-encoding:”.

It is this line that tells URLScan to reject all requests that contain this header, which means you get the 404 response.

Just delete the “transfer-encoding:” line from this section to enable chunked transfers.

A massive thank you to James!
---
title: 'Use GitHub Codespaces to test your dev changes on real devices'
navMenu: false
pubDate: 2022-12-06
keywords: github,codespaces
description: Find out how to use GitHub Codespaces to easily test local changes on a real mobile device.
bannerImage:
    src: /img/topic/github/github-universe.png
    alt: A chrome rainbow Octocat GitHub logo floats in space.
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - GitHub
---

Being able to run code locally to work through strange problems is vital for web development. If you are trying to fix a really strange browser issue, waiting to deploy code to make it available on real mobile devices is a real productivity killer.

If you need to run major detective work on your web app, GitHub Codespaces can be an easy way to test changes on real devices at the click of a refresh button.

With Codespaces, you don't need to configure your local machine to serve files to the Internet. You also don't need to wait for build/deploy processes, which is useful if you're experimenting and just want to hit refresh to see what happens. Another benefit is there is no cache to clear to see the changes (unless you've set one up to run at development time).

## Setting up for real-device testing

[Set up a GitHub Codespace](https://www.stevefenton.co.uk/blog/2022/11/github-codespaces/) if you haven't already.

Open the browser on your mobile device and sign in to [GitHub](https://github.com/). You will only be able to see the site if you are signed in, which is a neat security feature.

In your Codespace, type in the command to start your website, for example `npm run dev`. GitHub will notice the local server has started and will offer to open it in your browser. Hit this button!

:::figure{.inset}
:img{src="/img/2022/11/codespaces-localhost.png" alt="An editor prompt supplies an 'open in browser' link for your localhost address" loading="lazy"}
::figcaption[Open in browser to view your app]
:::

Copy the address of this page and message it to yourself (apps like Slack let you instant-message yourself).

Now on your mobile device, open the link you messaged to yourself.

You can now edit in the Codespace and refresh the page to see changes immediately.

## Troubleshooting

If this doesn't work, the most common reason is you forgot to sign in to GitHub in your mobile browser, or you are signed into the wrong account (i.e. your device is signed into your personal GitHub but you are using your work GitHub Codespace).

## Summary

Testing a website or web app on a real device used to be really tricky. With Codespaces, it's really easy.



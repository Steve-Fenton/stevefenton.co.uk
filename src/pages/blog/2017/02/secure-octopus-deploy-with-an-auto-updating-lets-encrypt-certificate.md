---
layout: src/layouts/Default.astro
title: Secure Octopus Deploy with an auto-updating Let's Encrypt certificate
navMenu: false
pubDate: 2017-02-15T06:00:14+00:00
authors:
    - steve-fenton
categories:
    - Automation
    - Programming
    - Windows
tags:
    - Deployments
    - IIS
    - Octopus
---

Octopus Deploy has a web portal that runs a self-hosted website on whatever port you specify. You can even have Octopus generate a self-signed certificate in order to use HTTPS when browsing the web portal… but if you connect other application that are strictly validating certificates, they won’t be too pleased with self-signed certificates. Purchasing certificates can also be expensive.

One solution is to use IIS as a proxy server, put it in front of Octopus Deploy, and have it handle the HTTPS traffic – with a free Let’s Encrypt certificate powering it (with automatic updates to the certificate as they only last 90 days).

Here are the steps you need to set this up. It takes less than 30 minutes.

## IIS

Add the IIS Role to your server, including:

Application Development -&gt; WebSocket Protocol

Install the [URL Rewrite IIS Extension](https://www.iis.net/downloads/microsoft/url-rewrite)

Install [Application Request Routing Extension](https://www.iis.net/downloads/microsoft/application-request-routing)

Restart IIS, either via IIS Manager or by running `iisreset`

Add a new website to your IIS sites called “octoproxy”.

## URL rewrite

Open up the URL Rewrite feature in IIS Manager:

:img{src="/img/2017/02/rewrite-icon.png" alt="URL rewrite icon" loading="lazy"}

There are three rules to set up, and the order is important (and you can re-order them at any time to ensure they are in the order shown below):

- A rule to handle the Let’s Encrypt validation
- A rule to redirect HTTP traffic to HTTPS
- A reverse proxy to rewrite requests to the local Octopus Web Portal

:img{src="/img/2017/02/url-rewrite.png" alt="URL rewrite" loading="lazy"}

Rule 1: Add a new blank rule…

- Name: Let’s Encrypt Check
- Requested URL: Matches the pattern
- Using: Regular Expressions
- Pattern: ^\\.well-known(.\*)
- Ignore Case: Yes
- Action Type: None
- Stop Processing: Yes

Rule 2: Add a new blank rule…

- Name: Redirect HTTP Traffic
- Pattern: (.\*)
- Ignore case: Yes
- Action Type: Redirect
- Redirect URL: http**s**://your-domain
- Redirect type: Permanent

And add the following condition to this rule:

- Condition Input: {HTTPS}
- Check if input string: Matches the Pattern
- Pattern: ^OFF$
- Ignore Case: Yes

Rule 3: Add a new Reverse Proxy rule…

Note! If you are prompted to enable <abbr title="Application Request Routing">ARR</abbr>, click “OK” as this is needed for the reverse proxy to work.

Enter the server name: http://localhost:8080/ and save the rule.

Open the rule (which will be auto-named as ReverseProxyInboundRule1… snappy) and enter the following details:

- Pattern: (.\*)

And add the following condition to this rule:

- Condition Input: {HTTP\_HOST}
- Check if input string: Matches the Pattern
- Pattern: your-url.com(.\*)
- Ignore Case: Yes

And add the following action to this rule:

- Action Type: Rewrite
- URL: http://localhost:8080/{R:1}
- Append Query String: Yes
- Stop Processing: Yes

## Octopus

In Octopus Manager, click “Change Bindings” and remove all bindings except http://localhost:8080/ (you may need to add this binding if it does not exist).

## Let’s Encrypt

[Grab the latest zip from the release page of Lone Coder’s “LetsEncrypt-Win-Simple” project](https://github.com/Lone-Coder/letsencrypt-win-simple/wiki) and put it somewhere permanant on the server. This is the simplest Let’s Encrypt client, others are available.

Run “letsencrypt.exe” as Administrator and follow the prompts. You’ll be asked to supply an email address (for failed certificate updates), and you’ll be asked to choose which IIS website you want to apply a certificate to.

It automatically obtains a certificate, adds HTTPS bindings, and sets up a schedule to renew the certicate.

## Summary

You now have a certificate from Let’s Encrypt pointing at a :443 binding for your “octoproxy” website, which rewrites requests to the local instance of the Octopus Web Portal. If you check out Task Scheduler, you’ll see the automated renewal for the certiciate. If someone visits your Octopus Web Portal on HTTP, they will be redirected to HTTPS.
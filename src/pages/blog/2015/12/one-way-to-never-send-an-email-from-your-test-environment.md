---
layout: src/layouts/Default.astro
navMenu: false
title: 'One way to never send an email from your test environment'
pubDate: 2015-12-16T22:00:20+00:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - 'c#'
    - smtp
    - testing
---

If you have software that generates emails, you’ll want to test it without risking sending an email to a real address. Of course, your test environment is full of fake accounts with safe email addresses and you know that you should avoid cutesy test data because it leads to trouble – but there will always be a risk if you hook up a real SMTP server to your test environment (for example, that usability testing you run where a non-software-professional gets to type in whatever they like).

That’s why I wrote [a Fake SMTP Server that can run as a Windows Service or a Console App](https://github.com/Steve-Fenton/SmtpStub).

The SMTP Stub application can either discard every email it receives, or you can ask it to log the raw email messages to a directory of your choice. You can specify a limit if you are storing emails, so it will only keep the most recent emails.

You can install the service using PowerShell:

```
<pre class="prettyprint lang-powershell">
New-Service -Name "SmtpStub" -BinaryPathName "C:\SmtpStub\Fenton.SmtpService.exe"
```
You can check it is running on port 25 using `Get-NetTCPConnection`. If it doesn’t show, don’t forget to start the service (it will start automatically with the machine, but as we’ve just installed it it will be stopped).

```
<pre class="prettyprint lang-powershell">
Get-NetTCPConnection -LocalPort 25
```
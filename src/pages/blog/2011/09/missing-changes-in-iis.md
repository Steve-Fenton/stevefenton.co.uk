---
title: 'Missing changes in IIS'
navMenu: false
pubDate: 2011-09-06T17:49:11+01:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - IIS
---

Have you ever made a change in :abbr[IIS]{title="Internet Information Services"} manager, performed an IIS reset and then discovered that your change has gone missing? If so, this article will be of use to you.

I was adding a wild card mapping in IIS for an isapi dll, and performing a quick IIS reset to rush things along, not realising that the IIS reset was actually causing my change to be lost!

There are several ways to avoid this common mistake and here are three of them.

## Option 1 – Recycle the App Pool instead

Microsoft point out that an `IISRESET` is just as severe as re-starting a web server – here is a quote from MSDN:

> …Restarting or stopping IIS, or rebooting your Web server, is a severe action. When you restart the Internet service, all sessions connected to your Web server (including Internet, FTP, SMTP, and NNTP) are dropped. Any data held in Web applications is lost. All Internet sites are unavailable until Internet services are restarted. For this reason, you should avoid restarting, stopping, or rebooting your server if at all possible. For a list of features designed to improve IIS reliability and remedy the need to restart IIS…

[IIS Reset on Microsoft](https://www.microsoft.com/technet/prodtechnol/WindowsServer2003/Library/IIS/95826e7a-bac4-4e1f-bcb6-c52d49c9d7f4.mspx?mfr=true)

A great alternative is to re-start the app pool instead, which is a more gentle way to flush stuff through.

Recycling an application pool causes the world wide web service to shut down all running worker processes that are serving the application pool, and then start new worker processes. It can also be configured to start the new worker process before it ends the old one, which means the recycle would be invisible to anyone browsing your website or calling your services.

## Option 2 – Ask IIS to save the config before you do the IIS RESET

Another option is to ask IIS to save the configuration, which forces changes to be immediately visible. If you are performing the IISRESET to just make your IIS changes visible, this is a good alternative and no IISRESET is required. If you are performing the IISRESET for a different reason, you can call this first to ensure IIS changes are saved. (Solution courtesy of James Bossingham)

> You can use the command-line script `iiscnfg.vbs`, which is stored in `systemroot\System32`, to immediately save configuration changes to disk. Administrators can use this script tool to make changes immediately visible in the `metabase.xml`.

```powershell
cscript.exe %SYSTEMROOT%\system32\iiscnfg.vbs /save
```

## Option 3 – Perform an IISRESET with NOFORCE

If you must perform an IISRESET, use the noforce option (solution courtesy of Steve Bond). This gives everything a fair chance to shut down gracefully and doesn't force the restart if something won't shut down within the 60 second limit.

```powershell
iisreset /noforce
```

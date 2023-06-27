---
title: 'Find out what is running on a particular port'
navMenu: false
pubDate: 2013-02-09T22:09:30+00:00
authors:
    - steve-fenton
categories:
    - Programming
    - Windows
---

Ever wondered what is tying up one of your ports when you try to spin something up and get the “already a process listening on port 182” error message?

Well enter netstat, which is handy utility for finding out what ports are taken.

The basic command is:

```powershell
netstat
```

This will crawl your ports and give you a list of ports that are taken.

```
Proto  Local Address          Foreign Address        State
  TCP    127.0.0.1:1282         MACHINE:1283       ESTABLISHED
  TCP    127.0.0.1:1283         MACHINE:1282       ESTABLISHED
```

This isn’t enough, so you’ll probably want details of the app that is causing the port to be taken. So you can use:

```powershell
netstat -b
```

If you get the message “The requested operation requires elevation”, either hold your computer above your head, or run command prompt in Administrator mode.

```
Proto  Local Address          Foreign Address        State
  TCP    127.0.0.1:1282         MACHINE:1283       ESTABLISHED
 [firefox.exe]
  TCP    127.0.0.1:1283         MACHINE:1282       ESTABLISHED
 [firefox.exe]
```
---
title: 'Set Log Parser Studio log paths'
navMenu: false
pubDate: 2016-03-29T13:46:05+01:00
authors:
    - steve-fenton
categories:
    - Programming
    - Windows
tags:
    - IIS
    - 'Log Parser Studio'
    - Logs
---

Log parser studio has a handy UI for adding log file paths, but if you have a shared hosting server with loads of IIS sites, each logging to a different directory – you’ll want to automate the list of log file paths.

Go and find the file named `LPSFolders.tmp`, usually found in:

```
C:\\Users\\USER-NAME\\AppData\\Roaming\\ExLPT\\Log Parser Studio\\
```

The file will look like this:

```xml
<?xml version="1.0" encoding="utf-8"?>
<ArrayOfLPLogFile xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
  <LPLogFile>
    <Filename>E:\IIS-Logs\W3SVC1\*.log</Filename>
    <isChecked>true</isChecked>
  </LPLogFile>
</ArrayOfLPLogFile>
```

All you need to do is add an `LPLogFile` for each folder… I generated the list of several hundred folders with a script…

```xml
<?xml version="1.0" encoding="utf-8"?>
<ArrayOfLPLogFile xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
  <LPLogFile>
    <Filename>E:\IIS-Logs\W3SVC1\*.log</Filename>
    <isChecked>true</isChecked>
  </LPLogFile>
  <LPLogFile>
    <Filename>E:\IIS-Logs\W3SVC2\*.log</Filename>
    <isChecked>true</isChecked>
  </LPLogFile>
  <LPLogFile>
    <Filename>E:\IIS-Logs\W3SVC3\*.log</Filename>
    <isChecked>true</isChecked>
  </LPLogFile>
  <LPLogFile>
    <Filename>E:\IIS-Logs\W3SVC4\*.log</Filename>
    <isChecked>true</isChecked>
  </LPLogFile>
  <LPLogFile>
    <Filename>E:\IIS-Logs\W3SVC5\*.log</Filename>
    <isChecked>true</isChecked>
  </LPLogFile>
  <LPLogFile>
    <Filename>E:\IIS-Logs\W3SVC6\*.log</Filename>
    <isChecked>true</isChecked>
  </LPLogFile>
  <LPLogFile>
    <Filename>E:\IIS-Logs\W3SVC7\*.log</Filename>
    <isChecked>true</isChecked>
  </LPLogFile>
  <LPLogFile>
    <Filename>E:\IIS-Logs\W3SVC8\*.log</Filename>
    <isChecked>true</isChecked>
  </LPLogFile>
  <LPLogFile>
    <Filename>E:\IIS-Logs\W3SVC9\*.log</Filename>
    <isChecked>true</isChecked>
  </LPLogFile>
  <LPLogFile>
    <Filename>E:\IIS-Logs\W3SVC10\*.log</Filename>
    <isChecked>true</isChecked>
  </LPLogFile>
  <LPLogFile>
    <Filename>E:\IIS-Logs\W3SVC11\*.log</Filename>
    <isChecked>true</isChecked>
  </LPLogFile>
  <LPLogFile>
    <Filename>E:\IIS-Logs\W3SVC12\*.log</Filename>
    <isChecked>true</isChecked>
  </LPLogFile>
  <LPLogFile>
    <Filename>E:\IIS-Logs\W3SVC13\*.log</Filename>
    <isChecked>true</isChecked>
  </LPLogFile>
  <LPLogFile>
    <Filename>E:\IIS-Logs\W3SVC14\*.log</Filename>
    <isChecked>true</isChecked>
  </LPLogFile>
  <LPLogFile>
    <Filename>E:\IIS-Logs\W3SVC15\*.log</Filename>
    <isChecked>true</isChecked>
  </LPLogFile>
  <LPLogFile>
    <Filename>E:\IIS-Logs\W3SVC16\*.log</Filename>
    <isChecked>true</isChecked>
  </LPLogFile>
  <LPLogFile>
    <Filename>E:\IIS-Logs\W3SVC17\*.log</Filename>
    <isChecked>true</isChecked>
  </LPLogFile>
  <LPLogFile>
    <Filename>E:\IIS-Logs\W3SVC18\*.log</Filename>
    <isChecked>true</isChecked>
  </LPLogFile>
  <LPLogFile>
    <Filename>E:\IIS-Logs\W3SVC19\*.log</Filename>
    <isChecked>true</isChecked>
  </LPLogFile>
  <LPLogFile>
    <Filename>E:\IIS-Logs\W3SVC20\*.log</Filename>
    <isChecked>true</isChecked>
  </LPLogFile>
  <LPLogFile>
    <Filename>E:\IIS-Logs\W3SVC21\*.log</Filename>
    <isChecked>true</isChecked>
  </LPLogFile>
  <LPLogFile>
    <Filename>E:\IIS-Logs\W3SVC22\*.log</Filename>
    <isChecked>true</isChecked>
  </LPLogFile>
  <LPLogFile>
    <Filename>E:\IIS-Logs\W3SVC23\*.log</Filename>
    <isChecked>true</isChecked>
  </LPLogFile>
  <LPLogFile>
    <Filename>E:\IIS-Logs\W3SVC24\*.log</Filename>
    <isChecked>true</isChecked>
  </LPLogFile>
  <LPLogFile>
    <Filename>E:\IIS-Logs\W3SVC25\*.log</Filename>
    <isChecked>true</isChecked>
  </LPLogFile>
  <LPLogFile>
    <Filename>E:\IIS-Logs\W3SVC26\*.log</Filename>
    <isChecked>true</isChecked>
  </LPLogFile>
  <LPLogFile>
    <Filename>E:\IIS-Logs\W3SVC27\*.log</Filename>
    <isChecked>true</isChecked>
  </LPLogFile>
  <LPLogFile>
    <Filename>E:\IIS-Logs\W3SVC28\*.log</Filename>
    <isChecked>true</isChecked>
  </LPLogFile>
  <LPLogFile>
    <Filename>E:\IIS-Logs\W3SVC29\*.log</Filename>
    <isChecked>true</isChecked>
  </LPLogFile>
  <LPLogFile>
    <Filename>E:\IIS-Logs\W3SVC30\*.log</Filename>
    <isChecked>true</isChecked>
  </LPLogFile>
  <LPLogFile>
    <Filename>E:\IIS-Logs\W3SVC31\*.log</Filename>
    <isChecked>true</isChecked>
  </LPLogFile>
  <LPLogFile>
    <Filename>E:\IIS-Logs\W3SVC32\*.log</Filename>
    <isChecked>true</isChecked>
  </LPLogFile>
  <!-- You get the idea ... -->
</ArrayOfLPLogFile>
```

Save this file and re-start Log Parser Studio and you’ll see that your log file paths now contain all of the folders you added.
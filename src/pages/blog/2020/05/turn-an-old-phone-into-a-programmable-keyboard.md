---
layout: src/layouts/Default.astro
navMenu: false
title: 'Turn an old phone into a programmable keyboard'
pubDate: 2020-05-25T21:41:08+01:00
author:
    - steve-fenton
image: /wp-content/uploads/2020/05/touch-portal-mobile-app-scaled.jpg
categories:
    - Programming
    - Windows
tags:
    - keyboard
    - powershell
    - 'touch portal'
---

It seems like everyone has a high-quality, expensive, programmable deck on their desk these days. Elgato’s Stream Deck, with it’s glowing LCD buttons, comes in flavours that cost between £100 and £200 (depending on how many buttons you want). It’s beautiful bit of kit that glows its way into the hearts of tech geeks everywhere. If you’re on a budget, though, you can hack together some neat shortcuts using just an old phone, and Touch Portal.

Touch Portal is a desktop app, and a mobile app, that chat to each other to let you perform one tap shortcuts. There are a number of built in utilities you can run, but with batch file and PowerShell available – the only limit is your imagination. I run it in USB mode, so it’s just a case of plugging in the phone that has the Touch Portal app installed and selecting the USB mode in the desktop app (it’s in the bottom-left corner).

Touch Portal is freemium, so you can use two screens for free, and pay a small amount (around £10-£15) to go Pro and use the app without limits.

[![Touch Portal Desktop App](https://www.stevefenton.co.uk/wp-content/uploads/2020/05/touch-portal-1024x603.jpg)](https://www.stevefenton.co.uk/2020/05/turn-an-old-phone-into-a-programmable-keyboard/touch-portal/)

Adding buttons is pretty simple. You can visually compose logic and actions using an interface no unlike MIT’s Scratch to do a variety of tasks. One of the key simple tasks is keyboard shortcuts. I have a collection of shortcut buttons in pages for Microsoft Teams and for Microsoft Visual Studio. They let me do things like mute and unmute myself with a bit button, so I don’t have to remember all the handy [Microsoft Teams Shortcut Keys](https://www.stevefenton.co.uk/2020/03/microsoft-teams-what-microsoft-taught-me-this-week/). For Visual Studio I have a one-tap “Run Tests”, plus some common refactoring shortcuts.

[![Touch Portal Mobile App](https://www.stevefenton.co.uk/wp-content/uploads/2020/05/touch-portal-mobile-app-1024x768.jpg)](https://www.stevefenton.co.uk/2020/05/turn-an-old-phone-into-a-programmable-keyboard/touch-portal-mobile-app/)

### Running batch files or PowerShell

To run a batch file or PowerShell script, you just point to the script location on your machine. Simples. It’s best to start from an already working script file, so develop that first and then point at it. I use the “Start Script and Wait” task to launch the script.

Now, in terms of getting feedback, the output from the scripts is appended to the Touch Portal log file in `%APPDATA%\TouchPortal\log.txt`. What you may want to do, though, is pop yourself a little dialog. It’s a bit of a hack, but a simple way to show a dialog from a PowerShell script is to import Presentation and pop a MessageBox:

```
<pre class="prettypring lang-powershell">
Add-Type -AssemblyName PresentationCore,PresentationFramework
[System.Windows.MessageBox]::Show('The test data has now been copied to all locations')
```

The ability to run scripts effectively makes it possible to do anything. Between this and the simple-to-build keyboard shortcuts, this is a great alternative to a hardware programmable keyboard.
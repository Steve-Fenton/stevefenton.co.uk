---
layout: src/layouts/Default.astro
title: How to find installed text to speech voices on Windows
navMenu: false
pubDate: 2022-05-16T09:21:12+01:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - vscode
---

I’m using a Visual Studio Code extension that provides text-to-speech, which I use as part of [my VS Code writing set up](/2022/03/writing-in-visual-studio-code/). It has a simple set of two options, speed (1.5x of course) and voice, which is a text field as different options exist on different operating systems.

As I’m using Windows 11 on a Surface Book 3, I can quickly find installed voices using a PowerShell script…

```powershell
Add-Type -AssemblyName System.speech
$synth = New-Object System.Speech.Synthesis.SpeechSynthesizer
$synth.GetInstalledVoices() | foreach { $_.VoiceInfo.Name }
```

Running these three lines of PowerShell will give you a list such as this:

```powershell
Microsoft Hazel Desktop
Microsoft Zira Desktop
```

Enter the full name, such as “Microsoft Zira Desktop”, in the settings for the VSCode Speech plugin settings. You should set this under user preferences, not workspace settings – as speed and voice is going to be a personal choice for your colleagues.
---
layout: src/layouts/Default.astro
title: 'Stop Visual Studio prompting for NuGet feed credentials'
navMenu: false
pubDate: 2015-11-19T06:00:40+00:00
authors:
    - steve-fenton
categories:
    - 'Visual Studio'
tags:
    - Nuget
---

With the imminent arrival of Visual Studio Online Package Manager, which lets us host NuGet (and other) packages on our Visual Studio Online account, it is almost certain that you are going to lose the plot when managing NuGet packages in Visual Studio and keep getting prompted for your account details (especially as the “Remember Credentials” tick box is just there to upset you).

If you head to the folder:

```
C:\Users\­bob.example\­AppData\­Roaming\­NuGet
```

…you can add the following to the NuGet.config file.

```xml
<packageSourceCredentials>
  <YourFeedName>
    <add key="Username" value="yourfeedname.pkgs.visualstudio.com\bob.example" />
    <add key="ClearTextPassword" value="secret" />
  </YourFeedName>
</packageSourceCredentials>
```

You can also secure this by adding the credentials via NuGet.exe – in which case the password will be encrypted.

```cmd
Nuget.exe Sources Add -Name YourFeedName -UserName yourfeedname.pkgs.visualstudio.com\bob.example -Password secret
```
---
layout: src/layouts/Default.astro
title: 'Connect TFS Cruiser to Visual Studio Team Services'
navMenu: false
pubDate: 2015-05-11T23:55:49+01:00
authors:
    - steve-fenton

categories:
    - Automation
    - 'Visual Studio'
tags:
    - 'Azure DevOps'
---

If you have used TFS Cruiser for your on-prem instance of TFS, you may wonder how to adjust it to work with Visual Studio Team Services. It is a pretty simple three-step process.

## Step One – Credentials

You definitely don’t want to put your user name and password into the TFS Cruiser config file. Instead, you should set up alternate credentials to use with the API. You can do this by navigating to the following option in Visual Studio Online:

My Profile > Credentials > Add alternate credentials

:::div{.inset}
:img{src="/img/2015/07/visual-studio-online-my-profile.png" alt="Visual Studio Online - My Profile" loading="lazy"}
:::

## Step Two – Config

You can now use your alternate credentials to update your config file.

```xml
<add key="TfsServerAddress" value="https://[Account Name].visualstudio.com/DefaultCollection/"/>
<add key="TfsDomain" value="Windows Live ID"/>
<add key="TfsUsername" value="[The user name you created]"/>
<add key="TfsPassword" value="[The password you created]"/>
```

## Step Three – Done

And that is how simple it all is. You can now track your builds on Visual Studio Online.
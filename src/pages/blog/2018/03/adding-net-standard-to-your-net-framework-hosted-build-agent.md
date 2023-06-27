---
title: 'Adding .NET Standard to your .NET Framework hosted build agent'
navMenu: false
pubDate: 2018-03-19T10:12:27+00:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - .net
    - Builds
    - C-Sharp
    - msbuild
---

I had an existing .NET Framework project, from which I wanted to reference a .NET Standard 2.0 NuGet package. Due to the project having some history, I needed to make a few changes to get it building via a hosted build agent. Here is a run down of all the changes – if your project was created more recently you may find you need to perform less of these steps.

I found a few articles telling me to add NuGet packages, or additional build steps; but I found that this wasn’t necessary.

I’m using Visual Studio 2017; things may be more complicated if you are using an older version of Visual Studio.

## Project properties

The first change is pretty simple. You can reference .NET Standard libraries from a .NET Framework application that targets .NET Framework 4.6.1 or above. You can change this in Project Properties, Application, Target Framework.

:::div{.inset}
:img{src="/img/2018/03/target-framework.png" alt="Target Framework" loading="lazy"}
:::

At this point, you should be able to get everything working *on your machine*. Now let’s start work on the build agent!

## Update your build

If you get errors during your build, it is likely you need to update the Visual Studio version in your build definition. This changes the demands your build will make of the hosted build agent. There are a few places that you need to change to keep things in sync.

At the “Process” level of the build definition, there is an Agent Queue, which needs to be set to “Hosted VS2017”. If your phases inherit from the definition, setting it here will fix all phases, otherwise proceed to change each phase.

Azure DevOps builds now have tasks divided into phases. If you click on the phase, you’ll find it has a section called Agent Selection, containing an Agent Queue selection. This needs to be set to “Hosted VS2017”.

:::div{.inset}
:img{src="/img/2018/03/agent-selection.png" alt="Agent Selection" loading="lazy"}
:::

You will also need to update your build tasks, so they ask for the correct Visual Studio version.

In your Build Solution step, set the Visual Studio Version to “Visual Studio 2017”.

In your Test Assemblies step, open the Advanced Execution Options and set the VSTest Version to “Latest”.

## Summary

If you are from the future and you are reading this, bear in mind the situation will likely have improved. I heard that there might be improvements coming to make it easier to change the Visual Studio version throughout your build without having to change it in multiple places – and I’m certain the as .NET Standard and .NET Core increase their share in packageland, consuming them from a full .NET Framework application will just become day-job stuff.
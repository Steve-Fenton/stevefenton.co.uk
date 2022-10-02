---
layout: src/layouts/Default.astro
title: Working with WSL distributions
navMenu: false
pubDate: 2022-02-21T20:00:56+00:00
authors:
    - steve-fenton
categories:
    - Windows
tags:
    - linux
    - powershell
    - wsl
---

Today I made my first contact with Windows Subsystem for Linux (WSL). <abbr title="Windows Subsystem for Linux">WSL</abbr> lets you run Linux on the command line without having to dual-boot, with lots of built-in help that makes things work across your network and file system.

If you are new to WSL, I found it helpful to complete the [get started with WSL tutorial on Microsoft Learn](https://docs.microsoft.com/en-us/learn/modules/get-started-with-windows-subsystem-for-linux/?WT.mc_id=DT-MVP-5002938). There is also a [WSL documentation site](https://docs.microsoft.com/en-us/windows/wsl/?WT.mc_id=DT-MVP-5002938).

What I’ll describe in this article is how to create a base distribution (or *distro* to the cool kids) that can be used to create additional instances. My specific use case will be making a distro that is up-to-date and includes some standard tools that I want in every instance.

## Exporting a WSL distro

Once you have your instance updated and have installed any baseline tools you will need in all your future machines, you can use the `wsl` command in PowerShell to export your instance into a distro.

First, we’ll create a directory to store the exported distros.

```powershell
PS C:\> New-Item -Path c:\wsl-exports -ItemType directory
```

Then we can see what available distributions we have by listing them all:

```powershell
PS C:\> wsl --list --all
Windows Subsystem for Linux Distributions:
Ubuntu (Default)
```

In my case, only the [default Ubuntu instance that I got from the Microsoft Store](https://www.microsoft.com/store/productId/9N6SVWS3RX71) is listed. This is the one I updated to get it in the right baseline state.

I can export this using the following command, where I name it “Ubuntu” and place it in the directory I just created.

```powershell
PS C:\> wsl --export Ubuntu c:\wsl-exports\ubuntu.tar
```

This may take some time, depending on what you’ve added to the distro.

## Importing a WSL distro

When you need to create a fresh test machine, you can run an import command. You need to import the distro into a folder, so let’s start by creating a directory for imported distros.

```powershell
PS C:\> New-Item -Path c:\wsl-distros -ItemType directory
```

Now we can import the distro by giving it a meaningful name, providing our import folder, and specifying where the distro should be imported from:

```powershell
PS C:\> wsl --import ExampleUbuntu c:\wsl-distros\exampleubuntu c:\wsl-exports\ubuntu.tar
```

To interact with the fresh instance, you can use:

```powershell
PS C:\> wsl -d ExampleUbuntu
Welcome to Ubuntu 20.04.4 LTS (GNU/Linux 5.10.16.3-microsoft-standard-WSL2 x86_64)
```

If you are using the new Windows Terminal, you can also choose “ExampleUbuntu” from the list of terminals.

## Removing a WSL distro

When you have finished with a temporary instance, you can unregister and delete it. This is a two-step process as the unregister command leaves the file system on your disk.

```powershell
PS C:\> wsl --unregister ExampleUbuntu
Unregistering...
```

Only run the remove command if you are sure you want to delete the whole instance.

```powershell
PS C:\> Remove-Item c:\wsl-distros\exampleubuntu -Recurse -Force
```
## Summary

This describes the basics of creating a custom distro that you can use to spin up instances in a known good state. This can help you avoid growing a nightmare instance that accumulates unnecessary features over time. By keeping a good starter distro, you can have a clean start each time you need a temporary machine without installing all your essential tools every time.
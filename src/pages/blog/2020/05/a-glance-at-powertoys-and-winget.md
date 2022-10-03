---
layout: src/layouts/Default.astro
title: A glance at PowerToys and WinGet
navMenu: false
pubDate: 2020-05-19T21:22:37+01:00
authors:
    - steve-fenton
bannerImage:
    src: /i/x/2020/05/powertoys-run-shell-command.jpg
    alt: The Power Toys run shell command
categories:
    - Programming
    - Windows
tags:
    - 'Power Toys'
    - WinGet
---

PowerToys and WinGet are exciting previews for Windows Users. If you are a civilian, you’ll be getting these in general release soon, but for technical folks might want to try things out early. Or now!

## PowerToys

[PowerToys](https://github.com/microsoft/PowerToys/tree/master/src/modules/launcher) has been in preview for a while. You’ll install it when someone shows off FancyZones, which gives you templated tiles to organise your desktop… but you’ll keep it because of the <kb>Alt</kb> + <kb>Space</kb> Run command.

:img{src="/img/2020/05/powertoys-run.jpg" alt="PowerToys Run Command" loading="lazy"}

This gives you super easy access to apps or open Windows, with a “Run as Administrator” shortcut and an “Open Folder” shortcut. If the application is already running, you’ll see the option with the “Running” annotation alongside it.

You can also launch a shell command by starting your input with `>`.

:img{src="/img/2020/05/powertoys-run-shell-command.jpg" alt="PowerToys Run Shell Command with winget install vscode" loading="lazy"}

It remembers common commands that you run, to save you time.

And finally, you can just use it as a calculator by typing in your calculations.

:img{src="/img/2020/05/powertoys-run-calculations.jpg" alt="PowerToys Run with 1452 * 2309" loading="lazy"}

## WinGet quick start

WinGet is basically that thing we all really, really, really wanted for Christmas and we now have it seven months early. It’s a package manager for Windows that let’s you get the apps you want.

There is a [super-cool early preview of WinGet available](https://github.com/microsoft/winget-cli/releases) for those who can handle early sight of things… your quick start is to run `winget show vscode` to view the Visual Studio Code package.

:img{src="/img/2020/05/winget-show.jpg" alt="Command Window with winget show vscode" loading="lazy"}

Installing Visual Studio Code is as simple as the following command… you even get a visual progress bar. Neat.

```bash
winget install vscode
```

:img{src="/img/2020/05/winget-install.jpg" alt="Command Window with winget install vscode" loading="lazy"}

Create yourself a file with the “stuff your team all uses” and check it into your source control system so you can all keep it up to date. That way, your new folks can be up and running in no time!

PowerToys is awesome and WinGet is ace… and you can use them together too.
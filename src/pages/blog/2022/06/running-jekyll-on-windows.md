---
layout: src/layouts/Default.astro
title: Running Jekyll on Windows
navMenu: false
pubDate: 2022-06-29
modDate: 2022-10-12
keywords: jekyll,windows
description: Find out how to run Jekyll on a Windows machine.
bannerImage:
    src: /i/x/topic/jekyll/jekyll-and-hyde-1931.png
    alt: Promotional for Jekyll and Hyde (1931)
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - Jekyll
    - Python
    - Ruby
---

If you want to run Jekyll on a Windows machine, there are just three steps you need to complete to get up and running:

1. Install languages
2. Install Jekyll
3. Run the site

## Install languages

To run Jekyll on Windows, you need to install the following:

- [Ruby with DevKit](https://rubyinstaller.org/downloads/)

Note that Ruby needs to be installed with DevKit as this is required when you install Ruby Gems. The download for Windows is an EXE that installs Ruby.

The installer should prompt you to run the following command at the end of the installation, but if not, run it manually and select option 3.

```bash
ridk install
```

## Install Jekyll

Once you have Ruby installed, you can install the Ruby Gems for Jekyll

```bash
gem install jekyll bundler webrick
```

If you used the wrong Ruby installer, you might not have all the dev tools. If you get an error on `gem installation`, go back and check your Ruby installer was the DevTools version.

Once the Gems are installed, you can check everything is ready by running a Jekyll version check:

```bash
jekyll -v
```

## Run the site

You'll need to install any dependencies to run an existing Jekyll site. If the site has a `package.json` file, run an `npm install` from the root folder of the Jekyll site:

Make sure all the packages are installed:

```bash
npm install
```

Then run the site using:

```bash
jekyll serve
```

The command will output the address of the server, which you can open in your browser:

```bash
Server address: http://127.0.0.1:4000/
Server running... press ctrl-c to stop.
```

Have fun with Jekyll!
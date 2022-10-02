---
layout: src/layouts/Default.astro
navMenu: false
title: 'Running Jekyll on Windows'
pubDate: 2022-06-29T11:03:16+01:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - jekyll
    - python
    - ruby
---

There are three parts to this quick start on running Jekyll on Windows. This assumes you pulled an existing Jekyll repo and want to run it locally. If you want to create something new, there’s a command for that, which you can run at the end of the install process before you serve the site `jekyll new sitename`

1. Install languages
2. Install Jekyll
3. Run the site

### Install languages

To run Jekyll on Windows, you need to install the following:

- Ruby with DevKit (required)

Note that Ruby should be installed with DevKit for Ruby Gems to install. The download is an EXE that installs Ruby.

The Ruby installer should prompt you to run the following command at the end of the installation, but if not, run it manually and select option 3.

```
<pre class="prettyprint lang-bash">
ridk install
```
### Install Jekyll

Once you have Python and Ruby installed, you can install the Ruby Gems for Jekyll

```
<pre class="prettyprint lang-bash">
gem install jekyll bundler webrick
```
If you used the wrong Ruby installer, you might not have all the dev tools and gem installation will error, so go back and check your Ruby installer was the DevTools version.

Check everything is up and running using:

```
<pre class="prettyprint lang-bash">
jekyll -v
```
### Run the site

The following commands should be run in the folder containing your Jekyll site.

Make sure all the packages are installed:

```
<pre class="prettyprint lang-bash">
npm install
```
If you get any errors, check the message to see if you need Python (see above), or if one of your packages needs something else specific.

Then run the site using:

```
<pre class="prettyprint lang-bash">
jekyll serve
```
The command will output the address of the server, which you can open in your browser:

```
<pre class="prettyprint lang-bash">
Server address: http://127.0.0.1:4000/
Server running... press ctrl-c to stop.
```
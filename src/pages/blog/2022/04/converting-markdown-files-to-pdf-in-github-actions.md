---
layout: src/layouts/Default.astro
navMenu: false
title: 'Converting markdown files to PDF in GitHub actions'
pubDate: 2022-04-14T13:24:36+01:00
author:
    - steve-fenton
image: /wp-content/uploads/2022/04/github-action-complete.jpg
categories:
    - Programming
tags:
    - actions
    - github
---

I needed to take a bunch of markdown files and convert them into a PDF, with all images present and correct, and using a CSS-based stylesheet. Behind the scenes, this is usually done using an intermediate HTML step. My attempts to solve this issue took me down a few different paths, so I thought I’d share the eventual solution to save myself time in the future.

There are one or two actions in the marketplace that do this, but I didn’t find any hassle-free action that would do this in a simple repeatable way. As you’ll see from the example, the plan is to have a folder-per-output, so eventually there could be many actions firing for different changes (i.e. filtered by path for the “on push” trigger).

### Example set up

The set up for this example is shown below (this is the result of a `tree /F` command).

```
<pre class="prettyprint">
├───.github
│   └───workflows
│           test.yaml
│
├───test
│       001-part-one.md
│       002-part-two.md
│       steve-sq.jpg
│
└───theme
        style.css
```
### What should happen

We want all of the markdown files in the `test` folder to be combined into a single PDF output file.

Additionally, it should be styled using the `style.css` stylesheet.

### The commands to run

This is all going to run on an Ubuntu machine supplied by GitHub when the action runs, so all the commands are geared towards that. Most can also be run on Windows using PowerShell, except one funky one that would need a rewrite to work in PowerShell.

We’re going to install “md-to-pdf” using NPM. This is the workhorse that’s doing the really difficult bit.

```
<pre class="prettyprint lang-bash">
npm install -g md-to-pdf
```
We want to put the output in a folder, so we’d better create it before we start.

```
<pre class="prettyprint lang-bash">
mkdir -p _output
```
We are then going to slip into the folder with all the markdown files. Embedded images work if we’re running in the right folder. I called the folder “test”, but you might want to call it “content” or something specific to the content.

```
<pre class="prettyprint lang-bash">
cd test
```
We’re going to do several things in one big hit in the next command.

- `for f in *.md` for each file with a “.md” extension
- `do cat $f; echo; done` stitch them together with added line breaks (these line breaks are super important)
- `|` pipe (send) the resulting blob of text into the next command
- ` md-to-pdf --stylesheet "../theme/style.css"` convert that text into a pdf, using our stylesheet
- `> ../_output/result.pdf` save the result in a PDF called “result.pdf” in the “\_output” folder

Here it is as it will appear in the action:

```
<pre class="prettyprint lang-bash">
for f in *.md; do cat $f; echo; done | md-to-pdf --stylesheet "../theme/style.css" > ../_output/blue-paper.pdf
```
That’s all the important commands detailed, let’s look at it all put together.

### The full action

The full action is below, you’ll see we are using the standard checkout step to grab the repo and the standard upload-artefact step to store the output.

There is also a little extra logging included to help you work out if you are in the right place, and the expected files are hanging around.

```
<pre class="prettyprint lang-yml">
name: convert

on:
  push:

jobs:
  converttopdf:
    name: Build PDF
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Build book
        run: |-
          npm install -g md-to-pdf
          mkdir -p _output
          cd test
          echo; echo "Input Folder Listing"
          ls
          echo; echo "Generating PDF"
          for f in *.md; do cat $f; echo; done | md-to-pdf --stylesheet "../theme/style.css" > ../_output/blue-paper.pdf
          cd ../_output
          echo; echo "Output Folder Listing"
          ls
          cd ..
      
      - uses: actions/upload-artifact@v1
        with:
          name: output
          path: _output
```
[![](https://www.stevefenton.co.uk/wp-content/uploads/2022/04/github-action-complete.jpg)](https://www.stevefenton.co.uk/2022/04/converting-markdown-files-to-pdf-in-github-actions/github-action-complete/)

### Page options

If you need to pass further page options, you can do so using the `--pdf-options` flag on the `md-to-pdf` command. It accepts a JSON string of key value pairs.

```
<pre class="prettyprint">
md-to-pdf --stylesheet "../theme/style.css" --pdf-options '{ "format": "a4", "margin": "40mm 40mm", "printBackground": true, "preferCSSPageSize": true }
```
---
title: Converting markdown files to PDF in GitHub actions
navMenu: false
pubDate: 2022-04-14T13:24:36+01:00
modDate: 2022-10-14
keywords: github,actions,markdown to pdf
description: Find out how to convert markdown files to PDF in GitHub Actions.
bannerImage:
    src: /img/2022/04/github-action-complete.jpg
    alt: GitHub actions
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - Actions
    - GitHub
---

I needed to take a bunch of markdown files and convert them into a PDF. All the images had to be present and correct, and I needed to apply a CSS-based stylesheet. Behind the scenes, this is usually done using an intermediate HTML step. My attempts to solve this issue took me down a few different paths, so I thought I’d share the eventual solution to save myself time in the future.

One or two actions exist in the marketplace for this, but I didn’t find any hassle-free action that would do this in a simple, repeatable way. As you’ll see from the example, the plan is to have a folder-per-output, so eventually, there could be many actions firing for different changes (i.e. filtered by path for the “on push” trigger).

## Example set up

The setup for this example is shown below (this is the result of a `tree /F` command):

```
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

## What should happen

- All markdown files in the `test` folder should be combined into a single PDF output file.
- It should be styled using the `style.css` stylesheet.

## The commands to run

The GitHub Action will run on an Ubuntu worker, so the commands must work on Linux. Many of these commands also work on Windows, except one that you'd have to rewrite in PowerShell.

The work will be done by `md-to-pdf`, so we'll install it with npm. This package is the workhorse that’s doing most of the work.

```bash
npm install -g md-to-pdf
```

You'll need an output folder, so a quick `mkdir` can create that at the start of the run.

```bash
mkdir -p _output
```

Next, you'll need to navigate to the folder containing the markdown files. Embedded images work if you run from the correct folder. Otherwise the paths end up relative to the wrong root folder.

The example file system above has all the markdown files in the `test` folder.

```bash
cd test
```

The next command combines several elements:

- `for f in *.md` for each file with a “.md” extension
- `do cat $f; echo; done` stitch them together with added line breaks (these line breaks are super important)
- `|` pipe (send) the resulting blob of text into the next command
- ` md-to-pdf --stylesheet "../theme/style.css"` convert that text into a pdf, using our stylesheet
- `> ../_output/result.pdf` save the result in a PDF called “result.pdf” in the “\_output” folder

Here it is as it will appear in the GitHub Action:

```bash
for f in *.md; do cat $f; echo; done | md-to-pdf --stylesheet "../theme/style.css" > ../_output/blue-paper.pdf
```

That’s all the important commands detailed. Next you'll find the complete script.

## The full action

The full GitHub Action script is below. You’ll see we are using the standard checkout step to grab the repo and the standard upload-artefact step to store the output.

A little extra logging is included to help you work out if you are in the right place and the expected files are hanging around.

```yaml
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

:::figure{.inset}
:img{src="/img/2022/04/github-action-complete.jpg" alt="Visual representation of the GitHub Action" loading="lazy"}
::figcaption[The GitHub Action]
:::

## Page options

If you need to pass further page options, you can use the `--pdf-options` flag on the `md-to-pdf` command. It accepts a JSON string of key-value pairs.

```bash
md-to-pdf --stylesheet "../theme/style.css" --pdf-options '{ "format": "a4", "margin": "40mm 40mm", "printBackground": true, "preferCSSPageSize": true }
```
---
layout: src/layouts/Default.astro
title: Run a Bash Script with Arguments in GitHub Actions
navMenu: false
pubDate: 2022-06-14
modDate: 2022-10-12
keywords: github actions,bash script,arguments
description: Find out how to run a bash script file with arguments in GitHub Actions.
bannerImage:
    src: /i/x/2022/06/github-actions.png
    alt: A screenshot of the GitHub Actions user interface
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - Actions
    - Bash
    - GitHub
---

You can drop bash scripts directly into a GitHub Action workflow file, but sometimes this can be unwieldy. A better approach can be to call a `script.sh` file from the workflow.

This article has an example to help you tidy up your Actions by calling external bash scripts passing arguments that make the scripts more re-usable.

## GitHub Action

Here’s the jobs section of a GitHub action. The last line is the critical part as this calls the external script. The argument is simply added on the end, i.e. `bash [filename] argument`.

```yaml
jobs:
  runscript:
    name: Example
    runs-on: ubuntu-latest
    steps:
      - name: Call a Bash Script
        run:  bash ${GITHUB_WORKSPACE}/scripts/example.sh my-folder-name
```

## Using the argument value

Within the script file (`example.sh`) you can use the argument using the parameter flag based on its position, for example `$1` for the first argument.

```bash
rsync -av --exclude=*.md --exclude=*.txt "$1/" _output
```

This is essentially the same as calling:

```bash
rsync -av --exclude=*.md --exclude=*.txt my-folder-name/ _output
```

## Summary

So, you can run bash scripts from a GitHub Action using:

```yaml
run:  bash ${GITHUB_WORKSPACE}/[filename].sh [argument-value]
```

And you use `$1` to reference the argument value you passed.

This makes it easy to reuse a script from multiple Actions, or several times in one Action, with different values.
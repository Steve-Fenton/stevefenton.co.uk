---
layout: src/layouts/Default.astro
title: Run a Bash Script with Arguments in GitHub Actions
navMenu: false
pubDate: 2022-06-14T11:46:47+01:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - Actions
    - Bash
    - GitHub
---

This is just a quick not on how to run a bash script with parameters in GitHub actions, and how to use the passed argument in the script.

## GitHub Action

Here’s the jobs section of the GitHub action, but the last line is the interesting bit as this calls the script. The argument is simply added on the end.

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

Within the script file (`example.sh`) you can use the argument using the parameter flag based on its position, for example `$1`…

```bash
rsync -av --exclude=*.md --exclude=*.txt "$1/" _output
```

This is essentially the same as calling:

```bash
rsync -av --exclude=*.md --exclude=*.txt my-folder-name/ _output
```

## Summary

Run the bash script from an action using:

```yaml
run:  bash ${GITHUB_WORKSPACE}/scripts/example.sh my-folder-name
```

Use `$1` to use the argument you passed.

This makes it easy to re-use a script from multiple actions.
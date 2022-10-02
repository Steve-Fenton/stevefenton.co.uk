---
layout: src/layouts/Default.astro
navMenu: false
title: 'Run a Bash Script with Arguments in GitHub Actions'
pubDate: 2022-06-14T11:46:47+01:00
author:
    - steve-fenton
categories:
    - Programming
tags:
    - actions
    - bash
    - github
---

This is just a quick not on how to run a bash script with parameters in GitHub actions, and how to use the passed argument in the script.

### GitHub Action

Here’s the jobs section of the GitHub action, but the last line is the interesting bit as this calls the script. The argument is simply added on the end.

```
<pre class="prettyprint lang-yaml">
jobs:
  runscript:
    name: Example
    runs-on: ubuntu-latest
    steps:
      - name: Call a Bash Script
        run:  bash ${GITHUB_WORKSPACE}/scripts/example.sh my-folder-name
```
### Using the argument value

Within the script file (`example.sh`) you can use the argument using the parameter flag based on its position, for example `$1`…

```
<pre class="prettyprint lang-bash">
rsync -av --exclude=*.md --exclude=*.txt "$1/" _output
```
This is essentially the same as calling:

```
<pre class="prettyprint lang-bash">
rsync -av --exclude=*.md --exclude=*.txt my-folder-name/ _output
```
### Summary

Run the bash script from an action using `run:  bash ${GITHUB_WORKSPACE}/scripts/example.sh my-folder-name` and use `$1` to use the argument you passed.

This makes it easy to re-use a script from multiple actions.
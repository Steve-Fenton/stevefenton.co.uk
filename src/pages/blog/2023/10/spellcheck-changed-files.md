---
title: 'Spellcheck only changed files with cspell'
navMenu: false
pubDate: 2023-10-01
keywords: git,spellcheck,cspell,markdown
description: How to spellcheck changed files with cspell using git branch differences.
bannerImage:
    src: /img/2022/03/markdown-all-in-one.jpg
    alt: Markdown all in one
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - Git
    - GitHub
    - Markdown
---

I'm working on a large docs site and I'm busy automating things to get the most out of the deployment pipeline. Essentially, I'm trying to write a pipeline that can test *writing*, not just validate the code.

To make sure all the images and links are valid, I run a full crawl with Playwright. This catches bad image paths and squiffy internal links and runs for each pull request as a required check.

Today, I'm adding spell checking.

## There's some history

I can't just add spell checking to the whole repo in one hit. If someone submitted a minor improvement, they would be hit with the task of sorting through more than 30,000 spelling issues to decide if they need to be added to the allow list, or represent a real spelling issue.

That means we only want to make folks responsible for the files they change. This still means they'll have to do extra work, but it allows incremental improvement.

The requirement is for a pull request to get a spellcheck using [cspell](https://cspell.org/) for the files changed in the branch.

## The git command

We can get a list of changed files by comparing the current branch to the main branch.

```powershell
git fetch origin main:refs/remotes/origin/main && git diff origin/main --name-only --diff-filter=ACMRTUXB
```

You can use the `--diff-filter` to pass every change type *except* delete, as this would cause a problem finding the deleted file to check it.

You can try this in a branch and it will simply provide a list of file names.

## Adding the cspell command

We can pipe the git command into the cspell command. I've added cspell as a project dependency with `pnpm install cspell`.

```powershell
git fetch origin main:refs/remotes/origin/main && git diff origin/main --name-only --diff-filter=ACMRTUXB | cspell --no-must-find-files --file-list stdin
```

This passes the files to cspell, limiting the check to the changed files.

## Configuration for cspell

In the project folder the `cspell.json` file contains the configuration. The key parts are:

- `words` - extra words you want to allow
- `flagWords` - naughty words you want to ban, for example `hte` should never be allowed as it should be `the`
- `ignorePaths` - files and paths you want to exclude, the `cspell.json` should be in this list if you've added `flagWords`

```json
{
    "version": "0.2",
    "language": "en",
    "words": [
        "astro"
    ],
    "flagWords": [
        "hte"
    ],
    "ignorePaths": [
        "cspell.json",
        "package.json",
        "package-lock.yaml",
        "pnpm-lock.yaml",
        "node_modules/**"
    ]
}
```

## Add it to your package file

I like to run this command locally, so it's polite to provide myself with a shortcut. In my `package.json` I've added it as a script.

```json
    "scripts": {
        "spellcheck": "git fetch origin main:refs/remotes/origin/main && git diff origin/main --name-only --diff-filter=ACMRTUXB | cspell --no-must-find-files --file-list stdin"
    },
```

I can now run it with:

```powershell
pnpm spellcheck
```

Hopefully, I'll get a message telling me all is well.

> CSpell: Files checked: 18, Issues found: 0 in 0 files

I'll get an error if there are spelling errors.

## GitHub Actions

You can use the `pnpm spellcheck` command with `on: pull_request` in GitHub actions to set up a required check on your GitHub Actions.

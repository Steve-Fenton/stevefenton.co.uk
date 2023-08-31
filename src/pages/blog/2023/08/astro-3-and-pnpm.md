---
title: 'Upgrading to Astro 3.0 and PNPM'
navMenu: false
pubDate: 2023-08-31
modDate: 2023-08-31
keywords: astro,static site generator,upgrade
description: Find out how I upgraded Astro to v3 and switched from NPM to PNPM.
bannerImage:
    src: /img/2022/10/astro.png
    alt: The Astro rocket logo
authors:
    - steve-fenton
categories:
    - 'Content Management'
tags:
    - Astro
    - PNPM
---

This is a double-hitter as I've upgraded to Astro 3 and moved from NPM to PNPM. I'm capturing all the little details here.

## PNPM

I'm not going to explain why PNPM has advantages over NPM. You probably already know that it does clever stuff to reduce the amount of _stuff_ you download every time you run an install. Great.

Here's the upgrade notes.

### Upgrade the version of Node in my GitHub Codespace

Step One. I'm all about Node 18. My GitHub Codespace was running an old version, so I had to work out how to update my Codespace to Node 18.

There's a special file for this in `.devcontainer/devcontainer.json`. The simplest way to use Node 18 is to use the right image. Changing the image from the default to the Node 18 image did the trick.

```json
{
    "image":"mcr.microsoft.com/devcontainers/javascript-node:0-18-bullseye"
}
```

As I want to use PNPM, I also ran the commands to enable it (it comes with Node). Enable corepack and prepare PNPM with these commands.

```bash
corepack enable
corepack prepare pnpm@latest --activate
```

You can see my working this out in the capture below. There was no PNPM, and after the commands there was v8.7.0. Magic.

```bash
@Steve-Fenton ➜ /workspaces/stevefenton.co.uk (main) $ pnpm -v
bash: pnpm: command not found
@Steve-Fenton ➜ /workspaces/stevefenton.co.uk (main ✗) $ corepack enable
@Steve-Fenton ➜ /workspaces/stevefenton.co.uk (main ✗) $ corepack prepare pnpm@latest --activate
Preparing pnpm@latest for immediate activation...
@Steve-Fenton ➜ /workspaces/stevefenton.co.uk (main ✗) $ pnpm -v
8.7.0
```

### Clean up first

Before we _actually use_ PNPM we want to clean up.

1. Delete `node_modules` and all its contents
2. Delete `package-lock.json`

PNPM uses it's own package lock format.

### Updating package.json

You don't need to make any changes to `package.json` to make it work with PNPM - there are some optional things to do.

To make sure everyone using the project is using a recent version of Node and PNPM, I set boundaries by adding the following to my `package.json`:

```json
  "packageManager": "pnpm@8.7.0",
  "engines": {
    "node": ">=18",
    "pnpm": ">=8"
  },
```

As some of my scripts previously used NPM, I updated them to replace the `npm ...` calls with the equivalent `pnpm ...` calls.

### Shamefully hoist

Hoist up the thing. Batten down the wotsit. (See the end of the article for an explanation.) Yes. With Astro in particular you need to tell PNPM to "shamefully hoist" the dependencies. By default PNPM nests them to prevent them being used except explicitly. Rather than re-list all of Astro's dependencies in your own project (and keeping them in sync) you can add a file to have hoisting done. You decide whether you feel the shame or not.

Add a file named `.npmrc` alongside your `package.json`. Add the contents:

```
shamefully-hoist=true
```

### Checking it works

With all the packages deleted, it's time to install them again - but with PNPM.

```bash
pnpm install
```

## Astro

The upgrade to Astro 3 was actually painless. I have a couple of items to resolve in the [Astro Accelerator project](https://astro.stevefenton.co.uk/) but they are warnings until v4.

With PNPM the upgrade is pretty easy, as you just run one command to update all the things:

```bash
pnpm up -L
```

Astro 3 defaults to port `1234`, rather than `3000`. You can update your tests and other references, or you can tell it to get back on port `3000`.

Open `astro.config.mjs` and add the following:

```json
    server: {
        port: 3000
    },
```

### Future breaking changes

I wrote a couple of utilties for returning JSON or XML responses. The basic pattern for these in version 2 was:

```typescript
async function getData() {
    // Code that gets the data

    return {
        body: JSON.stringify(items)
    }
}

export const get = getData;
```

There are two changes needed for this.

1. Lower case method names are being deprecated, so `get` needs to be `GET` (nice and easy)
2. Simple response objects are being replaced with proper `Reponse` objects

Here's the example updated for both.

```typescript
async function getData() {
    // Code that gets the data

    return new Response(JSON.stringify(items), {
        status: 200,
        headers: {
        'Content-Type': "application/json"
        }
    });
}

export const GET = getData;
```

This needed to be fixed in utilties for:

- search.json.ts - A json file with search data, to power the site search
- sitemap.xml.ts - A sitemap for search engines
- feed.xml.ts - An Atom XML feed

### Running Astro

Running Astro works like before, except `npm run` is replaced with `pnpm`, for example:

```bash
pnpm dev
```

Note: you don't need to add the word `run` after `pnpm`.

## GitHub Actions changes

I'm using the standard Astro action in GitHub actions. You can tell it to use PNPM and it preps everything for you:

```yaml
      - name: Install, build, and upload your site
        uses: withastro/action@v0
        with:
          package-manager: pnpm
          pnpm-version: 8.7.0
```

If you aren't using the standard Astro action, a [PNPM set up action](https://github.com/pnpm/action-setup) is available.

## Further comments

I'll come back and update things if I spot anything else.

## Hoist up the thing

[Watch the video to get the "hoist up the thing reference".](https://www.youtube.com/watch?v=SaEXyQg7pCc)

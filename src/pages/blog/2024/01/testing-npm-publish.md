---
title: 'Testing NPM publish with a dry run'
navMenu: false
pubDate: 2024-02-08
keywords: node,npm,npm publish
description: Find out how to test NPM publish to see what files will be packaged.
bannerImage:
    src: /img/topic/npm/npm.png
    alt: Three Ways to Improve Software Development
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - Node
---

I had an odd error where my `npm publish` command stopped including some files I expected to be included. To work out what was going on, I needed to run a process that would tell me what files would be included when I publish, so I can try out different file matching patterns.

The command that helped me do this is a dry run of the pack command:

```bash
npm pack --dry-run
```

This command includes a list of the files that will be included in the package.

```bash
npm notice 
npm notice 📦  astro-accelerator@4.0.10
npm notice === Tarball Contents === 
npm notice 11.6kB  LICENSE
npm notice 1.0kB   README.md
npm notice 750B    astro.config.mjs
npm notice 40B     env.d.ts
npm notice 2.7kB   package.json
npm notice 21.9kB  public/css/main.css
npm notice 2.3kB   public/css/vars.css
npm notice 22.2kB  public/icons/android-chrome-192x192.png
npm notice 58.9kB  public/icons/android-chrome-512x512.png
npm notice 20.0kB  public/icons/apple-touch-icon.png
npm notice 792B    public/icons/favicon-16x16.png
npm notice 1.9kB   public/icons/favicon-32x32.png
npm notice 15.4kB  public/icons/favicon.ico
npm notice 339.5kB public/img/astro-lighthouse.png
npm notice 2.2kB   public/js/main.js
npm notice 2.1kB   public/js/modules/animation.js
npm notice 1.3kB   public/js/modules/click-blocks.js
npm notice 2.7kB   public/js/modules/code-blocks.js
npm notice 5.6kB   public/js/modules/detail-tabs.js
npm notice 545B    public/js/modules/events.js
...
```

This gave me fast feedback loops for testing different file matching patterns and I fixed everything without having to fire off many package updates.
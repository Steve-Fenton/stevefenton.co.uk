---
layout: src/layouts/Default.astro
title: Mysterious GitHub Actions resolution failure
navMenu: false
pubDate: 2022-09-23T15:38:34+01:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - github
---

This error came from resolving an import through VITE, but it could happen just as easily for any file reference / import when you have working imports locally that fail when you run GitHub Actions. It’s worth keeping this information somewhere in your brain for later as I had to guess my way to the answer.

```
[vite]: Rollup failed to resolve import ...
```

The answer was really simple. I found a file named `language.astro` where all my other files were capitalised. This irritated me, to I changed it to `Language.astro`. I also updated all the imports to refer to the correct casing.

Locally, everything was named `Language.astro` and it all built fine. However, on committing the code, GitHub still listed the file as `language.astro` as renaming it from language-&gt;**Language** doesn’t update the casing.

:img{src="/img/2022/09/suspect-file.png" alt="Suspect File is still shown with a lower case file name" loading="lazy"}
*Hey, why is this still lower-case?!!*

To make it rename, you have to significantly change the file name, for example language-&gt;Language**s** (and update all the references again). When you do this, it updates in GitHub and everything works.
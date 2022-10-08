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
    - GitHub
---

This error came from resolving an import through VITE, but it could happen just as easily for any file reference or import when you have working imports locally that fail when you run GitHub Actions. It’s worth keeping this information in your brain for later, as I had to guess my way to the answer.

```
[vite]: Rollup failed to resolve import ...
```

This happens whenever you try to import something that doesn't exist (check your path and spelling). It can also happen for a slightly less obvious reason.

The answer was simple. I found a file named `language.astro` where all my other files were capitalised. This irritated me. So, I changed it to `Language.astro`. I also updated all the imports to refer to the correct casing.

Locally, everything was named `Language.astro` and it all built fine. However, on committing the code, GitHub still listed the file as `language.astro`. Renaming the file from language->**Language** doesn’t update the casing.

:::div{.inset}
:img{src="/img/2022/09/suspect-file.png" alt="Suspect File is still shown with a lower case file name" loading="lazy"}
:::
*Hey, why is this still lower-case?!!*

To force the rename, make a more significant change to the file name. For example, language->Language**s** (and update all the references again). When you do this, it updates in GitHub and everything works. You could use this trick with an intermediate name to move from *language*, to *LANGUAGES*, and then to *Language*.
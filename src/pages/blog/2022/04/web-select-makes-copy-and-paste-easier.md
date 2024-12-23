---
title: Web select makes copy and paste easier
navMenu: false
pubDate: 2022-04-04
modDate: 2024-04-03
keywords: web select, copy, paste
description: Find out how to use web select to copy and paste parts of a web page.
authors:
    - steve-fenton
bannerImage:
    src: /img/2022/04/web-select-table.jpg
    alt: Web select grabbing a table
categories:
    - Browsers
tags:
    - Edge
---

**Update!** Towards the end of 2023, it was reported that Web Select is [no longer available](https://answers.microsoft.com/en-us/microsoftedge/forum/all/web-select-tool-is-missing-after-recent-edge/898cee9d-c512-4b16-9dd1-eba8b3f2b5a9). While there is a screenshot option in the context menu that you can access with <kbd>CTRL</kbd> + <kbd>SHIFT</kbd> + <kbd>S</kbd> the Web Select feature, which allowed you to intelligently copy text from sections of the page, has gone.

Thank you Mark Walters for pointing this out. Also... the keyboard shortcut I used at the time from the developer channel never made it into production. That's because it conflicted with the well established "close all tabs" shortcut. Sorry Mark! I've updated that, though I don't know if the feature will return.

## Web Select, currently AWOL

<del>

This is a pretty neat feature coming to Microsoft Edge. If you hit <kbd>CTRL</kbd> + <kbd>SHIFT</kbd> + <kbd>X</kbd> it brings up a little rectangle that you can position over the content you want to copy. If you’ve ever fought with a browser when trying to select text and missed something like the first character – this feature solves that problem.

:::figure{.inset}
:img{src="/img/2022/04/web-select.jpg" alt="Web select shows a selection area on the web page"}
::figcaption[Web select]
:::

The feature also lets you sub-select across multiple vertical containers, with only the stuff inside the rectangle making it onto your clipboard. In the below example, just the highlighted content gets ripped out onto the clipboard.

:::figure{.inset}
:img{src="/img/2022/04/web-select-vertical.jpg" alt="Parts of content being selected from two columns in a multi-column layout" loading="lazy"}
::figcaption[Selecing across containers]
:::

The clipboard from this screenshot has been “emptied” below so you can see the result.

```
CHECK THIS BEFORE YOU BUY A SUBSCRIPTION  
Posted in: Opinion – Everything is becoming a subscription these days. The combination of convenient smaller regular payments for customers, and a recurring revenue-base for the provider means this model feels like the magic formula all around. Whether it’s kitchen appliances from AO, razors from Harry’s, food from Hello Fresh, or a car from Cazoo – you can enjoy \[…\]  
Pie Charts  
Process  
Programming  
Psychology
```

This is particularly brilliant for selecting content from tables:

:::figure{.inset}
:img{src="/img/2022/04/web-select-table.jpg" alt="Just selected cells from a table are selected" loading="lazy"}
::figcaption[Selecting some table cells]
:::

If you paste the selected content into a document, you'll see how useful this is:

:::figure{.inset}
:img{src="/img/2022/04/web-select-paste-in-word.jpg" alt="Web selected partial table pasted into Word" loading="lazy"}
::figcaption[Partial table pasted]
:::

</del>
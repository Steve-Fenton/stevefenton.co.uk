---
layout: src/layouts/Default.astro
navMenu: false
title: 'It&#8217;s time to support CSS dark mode'
pubDate: 2021-01-28T06:00:57+00:00
author:
    - steve-fenton
image: /wp-content/uploads/2021/01/moon-black-sky.jpg
categories:
    - Programming
tags:
    - css
---

We have now reached the tipping point with dark mode on The World Wide Web. Support has reached the point of broadness that means users who are browsing on their mobile phones are going to notice what you are doing to their eyes if you don’t support it.

We will soon pass from “users are going to notice” into the next phase; “users are being repelled by your eye-burning brightness”.

I have been running a dark-mode option behind a user-selectable toggle and there is enough in the data to suggest people want this option enabled by default when the sun goes down.

If you are running a modern CSS stack, you can just provide alternate values for your variables based on `prefers-color-scheme: dark`.

```
<pre class="prettyprint lang-css">
:root {
    --fore: #000;
    --aft: #f4f4f2;
    --link: #615ce9;
}

@media (prefers-color-scheme: dark) {
    :root {
        --fore: #E0E0E0;
        --aft: #000;
        --link: #FFCC00;
    }
}

body {
    color: var(fore);
    background-color: var(aft);
}

a {
    color: var(link);
}
```
It’s a bit more verbose old-school, and this size will increase proportionally to how crazy you’ve been when adding colour declarations.

```
<pre class="prettyprint lang-css">
body {
    color: #000;
    background-color: #f4f4f2;
}

a {
    color: #615ce9;
}

@media (prefers-color-scheme: dark) {
    body {
        color: #E0E0E0;
        background-color: #000;
    }

    a {
        color: #FFCC00;
    }
}
```
Credit to Kev for sharing dark mode and CSS variables with me.
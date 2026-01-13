---
title: Experimenting with Antigravity
navMenu: false
pubDate: 3000-01-15
keywords: ai,antigravity
description: Initial experiments with Antigravity agentic coding.
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - AI
---

This is a new blog post about experimenting with Antigravity.

Notes so far...

Download Antigravity from [The official website](https://antigravity.google).

I'm initially using Antigravity in the mode where it confirms all actions with me as it goes. This means it creates a list of files it wants to change and lets me review them before applying the changes. You can switch this to agentic mode to let it crack on and change things, with version control changes providing checkpoint review opportunities.

Antigravity is a fork of VS Code, so it's very familiar.

Tasks tested

```text
I would like to create a new markdown file called "events-archive.md" in the same folder as "events.md".
```

This worked. Antigravity created a file based on events.md with reasonable frontmatter. Antigravity reported the file was ready for events to be moved, but waited for me to confirm before doing so.

```text
Great. Please can we move events for past years (2025 and before) from events.md into events-archive.md
```

It did a fair bit of analysis on this to determine what was in the original file and which parts needed to move. This took longer than doing it myself manually as I could see I just needed to cut all text from the "2025" heading onwards, and paste it in the new file.

It added a link to the events page to point people to the archive. I didn't ask for this, but it was well anticipated.

```text
Can we set the frontmatter on events-archive.md so the page doesn't appear in the main navigation. I'm using Astro Accelerator and there's a frontmatter item navMenu: false for this.
```

I probably over-explained this and should have seen if it worked this out. It seems to look at other files to work this kind of stuff out. However, it added the frontmatter. I didn't like where it put it, so I asked for a revision.

```text
I prefer to put the navMenu item later in the frontmatter, so after description.
```

It moved the navMenu item to the end of the frontmatter.

I spotted the word "agentic" being flagged as a spelling error, so I thought I'd try a low-context request to resolve it.

```text
Let's add "agentic" to the cspell config to fix the spelling error.
```

Antigravity found the `cspell.json` file and added "agentic" to the list of words to ignore. It also put it in the correct place alphabetically.

## Parallelism rather than productivity

One observation I'd make is that working on small-scale tasks were not faster than I could do myself. Instead, I didn't need to sweat the small stuff. Put it this way, I didn't need to open the file tree, find the right file, scroll around, find the bit I wanted, and make the change. Antigravity did all of that for me.

In many cases, Antigravity was slower (I could have completed the moving events task faster), but effortless.

Mr Crosby definitely influenced my thinking. Whenever we used calculators in class, he drilled us to estimate the answer before we hit the `=` button. That way, we'd know if we'd keyed a number badly as the answer wouldn't be close to our estimated one. So, I thought about what change I'd make so I was prepared to review the changes and react with surprise if it did something I hadn't anticipated.

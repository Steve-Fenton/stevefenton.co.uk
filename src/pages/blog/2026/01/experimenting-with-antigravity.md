---
title: Experimenting with Antigravity
navMenu: false
pubDate: 3000-01-15
keywords: ai,antigravity
description: "Initial experiments with Antigravity agentic coding."
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

It added a link to the events page to point people to the archive. I didn't ask for this, but it was well anticipated. The link was incorrect as it pointed to the `.md` file and was missing the relative path.

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

## Bigger tasks

```text
Can we go through all the blog posts and identify any that don't have a description in the frontmatter, and add one based on the blog post?
```

Antigravity created an implementation plan and changed 805 files. It checked in with me a few times to confirm the next action, because I have it set to review mode, not agentic mode.

Now, the commit here was significant. We have to be realistic here that humans are not going to want to review over 800 changed files. This is why code review has become a crucial flashpoint in software delivery pipelines.

But, dear reader, I'm not entirely human. In fact, I'm officially classified as an alien (on more than 99% of planets). So, I did check them all. Here are some of the issues I detected.

- 1 instance of a `:` that made the frontmatter invalid.
- 1 instance of a spelling error in the original page being transposed into the description.
- Many, many instances of the description being hard truncated with a partial word and three full stops. These were fixable with the in-editor suggestions.

Crucially, there were long blocks of changed files that were fine. No changes needed. Some folks might check the first 10 and think everything was fine.

```text
The pnpm build command failed. Can we fix it?
```

This triggered a process where Antigravity ran `pnpm build`, fixed the reported error, then cycled through a process of repeating builds, fixing errors, realizing a general class of error, proposing a script to fix them all...

Here's a new problem. You now have 930 changes. You've created too much change to _really_ manage. People are going to feel invested in all this change. We just keep going until we find a way out of this cave system. But maybe the right answer is to back up. We should try this from the beginning with a smaller set of files. Smaller batches, right?

I wonder how many people will kinda head down this rabbit hole and fear the giant "undo". They will be knee deep and digging frantically. I decided to back up. All that research about small change sets can't be wrong.

```text
Okay, we'll track back a bit here. I've reverted changes so we're in a clean state. The temporary scripts are all gone and we're going to try things differently.

Let's find 10 blog posts without a description in the front matter and create a description that's about 160-180 characters long that summarizes the post. This will be shown to users on list pages, so it just needs to tell them what they'll find if they click through.

We don't want to just use the first line of the post. It should be a summary of the post.

We'll do 10 at a time so we can check and refine the process before we do more.
```

- Did a grep to find pages without a description
- Looked at files to generate a summary for each one
- Ran pnpm build to check for errors
- This is an old machine, so it took a while, so it waited for the command to finish
- Confirmed all the changes back to me

```text
Can we now do another 50.
```

This is where I learned the keyboard shortcuts. `ALT` + `Enter` to accept a change. `ALT` + `L` to move to the next change. You can also use `ALT` + `Shift` + `Backspace` to reject a change. I did that last one by accident!

One piece of feedback I have is that the hover bar telling you these shortcut keys obscures the first line of the change, which isn't ideal.

Getting fluid with this mechanism is going to be key to success. This may be a better way to review changes than mopping up in the source control changes at the end. That hover box position needs to be fixed to make this work well.

```text
That worked well. Let's do another 50. This time, don't allow any : characters in the description as it messes with YAML. I'd rather not use that character than start quoting the stings.
```

I notice at this point that you can approve changes while it's still working. You don't have to wait for all 50 files to be ready. That's a neat bit of parallelism.

If you overtake Antigravity, you can pause and use the keyboard shortcut to find the next change when it's ready.

It did add another item with a `:` character, which would have been a YAML error. I fixed it during the review process.

I also noticed during this workflow, I had reviewed 97 changes and it's still going. The 50 file limit has been forgotten here.

It would be nice if it didn't keep tabs open for changes I accept. I don't like opening lots of tabs or trying to find the file I *have* manually edited. I only want the tab to remain if I've made a change, not if I just accepted the change. I compare this to the source control changes process, where it re-uses the diff window, unless you manually change the file in which case it opens a new diff for the next change and reuses that.

The fact it's ignoring the 50 file limit isn't bad from a review perspective. It does mean we're moving too far forward before running the build and tests.

This run kept going until I hit my model limit.

This is probably a good time to look at pricing for higher limits. As of January 2026, it's about £20 per month for a pro plan and £240 for an ultra plan. You get a quota and a rate limit. The quota is the amount of stuff you can, the rate limit is the time it takes to refresh your quota. I can't find specific information on the quota, but rate limits are weekly on free plans and every 5 hours on paid plans.

Hitting the quote didn't seem to prevent in-editor suggestions, just the Antigravity chat interface.

## Checking in

Antigravity checked with me before running any terminal commands, or when it created a larger implementation plan to execute.

## Parallelism rather than productivity

One observation I'd make is that working on small-scale tasks were not faster than I could do myself. Instead, I didn't need to sweat the small stuff. Put it this way, I didn't need to open the file tree, find the right file, scroll around, find the bit I wanted, and make the change. Antigravity did all of that for me.

In many cases, Antigravity was slower (I could have completed the moving events task faster), but effortless.

Mr Crosby definitely influenced my thinking. Whenever we used calculators in class, he drilled us to estimate the answer before we hit the `=` button. That way, we'd know if we'd keyed a number badly as the answer wouldn't be close to our estimated one. So, I thought about what change I'd make so I was prepared to review the changes and react with surprise if it did something I hadn't anticipated.

## Continuous Delivery suddenly matters even more

The number of saves made by my Continuous Delivery pipeline made me realize my build process and tests are intensely valuable.

A few things slipped past my manual review. In particular, changes that were made in anticipation of my need caused problems because my "think through the change" process hadn't included the unspoken requirement. The changes I asked for were easier to review, as I expected a certain result. When it worked ahead of me, I hadn't thought it through, so I ended up reviewing it with "oh, that's neat that it thought of doing that", instead of checking its correctness.

This is when my pipeline caught the problem and flagged it to me.

That test-driven development, with high coverage of behaviors you depend on, pays dividends.

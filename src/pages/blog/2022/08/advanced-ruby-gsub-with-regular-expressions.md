---
id: 13041
layout: src/layouts/Default.astro
title: 'Advanced Ruby gsub with regular expressions'
pubDate: 2022-08-03T14:07:20+01:00
author:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=13041'
permalink: /2022/08/advanced-ruby-gsub-with-regular-expressions/
categories:
    - Programming
tags:
    - jekyll
    - regex
    - ruby
---

This post is *really* about the Ruby language `gsub` string method. It does contain a tiny bit of Jekyll hooks, but they are important to me and perhaps not to you. If you just want to know how to extract a match in `gsub` and use it in the output, scroll down to the bottom for the “final revelation”.

Let’s set the scene for the problem. I’m processing a custom Markdown block on a Jekyll site during a hook that fires after conversion, but before the result is written to disk.

The custom Markdown block looks like this:

```
<pre class="prettyprint lang-markdown">
:::hint

Some content to be shown in a hint box.

:::
```

By the time the text is handed to me, it’s already been mostly processed by Jekyll’s Markdown parser, so what we’re dealing with is something like:

```
<pre class="prettyprint lang-html">
<p>:::hint</p>

<p>Some content to be shown in a hint box.</p>

<p>:::</p>
```

However, what we really want is for the `:::` syntax to trigger a container with a class called “hint” (or whatever text has been added by the author), like this:

```
<pre class="prettyprint lang-html">
<div class="hint">

<p>Some content to be shown in a hint box.</p>

</div>
```

### Jekyll hooks

We’re running inside a Jekyll hook, so there is a file named `custom_html.rb` inside my `_plugins` directory with a simple hook defined…

```
<pre class="prettyprint lang-ruby">
Jekyll::Hooks.register :pages, :post_convert do |item|
    # Do something with the item
end
```

This is where `item` comes from in the examples below and I’ll leave out the hook-specific code to keep the examples short.

### gsub basics

You can do a simple replace using strings and `gsub`, like this:

```
<pre class="prettyprint lang-ruby">
content = "
<p>:::hint</p>

<p>Test</p>

<p>:::</p>"

content = content.gsub(':::', '<div>')

puts content
```

Basic `gsub` usage looks for the first string, and replaces it with the second one.

You can see from the output that this replaces the `:::` strings, but this isn’t enough to solve our requirement just yet.

```
<pre class="prettyprint lang-html">
<p><div>hint</p>

<p>Test</p>

<p><div></p>
```

Our problems are:

- We can’t tell the difference between opening and closing tags if we just use ‘:::’
- We still have those pesky paragraph tags that shouldn’t be there
- We are missing the class name and the text for it is now content

We can use our problem to explore some more advanced use cases for `gsub`.

### gsub with regular expressions

We can tell the difference between a start and end tag using a regular expression. Don’t shudder, it’s not going to be that bad. The syntax for using a regular expression is shown below.

We use one `gsub` to find the opening tag, including the surplus paragraphs, and one to find the closing tag, replacing them as appropriate.

```
<pre class="prettyprint lang-ruby">
content = "
<p>:::hint</p>

<p>Test</p>

<p>:::</p>"

content = content
    .gsub(/<p>:::[a-z]+<\/p>/, '<div>')
    .gsub(/<p>:::<\/p>/, '</div>')

puts content
```

The key part of the regular expression is that `[a-z]+` part, which explains that we expect to find some extra text on the opening tag that isn’t there on the closing tag.

Here’s the output.

```
<pre class="prettyprint lang-html">
content = "
<p>:::hint</p>

<p>Test</p>

<p>:::</p>

"

content = content
    .gsub(/<p>:::[a-z]+<\/p>/, '<div>')
    .gsub(/<p>:::<\/p>/, '</div>')

puts content
```

Our output is now valid HTML, but our class name is still missing. We’ll tackle that next.

### Using a match from the regular expression in the output

We just need to fine tune our regular expression now to get hold of that class name, so we can use it in the output.

The first part of the change is to wrap parentheses around the text match, to say we want to capture the text that is found. To put it another way `[a-z]+` already finds the text we want, but `([a-z]+)` will keep hold of it for later use. Who knew brackets were so meaningful.

The second part of our update is to use the text we found in the output. The syntax for this is `\1`. Where you have multiple matchers, they are all numbered, so the next one is `\2` and so on.

As we want to use the text as the class name, we’ll use `'<div class="\1">'`

```
<pre class="prettyprint lang-ruby">
content = "
<p>:::hint</p>

<p>Test</p>

<p>:::</p>

"

content = content
    .gsub(/<p>:::([a-z]+)<\/p>/, '<div class="\1">')
    .gsub(/<p>:::<\/p>/, '</div>')

puts content
```

Our output is now exactly what we want. We’re converting a markdown block into an HTML block with the appropriate class name.

```
<pre class="prettyprint lang-html">
<div class="hint">

<p>Test</p>

</div>
```

### The key parts

To summarise, here’s the line of code with important bits called out:

```
<pre class="prettyprint lang-ruby">
content
    .gsub(/<p>:::([a-z]+)<\/p>/, '<div class="\1">')
#         ^ / starts and ends the regular expression
#                ^ brackets create the capture group
#                                             ^ \1 uses the first match in the output
```

### The final solution

Having made it *work*, it’s time to make it *right*. Before I started, I hadn’t used `gsub` or Jekyll hooks. Now I’ve learned a bit, I want to clean things up.

In particular, I don’t like that I’m fiddling with HTML. It feels like I’m too late to the party.

However, there is another hook called `post_init` which fires *before* the markdown gets converted into HTML. If we drop in earlier, we can be tider.

Here’s the final solution. An additional item is (because you are running before markdown) to signal that you would like markdown processed within the HTML block you create. The `markdown="1"` signals to Kramdown that you want the markdown processed within the element.

```
<pre class="prettyprint lang-ruby">
Jekyll::Hooks.register :pages, :post_init do |item|
    item.content = item.content
        .gsub(/:::([a-z]+)/, '<div class="\1" markdown="1">')
        .gsub(/:::/, '</div>')
end
```
---
layout: src/layouts/Default.astro
navMenu: false
title: 'Global Using Statements and Code Clues'
pubDate: 2021-08-11T09:56:51+01:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - 'c#'
---

I wrote back in 2018 about [how you can use your `using` statements as a clue](/2018/01/code-organisation-junk/) to how you might dismember a big class. This makes it easier to see the important parts as you remove things that you “kinda have to have” to make the important stuff work. The trick is pretty simple…

1. You open your class file
2. You look at the using statements
3. You chunk your using statements into purposes
4. You extract out those purposes
5. You push the extractions out of the class

A practical example is shown below…

```
<pre class="prettyprint lang-csharp">
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using Microsoft.WindowsAzure.Storage.Queue;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Text.RegularExpressions;
```
That’s a lot of usings. This is a clue the class does too much. Let’s organise them visually (temporarily) and work out how we might push them into other places. Perhaps like this:

```
<pre class="prettyprint lang-csharp">
// Web Jobs
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using Microsoft.WindowsAzure.Storage.Queue;

// SQL
using System.Data.SqlClient;

// File System
using System.IO;

// HTTP
using System.Net.Http;

// Pretty basic stuff
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
```
### C# 10 Global Usings

C# 10 is going to get a really neat new feature called *global usings*. It will allow you to remove a lot of repetition from your classes by declaring a using statement that applies everywhere.

Now, this could interrupt our ability to use using statements as clues to improve our code, unless we use it smartly. Going back to the previous example, we should be looking to include the “pretty basic stuff” with global using statements, but not the rest. Your team’s definition of “pretty basic stuff” may vary, but it should reflect both existing common usage *and* stuff that would not be surprising.

Let’s add a new file and add our global usings:

```
<pre class="prettyprint lang-csharp">
global using System;
global using System.Collections.Generic;
global using System.Linq;
global using System.Text.RegularExpressions;
```
This prevents repetition of pretty obvious using statements, but it doesn’t prevent us using “local” using statements as a trigger for a clean up. Our starting point is just simpler:

```
<pre class="prettyprint lang-csharp">
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using Microsoft.WindowsAzure.Storage.Queue;
using System.Data.SqlClient;
using System.IO;
using System.Net.Http;
```
### Project file Global Usings

You can set up global usings in your project file with a bit of configuration, here’s an example:

```
<pre class="prettyprint lang-xml">
<ItemGroup>
    <Using Include="System" />
    <Using Include="System.Collections.Generic" />
    <Using Include="System.Linq" />
    <Using Include="System.Text.RegularExpressions" />
</ItemGroup>
```
### Implicit Usings

There is an implicit set of global usings that will automatically included in new projects, but which you can also opt-in to for existing projects.

```
<pre class="prettyprint lang-xml">
<ImplicitUsings>enable</ImplicitUsings>
```
This will basically add all of the following global usings to your project. The inclusion of `System.IO` and `System.Net.Http` will make it harder to spot these common code clues, so use with caution.

```
<pre class="prettyprint lang-csharp">
global using System;
global using System.Collections.Generic;
global using System.IO;
global using System.Linq;
global using System.Net.Http;
global using System.Threading;
global using System.Threading.Tasks;
```
The list above does differ by project type as common dependencies for specific project types will be pulled in – in most cases this is a good thing.

### Summary

You can look at your using statements and get a list of suggestions of things that might be better if they were moved out of your class. Maybe that amazing mortgage calculator shouldn’t actually directly use `System.IO`, and moving that stuff elsewhere would make the mortgage calculator logic more readable. Global using statements, if used correctly, make this technique even easier by removing common and unsurprising using statements from the list, making the unusual ones easier to analyse.
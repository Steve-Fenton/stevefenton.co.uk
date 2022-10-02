---
layout: src/layouts/Default.astro
navMenu: false
title: 'Adjusting your NDepend rules with CQLinq'
pubDate: 2012-09-16T00:01:07+01:00
author:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=738'
interface_sidebarlayout:
    - default
categories:
    - Programming
    - 'Visual Studio'
tags:
    - .net
    - 'c#'
    - 'code analysis'
    - cqlinq
    - ndepend
---

Having picked up the basics of the new CQLinq definitions in NDepend 4, I decided to start customising some rules to wipe out some false positives being reported in the code base. I think this will be a common scenario, so I’m going to share the exact change, but you’ll find this useful if you want to make any customisation to your rules.

There is a default rule that says “A stateless class or structure might be turned into a static type”, which is fair enough, but you’ll soon find that it reports your unit tests as candidates. I don’t want to turn my unit tests into static types, so I decided to customise the rule to remove them. Anything you can do to reduce the noise in your reports makes it more likely that you will spot a real issue when it pops up.

So here is the default rule:

```
<pre class="prettyprint lang-plain_text">
// <name>A stateless class or structure might be turned into a static type</name>
// This rule indicates stateless types that might
// eventually be turned into static classes.
warnif count > 0 from t in JustMyCode.Types where
  !t.IsStatic &&                  
  !t.IsGeneric &&
   t.InstanceFields.Count() == 0 &&

   // Don't match:
   // --> types that implement some interfaces.
   t.NbInterfacesImplemented == 0 &&

   // --> or classes that have sub-classes children.                            
   t.NbChildren == 0 &&

   // --> or classes that have a base class
   ((t.IsClass && t.DepthOfDeriveFrom("System.Object".AllowNoMatch()) == 1) ||
     t.IsStructure)
   
select t
```
As you can see, there are already several exclusions built in to this rule – it doesn’t include types that implement an interface, have sub-classes or have a base class. So it should be simple enough to add in a new rule to this section to deal with our unit tests.

So here is the rule I’ve come up with. I want to exclude my tests, which are conveniently all strictly named “\*Tests”. I could add this rule to the “JustMyCode” rule, but I actually want my tests included in many of the default rules.

```
<pre class="prettyprint lang-plain_text">
// --> or test classes
(t.IsClass && !t.NameLike("Tests")) &&
```
And straight away, the results pane in Visual Studio removes the unit tests, so I can tell that it works (obviously, I need to test more thoroughly than that as it may have just stopped everything from matching – but you get the gist).

Here is the new complete rule:

```
<pre class="prettyprint lang-plain_text">
// <name>A stateless class or structure might be turned into a static type</name>
// This rule indicates stateless types that might
// eventually be turned into static classes.
warnif count > 0 from t in JustMyCode.Types where
  !t.IsStatic &&                  
  !t.IsGeneric &&
   t.InstanceFields.Count() == 0 &&

   // Don't match:
   // --> types that implement some interfaces.
   t.NbInterfacesImplemented == 0 &&

   // --> or classes that have sub-classes children.                            
   t.NbChildren == 0 &&

   // --> or test classes
   (t.IsClass && !t.NameLike("Tests")) &&

   // --> or classes that have a base class
   ((t.IsClass && t.DepthOfDeriveFrom("System.Object".AllowNoMatch()) == 1) ||
     t.IsStructure)
   
select t
```
If you change your actual source code, remember to build it and re-run the analysis to get up-to-date results in the Queries and Rules Edit pane in Visual Studio.
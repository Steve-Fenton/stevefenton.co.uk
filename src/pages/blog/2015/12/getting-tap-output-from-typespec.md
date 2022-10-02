---
id: 1537
title: 'Getting TAP output from TypeSpec'
pubDate: '2015-12-01T06:00:09+00:00'
author: 'Steve Fenton'
layout: post
guid: 'https://www.stevefenton.co.uk/?p=1537'
permalink: /2015/12/getting-tap-output-from-typespec/
categories:
    - Automation
    - Programming
tags:
    - bdd
    - typescript
    - typespec
---

If you want to get your TypeSpec test output in TAP (Test Anything Protocol) format, there is a built-in test reporter that will do this for you.

Just pass in the TapReporter to the auto runner:

```
<pre class="prettyprint lang-typescript">import {AutoRunner, TapReporter} from './Scripts/TypeSpec/TypeSpec';

AutoRunner.testReporter = new TapReporter();
```

You’ll now get TAP compliant output that can easily be read by your build system.
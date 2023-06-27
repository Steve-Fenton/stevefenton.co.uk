---
title: 'Getting TAP output from TypeSpec'
navMenu: false
pubDate: 2015-12-01T06:00:09+00:00
authors:
    - steve-fenton
categories:
    - Automation
    - Programming
tags:
    - Testing
    - TypeScript
    - TypeSpec
---

If you want to get your TypeSpec test output in TAP (Test Anything Protocol) format, there is a built-in test reporter that will do this for you.

Just pass in the TapReporter to the auto runner:

```typescript
import {AutoRunner, TapReporter} from './Scripts/TypeSpec/TypeSpec';

AutoRunner.testReporter = new TapReporter();
```

You’ll now get TAP compliant output that can easily be read by your build system.
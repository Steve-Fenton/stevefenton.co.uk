---
layout: src/layouts/Default.astro
navMenu: false
title: 'The testing spotlights'
pubDate: 2014-02-03T23:09:34+00:00
author:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=416'
interface_sidebarlayout:
    - default
categories:
    - Programming
---

There are lots of different ways to test software at many different stages in the software development cycle, but as we all know, there is no panacea. There isn’t even room for a discussion about which one method is the most effective – because any individual class of testing is utterly inadequate.

![Spotlight](https://www.stevefenton.co.uk/wp-content/uploads/2015/07/spotlight.png)  
[Image by Mateusz Stachowski](http://www.sxc.hu/profile/Mattox)

### Defect Detection

To look at some common examples of defect detection rates:

- Unit tests are somewhere between 15% and 50%.
- Integration testing is in the region of 25% to 40%.
- A regression test lies between 15% and 30%.

So the simple fact of the matter is this. If you use any single class of testing, you are doomed!

Think of each class of testing as a spotlight that you can shine into a dark room. If you perform unit-testing, the beam will reveal perhaps a third of the room. If you switch on integration testing, its beam will also cover about a third of the room (but it is reasonably likely that its beam will cover some of the area already covered by unit-testing). Adding a third-spotlight for regression testing covers a quarter of the room – again, some of the areas will already been lit by the other spotlights.

It is the combination of a range of techniques that results in the highest rates of defect-detection.

### Cost of Detection

Another consideration is the cost of finding defects. Any test that you can automate will give a good return on investment because the more times you run the test, the more likely it will find a defect. Each time it finds a defect, the cost of writing the test is further divided.

Surprisingly, though, if you want to detect a serious proportion of defects at low cost, you should be looking at pair-programming, and code reviews (both formal and informal).

> “…collaborative development practices in their various forms have been shown to find a higher percentage of errors than testing does, and they cost less than half as much per error found as testing does.” – McConnell (2004)

Remember though, you need to combine many methods to get the highest detection rates (the combination should definitely include these high-detection, low-cost methods though).

### Further Reading

The statistics and quotes in this article can be found in the massive and awesome [Code Complete by Steve McConnell](http://www.amazon.co.uk/Code-Complete-Practical-Handbook-Construction/dp/0735619670). The hard data in Steve’s book is priceless and it is well researched, with useful citations and plenty of additional resources listed.
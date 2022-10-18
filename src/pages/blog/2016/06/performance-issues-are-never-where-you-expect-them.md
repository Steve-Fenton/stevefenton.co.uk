---
layout: src/layouts/Default.astro
title: 'Performance issues are never where you expect them'
navMenu: false
pubDate: 2016-06-28T18:18:21+01:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - Performance
    - 'Performance Testing'
---

Donald Knuth has become one of my go-to quotes recently\* in respect of optimisation…

> We should forget about small efficiencies, say about 97% of the time: premature optimization is the root of all evil. Yet we should not pass up our opportunities in that critical 3%.

The problem with most optimisation ideas is that they are not driven by need. You may look at a routine and think it could be faster, but even if it is; the chances are the overall performance of your application will not be any different. Even worse is if the optimisation also impacts the clarity of the code. Even worse if the optimisation introduces a defect.

So the pecking order is “Working” > “Clear” and forget about performance… unless you can measure an actual performance problem.

When you get into the habit of letting measurable performance characteristics drive your optimisation, you’ll soon find out that the fix is never in any of the places you *wanted* to optimise… and the optimisation is probably a lot less glamorous than you were hoping.

Because of low-quality interviews, programmers have started to believe that performance will come from a genius use of an obscure language feature, or from low-level algorithmic changes. The sad news is that your performance problem is *not* being caused by how you search for duplicate characters in a string.

Ultimately, if you have an application that isn’t performing well, you’ll end up asking it to do less in some way. Asking the database to return fewer rows, or selecting fewer columns in each row, or not pulling back that data anyway because the econimics are off.

For example, I was investigating a slow search page. The business were telling me it wasn’t fast enough, which is good because [performance is a feature](/blog/2016/06/performance-is-a-feature/). I could also see there was a problem, because the search page would sometimes take more than thirty seconds to come back. This was the perfect time to optimise!

Was the optimisation where I expected? No. I thought there was “obviously a missing index on the table” – but there wasn’t. The problem was tracked down eventually to a bottleneck on the disk, which was maxing out at 45,000 IOPS. This bottleneck turned out to be down to a single line of code that was asking for *too many datas* and by reducing the amount of data being requested, IOPS was reduced to 1,500 IOPS and the search page (and many other pages) became much faster than they were before… and we could prove that it was faster because we had the measurements from before the fix!

Effectively, by not optimising your code until there is a need; you end up in the same position as those who spend weeks optimising code “just in case” – because you just can’t guess your way to speed – you have to work at it more scientifically.

I also recommend this article by Jason Gorman: [Codemanship – Performance-Optimise Your Code from the Outside In](http://codemanship.co.uk/parlezuml/blog/?postid=1342)

\* absolutely intentional!
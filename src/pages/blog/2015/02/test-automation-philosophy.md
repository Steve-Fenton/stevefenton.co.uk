---
layout: src/layouts/Default.astro
title: 'Test Automation Philosophy'
navMenu: false
pubDate: 2015-02-21T16:08:36+00:00
authors:
    - steve-fenton

categories:
    - Automation
tags:
    - Testing
---

I have written previously about my general [automation philosophy](/2015/02/automation-philosophy/). The automation philosophy represents what I believe to be a universal truth of any automation if viewed from a human perspective. This article applies this truth specifically to software testing.

It is easy to see that software testing provides a full spectrum of work from routine to eccentric. Repetitive testing based on fixed scripts is an all-too-common example of routine work, whereas exploratory testing of new features provides an example of the more eccentric work found in software testing.

There are two truths that apply to software testing.

- An organisation that cannot handle the routine work is less likely to be performing the eccentric work adequately.
- An organisation that doesn’t automate routine work is more likely to believe that work is eccentric work when it is in fact routine.

It is not uncommon to find that an organisation is failing to complete the routine work of software testing. Whether it is the compression suffered by the testing cycle on traditional projects, the unachievable deadlines of a [death march](http://www.amazon.co.uk/Death-March-Yourdon-Press-Computing/dp/0137483104/) project or the need to perform testing within the fast cycles of an iterative process – organisations everywhere are regularly failing to complete a regression test of the software they deliver.

Given that the routine work is not being completed, it is unlikely that the eccentric work is being adequately considered either.

This is the key to the decision of automating software testing; until you automate the routine, how can you expect to unlock the intellectual resource needed to achieve the eccentric.

This is why the grind of repeating a manual regression test should be the target of aggressive automation. It may save you money, reduce costs, or make the regression faster – but the real motivation is to *reduce the human cost and free up people to apply themselves to more valuable work*. Some people have read my automation philosophy and told me I have missed factors in my assessment; factors such as cost to automate, ease of maintenance and other bottom-line motivated metrics. The fact is, these are all just excuses – not realities.

While you claim that a repetitive test is too costly to automate, you are burning money manually testing it or losing money fixing the problem late in your process when it costs one hundred times more to fix ([NIST](http://www.nist.gov/) 2002). When you claim that test automation is too difficult to implement or too brittle to maintain, you forget that if you had the intellectual capital to spend on the problem, the people would find a way to make it less costly and less brittle. I often find that organisations are ready to drop an automated regression suite because it costs several days each month to maintain – despite the impact of the decision being that it takes two weeks of manual regression testing to replace the “brittle automation” (and once you identify areas that are brittle in test automation, you know where to make improvements).

:img{src="/img/2015/07/Routine-Eccentric-vs-Easy-Hard.png" alt="Routine Eccentric, Easy Hard" loading="lazy"}

The more you apply the automation philosophy I have described, the more capacity you will have to solve problems of cost and maintainability. As your ability to free up people to undertake knowledge work increases, you can even tackle areas that originally appeared to be eccentric work. For example, if you have no test automation, some forms of testing seem like eccentric work that must be done by a human – but later you discover you can create innovative tools to reduce the effort or even automate the testing. For example, testing that the design of a UI meets the corporate standards, colour schemes and themes seems like an impossible task for automation – but perhaps some aspects can in fact be automated.

A team with capacity to think about this issue may design a scanner that will collect all of the colours used in the UI and check that they are on the list found in the corporate identity pack. This scanner may be reasonably extended to check other design rules, such as typography. Each improvement that frees up human time makes it more likely that people will solve the next area in a creative way. This year will see the first self-driving cars getting tests on public roads in the UK – most organisations have problems vastly simpler to automate than driving a vehicle in an uncontrolled environment – so don’t believe people who say automation is not possible.

So there is no such thing as “impossible automation”, but some organisations will be highly concerned about the cost of automation. If this is the case in your organisation, start with automation in areas that will clearly pay for themselves. Automate the most regularly repeated tests. Automate the tests that take the longest time to run manually. Once you have done this, build on this foundation with the automation philosophy in mind.
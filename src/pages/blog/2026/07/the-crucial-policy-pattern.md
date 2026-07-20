---
title: The crucial policy pattern
subtitle: When you use Rego and OPA you need to know this allow/deny trick
pubDate: 2026-07-20
description: When you use Rego and OPA you need to know this crucial policy pattern that gives you a safe approach.
keywords: "rego,opa,policies,patterns"
navMenu: false
bannerImage:
  src: /img/topic/rego/rego.png
  alt: A cuttlefish adorns the cover of Exploring Rego
authors:
  - steve-fenton
categories:
  - Programming
tags:
  - Rego
  - Open Policy Agent
---

When you author policies in Rego to be evaluated by Open Policy Agent (OPA), there are a whole heap of patterns you can use to make policies correct, safe, predictable, and maintainable. You could write a whole book on this topic, and along with John Bristowe and Matt Allford, I have!

Today, though, I want to share the most crucial pattern in the whole Rego realm. The allow/deny pattern.

Using a policy engine like OPA means you are concentrating your highest-risk code in one place. In fact, that's the idea. Instead of implementing policies in many different languages and with many different execution environments you bet on Rego and OPA so you can write policies in a dedicated language and with an evaluation engine singularly purposed to this speciality.

With all this superbly important code in one place, it becomes vital to increase your discipline. No more "we'll add tests later" or "we can make it more readable next time we change it". This is the code that's making all the decisions, so you need it to be correct all the time.

## The allow/deny pattern

It's time to meet the allow/deny pattern. This is the shape policies ought to take, even if they're simple. When you start a new policy that's going to decide if something is allowed, start with the first few lines of this file, then add your own partial set rules to collect reasons to say no.

```rego
package rental

default allow := false

# Only allow if we found zero reasons to deny
allow if {
  count(deny) == 0
}

# Collect reasons to deny
deny contains msg if {
  not input.member.membership.active
  msg := "membership is not active"
}

deny contains msg if {
  input.member.membership.fees_outstanding
  msg := sprintf("outstanding late fees of £%.2f", [input.member.late_fees])
}

deny contains msg if {
  input.member.age < to_number(input.film.rating)
  input.member.membership.tier != "premier"
  msg := sprintf("member is %v, film requires age %v (or premier tier)", [input.member.age, input.film.rating])
}
```

This works by first saying no: `default allow := false` to make sure the default is safe. We then describe the only condition that will change this to a yes: `allow if { count(deny) == 0 }`, which means allow if we found zero reasons to reject the request.

With this safety net in place, you add one or more partial set rules to collect reasons to say no, like this one that says you have to have an active membership.

```rego
deny contains msg if {
  not input.member.membership.active
  msg := "membership is not active"
}
```

OPA evaluates all these rules and collects up rejection reasons. If you get denied, you have a set of reasons to explain why. Otherwise, you meet the condition for saying yes.

## Crucial but not sufficient

This shape is such a solid approach, you should use it most of the time. You should keep in mind there are other potential problems that can be caused by missing data, invalid schemas, or lack of tests. You need to account for all the reasons policies can go wrong, but the allow/deny pattern works alongside the other methods of writing correct, safe, predictable, and maintainable policies.

Those other necessary practices are covered in *Exploring Rego*, which will be landing in bookshops near you soon.

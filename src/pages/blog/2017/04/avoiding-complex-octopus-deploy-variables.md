---
title: 'Avoiding complex Octopus Deploy variables'
navMenu: false
pubDate: 2017-04-05T15:14:17+01:00
authors:
    - steve-fenton
categories:
    - Automation
tags:
    - Deployments
    - 'Octopus Deploy'
---

Octopus Deploy has a very smart system of variable management that allows you to scope variables to machines, environments, steps, roles – and to store variables in projects and in shared library sets. It is so flexible, you *could* make your life very miserably if you don’t make things as manageable as possible.

## Scope

Octopus applies scope hierarchicly. If you have a single scope applied to a variable it works like this: Step > Machine > Step Role > Machine Role > Environment. For example, this means using a scope of a machine will override a scope of environment.

But Octopus also allows you to pick multiple scopes. These make the scope more specific, so if you add machine AND environment, this is more specific than machine.

And Octopus also allows you to use project and environment variables… so if the variable exists in both with the same level of specifity, the project wins.

## Managing scope

If you get carried away, you will crush yourself with complexity. Trying to parse in your head the levels of specifity to work out what variable is being applied is not a fun passtime, so you can follow these rules to keep things carefree.

### Have a safe default

If Octopus doesn’t have a matching variable, you basically get whatever was checked in to source control. This will eventually come back to bite you – so have an unscoped safe default value for all of your variables.

### Prefer wider scopes

Choosing to scope a variable to an Environment means you have less differences than if you choose to scope a variable to a Machine. For this reason, prefer the least specific scopes (i.e. no scope, and then environment) over the more specific alternatives.

### Don’t mix kinds

When you scope a variable, stick to the same kind of scope for that variable. Don’t mix two kinds, like Environment and Machine… try to eliminate the need to do this. Scoping a variable using multiple kinds is almost always a sign you should be using a better playbook to set up your infrastructure.

If you could manage all of your configuration without scope at all, you wouldn’t need Octopus (i.e. your database was always “.” and your ports were always 80…) so it is likely that you will need some scope. If you can keep this as simple as possible (i.e. scope to Environment across the board) you’ll never be confused by any complexity.

### Keep a line per scope

Rather than scoping a variable to “Live” and “Pre-Production”, split onto two lines – one for “Live” and one from “Pre-Production”. This makes it much easier to maintain, even though you introduce some duplication.

### Small library

Library variables are better for things that aren’t dynamic, don’t change much, and apply globally. I would think twice before adding a library variable that was scoped more specifically than environment.

## Re-use and complexity

As programmers, it is tempting to maximise the re-use of variables in the same way we would for code. This will make things more complicated than it needs to be. You can end up with variables that are well factored by using other variables with all kinds of scope… but ultimately it would be unmanageble because you can’t “find all references” to these variables.
---
layout: src/layouts/Default.astro
title: 'Expecting one out of two members in TypeScript types'
navMenu: false
pubDate: 2019-09-06T06:30:29+01:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - TypeScript
---

We’re going to use a simple restaurant set-menu example to explore TypeScript types. By the end of this thought-process, we’re going to be able to require one out of two members that are present on a type.

Here’s the scenario. You have a set three-course menu. It looks like this:

```typescript
type SetMenu = {
    starter: MenuItem;
    main: MenuItem;
    dessert: MenuItem;
}

// Diner Selection Example
const dinerSetMenuA: SetMenu = {
    starter: {id: 3684, name: 'ISLE OF MULL SCALLOP' },
    main: { id: 3389, name: 'NAVARIN OF LAMB' },
    dessert: {id: 3814, name: 'MIRABELLE SOUFFLÉ' }
}
```

The set menu selection must have all three courses selected…

But, you get feedback that some diners find it too heavy and decide to make it possible to reduce the selection to two-courses. The diner can opt for a starter and main, or main and dessert. They get to leave a bit lighter in body, and heavier in purse.

## Common solution using optional types

It is tempting to represent this by making starter and dessert optional, as shown below using the `?` character at the end of the name.

```typescript
type SetMenu = {
    starter?: MenuItem;
    main: MenuItem;
    dessert?: MenuItem;
}

// This seems to work
const dinerSetMenuA: SetMenu = {
    starter: {id: 3684, name: 'ISLE OF MULL SCALLOP' },
    main: { id: 3389, name: 'NAVARIN OF LAMB' }
}

// This seems to work
const dinerSetMenuB: SetMenu = {
    main: { id: 3389, name: 'NAVARIN OF LAMB' },
    dessert: {id: 3814, name: 'MIRABELLE SOUFFLÉ' }
}

// But, oh-dear, this also works when it shouldn't
const dinerSetMenuC: SetMenu = {
    main: { id: 3389, name: 'NAVARIN OF LAMB' }
}
```

Our new type does allow through our happy-path set menu orders, but it also allows the invalid main-only order. That’s not good because they paid for two courses and only got one… and they are missing the best one!

We want our type to be explicit that you have to have *at least one* of the optional items. You have to choose *either* a starter, or a dessert.

## Better solution using intersection and union types

Let’s try again with this type. We’re putting all the mandatory and (genuinely) optional members in first:

```typescript
type BetterSetMenu = {
    main: MenuItem
};
```

And then we’re going to add our either-or items using an intersection type with a union of the two switchable items:

```typescript
type BetterSetMenu = {
    main: MenuItem
} & ({ starter: MenuItem } | { dessert: MenuItem });
```

Let’s say “AND” for the `&` and “OR” for the `|`… “our better set menu must have a main menu item AND (it must have a starter menu item OR a dessert menu item)”.

Let’s see it in action:

```typescript
// All of our happy cases work...
const dinerSetMenu1: BetterSetMenu = {
    starter: {id: 3684, name: 'ISLE OF MULL SCALLOP' },
    main: { id: 3389, name: 'NAVARIN OF LAMB' },
    dessert: {id: 3814, name: 'MIRABELLE SOUFFLÉ' }
}

const dinerSetMenu2: BetterSetMenu = {
    main: { id: 3389, name: 'NAVARIN OF LAMB' },
    dessert: {id: 3814, name: 'MIRABELLE SOUFFLÉ' }
};

const dinerSetMenu3: BetterSetMenu = {
    starter: {id: 3684, name: 'ISLE OF MULL SCALLOP' },
    main: { id: 3839, name: 'BRESSE DUCK' }
};

// And our invalid case is detected as invalid
// Type '{ main: { id: number; name: string; }; }' is not assignable to type 'BetterSetMenu'.
//   Type '{ main: { id: number; name: string; }; }' is not assignable to type '{ main: MenuItem; } & { dessert: MenuItem; }'.
//     Property 'dessert' is missing in type '{ main: { id: number; name: string; }; }' but required in type '{ dessert: MenuItem; }'.

const dinerSetMenu4: BetterSetMenu = {
    main: { id: 3389, name: 'NAVARIN OF LAMB' }
};
```

You can see from the error message it seems to “pick one” of the missing items, so it’s not perfect as it doesn’t say “starter OR dessert” is missing; it says “dessert” is missing… but it has sucessfully detected our mistake where the optional version let it slip through.

## Honest types

I might have mentioned honest types before… but this in another case where being as honest as you can with the type system is an important part of helping people to use your code as you intend. Don’t make things optional when you need at least one of them!
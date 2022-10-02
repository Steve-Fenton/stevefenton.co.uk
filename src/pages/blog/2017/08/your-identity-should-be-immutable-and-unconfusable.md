---
layout: src/layouts/Default.astro
navMenu: false
title: 'Your identity should be immutable and unconfusable'
pubDate: 2017-08-23T10:53:22+01:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - 'c#'
    - ddd
    - entity
    - javascript
    - php
    - sql
    - typescript
---

There are lots of ways to make an identity immutable and unconfusable. I’ll show just a couple, but first the principle behind it.

Your identity should be immutable, because you will accumulate lots of threads back to your item that need that identity. If the identity changes, you will be breaking all of the relationships between the data.

Your identity should be unconfusable, because you don’t want to leak data, or accumulate subtle identity confusion bugs. For example, if you use simple numeric identities and you ask for… getOrders(customer.customsId) – you may well get back some orders if the custom**s**Id matches some other custom**er**Id. For example, if the customer has a customsId of 5, and there is a customer in the system with a customerId of 5.

### Immutable

This requirement is easy to satisfy. Once you have an identity for something, don’t change it. Don’t include anything in the identity that can change. Never allow it to be changed.

### Unconfusable

This requirement is a little harder, but easiest if you think about it early.

If you are using a nominal programming language, you can create wrapper classes to represent different identities, for example a CustomsEntity and a CustomerEntity. Even if they represent a simple type like a number, a nominal language will not let you pass a CustomsEntity when a CustomerEntity is needed. If you are using a structural programming language, beware that this approach is not so simple and you’ll need to ensure the types cannot be substituted because they are structurally the same (for example, you would have to make the structures unique).

You don’t have to do it this way. Another method is to use a single sequence throughout your database, so if I add a record to any table that requires an Entity, it gets the next number in the sequence. This means the number 5 will only ever appear once as an entity, and there cannot be a CustomsId of 5 as well as a CustomerId of 5. This mechanism doesn’t offer the compile-time checking of the nominal class, but it does mean that there is no chance of collision. Some people use GUIDs for this kind of identity.

A variation on this theme is to generate an Entity that is a composite of a number and a type, for example a CustomsId of 001-5 (001 reprenting Customs and 5 being the fifth record), and a CustomerId of 002-5 (002 being the Customer concept and 5 being the fifth record). These entities are not necessesarily numeric. Once again, this ensures the values cannot be confused – but won’t give you a compile-time check. This style can assist trouble-shooting as you may be more likely to realise that “this entity is from the CUSTOMS table!”.

### So what?

Having an immutable and unconfusable entity is one of the paths to programming happiness. The accidental substitution of an entity during retrieval is bad enough; but if you substitute an entity during writing you’ll have a huge data integrity problem too.
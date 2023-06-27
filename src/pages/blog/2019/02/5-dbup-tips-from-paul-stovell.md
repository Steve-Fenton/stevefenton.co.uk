---
title: '5 DbUp tips from Paul Stovell'
navMenu: false
pubDate: 2019-02-20T22:17:03+00:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - Data
    - DbUp
    - Deployments
    - SQL
---

I tuned into the [Octopus Deploy](https://octopus.com/) and [Clear Measure](https://www.clear-measure.com/) live stream on safe, automated, and drama-free database deployments and there was a flurry of really useful [DbUp](https://dbup.readthedocs.io/en/latest/) tips from Paul Stovell that I wanted to share.

[Watch the recording](https://www.youtube.com/watch?v=RAl8rIj9MB8)

## Use a sequential naming scheme

Use a numbered naming scheme to ensure scripts are sequential on the file system. It creates an understandable order for the scripts that will be used by DbUp. Your naming convention should add a meaningful name to the numbering; this helps humans – but also solves any branching/merging issues you might hit. If people create “Script001” in two branches, it’s okay to end up with:

- Script001-AddCustomerTable.sql
- Script001-AddProductTitleTagIndex.sql

Jeffrey Palermo suggested using a timestamp as the number, which means you don’t need to refer back to the list of scripts to find out the last number. It reduces collisions too, though as mentioned before the recommended naming also solves this. So we might end up with a naming convention like this:

- 20190220203000-AddCustomerTable.sql
- 20190220203012-AddProductTitleTagIndex.sql

## All scripts should be idempotent

Who doesn’t like an opportunity to roll out those architectural happy words “idempotency” or “indirection”. Well, your database scripts will be run once by DbUp because it keeps a track of the scripts in a tracking table. However, your scripts should still be idempotent.

This just means you ought to wrap a little “if my column doesn’t exist, add my column” checks to your scripts.

## Never change or delete a script

Don’t change a script! If DbUp has run a script, it won’t run it again, which means your change won’t make it into a mature environment. Even worse – if you run DbUp against an empty database you’ll end up with something different to your mature environments. Yikes! If you change your mind about a script, write another to roll the database forward into the desired state.

Here’s a quick example. Add a “Customers” table… remember that you don’t use plural table names… Drop the “Customers” table… Add a “Customer” table.

Similarly, don’t delete scripts. It is common to find people wanting to clear-out their DbUp project. We all love a tidy project. Don’t do it. Being able to run DbUp into an empty database and have it create the schema and the non-stateful data is a super-power. So is the ability to take any database backup ever and roll it forward into a state where the latest version of your application to consume it.

If you are worried about growing a massive list of scripts, you can start your DbUp projects with a folder structure:

- 201902/20190220203000-AddCustomerTable.sql
- 201902/20190220203012-AddProductTitleTagIndex.sql

Now each folder just has a months-worth of changes.

Important note! Don’t go back and add/change the folder structure. Moving a script into a new folder basically tells DbUp to run it again because it looks like a new script.

## Use DbUp everywhere

When you are using DbUp, you should use it to create your database everywhere. Don’t have multiple ways to do it. When a developer wants a local database they should use DbUp. Your test environment should use DbUp. Your live environment… well – you get the idea.

## Don’t accept suggestions into production

SQL Management Studio, the Database Tuning Wizard, and even Azure SQL will suggest changes to your database. It is tempting to accept these hits and suggestions, but resist! Take the scripts that these tools generate and put them into DbUp.

If you accept these suggestions without putting them through DbUp, you’ll end up with strange differences, perhaps a slow test environment that is missing an index that you only have in production.

## Summary

So that’s a strong list of suggestions from someone who knows quite a lot about both DbUp and deployments in general!

As an afterthought, I’ve been following the model-based deployment vs migration scripts debate for some time and I’m becoming more certain that migration scripts have benefits that, overall, are going to make them the winner. What you lose is detection of uncontrolled changes, but you can use migration scripts to create a clean database to audit your others against to gain back this particular tool. If you find an uncontrolled change, the key is to work out how it got in there and prevent it from happening again.
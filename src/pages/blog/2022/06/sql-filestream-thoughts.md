---
layout: src/layouts/Default.astro
title: SQL Filestream thoughts
navMenu: false
pubDate: 2022-06-07
modDate: 2022-10-12
keywords: sql server,filestream
description: Some thoughts on SQL Server FILESTREAM storage.
bannerImage:
    src: /i/x/topic/sql/sql-server.png
    alt: Microsoft SQL Server logo
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - SQL
---

A long time ago in a previous role, I used FILESTREAM to store images for product listings in a multi-tenant SaaS platform running about 1,000 websites. The sites listed “in stock” items along with a bunch of images showing pictures of the product to show off features and highlight any wear and tear. At the time, we were running a private infrastructure across a bunch of virtual machines located in a few different places. The whole platform has since gone cloud-native and doesn’t use FILESTREAM.

## The good parts of FILESTREAM

FILESTREAM in SQL Server lets you treat the image file and metadata as a simple row in a table. Under the hood, SQL stores the images on the file system. Before FILESTREAM, this is what many teams did anyway, you’d save the image on the file system, then insert a record with the metadata and a path to the file. FILESTREAM wraps this pattern, which has some benefits.

One of the things you don’t have to manage with FILESTREAM is keeping the files and database in sync. A bunch of headaches exist when you handle this yourself, all of which are solved with FILESTREAM:

- A file deleted from the file system but still referenced in the database
- The row being deleted, but the file remaining on the file system
- Having to separately back up the file system *and* database
- Ensuring you had a consistent version of backups (which is actually hard unless you make the DB and file system wait for backups)

One of the ways we used FILESTREAM to our advantage was replication. We had a write-database that took all updates, publishing them to a set of five independent replicas. This meant the database and all the images were available in five read-only locations. The web servers spoke to any of these replicas to read data.

There was no need to treat the image service-level objective any differently than the database service-level objective. We could easily add a new replica, and it would get populated by the primary writable database. (As an aside, the primary database was a serious edition of SQL, with all the replicas being inexpensive *web edition* databases.)

Using FILESTREAM meant easy replication of data, backups that could be restored anywhere, and a guarantee that we wouldn’t accumulate unused images over time because deleting the row also deleted the image.

## The bad parts of FILESTREAM

Databases with rows of simple data don’t get really big – the per-row cost is super-low. With FILESTREAM, there’s a bit more data to move about… so you need to bear in mind…

- Although day-to-day replication isn’t observably slower, the initial population of a new replica takes a bit longer
- You’ll need disks big enough to store the FILESTREAM data and probably need to know you can easily increase the disk allocation later if you need to
- Backups will take a little longer and will be much bigger, though you might have been taking a separate file system backup anyway
- Restores will take a little longer
- Disk space for your database typically costs more than storing images in specialist storage

In most cases, the storage and backups would have been done one way or another, but you might not have designed to run as many file systems, and you did databases. With FILESTREAM every database you replicate to is gonna need that storage space.

## Solving the bad parts

You could set up a media database to allow you to scale the media data independent of other application data. You could also set it up, so you have persistent file storage shared by your live and stand-by SQL servers, so although you are paying to store bits a few times (as it will be replicated at the file system level to survive disk faults), you won’t have n-times the file storage.

You need to check your backup times, test restores, and adding replicas to see if it’s going to work for your scenario. We handled about a million images, typically 1024px wide and in JPEG format. We used a separate technology closer to the edge to handle responsive images (Picz).

## The modern world

I’m not advocating for FILESTREAM, though it solved a problem for us a few years back. The modern picture of this would probably be to have resilient cloud storage, such as Azure Storage, where it’s cheap to store and serve the images.

This means you need to manage the synchronisation between the images kept in storage and any references in the database – so you hand the problems of service-level objectives and infrastructure management to "Cloudland" and take on control of the data.

## Summary

This is just a dump of a bunch of thoughts about FILESTREAM.
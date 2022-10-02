---
id: 2069
layout: src/layouts/Default.astro
title: 'SQL maintenance plan optimization'
pubDate: 2017-05-30T14:10:41+01:00
author:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=2069'
permalink: /2017/05/sql-maintenance-plan-optimization/
categories:
    - Programming
tags:
    - sql
---

I was investigating a number of maintenance plans that were taking serveral hours to complete and I noticed some optimizations that could be made to the plans without actually affecting the behaviour very much.

The maintenance plan after the fixes is:

- Check Database Integrity
- Maintenance Cleanup Task
- Rebuild Index
- Clean Up History
- Back Up Database (Full)

You can trade some speed for disk by making the cleanup task run less often. You can also run the “Rebuild Index” step less frequently. However, this plan reduced run times by more than five times.

### Setting Up the Plan

SQL -&gt; Management -&gt; Maintenance Plans -&gt; Maintenance Plan Wizard

![Maintenance Plan](https://www.stevefenton.co.uk/wp-content/uploads/2017/05/maintenance-plan.png)
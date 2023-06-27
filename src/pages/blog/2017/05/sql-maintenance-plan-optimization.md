---
title: 'SQL maintenance plan optimization'
navMenu: false
pubDate: 2017-05-30T14:10:41+01:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - SQL
---

I was investigating a number of maintenance plans that were taking serveral hours to complete and I noticed some optimizations that could be made to the plans without actually affecting the behaviour very much.

The maintenance plan after the fixes is:

- Check Database Integrity
- Maintenance Cleanup Task
- Rebuild Index
- Clean Up History
- Back Up Database (Full)

You can trade some speed for disk by making the cleanup task run less often. You can also run the “Rebuild Index” step less frequently. However, this plan reduced run times by more than five times.

## Setting Up the Plan

SQL > Management > Maintenance Plans > Maintenance Plan Wizard

:img{src="/img/2017/05/maintenance-plan.png" alt="Maintenance Plan" loading="lazy"}
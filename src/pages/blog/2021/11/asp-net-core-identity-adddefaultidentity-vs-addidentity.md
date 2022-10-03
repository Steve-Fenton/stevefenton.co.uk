---
layout: src/layouts/Default.astro
title: ASP.NET Core Identity AddDefaultIdentity vs AddIdentity
navMenu: false
pubDate: 2021-11-12T10:54:54+00:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - ASP.NET
    - 'csharp'
    - core
---

The short version on the difference between `AddDefaultIdentity` and `AddIdentity` is the *default* part adds in all the built-in controllers and views for logging in, recovering accounts, and password resets but doesn’t add roles. You can, though, add roles to `AddDefaultIdentity` to get *all the things*.

:img{src="/img/2021/11/adddefaultidentity-vs-addidentity.jpg" alt="AddDefaultIdentity vs AddIdentity" loading="lazy"}

## AddDefaultIdentity

This examples shows how to add the default version with `AddDefaultIdentity` but also adds roles on using `AddRoles<IdentityRole>`. This achieves “ticks in all the boxes” on the matrix shown above.

```csharp
services
    .AddDefaultIdentity<IdentityUser>(options => { 
        // options are set here
    })
    .AddRoles<IdentityRole>()
    .AddEntityFrameworkStores<ApplicationDbContext>();
```

With this code you get the tables, the roles, and the built in pages.

## AddIdentity

This example shows the `AddIdentity` version. You get the tables and roles for free, but you need to implement your own pages (which may be desirable, for example if you want full control over the experience for logins and registrations).

```csharp
services
    .AddIdentity<IdentityUser>(options => { 
        // options are set here
    })
    .AddEntityFrameworkStores<ApplicationDbContext>();
```
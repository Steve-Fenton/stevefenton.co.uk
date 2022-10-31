---
layout: src/layouts/Default.astro
title: ASP.NET Core Identity AddDefaultIdentity vs AddIdentity
navMenu: false
pubDate: 2021-11-12
keywords: asp.net,core,identity,adddefaultidentity,addidentity
description: Find out the different between AddDefaultIdentity and AddIdentity in ASP.NET Core.
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - ASP.NET
    - C-Sharp
    - Core
---

The short version on the difference between `AddDefaultIdentity` and `AddIdentity` is the *default* part adds in all the built-in controllers and views for logging in, recovering accounts, and password resets but doesn’t add roles. You can, though, add roles to `AddDefaultIdentity` to get *all the things*.

:::figure{.inset}
:img{src="/img/2021/11/adddefaultidentity-vs-addidentity.jpg" alt="AddDefaultIdentity vs AddIdentity"}
::figcaption[Identity comparison]
:::

## AddDefaultIdentity

This example shows how to add the default version with `AddDefaultIdentity` **and** adds roles using `AddRoles<IdentityRole>`. This achieves “ticks in all the boxes” on the above matrix.

```csharp
services
    .AddDefaultIdentity<IdentityUser>(options => { 
        // options are set here
    })
    .AddRoles<IdentityRole>()
    .AddEntityFrameworkStores<ApplicationDbContext>();
```

With this code you get the tables, the roles, and the built-in pages.

## AddIdentity

This example shows the `AddIdentity` version. You get the tables and roles for free, but you need to implement your own pages (which may be desirable. For example, if you want complete control over the experience for logins and registrations).

```csharp
services
    .AddIdentity<IdentityUser>(options => { 
        // options are set here
    })
    .AddEntityFrameworkStores<ApplicationDbContext>();
```
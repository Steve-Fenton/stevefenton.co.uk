---
layout: src/layouts/Default.astro
navMenu: false
title: 'Using .NET Core Identity without the standard pages'
pubDate: 2019-09-27T16:05:13+01:00
author:
    - steve-fenton
categories:
    - Programming
tags:
    - .net
    - core
    - identity
---

This is a quick article about using .NET Core Identity without the standard pages. It was almost titled “why does .NET Core Identity ignore my LoginPath that I set in options?”.

Let’s start with a common chunk of code that you’ll find in your Startup.cs file if you’ve added identity to your project…

```
<pre class="prettyprint lang-csharp">
services.AddIdentity<ApplicationUser, ApplicationRole>()
    .AddDefaultUI(UIFramework.Bootstrap4)
    .AddEntityFrameworkStores<ApplicationDataContext>();

//...

services.ConfigureApplicationCookie(options =>
{
    options.Cookie.HttpOnly = true;
    options.ExpireTimeSpan = TimeSpan.FromMinutes(10);
    options.SlidingExpiration = true;
    // etc :)
});
```

Your first step in changing the paths is to add them to your configuration, like below:

```
<pre class="prettyprint lang-csharp">
services.ConfigureApplicationCookie(options =>
{
    options.Cookie.HttpOnly = true;
    options.ExpireTimeSpan = TimeSpan.FromMinutes(10);

    options.LoginPath = new PathString("/Login");
    options.AccessDeniedPath = new PathString("/Logout");
    options.AccessDeniedPath = new PathString("/AccessDenied");

    options.SlidingExpiration = true;
    // etc :)
});
```

If you have this exact code, you’ll find that your custom login, logout, and access denied pages are ignored. That’s because the default UI is winning! The main thing to remember when you want to set custom pages for .NET Core Identity is that you have to *not* ask for the default UI. So remove this line from Startup.cs:

```
<pre class="prettyprint lang-csharp">
.AddDefaultUI(UIFramework.Bootstrap4)
```

You should now find your custom login, logout, and access denied pages are respected.

```
<pre class="prettyprint lang-csharp">
services.AddIdentity<ApplicationUser, ApplicationRole>()
    .AddEntityFrameworkStores<ApplicationDataContext>();

//...

services.ConfigureApplicationCookie(options =>
{
    options.Cookie.HttpOnly = true;
    options.ExpireTimeSpan = TimeSpan.FromMinutes(10);

    options.LoginPath = new PathString("/Login");
    options.AccessDeniedPath = new PathString("/Logout");
    options.AccessDeniedPath = new PathString("/AccessDenied");

    options.SlidingExpiration = true;
    // etc :)
});
```
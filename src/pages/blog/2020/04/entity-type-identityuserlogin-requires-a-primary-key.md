---
title: Entity type IdentityUserLogin<string> requires a primary key
navMenu: false
pubDate: 2020-04-14T07:50:23+01:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - .net
    - C-Sharp
    - Core
    - 'Entity Framework'
    - Identity
---

You will usually come across this problem in .net Core Entity Framework when you first override the `OnModelCreating` method in your `DbContext`.

> The entity type ‘IdentityUserLogin<string>‘ requires a primary key to be defined. If you intended to use a keyless entity type call ‘HasNoKey()’.</string>

If you check your `DbContext` class, you’ll see that when you created an MVC app and choose to add .net Core Identity, your `ApplicationDbContext` class will inherit from `IdentityDbContext`. Within that parent class, there is some code that is necessary in setting up the Identity database.

When you override `OnModelCreating` without calling back up to the parent, it means that super-important code never gets called.

Here’s an example with the problem…

```csharp
    public class ApplicationDbContext 
        : IdentityDbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Your code setting up foreign keys of whatever!
        }
    }
```

You can fix your code by adding the call to the parent’s `OnModelCreating`.

```csharp
    public class ApplicationDbContext 
        : IdentityDbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Your code setting up foreign keys of whatever!
        }
    }
```

Now the identity set up will work.
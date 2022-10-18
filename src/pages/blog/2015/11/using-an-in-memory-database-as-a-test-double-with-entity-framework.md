---
layout: src/layouts/Default.astro
title: 'Using an in-memory database as a test double with Entity Framework'
navMenu: false
pubDate: 2015-11-10T07:00:41+00:00
authors:
    - steve-fenton
categories:
    - Automation
    - Programming
    - 'Visual Studio'
tags:
    - C-Sharp
    - 'Entity Framework'
    - TDD
---

:::div{.inset}
:img{src="/img/2015/11/brain-by-dierk-schaefer.jpg" alt="Brain by Dierk Schaefer"}
:::

If you are using Entity Framework and you want to test your application without the *real* database, the typical technique employed is to write a repository or query provider that you can substitute with a stub during the test. Sometimes, though, you are better off pushing things a couple of levels deeper. This is where an in-memory database can be really useful.

Using an in-memory database as a test double has the following benefits:

- You get to test your repository / query providers
- You can run your tests anywhere (you don’t need to “find” a real database)
- You start each test with an empty database, so your tests aren’t affected by stale data

As far as the unit vs integration debate goes, having [had my brain re-wired by Ian Cooper’s talk on TDD](/blog/2013/05/my-unit-testing-epiphany/) and further beaten into submission by Jason Gorman at one of his [excellent TDD training sessions](http://www.codemanship.co.uk/tdd.html); I find [test-isolation more damaging when applied too much than when applied too little](/blog/2013/05/my-unit-testing-epiphany-continued/). So if I’m contracting the concept of “crossing a port” by allowing communication with an in memory database, I’m actually okay with that (much better than relying on a software product being installed on another machine, having a particular port open, with particular user accounts active, and a particular schema with specific data).

So where do we start with swapping out the real database with an in memory database when testing? The good news is that there is a project that helps you to do this really simply called [Effort](http://effort.codeplex.com/) (Entity Framework Fake ObjectContext Realization Tool), which uses NMemory as the database. The bad news is, it operates at the DbConnection rather than the DbContext – but this is easy to manage. You can get Effort using NuGet:

```
PM> Install-Package Effort.EF6
```
Start off by adding a constructor to your DbContext that will accept a DbConnection. If you are using an IoC container, you may need to decorate your parameterless constructor with the appropriate attribute to tell the framework to use it, rather than the “bastard injection” constructor. I have shown the Unity IoC attribute in the example below as Unity will always prefer to use the constructor with the most parameters if you don’t specify your own preference.

```csharp
public class MyContext
    : DbContext
{
    [InjectionConstructor]
    internal MyContext() : base() { }

    /// <summary>
    /// Test only constructor.
    /// </summary>
    /// <param name="connection"></param>
    internal MyContext(DbConnection connection)
        : base(connection, true) { }

    //...
```

If you aren’t using code-first and have used the following common line of code to disable schema initialization, you’ll need to avoid calling this line during testing. If you run this line, the schema will not be created for you within the in memory database.

```csharp
Database.SetInitializer<T>(null);
```

Now you can use Effort to supply the database connection and sort out all of the details, and pass it in to the context:

```csharp
DbConnection effortConnection = Effort.DbConnectionFactory.CreatePersistent("MyInstanceName");
MyContext context = new MyContext(effortConnection);
```

There are two options here, `CreatePersistent` which takes an instance name (and keeps the database for the duration of the whole test suite) and `CreateTransient` which doesn’t need a name and lasts only as long as the variable you store it in. You can choose the appropriate one for your needs, as it is a trade-off between the time it takes to set up your database and test data – and the risk of two tests interacting coincidentally because of shared data.

You should now be able to interact with the in memory database as if it were a real database, with just a few limitations:

> \[Effort\] can only emulate operations that go through the Entity Framework pipeline. This follows that database specific operations cannot work (e.g: ExecuteStoreCommand). Stored procedures, views and triggers cannot be emulated too. However, the more Entity Framework evolves, the more thing Effort will be capable of.

Job done.

<small>[Photo: “Brain” by Dierk Schaefer](https://www.flickr.com/photos/dierkschaefer/)</small>
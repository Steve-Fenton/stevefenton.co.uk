---
id: 1732
title: 'Stale data in Entity Framework'
pubDate: '2016-03-23T16:10:57+00:00'
author: 'Steve Fenton'
layout: post
guid: 'https://www.stevefenton.co.uk/?p=1732'
permalink: /2016/03/stale-data-in-entity-framework/
categories:
    - Programming
tags:
    - 'c#'
    - entityframework
---

There is a subtle bug that you can encounter when using Entity Framework on a database where updates can happen out of band. For example, the situation I discovered this issue involves a replicated SQL database, with Entity Framework running in “read only” mode against the replication subscriber databases. The data is changed in the database by replication, so Entity Framework doesn’t know when they occur.

If an update occurs while you are holding a DB context, Entity Framework will contain handing back the stale data rather than the new values in the database.

Here is an example of the problem, with all but the important code shaved out of the example:

```
<pre class="prettyprint lang-csharp">public class ProblemQueryProvider
{
    private DataContext _dataContext;

    public ProblemQueryProvider (string nameOrConnectionString)
    {
        _dataContext = new DataContext(nameOrConnectionString);
    }

    public IQueryable<Problem> GetProblems(string someFilter)
    {
        return _dataContext.Problems.Where(p => p.Filter == someFilter);
    }

    // ...
}
```

The problem here is that once you call GetProblems, if you keep hold of the ProblemQueryProvider, you are likely to get stale data when you next call GetProblems. This is because you are holding onto the context, and the context isn’t aware of the changes being made due to replication (this is not unique to replication, any out of band change will do).

The solution is to not be so greedy with your context, as per the below example:

```
<pre class="prettyprint lang-csharp">public class ProblemQueryProvider
{
    private string _nameOrConnectionString;

    public ProblemQueryProvider (string nameOrConnectionString)
    {
        _nameOrConnectionString = nameOrConnectionString;
    }

    public IQueryable<Problem> GetProblems(string someFilter)
    {
        var dataContext = new DataContext(_nameOrConnectionString);
        return dataContext.Problems.Where(p => p.Filter == someFilter);
    }

    // ...
}
```

You can decide to keep your data context a little longer than this, but the longer you keep it the more chance you will encounter a problem with out of band updates.
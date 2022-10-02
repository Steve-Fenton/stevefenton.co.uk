---
layout: src/layouts/Default.astro
navMenu: false
title: 'Using code contracts to separate your concerns'
pubDate: 2012-11-05T23:07:47+00:00
author:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=700'
interface_sidebarlayout:
    - default
categories:
    - Programming
tags:
    - .net
    - aop
    - 'c#'
---

I’m not going to talk to much about this one, I’m just going to show you an example because in the case of Code Contracts, the actual code speaks for itself.

The existing code that I’m working on is a simple repository, but I’m sure you’ll see this kind of code in many places in your own applications.

Before using code contracts, the Person repository had a Persist method that looked like this:

```
<pre class="prettyprint lang-csharp">
public Person Persist(Person person)
{
    if (person == null) {
        throw new InvalidEntityException("Entity is null");
    }
    if (!person.IsValidForPersistence()) {
        throw new InvalidEntityException("Entity is not valid");
    }
    return person.Id.Value == 0 ? Add(person) : Edit(person);
}
```

And it was the same in every repository – the same six lines of code over and over again.

Now let’s look at the method again, after Code Contracts have been added!

```
<pre class="prettyprint lang-csharp">
public Person Persist(Person person)
{
    return person.Id.Value == 0 ? Add(person) : Edit(person);
}
```

Isn’t that better. Of course it is. Now we don’t get this free of charge. We still need to code the business rules – but Code Contracts let us do it neatly and in one place.

Here is the interface for all the repositories before the change:

```
<pre class="prettyprint lang-csharp">
public interface IRepository<T, in TId> where T : IEntity
{
    T GetById(TId id);
    T Persist(T entity);
    void Remove(TId id);
}
```

So at the cost of the following code, we save six lines of code per repository.

```
<pre class="prettyprint lang-csharp">
[ContractClass(typeof(ContractsForIRepository<,>))]
public interface IRepository<T, in TId> where T : IEntity
{
    T GetById(TId id);
    T Persist(T entity);
    void Remove(TId id);
}

[ContractClassFor(typeof(IRepository<,>))]
internal abstract class ContractsForIRepository<T, TId> : IRepository<T, TId> where T : IEntity
{
    private ContractsForIRepository()
    {            
    }
    
    public T Persist(T entity)
    {
        Contract.Requires<InvalidEntityException>(entity != null, "Entity is null");
        Contract.Requires<InvalidEntityException>(entity.IsValidForPersistence(), "Entity not valid for persistence");
        return default(T);
    }
}
```

And that is just for the Persist method. We can now add to our ContractsForIRepository class for GetById and Remove and make similar savings.

This isn’t just about lines of code though, the most important gain is that we now have a single abstract class that is responsible for these rules, rather than distributing them throughout many repository classes.

If the rules change, the change affects one file, not every single repository implementation!
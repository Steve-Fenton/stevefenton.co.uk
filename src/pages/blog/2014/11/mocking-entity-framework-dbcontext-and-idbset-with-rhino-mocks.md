---
layout: src/layouts/Default.astro
title: 'Mocking Entity Framework DbContext and IDbSet with Rhino Mocks'
navMenu: false
pubDate: 2014-11-01T20:25:01+00:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - .net
    - C-Sharp
    - 'Entity Framework'
    - Mocking
---

This is something that can take a little figuring out – using Rhino Mocks to mock a DbContext and the associated IDBSets. Because of this, I created a little generic method that helps a lot…

```csharp
private static IDbSet<T> GetDbSetTestDouble<T>(IList<T> data) where T : class
{
    IQueryable<T> queryable = data.AsQueryable();
   
    IDbSet<T> dbSet = MockRepository.GenerateMock<IDbSet<T>, IQueryable>();

    dbSet.Stub(m => m.Provider).Return(queryable.Provider);
    dbSet.Stub(m => m.Expression).Return(queryable.Expression);
    dbSet.Stub(m => m.ElementType).Return(queryable.ElementType);
    dbSet.Stub(m => m.GetEnumerator()).Return(queryable.GetEnumerator());

    return dbSet;
}
```

This method takes a list of items and creates the mock of the IDbSet that will allow the list of items to be used just like normal.

Here is an example method that creates a mock DbContext, with the help of this first method.

```csharp
private static ICustomerDataContext CreateCustomerDataContextTestDouble()
{
    var dataContextTestDouble = MockRepository.GenerateMock<ICustomerDataContext>();

    var stubData = new List<Customer>
    {
        new Customer { Id = 1 },
        new Customer { Id = 2 }
    };

    dataContextTestDouble.Stub(x => x.Customers).PropertyBehavior();
    dataContextTestDouble.Customers = GetDbSetTestDouble(stubData);
    return dataContextTestDouble;
}
```

I have used a “Customer” type here for illustration. Hopefully you can see how this would work for pretty much anything.

If you wanted to get really funky, you can even use this along with Unity to have the mocked data context supplied to your classes… normally you would simply pass the mock into the constructor of the class you are testing, but in my case I was using WebAPI.Testing to call code via a headless browser, rather than constructing the controller in a Web API project directly.

```csharp
protected UnityDependencyResolver GetResolver()
{
    var container = new UnityContainer();
    container.RegisterInstance<ICustomerDataContext>(CreateCustomerDataContextTestDouble());
    return new UnityDependencyResolver(container);
}
```
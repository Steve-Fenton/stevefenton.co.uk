---
title: 'Get argument values from Linq expressions'
navMenu: false
pubDate: 2015-09-08T08:00:39+01:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - C-Sharp
    - Linq
---

If you even find yourself unpacking an expression in C#, you might find this useful. I found myself in need of obtaining a list of argument values from within an `Expression<func>` expression that sometimes had chained method calls. For example, I needed to be able to get the arguments from all of the following…</func>

```csharp
SomeMethod(() => getInformation.ForCustomer(CustomerId));

SomeMethod(() => MyFactory.GetInformation().ForCustomer(CustomerId));

SomeMethod(() => MyFactory.GetInformation().ForCustomer(CustomerId).ToList());
```

In the end, I created a couple of extension methods to help. One converts an expression into a MethodCallExpression (if that is a valid conversion), which is a type that has arguments. The second recursively searches for the arguments.

```csharp
public static class ExpressionExtensions
{
    public static string GetMethodName<T>(this Expression<Func<T>> expression)
    {
        var body = (MethodCallExpression)expression.Body;
        return body.Method.Name;
    }

    public static ReadOnlyCollection<Expression> GetInnerArguments<T>(this Expression<Func<T>> expression)
    {
        var body = (MethodCallExpression)expression.Body;
        return body.GetInnerArguments();
    }

    public static ReadOnlyCollection<Expression> GetInnerArguments(this MethodCallExpression expression)
    {
        var args = new List<Expression>();

        var arguments = expression.Arguments;

        foreach (var a in arguments)
        {
            var methodCallExpression = a.AsMethodCallExpression();
            if (methodCallExpression != null && methodCallExpression.Arguments.Count > 0)
            {
                args.AddRange(methodCallExpression.GetInnerArguments());
            }
            else
            {
                args.Add(a);
            }
        }

        return new ReadOnlyCollection<Expression>(args.Where(a => a.NodeType == ExpressionType.MemberAccess).ToList());
    }

    public static MethodCallExpression AsMethodCallExpression(this Expression expression)
    {
        return expression as MethodCallExpression;
    }
}
```

And you call it like this…

```csharp
ReadOnlyCollection<Expression> arguments = expression.GetInnerArguments();
```
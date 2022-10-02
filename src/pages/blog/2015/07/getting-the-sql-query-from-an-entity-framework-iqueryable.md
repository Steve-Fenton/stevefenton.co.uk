---
layout: src/layouts/Default.astro
navMenu: false
title: 'Getting the SQL query from an Entity Framework IQueryable'
pubDate: 2015-07-24T07:30:57+01:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - .net
    - 'c#'
    - entityframework
    - linq
---

If you have ever wanted to look inside an IQueryable in Entity Framework to see what query will be run, you’ll know that it is properly squirrelled away in there. On the whole, that’s a good thing because you shouldn’t care about it. Despite this, there are sometimes occasions where “never” doesn’t mean “never”. I am currently testing that an extension method I created works nicely with Entity Framework – all of the tests on a basic IQueryable work, but I can’t certify this extension method until I check what the query looks like…

So are a pair of extension methods that allow you to turn an IQueryable into its SQL query. ToTraceQuery inlines all of the parameters, whereas ToTraceString tacks them on the end (as it a more true representation of what is under the hood). Don’t get too carried away verifying strings within the query though as it may change.

```
<pre class="prettyprint lang-csharp">
using System;
using System.Data.Entity.Core.Objects;
using System.Linq;
using System.Linq.Expressions;
using System.Text;

namespace Fenton.Example
{
    public static class IQueryableExtensions
    {
        /// <summary>
        /// For an Entity Framework IQueryable, returns the SQL with inlined Parameters.
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="query"></param>
        /// <returns></returns>
        public static string ToTraceQuery<T>(this IQueryable<T> query)
        {
            ObjectQuery<T> objectQuery = GetQueryFromQueryable(query);

            var result = objectQuery.ToTraceString();
            foreach (var parameter in objectQuery.Parameters)
            {
                var name = "@" + parameter.Name;
                var value = "'" + parameter.Value.ToString() + "'";
                result = result.Replace(name, value);
            }

            return result;
        }

        /// <summary>
        /// For an Entity Framework IQueryable, returns the SQL and Parameters.
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="query"></param>
        /// <returns></returns>
        public static string ToTraceString<T>(this IQueryable<T> query)
        {
            ObjectQuery<T> objectQuery = GetQueryFromQueryable(query);

            var traceString = new StringBuilder();

            traceString.AppendLine(objectQuery.ToTraceString());
            traceString.AppendLine();

            foreach (var parameter in objectQuery.Parameters)
            {
                traceString.AppendLine(parameter.Name + " [" + parameter.ParameterType.FullName + "] = " + parameter.Value);
            }

            return traceString.ToString();
        }

        private static System.Data.Entity.Core.Objects.ObjectQuery<T> GetQueryFromQueryable<T>(IQueryable<T> query)
        {
            var internalQueryField = query.GetType().GetFields(System.Reflection.BindingFlags.NonPublic | System.Reflection.BindingFlags.Instance).Where(f => f.Name.Equals("_internalQuery")).FirstOrDefault();
            var internalQuery = internalQueryField.GetValue(query);
            var objectQueryField = internalQuery.GetType().GetFields(System.Reflection.BindingFlags.NonPublic | System.Reflection.BindingFlags.Instance).Where(f => f.Name.Equals("_objectQuery")).FirstOrDefault();
            return objectQueryField.GetValue(internalQuery) as System.Data.Entity.Core.Objects.ObjectQuery<T>;
        }
    }
}
```
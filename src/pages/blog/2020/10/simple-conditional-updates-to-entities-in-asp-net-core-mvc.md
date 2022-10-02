---
id: 9932
title: 'Simple conditional updates to entities in ASP.NET Core MVC'
pubDate: '2020-10-11T10:07:28+01:00'
author: 'Steve Fenton'
layout: post
guid: 'https://www.stevefenton.co.uk/?p=9932'
permalink: /2020/10/simple-conditional-updates-to-entities-in-asp-net-core-mvc/
categories:
    - Programming
tags:
    - 'c#'
---

When you accept a view model in your .NET Core MVC application, you can request that only certain fields are bound, like this `[Bind("Title")]`. Neat. But when you want to apply the changes to your domain object, you often want to do a similar thing and only update certain fields (and only if they really changed). I use the following code to avoid checking each individual field, to make my controller super obvious.

The result should be that only fields that I agree to allow the user to change get pushed for update, and the object is only updated if there is a change. Or in summary:

- I control what fields can be updated
- A change is only triggered for real updates

Basically, the controller says what fields to update like this:

```
<pre class="prettyprint lang-csharp">
currentItem.MapField(nameof(currentItem.Title), replacement);
```

It doesn’t matter how many fields I have on my type, I’m only sending back the title to the database.

To see how it all works, I’m going to use my `Entity` base class, and an `Organisation` type that extends `Entity`

Let’s follow the code down from my controller. The base class actually does the work. It grabs the property info from the type, grabs the local value and the updated value, compares them, and updates them if there is a change. It won’t update where the values are the same. So, my `Organisation` actually doesn’t matter too much for this example…

```
<pre class="prettyprint lang-csharp">
    public class Organisation
        : Entity
```

And my `Entity` class has a method that works for any kinds of entity.

```
<pre class="prettyprint lang-csharp">
    public class Entity
    {
        // ... other stuff

        protected void MapField<T>(string field, T replacement, Type myType) where T : Entity
        {
            Type type = replacement.GetType();
            PropertyInfo property = type.GetProperty(field);
            var originalValue = property.GetValue(this, null);
            var replacementValue = property.GetValue(replacement, null);

            if (originalValue != replacementValue)
            {
                property.SetValue(this, replacementValue, null);
            }
        }
    }
```

In the full version, when I land in the `property.SetValue` condition, I also update some base class stuff as it’s a neat place to say “something really changed”. I also happen to do some other manipulations, such as sanitising user input. You might find this a useful place to do things like trimming user input, or running it through allow lists.

If you don’t like inheriting from an `Entity` class you could delegate this off, or write an extension method, or whatever floats your boat.
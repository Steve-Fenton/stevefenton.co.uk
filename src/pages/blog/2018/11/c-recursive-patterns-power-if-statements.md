---
id: 4121
layout: src/layouts/Default.astro
title: 'C# recursive patterns: Power if-statements'
pubDate: 2018-11-13T06:00:43+00:00
author:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=4121'
permalink: /2018/11/c-recursive-patterns-power-if-statements/
medium_post:
    - 'O:11:"Medium_Post":11:{s:16:"author_image_url";s:75:"https://cdn-images-1.medium.com/fit/c/400/400/1*eXkhfEuF41g5W_xnc_ydLA.jpeg";s:10:"author_url";s:38:"https://medium.com/@steve.fenton.co.uk";s:11:"byline_name";N;s:12:"byline_email";N;s:10:"cross_link";s:3:"yes";s:2:"id";s:12:"1f283bf9bd03";s:21:"follower_notification";s:3:"yes";s:7:"license";s:19:"all-rights-reserved";s:14:"publication_id";s:2:"-1";s:6:"status";s:5:"draft";s:3:"url";s:51:"https://medium.com/@steve.fenton.co.uk/1f283bf9bd03";}'
categories:
    - Programming
tags:
    - 'c#'
---

One of the new features in C# 8.0 is Recursive Patterns, or *Power If Statements*. The easiest way to explain this new feature is to unpack the example from the [Building C# 8.0 article](https://blogs.msdn.microsoft.com/dotnet/2018/11/12/building-c-8-0/).

```
<pre class="prettyprint lang-csharp">
IEnumerable<string> GetEnrollees()
{
    foreach (var p in People)
    {
        if (p is Student { Graduated: false, Name: string name }) 
        {
            yield return name;
        }
    }
}
```

In English, the if-statement here resolves true if the person is a student, who hasn’t graduated, and whose name we know. It basically acts as if you had written this pretend code (which is nowhere near valid, but is the clearest explanation of what is happening):

```
<pre class="prettyprint lang-csharp">
IEnumerable<string> GetEnrollees()
{
    foreach (var p in People)
    {
        if (p is Student
            && p.Graduated == false
            && p.Name != null
            -> string name = p.Name) 
        {
            yield return name;
        }
    }
}
```

For the above code to be valid, the type of the p variable would have to change after the first condition, and you’d need to be able to shimmy the name into a variable. You can’t, so this is the actual valid version of the code you’d write before this feature:

```
<pre class="prettyprint lang-csharp">
IEnumerable<string> GetEnrollees()
{
    foreach (var p in people)
    {
        if (p is Student)
        {
            var s = p as Student;
            if (s.Graduated == false
                && s.Name != null)
            {
                yield return s.Name;
            }
        }
    }
}
```

And this is C# Recursive Patterns in a nutshell; once we get used to their shape I think they’ll be a great addition to the toolkit as they provide a clear and expressive way to construct a conditional statement and extract variables (although you don’t have to do both!)
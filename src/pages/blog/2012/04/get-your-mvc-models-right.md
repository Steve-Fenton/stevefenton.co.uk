---
layout: src/layouts/Default.astro
navMenu: false
title: 'Get your MVC models right'
pubDate: 2012-04-13T16:23:31+01:00
author:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=817'
interface_sidebarlayout:
    - default
categories:
    - Programming
tags:
    - .net
    - 'c#'
    - mvc
---

It seems like every time someone shows off their ASP.NET MVC application to me I have to make the same observation about their models, so I’ve decided to put the explanation online to save myself a great deal of repetition.

As we all know, the Model in ASP.NET MVC is how information travels from the Controller to the View. The view is also often mapped back to the Model in order to be passed back to the Controller when collecting user input.

But what is inside this view? This is what I see more often than I like:

```
<pre class="prettyprint lang-csharp">public class HomeModel
    public Person Customer { get; set; }
    public Company Employer { get; set; }
    public Product FeaturedProduct { get; set; }
}
```
Please pay particular attention to the presence of the domain objects in this model. They shouldn’t be there. Here are some reasons why.

Your Model should be concerned with one thing. Getting the information to the View that it requires to render correctly. This means your Model should be a reflection of exactly what the View needs. It should contain nothing more and nothing less. When you jam a domain object into your Model, you are passing information that the View doesn’t need, but also that it probably shouldn’t even know about. If you add new properties to the domain objects, they will all be passed to the View also.

Another major drawback with using domain objects is that it can expose properties to the mapper that shouldn’t be user-editable. For example, if you allowed people to edit their “User” object, you would probably add fields to the view for the user to enter a new alias or maybe even update their email address or password, but you wouldn’t add an input for the id of the record. However, if you pass the User object in the Model and the form is edited (for example with Firebug) to include a key value that you aren’t expecting and the key matches a property on the domain object, the mapper will map it. If you use a flat Model that only contains the data you want to send to the View and accept back from the View, this is not a problem.

Let the Controller care about getting the information to map to the Model (and nothing else). Don’t allow the domain object to be a dependency of the Model as well as the Controller.
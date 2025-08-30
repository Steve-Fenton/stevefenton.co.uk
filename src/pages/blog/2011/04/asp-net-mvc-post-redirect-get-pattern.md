---
title: 'ASP .NET MVC post-redirect-get pattern'
navMenu: false
pubDate: 2011-04-05T19:39:08+01:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - .net
    - C-Sharp
    - MVC
    - Patterns
---

This is just a quick article to hopefully dispel some common misunderstandings of the ASP.NET MVC Post/Redirect/Get Pattern. First up, a quick explanation of what the Post/Redirect/Get (or PRG) Pattern is for those who don't know.

## The Problem With A POST

The common problem is that if you submit a form, you end up on a subtly dangerous page. This is because [the HTTP specifications](https://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html) state that a POST is an "unsafe" method, because it is not safe to re-play a POST. So if you press "refresh" after POST-ing a web form, you'll get a warning from the browser asking you if you are sure you want to re-play the POST.

A typical example for this issue would be that you've just submitted a massive payment online. Pressing "refresh" and accidentally opting to re-submit this form will result in you paying another massive amount as the payment may be taken again.

Another example is if you are adding new items to a list online. Refreshing the page after adding an item could add it again. Repeatedly pressing F5 could add it again and again and again!

So what is the solution to this problem? Should we leave people at the mercy of confusing browser dialogues? Of course not. This is exactly the problem that the Post/Redirect/Get pattern solves.

## The PRG Pattern

So before PRG, the user experience looks like this…

1. `GET` "Products/Create"
2. User types in some information
3. `POST` "Products/Create"
4. Validation fails, re-display the form with warnings – user corrects the input
5. `POST` "Products/Create"
6. Validation passes, item is saved and message appears "Saved Okay"
7. User refreshes the page, this results in `POST` "Products/Create"
8. Validation passes again, item is saved again and message appears again. Oops!

So we implement the PRG Pattern, which is as simple as this.

> When you receive a POST and persist the data, redirect the user with a GET request to prevent duplicate submissions.

So our new flow looks like this…

1. `GET` "Products/Create"
2. User types in some information
3. `POST` "Products/Create"
4. Validation fails, re-display the form with warnings – user corrects the input
5. `POST` "Products/Create"
6. Validation passes, item is saved redirect, using a GET to "Products/View/5"
7. User refreshes the page, this results in a harmless GET "Products/View/5"

This can be implemented as simply as this…

```csharp
[HttpPost]
public ActionResults Create(ProductModel model) {
    if (ModelState.IsValid) {
        product = repository.SaveOrUpdate(model);
        return RedirectToAction("Details", new { id = product.Id });
    }
    return View(model);
}
```

In this example, if the ModelState is valid, we save and issue the redirect. The browser interprets the redirect and sends a GET to the address we specify and we're safe from a page-refresh. If the ModelState is not valid, we simply re-display the view and let MVC show the validation messages. We are intrinsically safe from a refresh of the failed form submission, because it will simply fail validation once again and display the view.

## The Odd Implementations

So here are the inconsistencies that need to be ironed out.

Firstly, if you are POST-ing your "Create" action to a "Save" action, please stop. Simply use an HttpGet Create action that accepts no parameters and an HttpPost Create action that accepts your model. The same goes for "Edit" too. Here's an example:

```csharp
[HttpGet]
public ActionResult Edit(int id) {
    var model = new EditModel();
    //...
    return View(model);
}

[HttpPost]
public ActionResult Edit(EditModel model) {
    //...
    if (ModelState.IsValid) {
        product = repository.SaveOrUpdate(model);
        return RedirectToAction("Details", new { id = product.Id });
    }
    return View(model);
}
```

Secondly, you do *NOT* need to perform a redirect unless you have actually stored some data. Some people like the fact that you can avoid ever seeing the "Are you sure you want to re-submit" warning that browsers issue when you refresh a POST-ed page. The PRG pattern definitely does not require you to perform a redirect for all POSTs, just for a POST that has changed the state of the data.

If you perform a redirect after a POST where the form is invalid, you have to shift the model and ModelState somewhere the GET action can get to it and you have to add meaningless logic to the GET action to check to see if it needs to display a message. This is absurd when you get all of this for free by simply re-displaying the view. On top of this, the mechanism for a redirect is not efficient. You send an address to the browser in your response and the browser makes a second request to GET the page form the address you supplied.

## Summary

The Post/Redirect/Get Pattern is there to solve the duplicate-POST issue. It stops payments from being submitted multiple times. It stops items from being created multiple times. It stops an edit from being replayed when the state of the data in the database may have moved on since the original edit.

This pattern is not intended to avoid browser dialogues and it is not simply a rule to be followed for all POSTs.

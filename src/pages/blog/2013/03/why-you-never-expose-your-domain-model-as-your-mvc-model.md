---
layout: src/layouts/Default.astro
navMenu: false
title: 'Why you never expose your domain model as your MVC model'
pubDate: 2013-03-14T15:27:53+00:00
authors:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=626'
interface_sidebarlayout:
    - default
categories:
    - Programming
tags:
    - .net
    - C-Sharp
    - MVC
---

Having helped a lot of programmers to take their first steps with ASP.NET MVC, I can safely say that the most common rookie error is to re-use your domain model in your view model.

I can see why people do it – it seems like the right thing to do when you have DRY beaten into you day-in, day-out – but there are some really good reasons to avoid re-using your domain model.

### Indecent Exposure

Aside: as of 2015, ASP.NET MVC allows you to white-list the fields you will accept back from the view using a comma-separated list of field names. I’m not a fan of this, as you’d need to update this string each time a field name was changed.

The main reason to avoid this common mistake is that it accidentally exposes data for editing that you might not want changed. It’s practical example time.

Here’s a really basic domain object for a User. I have left off all the methods and just dumped common properties in the example.

```
<pre class="prettyprint lang-csharp">
public class User {
    public int UserId { get; set; }
    public string EmailAddress { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Password { get; set; }
    public int UserRoleId { get; set; }
}
```
So imagine you allow users to update their name and email address on some kind of profile editing page – tempting to just re-use this domain object right? So you use a User object as your view model and the job is done. On the view you spit out inputs for first name, last name and email address and live happily ever after. Except you don’t.

One of the handy things ASP.NET MVC does for you is automatically map the HTTP POST to the parameter on the action in your controller, which so far looks like this…

```
<pre class="prettyprint lang-csharp">
public ActionResult Edit(User model) {
    //...
```
So in this happy-path example you get the following automatic mapping…

| POST | User |
|---|---|
| EmailAddress=abc@def.hij | EmailAddress=abc@def.hij |
| FirstName=John | FirstName=John |
| LastName=Smith | LastName=Smith |
|  | UserId=0 |
|  | Password=”” |
|  | UserRoleId=0 |

Of course, this relies on the user not doing anything funky. Remember the first rule of web security? Never trust user input. What happens if the user starts experimenting by adding additional data to the POST (either by adding inputs to the HTML form, or by sending amended data in a raw POST?)

What happens is you end up with that additional data mapped to your domain object! So if they sent “UserId=1” they could overwrite another user’s data. If they sent “UserRoleId=1” they could elevate their permissions in the program.

One common screw-up is that to make the mapping easier, hidden inputs are added to the page to supply the supposedly non-editable fields – but this makes it even easier to hack things as nobody needs to guess the likely field names.

This is why it is actually rather sensible to create yourself a UserEditModel that looks like this:

```
<pre class="prettyprint lang-csharp">
public class UserEditModel {
    public string EmailAddress { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
}
```
And we accept this in our controller…

```
<pre class="prettyprint lang-csharp">
public ActionResult Edit(UserEditModel model) {
    if (!ModelState.IsValid) {
        return View(model);
    }
    
    var user = MapUserEditModelToUser(model);
    
    if (!user.IsValidForPersistence()) {
        // Add model error
        return View(model);
    }
    
    this.userRepository.Persist(user);
    
    return RedirectToAction("Details", new { id = user.UserId });
}
```
We protect ourselves by getting the user from the logged in user details and only mapping across the three fields we want them to be able to update. Great stuff.

As a bonus, having view models that only include the specific data that should be displayed / updated means you can take advantage of scaffolding to generate views without needing to manually remove stuff.

### Getting Crowded

Another consideration is that your domain object will almost certainly be extended in the future. If you are using your domain objects as view models, anything you add starts getting included. Nobody should have to find and check all the user interfaces in case adding something to the domain model affects one of them. That’s just insane.

### Attributes

Unless you are hand-cranking all your validation, it is likely that you are using attributes to provide validation rules to the properties on your view model.

```
<pre class="prettyprint lang-csharp">
[Required]
[StringLength(50)]
public string FirstName { get; set; }
```
Needless to say, the validation you impose on your UI is not the same as the validation you may impose elsewhere and these attributes in particular do not belong on your domain object. Indeed, the validation on the FirstName property on the user registration page may be entirely different from the validation on the edit user profile page.

### Sources

Unless you have a limited application (or limited vision) you should have an eye on different sources of data for the application. I recently created a mobile application using ASP.NET MVC that sat over a national database of services. One good reason not to use the domain model in this instance is that the application could very easily sit on top of different services with just a simple mapping from the set of view models back to the API for the various services it could front.

People often talk about keeping the UI easy to replace, which is commendable – but why not make it just as easy to replace everything except the UI.

### Duplication

But what about duplication? That’s a bad thing right? Well yes, but duplication is having the same thing in two places. Your view model should be very different to your domain object. They are for different purposes and should contain different things. If the mapping feels too much like boilerplate, Automapper was invented for just such a purpose – although I challenge anyone to show me a project where mapping from domain objects to view models or data transfer objects was the part that took up time.

### Summary

Your view model is a slave to your view. It might need to change to support a slight change in that view. Your domain object shouldn’t have to change because you added something to your UI. Equally, your domain object is a slave to your business domain and it should be able to keep up with changes to that domain without causing a change to the UI. If your changes are creeping up and down your stack, that is a bad level of amplification and it indicates low cohesion.
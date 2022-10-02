---
id: 981
layout: src/layouts/Default.astro
title: 'Using Visual Studio LightSwitch to create an application in under four minutes'
pubDate: 2011-01-14T20:00:57+00:00
author:
    - steve-fenton
guid: 'https://www.stevefenton.co.uk/?p=981'
permalink: /2011/01/using-visual-studio-lightswitch-to-create-an-application-in-under-four-minutes/
interface_sidebarlayout:
    - default
categories:
    - 'Visual Studio'
---

Visual Studio LightSwitch is a mind-blowing new offering from Microsoft, which is currently available as a public beta. The idea behind LightSwitch is to create data-backed applications without having to write any code. This sounded too good to be true, so I dedicated some time to trying it out. Three minutes and twenty seconds to be precise!

Here is a screen shot of the application I created – it’s a simple email / phone directory for internal use within a company. I figured you’d want to store each person’s name, department, email and some phone numbers.

![LightSwitch Application](https://www.stevefenton.co.uk/wp-content/uploads/2015/07/application.png)

Remember, the entire application took 3:20 to write from scratch – just look at this search screen. I’ve got my data persisted to a SQL Express database for free. I’ve got paged results for free, I’ve got a search box that searches multiple fields for free. I’ve got the option to export to excel for free. Also note that I’ve added a “Create New Contact” page and also a “Details” page (you click on the first name) to edit existing records. I did those inside of that 3:20 as well.

What other features do you get for free… well, there is form validation to make sure people enter all the required information when adding a new record and there is even dirty-data checking for free.

So how did I write this application. Here are the details…

### Step 1 – What do you want to store

This is the first screen you get. You type in the fields that you want to use in your application. The “Type” is a drop down list that contains handy options like “PhoneNumber” and “EmailAddress” as well as the more traditional number types and strings.

![LightSwitch Data Set Up](https://www.stevefenton.co.uk/wp-content/uploads/2015/07/data.png)

### Step 2 – Add a screen

From the view of the data model, you just hit the “Add Screen” button and select from the five available templates. The search data screen is the one I selected for the main view in my application. Then you give it a “Screen Name” and select the “Screen Data” and click on OK.

![LightSwitch Add Screen](https://www.stevefenton.co.uk/wp-content/uploads/2015/07/selecttemplate.png)

At this point, you are actually finished – although I repeated this step to add a “Create Contact” screen and a “Details” screen (which also lets you edit the record).

Run up the example and what you have is a fully functional application, persisting its data to a database and validating user input. It’s a Silverlight application, so you can run it on the desktop or via a browser.

### More Information

You can find out more about LightSwitch on [the official Microsoft LightSwitch site](http://www.microsoft.com/visualstudio/en-us/lightswitch).

### Screen Shots

Here are a couple more screen shots that show some of the stuff you get for free when using LightSwitch, like validation messages and dirty-data warnings. Even the theme of the application is free, with it’s tabbed interface and simple ribbon bar menu.

![Validation](https://www.stevefenton.co.uk/wp-content/uploads/2015/07/validation.png)

Validation

![Dirty Data](https://www.stevefenton.co.uk/wp-content/uploads/2015/07/dirtydata.png)

Dirty Data
---
title: 'Real life performance cost of compilation debug="true"'
navMenu: false
pubDate: 2019-08-07T17:13:37+01:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - ASP.NET
    - Performance
---

There is a little setting in your ASP.NET Web.config file that sets compilation debug to true. If you debug your application locally, this gets set for you if it hasn’t been set already…

```xml
  <system.web>
    <compilation debug="true" targetFramework="4.5.2" />
    <!-- ... -->
```

This is necessary for debugging, but also costly.

That’s why your default Web.Release.config transform removes it:

```xml
  <system.web>
    <compilation xdt:Transform="RemoveAttributes(debug)" />
    <!-- ... -->
```

If, for some reason, your config transform doesn’t run, you’ll find that you are hit squarely on the performance mid-section. Let’s take a real-life example, and also give some credit to [Dave](https://www.dave-beaumont.co.uk/), who basically did all the hard work and didn’t object to me getting all the kudos. Thanks Dave.

Here are some results from a sample of requests, where half were taken with `compilation debug="true"` and half were taken with `compilation debug="false"`.

The median with `compilation debug="true"` is, on average, 5% slower. Individual samples fell within the range of **3% to 12% slower**. It is always slower.

## Check your files

Config transforms typically run on publish, not on build. That means you need to make sure your Web.Release.config file is passed to whatever you use to publish your app. It’s simple enough to view the configuration to see whether the element has been removed as the transform specifies. It should look like this:

```xml
  <system.web>
    <compilation targetFramework="4.5.2" />
    <!-- ... -->
```
---
layout: src/layouts/Default.astro
navMenu: false
title: 'Multiple browser testing with Selenium SuperDriver'
pubDate: 2015-01-18T16:29:20+00:00
author:
    - steve-fenton

categories:
    - Automation
    - Browsers
tags:
    - .net
    - 'c#'
    - selenium
    - webdriver
---

If you have undertaken any amount of testing with Selenium WebDriver you will have come across the desire to run your suite of tests against multiple browsers simultaneously.

To make this easier in .NET projects, I have started up a project called “[Selenium Super Driver](https://github.com/Steve-Fenton/SeleniumSuperDriver)“, which is a drop-in replacement for an IWebDriver. Using the SuperWebDriver class is just like using a FirefoxDriver or a ChromeDriver and works with local or remote testing.

Here is a typical line of code instantiating a driver:

```
<pre class="prettyprint lang-csharp">
IWebDriver driver = new FirefoxDriver();
```

And here is an equivalent line of code that instantiates a SuperWebDriver that will run three different browsers simultaneously.

```
<pre class="prettyprint lang-csharp">
IWebDriver driver = new SuperWebDriver(
    new ChromeDriver(),
    new FirefoxDriver(),
    new InternetExplorerDriver()
);
```

The SuperWebDriver acts just like any other driver. When you issue a command, it is forwarded to all of the drivers that are wrapped in the SuperWebDriver.

SuperWebDriver uses deep-wrapping. For example, calling FindElement on a driver normally returns a single IWebElement. SuperWebDriver also sends back a single IWebElement, but this is implemented in a SuperWebElement wrapper that holds references to the web elements for each browser.

Here is a typical structure for a single web driver, such as the FirefoxDriver.

![Normal WebDriver](https://www.stevefenton.co.uk/wp-content/uploads/2015/07/web-driver-normal.png)

And here is the SuperWebDriver, which hides multiple drivers and distributes commands to multiple drivers and co-ordinates the responses to allow a single coherent response to your test code.

![Super WebDriver](https://www.stevefenton.co.uk/wp-content/uploads/2015/07/web-driver-super.png)

The fundamental principle of the Super Driver project is to take a single command from your test code and send it out to multiple browsers and then apply the same principle in reverse to hide the multiple responses within a super wrapper to ensure your test code never knows that there are many browsers running at the same time.

The project is relatively new and the features are being driven by real use cases, so if you need to use a feature that doesn’t seem to do what you want, please [raise a new issue](https://github.com/Steve-Fenton/SeleniumSuperDriver/issues) and supply an example of how you want to use the SuperWebDriver. For example, some calls don’t lend themselves to a full wrapping implementation – but they are (currently) not calls we would expect to see in tests (i.e. grabbing window handles).
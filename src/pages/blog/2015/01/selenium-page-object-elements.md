---
layout: src/layouts/Default.astro
navMenu: false
title: 'Selenium page object elements'
pubDate: 2015-01-01T16:57:40+00:00
author:
    - steve-fenton

categories:
    - Automation
    - Programming
tags:
    - .net
    - 'c#'
    - selenium
    - testing
    - webdriver
---

If you are using Selenium WebDriver to automate your browser testing, you will almost certainly have come across a variation of the following code. In fact, in many cases you will have found this kind of thing scattered all over the place.

```
<pre class="prettyprint lang-csharp">
IWebElement nameInput = driver.FindElement(By.Id("name"));
```

If you are using this to grab elements all over the place, you will have found that it comes with a number of problems, for example when the method of finding an element changes, you need to track down all of the instances of the FindElement call and update them. Nasty.

Many people have realised that you can ease this using the Page Object Model pattern, which is strongly recommended by the Selenium project. By keeping these FindElement calls wrapped in a class that represents a page, it is much easier to keep things up to date (as you only need to look in one place to fix things).

Here is a way of taking things a step further. Rather than writing a call to FindElement, you can use the FindsBy attribute on a property in your Page Object to describe how an element can be found.

```
<pre class="prettyprint lang-csharp">
[FindsBy(How = How.Id, Using = "name")]
private IWebElement nameInput { get; set; }
```

To make this work, you need to pass the Page Object through the InitElements static method:

```
<pre class="prettyprint lang-csharp">
var pageObject = new HomePage(Driver);
PageFactory.InitElements(Driver, pageObject);
```

Not only does this make your Page Objects tidier, it will also fix a common cause of stale element handles – sometimes caused by running the find just once in a constructor (for example).

### Comparison

Here is an example Page Object before and after. I have removed unnecessary detail to make the examples more concise.

Before:

```
<pre class="prettyprint lang-csharp">
public class ExamplePage
{
    private IWebDriver driver;

    private IWebElement NameInput
    {
        get
        {
            return driver.FindElement(By.Id("name"));
        }
    }

    private IWebElement EmailInput
    {
        get
        {
            return driver.FindElement(By.Id("email"));
        }
    }

    private IWebElement GoButton
    {
        get
        {
            return driver.FindElement(By.Id("go"));
        }
    }
       
    public ExamplePage(IWebDriver driver)
    {
        this.driver = driver;
    }

    internal void EnterName(string name)
    {
        NameInput.Clear();
        NameInput.SendKeys(name);
    }

    internal void EnterEmail(string email)
    {
        EmailInput.Clear();
        EmailInput.SendKeys(email);
    }

    internal void ClickGoButton()
    {
        GoButton.Click();
    }
}
```

After:

```
<pre class="prettyprint lang-csharp">
public class ExamplePage
{
    [FindsBy(How = How.Id, Using = "name")]
    private IWebElement NameInput { get; set; }

    [FindsBy(How = How.Id, Using = "email")]
    private IWebElement EmailInput { get; set; }

    [FindsBy(How = How.Id, Using = "go")]
    private IWebElement GoButton { get; set; }

    internal void EnterName(string name)
    {
        NameInput.Clear();
        NameInput.SendKeys(name);
    }

    internal void EnterEmail(string email)
    {
        EmailInput.Clear();
        EmailInput.SendKeys(email);
    }

    internal void ClickGoButton()
    {
        GoButton.Click();
    }
}
```
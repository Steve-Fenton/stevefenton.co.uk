---
title: 'Dependency injection in PHP'
navMenu: false
pubDate: 2011-12-27T17:06:45+00:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - PHP
---

Dependency Injection solves the problem of dependencies in complex applications. Because we want to re-use our code rather than duplicate it in many places, we end up with more dependencies in our code, but Dependency Injection can ease the pain of dependencies and also make your code easier to test.

One of the most popular forms of Dependency Injection is “Constructor Injection”, which is where you supply the dependencies when you first create the object. It is common to have two constructors in this scenario. The first takes the dependency and is used for testing or where the dependency is switched at run time and the second takes no arguments and creates the default dependency.

In PHP, you can’t overload the constructor, so what are the options? Let’s look at some examples, starting with a class that has no dependency injection at all…

```php
class ExampleSearchClass
{
    private $SearchProvider;

    public function __construct()
    {
        $this->SearchProvider = new SearchProvider();
    }

    public function doSomething($search)
    {
        return $this->SearchProvider->Search($search);
    }
}

$exampleSearchClass = new ExampleSearchClass();
```

There is a dependency on a SearchProvider class to perform a search, and it is created in the constructor. The problem with this is that we cannot substitute the SearchProvider either for a different one, or with a fake one when we are testing our class.

The simplest first step is to use construction injection to accept the dependency.

```php
class ExampleSearchClass
{
    private $SearchProvider;
    public function __construct($searchProvider)
    {
        $this->SearchProvider = $searchProvider;
    }
    public function doSomething($search)
    {
        return $this->SearchProvider->Search($search);
    }
}

$exampleSearchClass = new ExampleSearchClass(new SearchProvider());
```

This solves the initial problem, but now all of the code that creates an instance of ExampleSearchClass also needs to know about the SearchProvider. If you only ever substitute this in your tests, you have really infected all your code base with a bit of knowledge that it really doesn’t need. In some languages you can create multiple constructors, one that accepts the dependency and one that creates the default if one isn’t supplied. PHP doesn’t allow for multiple constructors, but there are some ways around this problem.

## The Null By Default Parameter

```php
class ExampleSearchClass
{
    private $SearchProvider;

    public function __construct($searchProvider = null)
    {
        if ($searchProvider === null) {
            $this->SearchProvider = new SearchProvider();
        } else {
            $this->SearchProvider = $searchProvider;
        }
    }

    public function doSomething($search)
    {
        return $this->SearchProvider->Search($search);
    }
}

$exampleSearchClass = new ExampleSearchClass();
```

In this example, we simply allow the parameter to be omitted and use a default instead. This means that your code doesn’t need to know about the dependency unless it needs something other than the default to be used. This is very similar to the multiple overloaded constructor design used in other languages.

## The Factory Pattern

This isn’t as scary as it sounds. This is just where you ask for the ExampleSearchClass from another class that is responsible for creating it and its dependencies. This means that the Factory is the only bit of code that needs to concern itself with dependencies. It is also handy as you can create a fake version of the Factory that returns fake versions of the classes it creates when you are testing.

```php
class ExampleSearchClass
{
    private $SearchProvider;

    public function __construct($searchProvider)
    {
        $this->SearchProvider = $searchProvider;
    }

    public function doSomething($search)
    {
        return $this->SearchProvider->Search($search);
    }
}

class ExampleSearchClassFactory
{
    public function GetExampleSearchClass()
    {
        return new ExampleSearchClass(new SearchProvider());
    }
}

$exampleSearchClassFactory = new ExampleSearchClassFactory();

$exampleSearchClass = $exampleSearchClassFactory->GetExampleSearchClass();
```

This is a useful pattern because if you need to add an extra dependency to the ExampleSearchClass in the future, you only need to change code in one place, the ExampleSearchClassFactory. In your tests, you can either skip the factory and create an ExampleSearchClass with fake dependencies or you can create a fake factory that returns a fake ExampleSearchClass.

## Faux Overloaded Constructor

PHP has some neat language features that mean you could create something that works like multiple constructors. I don’t recommend this option because it isn’t immediately apparent what is happening in the code, which means when you come back to look at it some time in the future you will have to re-acquaint yourself with the concept.

```php
class ExampleSearchClass
{
    private $SearchProvider;

    public function __construct()
    {
        $arguments = func_get_args();
        $argumentCount = func_num_args();
        $method = '__construct' . $argumentCount;
        if (method_exists($this, $method)) {
            call_user_func_array(array($this, $method), $arguments);
        }
    }

    public function __construct0()
    {
        $this->SearchProvider = new SearchProvider();
    }

    public function __construct1($searchProvider)
    {
        $this->SearchProvider = $searchProvider;
    }
   
    public function doSomething($search)
    {
        return $this->SearchProvider->Search($search);
    }
}

$exampleSearchClass = new ExampleSearchClass();

//or

$exampleSearchClass = new ExampleSearchClass(new SearchProvider());
```

The actual constructor checks the number of arguments and then calls into the constructor that accepts that number of arguments. Obviously this is reasonably volatile and your preferred IDE is unlikely to supply great hints for the constructor signature. With this in mind, I would recommend the Abstract Factory as the pattern is tried and tested!

## More Options

These are just a couple of suggestions. There are more alternatives that you should be aware of just so you know the options.

Setter Injection: You have a method such as “setSearchProvider” that can be called to pass in a SearchProvider or fake SearchProvider for your tests.

Static GetInstance: This is a halfway house towards the Factory Pattern. You put a static method on the ExampleSearchClass that constructs the ExampleSearchClass with its dependencies…

```php
class ExampleSearchClass
{
    private $SearchProvider;
   
    public static function getInstance()
    {
        return new ExampleSearchClass(new SearchProvider());
    }

    public function __construct($searchProvider)
    {
        $this->SearchProvider = $searchProvider;
    }

    public function doSomething($search)
    {
        return $this->SearchProvider->Search($search);
    }
}

$exampleSearchClass = ExampleSearchClass::getInstance();
```

If you aren’t ready to fully implement the Factory Pattern, this is a good way of isolating the rest of your code form changes to the constructor and you could always change this static method to call the factory later.
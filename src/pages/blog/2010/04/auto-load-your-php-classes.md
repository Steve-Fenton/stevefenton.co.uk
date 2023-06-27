---
title: 'Auto Load Your PHP Classes'
navMenu: false
pubDate: 2010-04-07T21:48:09+01:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - PHP
---

In PHP you can create classes to organise your code and represent objects that you want to pass around. This has long been a feature of other languages and was a fundamentally important step forward for PHP.

There was one thing, though, that I didn’t like about PHP classes. If I wanted to instantiate a new “Customer” or “Product”, I had to make sure that I included the PHP file that contained the “Customer” or “Product” class. This meant doing this:

```php
include_once 'classes/Customer.php';
$Customer = new Customer();
```

Or it meant adding all the classes to the top of the master PHP file… like this:

```php
include_once 'classes/Customer.php';
include_once 'classes/Product.php';
```

When you have 50 classes and you include them all, but only use 2 or 3 depending on the particular request, this seems very wrong. Also, adding “include\_once” statements everywhere you instantiate a class seems rather nasty too.

The solution to this is simple. Don’t include any of your classes. Just instantiate them at will… for example, wouldn’t it be great if you could just do this:

```php
$Customer = new Customer();
$Product = new Product();
```

Well you can! All you need to do is add an auto load method to your main PHP file. This will detect when an unknown class is instantiated and will dynamically load it for you.

```php
function __autoload($class_name) {
    $ClassFile = 'classes/' . $class_name . '.php';
    include_once $ClassFile;
}
```

For this to work you need to ensure:

1. All of your classes are in the same directory
2. You name your file exactly after the class, for example “new Customer()” will look for “Customer.php” in the “classes/” directory

This is the best way to include your class files in PHP as it will mean you only include a class file if it is being used, not “just in case it gets used” – and you don’t need to manually include\_once every time.
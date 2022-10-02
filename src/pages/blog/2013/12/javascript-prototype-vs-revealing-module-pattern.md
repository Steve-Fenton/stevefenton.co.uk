---
id: 468
title: 'JavaScript prototype vs revealing module pattern'
pubDate: '2013-12-11T09:40:14+00:00'
author: 'Steve Fenton'
layout: post
guid: 'https://www.stevefenton.co.uk/?p=468'
permalink: /2013/12/javascript-prototype-vs-revealing-module-pattern/
interface_sidebarlayout:
    - default
categories:
    - Programming
tags:
    - javascript
---

I have been a little deceptive in this title – because although the question is often phrased as “what’s the difference between prototype vs revealing module pattern”, the correct comparison would be “prototype vs closures”. So I’ll deal with that first and then discuss revealing modules afterwards.

### Prototype Example

So let’s start by defining a “Customer” class using a prototype…

```
<pre class="prettyprint lang-javascript">
function Customer(name) {
    this.name = name;
}

Customer.prototype = {
    constructor: Customer,
    greet: function () {
        return this.name + ' says hi!';
    }
};
```

I can use this class and get the following results:

```
<pre class="prettyprint lang-javascript">
var steve = new Customer('Steve');
var todd = new Customer('Todd');

console.log(steve.greet()); // Steve says hi!
console.log(todd.greet()); // Todd says hi!

console.log(steve.name); // Steve
```

### Closure Example

I can also use a function to get a similar result, but with some very slightly different behaviour:

```
<pre class="prettyprint lang-javascript">
var Customer = function (name) {
    return {
        greet: function () {
            return name + ' says hi!';
        }
    };
};
```

The big difference is on the last line of our calling code – you use this function exactly as you would use the proper class, except you can no longer access the name property (easily):

```
<pre class="prettyprint lang-javascript">
var steve = new Customer('Steve');
var todd = new Customer('Todd');

console.log(steve.greet()); // Steve says hi!
console.log(todd.greet()); // Todd says hi!

console.log(steve.name); // undefined <- Y U access my privates!
```

This works because the variable “name” is only available with the scope of the Customer function – so while the functions inside of the Customer function can access the variable, it is not in scope anywhere else in the program. The greet function inside of the Customer function becomes a closure with the value of the name variable stored in scope. This is a bit like having a private property.

### Prototype Example Inheritance

To inherit from the Customer, for example to create a special VipCustomer class, you would use the following code:

```
<pre class="prettyprint lang-javascript">
function Customer(name) {
    this.name = name;
}
Customer.prototype = {
    constructor: Customer,
    greet: function () {
        return this.name + ' says hi!';
    }
};

function VipCustomer(name, discountPercentage) {
    Customer.call(this, name); // call the super class constructor
    this.discountPercentage = discountPercentage;
}
VipCustomer.prototype = new Customer(); // inherit the prototype
VipCustomer.prototype.constructor = VipCustomer; // set our constructor
```

Calling code needn’t know any different when calling the greet function on a Customer or a VipCustomer:

```
<pre class="prettyprint lang-javascript">
var steve = new Customer('Steve');
var todd = new VipCustomer('Todd', 10);

console.log(steve.greet()); // Steve says hi!
console.log(todd.greet()); // Todd says hi!
```

### Closure Example Inheritance

You can simulate inheritance using the closure example also with the same outcome:

```
<pre class="prettyprint lang-javascript">
var Customer = function (name) {
    return {
        greet: function () {
            return name + ' says hi!';
        }
    };
};

var VipCustomer = function (name, discountPercentage) {
    var parent = Customer(name);
    return {
        greet: parent.greet
    }
};
```

As with the previous closure example, we cannot access the name (or the discountPercentage) – but the function calls act as we expect.

```
<pre class="prettyprint lang-javascript">
var steve = new Customer('Steve');
var todd = new VipCustomer('Todd', 10);

console.log(steve.greet()); // Steve says hi!
console.log(todd.greet()); // Todd says hi!
```

### So which is better?

There is only one way to find out – measure it. The elements that impact performance when using prototype inheritance is how deep the prototype chain is. If you have a deep hierarchy and call something on the very top parent, the whole prototype chain is walked to find the item. Similarly, if you call a function or property that isn’t defined, the entire prototype chain will need to be walked again. On the function inheritance side, you might find that the instantiated objects take up more memory because you will create many instances of the functions. For example, each object you create will have a “greet” function, whereas in the prototype example the function can exist once on the prototype with JavaScript handling the scope of the data being used on each call.

### Revealing Module Pattern

Both prototypes and closures can be used within a revealing module. The examples above can both be used inside of a revealing module. For example, if I want to wrap the Customer and VipCustomer classes within a common namespace, I can use the following:

```
<pre class="prettyprint lang-javascript">
var Fenton = (function () {
    function Customer(name) {
        this.name = name;
    }
    Customer.prototype = {
        constructor: Customer,
        greet: function () {
            return this.name + ' says hi!';
        }
    };

    function VipCustomer(name, discountPercentage) {
        Customer.call(this, name);
        this.discountPercentage = discountPercentage;
    }
    VipCustomer.prototype = new Customer();
    VipCustomer.prototype.constructor = VipCustomer;
   
    return {
        Customer: Customer,
        VipCustomer: VipCustomer
    };
}());

var steve = new Fenton.Customer('Steve');
var todd = new Fenton.VipCustomer('Todd', 10);
```

The only change to the calling code is the addition of the namespace to the “Fenton.Customer” and “Fenton.VipCustomer”. This example is equally valid if we strip out the prototype example and drop the closure example into its place.

So the revealing module pattern compliments both prototype and closure based classes and objects.

Closure-based patterns allow more information hiding, but may consume more memory if many instances are created.

Prototype-based patterns are more memory efficient, but deep hierarchies can cause performance issues.
---
layout: src/layouts/Default.astro
title: 'PHP doc comments look hideous'
navMenu: false
pubDate: 2011-10-24T17:26:21+01:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - PHP
---

I’m currently contributing to an open source framework, written in PHP. I really want to be a good boy and do everything by the book, but I am really struggling with PHP Doc comments.

The idea behind PHP Doc comments is okay (given the lack of real types). Any public API should be well documented, but when comment blocks account for more than 50% of a page it is time to question whether we are doing it right.

The official documentation demonstrates how you can mark up and example file. It essentially turns a 61 line file into a 139 line file.

There are lots of examples online of doc blocks, but in order to make doc blocks look useful, you have to write a bad example. Such as…

```php
/**
 * An instance of this class represents a counting machine
 *
 * &lt;code>
 * require_once 'CountingMachine.php';
 *
 * $cm = new CountingMachine( 10 );
 *
 * $cm->addNum( 20 );
 *
 * echo $cm->getTotal();
 * &lt;/code>
 *
 * @author NAME REMOVED TO PROTECT THE INNOCENT
 */  
class CountingMachine {  
    /**
     * The running total
     *
     * @var int
     */  
    private $_number;  
 
    /**
     * Create an instance, optionally setting a starting point
     *
     * @param int $initial an integer that represents the number
     *                     to start counting from
     * @access public
     */  
    public function __construct( $initial = 0 ) {  
        $this->_number = $initial;  
    }  
 
    /**
     * Adds a number to the running total
     *
     * @param int an integer to add to the running total
     */  
    public function addNum( $num ) {  
        $this->_number += $num;  
    }  
 
    /**
     * Returns the current total
     *
     * @return int returns the current running total
     * @see CountingMachine::$number
     */  
    public function getTotal() {  
        return $this->_number;  
    }  
}
```

How much do we really need these? Isn’t it better to name things well in the first place so the code ultimately documents itself?

```php
class CountingMachine {  
    /** @var int $_running_total */  
    private $_running_total;  
 
    /** @param int $starting_total */  
    public function __construct( $starting_total = 0 ) {  
        $this->_running_total = $starting_total;  
    }  
 
    /**  @param int $number */  
    public function addNumber( $number ) {  
        $this->_running_total += $number;  
    }  
 
    /** @return int */  
    public function getTotal() {  
        return $this->_running_total;  
    }  
}
```

Do we need to be told what “getTotal” or “addNumber” does? Do we need a description for the running total now that we have named it after what it does?

Ultimately, PHP Doc comments are noise. They make the page hard to read and impossible to love. I remember people getting excited about the same stuff in other languages (Java, C#) but ultimately the lesson was learned and the comments were dropped.

Note that in my second example I leave in the PHP Doc comments that help to guide you about the types of the parameters and properties. This is because PHP isn’t strongly typed like other languages, so you can help developers and IDEs by hinting the types.

Now I’m not advocating that we all start deleting all comment blocks. The question is, could the comment be removed if the code was more self-documenting? Does the comment just repeat what the code is already telling us? Are there more lines in the file dedicated to doc block comments than actual code?

People of the PHP world, you are clever folks – don’t be told you have to create this kind of noise in your code. Let’s set the PHP world free!
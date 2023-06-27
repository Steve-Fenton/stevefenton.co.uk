---
title: 'WordPress loop error using get_the_terms'
navMenu: false
pubDate: 2018-02-01T08:50:44+00:00
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - PHP
    - WordPress
---

If you get this WordPress Loop Error… “Warning: Invalid argument supplied for foreach() in \[filepath\].php on line \[number\]” when you try to loop over terms found using the WordPress function `get_the_terms`, you may find this information useful. It happens when you have a post that hasn’t been linked to any terms… but it *caused* by the lack of defensive code demonstrated below:

```php
$terms = get_the_terms($post->ID, 'custom_taxonomy');

foreach($terms as $term) {
    echo $term->name ;
}
```

This code is a perfectly standard function call and loop that you’ll find in many themes, but it is missing an important check. The amended code, with the check added, is shown below.

```php
$terms = get_the_terms($post->ID, 'custom_taxonomy');

if ($terms && !is_wp_error($terms)) {
    foreach($terms as $term) {
        echo $term->name ;
    }
}
```

By checking that we successfully obtained the terms before attempting to loop over them, we can now survive that errant post with missing taxonomical information.
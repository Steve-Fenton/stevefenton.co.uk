---
layout: src/layouts/Default.astro
navMenu: false
title: 'WordPress custom query page size'
pubDate: 2017-11-28T08:50:39+00:00
author:
    - steve-fenton
categories:
    - CMS
    - Programming
tags:
    - php
    - wordpress
---

WordPress normally takes care of queries for you. When it doesn’t, your next port of call is normally `WP_Query`. After that, you head into nuts-and-bolts mode with a completely custom query using `get_posts`. When you start taking control over queries, you may hit this common problem with page size.

Here is an example of custom query arguments that are going to be used with either `WP_Query` or `get_posts`.

```
<pre class="prettyprint lang-php">
$custom_page_size = 3;

$my_arguments = array(
    'post_type' => 'custom',
    'posts_per_page' => $custom_page_size,
    'offset' => ($paged - 1) * $custom_page_size,
    'meta_key' => 'is_flagged',
    'meta_value' => '0'
);
```

The important bit here, which will cause you pain, is that there is a `$custom_page_size`.

This may appear to work, especially if you aren’t testing your edges. The problem occurs when the number of posts divided by the default page size is less than the number of posts divided by your custom page size.

### The problem with the custom page sizes

An example is needed, here is an example with 12 posts.

```
<pre class="prettyprint">
posts = 12
default page size = 5
custom page size = 3

posts / default page size = 3 pages

posts / custom page size = 4 pages
```

Everything will work on pages 1, 2, and 3. When you reach page 4 though, you’ll get a 404 Not Found error page.

This is because WordPress has worked out that page 4 can’t exist based on the number of posts and the default page size.

### The solution

The solution to this problem is that you shouldn’t define the page size local to your custom query. You should define it somewhere that will change the for both the local query and for the check made by WordPress. You can do this by hooking into `pre_get_posts`, like this example from the themes functions.php file.

```
<pre class="prettyprint lang-php">
function custom_page_sizes($query) {
    if (!is_admin()) {
        if(is_post_type_archive('custom')) {
            $query->set('posts_per_page', 3);
        }
    }
}
add_action('pre_get_posts', 'custom_page_sizes');
```

This allows you to use the default `$posts_per_page` variable in your custom queries, and the number will be the one you defined in the `pre_get_posts` hook.

```
<pre class="prettyprint lang-php">
$my_arguments = array(
    'post_type' => 'custom',
    'posts_per_page' => $posts_per_page,
    'offset' => ($paged - 1) * $posts_per_page,
    'meta_key' => 'is_flagged',
    'meta_value' => '0'
);
```
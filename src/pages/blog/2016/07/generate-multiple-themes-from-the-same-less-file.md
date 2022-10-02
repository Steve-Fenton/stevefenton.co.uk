---
layout: src/layouts/Default.astro
navMenu: false
title: 'Generate multiple themes from the same LESS file'
pubDate: 2016-07-20T17:16:07+01:00
author:
    - steve-fenton
categories:
    - Programming
tags:
    - css
    - less
---

So you have a CSS theme written using LESS. A simple example would be like the example below… you’ve extracted your variables into a file named “variables.less” and you use an import to make those variables available to your main stylesheet. If you decide to change something important, you can do that in the variables file and you don’t need to touch your larger theme file – you just recompile.

![LESS Example](https://www.stevefenton.co.uk/wp-content/uploads/2016/07/less-typical.jpg)

variables.less

```
<pre class="prettyprint lang-less">.someMixinName() {
    font-family: Arial, sans-serif;
    font-weight: normal;
}
```

theme.less

```
<pre class="prettyprint lang-less">@import (reference) "variables.less";

body {
    .someMixinName;
}
```

But what if you wanted to generate two theme files based on different variables?

So far, I have come up with the following solution. I’m open to better ideas.

![LESS Composition](https://www.stevefenton.co.uk/wp-content/uploads/2016/07/less-composition.jpg)

In this example, we introduce a base variables file, which is rather like an abstract base class. You can put shared variables in here – but you would leave some mixins empty to indicate that they need to be implemented in the “sub classes”.

variables-base.less

```
<pre class="prettyprint lang-less">.someMixinName() {
}
```

You can then have two implementations:

variables.less

```
<pre class="prettyprint lang-less">.someMixinName() {
    font-family: Arial, sans-serif;
    font-weight: normal;
}
```

variables-alt.less

```
<pre class="prettyprint lang-less">.someMixinName() {
    font-family: Georgia, serif;
    font-weight: bold;
}
```

In your theme file, you make no changes, except to import the base variables. This will keep your tooling happy as it will now recognise the mixins and variables that you use.

theme.less

```
<pre class="prettyprint lang-less">@import (reference) "variables-base.less";

body {
    .someMixinName;
}
```

You can now create your composition files to generate the different outputs:

theme-1.less

```
<pre class="prettyprint lang-less">@import (reference) "variables.less";
@import "theme.less";
```

theme-2.less

```
<pre class="prettyprint lang-less">@import (reference) "variables-alt.less";
@import "theme.less";
```

Your main theme file is now re-usable entirely, but you get two CSS themes with different contents:

theme-1.css

```
<pre class="prettyprint lang-css">body {
  font-family: Arial, sans-serif;
  font-weight: normal;
}
```

theme-2.css

```
<pre class="prettyprint lang-css">body {
  font-family: Georgia, serif;
  font-weight: bold;
}
```

Obviously, this is a simple example, but you have invested a great deal in your theme file, this gets you multiple themes without duplicating lots of CSS. You could also use this technique to compose different sets of theme files (i.e. not just one theme file), which you could use to modularise the theme, or even create smoosh-ups of different styles.
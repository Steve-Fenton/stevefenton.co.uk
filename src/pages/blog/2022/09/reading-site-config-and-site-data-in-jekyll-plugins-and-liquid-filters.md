---
layout: src/layouts/Default.astro
title: Reading site.config and site.data in Jekyll plugins and Liquid filters
navMenu: false
pubDate: 2022-09-13
keywords: jekyll,plugin,site.config,site.data,liquid filter
description: Find out how to access Jekyll's configuration and site data from a plugin.
bannerImage:
    src: /img/topic/jekyll/jekyll-and-hyde-1931.png
    alt: Promotional for Jekyll and Hyde (1931)
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - Jekyll
    - Liquid
    - Ruby
---

This article explains how to access Jekyll's configuration and site data from a plugin. The plugin adds a Liquid filter, but this applies to other kinds of plugin, too.

Here’s the shape of the plugin, which is pretty typical:

```ruby
require 'liquid'

module Jekyll
  module Language
    def t(section, item)

      # I need site.config for the site language

      # I need the site.data for the language items

    end
  end
end

Liquid::Template.register_filter(Jekyll::Language)
```

We need to reference the configuration without loading it every time the plugin is used. The configuration doesn't change during site generation, so we can just get it once.

## Adding Jekyll configuration

The code below references the configuration using `Jekyll.configuration({})` and reads the `language` entry. It stores this in the `@@lang` module variable, so we only fetch the configuration if we don't already have the language.

```ruby
require 'liquid'

module Jekyll
  module Language

    # The module variable for site.config.language
    @@lang = ''

    def t(section, item)

      if @@lang == ''
        @@lang = Jekyll.configuration({})['language']
      end

      # I need the site.data for the language items

    end
  end
end

Liquid::Template.register_filter(Jekyll::Language)
```

Getting hold of the configuration was easy enough. Now you can grab the site data.

## Adding Jekyll site data

The site is provided within the context, so we can get it from `@context.registers[:site]` (thanks to [Michael Currin for his Jekyll Cheat Sheet](https://michaelcurrin.github.io/dev-cheatsheets/cheatsheets/jekyll/)). Once we have it, we can use it *almost* as we would from within a Liquid tag on the page. The only difference is instead of `site.data.name...` we must use `site.data['name']`.

```ruby
require 'liquid'

module Jekyll
  module Language

    # The module variable for site.config.language
    @@lang = nil

    def t(section, item)

      if @@lang == nil
        @@lang = Jekyll.configuration({})['language']
      end

      site = @context.registers[:site]
      return site.data['language'][section][item][@@lang]

    end
  end
end

Liquid::Template.register_filter(Jekyll::Language)
```

## Language plugin

Here’s a more complete language plugin based on the above. It falls back to English if an entry isn’t found.

**\_config.yaml**

```yaml
language: en #en, fr, fr-be, etc
```

**\_data/language.yaml**

```yaml
skiplinks:
  skip_to_navigation:
    en: Skip to navigation
    fr-be: Aller à la navigation
  skip_to_content:
    en: Skip to main content
    fr-be: Aller au contenu principal
  skip_to_footer:
    en: Skip to footer
    fr-be: Aller au pied de page
```

You simply add entries for any languages you need to support, and apologies for my translation skills in the above example.

**\_plugins/liquid\_language.rb**

The plugin has been expanded to fallback through languages. For example, if your site language is set to `fr-be`, it will check `fr-be`, then `fr`, then the default `en`. This means, for example, you can set up a general “French” language and only customise the “Belgian French” items that differ, rather than having to duplicate the “French” language items that are the same.

```ruby
require 'liquid'

module Jekyll
  module Language
    
    @@lang = nil
    
    # Supplies translated text
    #
    # Usage: {{ 'author' | t: 'recent_articles' }}
    def t(section, item)
      site = @context.registers[:site]

      if @@lang == nil
        # Access this fewer times by keeping it as a module variable
        @@lang = Jekyll.configuration({})['language']
      end
      
      # Find text in the site language (for example 'fr-be')
      text = site.data['language'][section][item][@@lang]

      # Fall back to a more general version of the language (for example 'fr')
      if text == nil and @@lang.include? '-'
        fallback_lang = @@lang.split('-')[0];
        text = site.data['language'][section][item][fallback_lang]
      end

      if text == nil
        # Fallback to English text
        text = site.data['language'][section][item]['en']
      end

      return text
    end
  end
end

Liquid::Template.register_filter(Jekyll::Language)
```

**Usage**

```html
<a href="#site-nav">{{ 'skiplinks' | t: 'skip_to_navigation' }}</a>
```
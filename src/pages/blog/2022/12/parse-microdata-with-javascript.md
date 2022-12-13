---
layout: src/layouts/Default.astro
title: 'How to parse microdata with JavaScript'
navMenu: false
pubDate: 2022-12-13
keywords: microdata,javascript
description: Find out how to extract microdata from a web page using JavaScript.
bannerImage:
    src: /img/2022/12/neatly-arranged-boxes.png
    alt: An abstract stack of neatly arranged boxes.
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - JavaScript
    - Microdata
---

If you are using microdata to add structured data to your web pages, you may find yourself needing to extract the data for some reason, such as testing.

I have written a function for this purpose, which I'm using as part of my Playwright test suite.

Here's how it works:

- Start from elements with an `itemscope`
- Look for `itemprop` attributes and obtain their value
- If the `itemprop` is a new `itemscope`, preserve the hierarchy

The script must handle nested structures, such as articles that have authors. It also needs to handle cases where there are multiple authors (i.e. by upgrading `author` to an array).

## Parse microdata script

The full script is below. You can call `parseMicrodata()` on any page to find microdata.

```javascript
function parseMicrodata() {
    function sanitize(input) {
        return input.replace(/\s/gi, ' ').trim();
    }

    function addValue(information, name, value) {
        if (information[name]) {
            if (typeof information[name] === 'array') {
                information[name].push(value);
            } else {
                const arr = [];
                arr.push(information[name]);
                arr.push(value);
                information[name] = arr;
            }
        } else {
            information[name] = value;
        }
    }

    function traverseItem(item, information) {
        const children = item.children;
        
        for (let i = 0; i < children.length; i++) {
            const child = children[i];

            if (child.hasAttribute('itemscope')) {
                if (child.hasAttribute('itemprop')) {
                    const itemProp = child.getAttribute('itemprop');
                    const itemType = child.getAttribute('itemtype');

                    const childInfo = {
                        itemType: itemType
                    };

                    traverseItem(child, childInfo);

                    itemProp.split(' ').forEach(propName => {
                        addValue(information, propName, childInfo);
                    });
                }

            } else if (child.hasAttribute('itemprop')) {
                const itemProp = child.getAttribute('itemprop');
                itemProp.split(' ').forEach(propName => {
                    if (propName === 'url') {
                        addValue(information, propName, child.href);
                    } else {
                        addValue(information, propName, sanitize(child.content || child.textContent || child.src));
                    }
                });
                traverseItem(child, information);
            } else {
                traverseItem(child, information);
            }
        }
    }

    const microdata = [];

    document.querySelectorAll("[itemscope]").forEach(function(elem, i) {
        const itemType = elem.getAttribute('itemtype');
    
        const information = {
            itemType: itemType
        };
    
        traverseItem(elem, information);

        microdata.push(information);
    });
    
    return microdata;
}
```

## Usage example

Here's an example of using the script within a Playwright test to extract the structured data.

```javascript
import { test, expect } from '@playwright/test';

test('Check home page microdata', async ({ page }) => {
    await page.goto('/devops/');

    const microdata = await page.evaluate(parseMicrodata);

    const article = microdata.filter(i => i.itemType == 'https://schema.org/Article')[0];

    // Check article schema
    expect(article.itemType).toBe('https://schema.org/Article');
    expect(article.headline).toBe('Advanced CSS grid layouts');
    expect(article.image).toBe('/i/x/2022/12/mobile-phones.png');
    expect(article.author.itemType).toBe('https://schema.org/Person');
    expect(article.author.name).toBe('Steve Fenton');
    expect(article.author.url).toBe('https://www.stevefenton.co.uk/authors/steve-fenton/1/');
});
```

As you can see, the data is available as a neat object:

```javascript
[{
  itemType: 'https://schema.org/Article',
  headline: 'Advanced CSS grid layouts',
  //...
  author: {
    name: 'Steve Fenton',
    url: 'https://www.stevefenton.co.uk/authors/steve-fenton/1/',
    // ...
  }
}]
```

## Summary

Using the microdata script, you can obtain the structured data from a page so you can write automated tests to ensure it doesn't get broken.

In my case, I'm keen to ensure a re-ordering of elements in the DOM for stylistic purposes doesn't result in a structured data breakage. It's pretty common for a heading to be moved in a way that breaks the structured data (i.e. it get's moved outside of the `itemscope`).

The script only works with microdata formats, not other structured data formats such as RDFa.
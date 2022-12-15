---
layout: src/layouts/Default.astro
title: 'Detect overflowing elements on a web page'
navMenu: false
pubDate: 2022-12-15
keywords: html,overflowing,content
description: Find out how to identify overflowing content on a web page with a JavaScript script.
bannerImage:
    src: /img/2022/12/overflow-detector.png
    alt: A web page with a detection script that highlights overflowing elements
authors:
    - steve-fenton
categories:
    - Programming
tags:
    - HTML
    - CSS
    - JavaScript
---

It is pretty common to discover a mis-behaving element on your web page, which overflows the width you intended. This is especially common at mobile breakpoints. You can use JavaScript to detect and highlight elements that overflow the viewport, or their parent.

Here's quick rundown of the script's concept.

1. Grab all the elements on the page
2. Check the element is _not_ wider than the document width
3. Check the element is _not_ wider than the parent's width
4. Visually highlight the problem elements
5. Add the problem elements to a list of issues

## Overflowing element detection script

```javascript
const issues = [];

function warn(el) {
  // Style the detected issues
  el.style.outline = '2px solid #FFCC00';
  el.style.backgroundColor = '#FFCC00';
  el.style.backgroundImage  = 'linear-gradient(135deg, rgba(255,0,0,1) 0%, rgba(255,204,0,1) 35%, rgba(0,212,255,1) 100%)';
}

function checkScrollingAncestor(elem) {
    if (!elem.parentElement || elem.parentElement.tagName.toLowerCase() === 'body') {
        return false;
    }

    const computedStyle = window.getComputedStyle(elem.parentElement);

    if (computedStyle.overflowX == 'auto') {
        return true;
    } else {
        return checkScrollingAncestor(elem.parentElement);
    }
}

function getSizedAncestor(elem) {
    if (!elem.parentElement) {
        return null;
    }

    if (elem.parentElement.offsetWidth > 0) {
        return elem.parentElement;
    } else {
        return getSizedAncestor(elem.parentElement);
    }
}

function checkElement(el) {
    const hasScrollingAncestor = checkScrollingAncestor(el);
    if (hasScrollingAncestor) {
        return;
    }

    // Find elements that overflow the document width
    if (el.offsetWidth > document.documentElement.offsetWidth) {
        warn(el);
        issues.push(el);
    }

    const ancestor = getSizedAncestor(el);
    const info = window.getComputedStyle(el);

    // Find any negative margins (deliberate outflow)
    const adjustment = 
        (info.marginLeft.startsWith('-') ? parseFloat(info.marginLeft) * -1 : 0)
        +
        (info.marginRight.startsWith('-') ? parseFloat(info.marginRight) * -1 : 0);

    if (ancestor && (el.offsetWidth - adjustment) > ancestor.offsetWidth) {
      warn(el);
      issues.push(el);
    }
}

document.querySelectorAll('*').forEach(checkElement);

issues.length > 0 && issues[0].scrollIntoView();
console.log(issues);
```

If you run this script in your developer tools' console, you'll see problem elements highlighted with an outline and background.

:::figure{.inset}
:img{src="/img/2022/12/overflow-detector.png" alt="A web page with a detection script that highlights overflowing elements" loading="lazy"}
::figcaption[An overflowing heading]
:::

## Adding overflow detection to a Playwright test

I'm automating this check as a crawl within a Playwright test. As part of this, I've encoded special cases to avoid failing tests where I've deliberately allowed a scrollable element (and therefore the child is wider than the scrolling parent).

- In `getLinks` add an appropriate query selector to find all the links on your site, such as `.site-nav a`.
- In the loop within `document.querySelectorAll('*')` you can add special exceptions, such as the exception for `.table-wrap`

The test gets all the links, resizes the browser, then checks each page for overflowing elements.

```typescript
import { test, expect } from '@playwright/test';

function getLinks(): string[] {
  return [...document.querySelectorAll('.site-nav a') as NodeListOf<HTMLAnchorElement>]
    .map(a => a.href);
}

function getIssues() {
  const getSelector = function (el: HTMLElement | null): string {
    if (el == null) {
      return '';
    }

    if (el.tagName.toLowerCase() == 'html') {
      return 'HTML';
    }

    let selector = el.tagName;
    selector += (el.id) ? '#' + el.id : '';

    if (el.className) {
      const classes = el.className.split(/\s/);
      for (let i = 0; i < classes.length; i++) {
        selector += '.' + classes[i]
      }
    }
    return getSelector(el.parentElement) + ' > ' + selector;
  }

  const issues: string[] = [];

  function warn(el: HTMLElement) {
    // Style the detected issues
    el.style.outline = '2px solid #FFCC00';
    el.style.backgroundColor = '#FFCC00';
    el.style.backgroundImage = 'linear-gradient(135deg, rgba(255,0,0,1) 0%, rgba(255,204,0,1) 35%, rgba(0,212,255,1) 100%)';
  }

  function checkScrollingAncestor(elem: HTMLElement): boolean {
    if (!elem.parentElement || elem.parentElement.tagName.toLowerCase() === 'body') {
      return false;
    }

    const computedStyle = window.getComputedStyle(elem.parentElement);

    if (computedStyle.overflowX == 'auto') {
      return true;
    } else {
      return checkScrollingAncestor(elem.parentElement);
    }
  }

  function getSizedAncestor(elem: HTMLElement): HTMLElement | null {
    if (!elem.parentElement) {
      return null;
    }

    if (elem.parentElement.offsetWidth > 0) {
      return elem.parentElement;
    } else {
      return getSizedAncestor(elem.parentElement);
    }
  }

  function checkElement(el: Element) {
    const elem = el as HTMLElement;
    const hasScrollingAncestor = checkScrollingAncestor(el);
    if (hasScrollingAncestor) {
      return;
    }

    // Find elements that overflow the document width
    if (elem.offsetWidth > document.documentElement.offsetWidth) {
      warn(elem);
      issues.push(getSelector(elem));
    }

    const ancestor = getSizedAncestor(elem);
    const info = window.getComputedStyle(elem);

    // Find any negative margins (deliberate outflow)
    const adjustment =
      (info.marginLeft.startsWith('-') ? parseFloat(info.marginLeft) * -1 : 0)
      +
      (info.marginRight.startsWith('-') ? parseFloat(info.marginRight) * -1 : 0);

    if (ancestor && (elem.offsetWidth - adjustment) > ancestor.offsetWidth) {
      warn(elem);
      issues.push(getSelector(elem));
    }
  }

  document.querySelectorAll('*').forEach(checkElement);

  return issues;
}

/**
 * If this fails, use the script at: 
 * https://www.stevefenton.co.uk/blog/2022/12/detect-overflowing-elements/
 */
test('Test pages for layout issues', async ({ page }) => {
  await page.goto('/');
  const links = await page.evaluate(getLinks);
  await page.setViewportSize({ width: 393, height: 851 });

  for (let link of links) {
    await page.goto(link);
    const issues = await page.evaluate(getIssues);
    if (issues.length > 0) {
      console.log(link, issues);
    }

    expect(issues.length).toBe(0);
  }

  console.log('Layout checked', links.length);
});
```
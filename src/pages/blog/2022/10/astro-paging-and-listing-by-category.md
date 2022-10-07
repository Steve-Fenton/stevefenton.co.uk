---
layout: src/layouts/Default.astro
title: 'Astro paging and listing by category'
navMenu: false
pubDate: 2022-10-02
keywords: astro,static site generator,paging,listing
description: Take a look at how Astro handles pages and lists.
bannerImage:
  src: /img/2022/10/milky-way.png
  alt: The Astro rocket logo
authors:
  - steve-fenton
categories:
  - Programming
tags:
  - Astro
  - JavaScript
  - TypeScript
---

When you have blogs, articles, news, or similar collections of posts in Astro, you can generate paged lists of these items automatically. The mechanism to do this involves two key components.

- A file path that has one or more tokens
- A `getStaticPaths` function that gives Astro the information needed to generate pages

## File path tokens

Let’s call our collection “articles” for these examples. You don’t want one long list of articles, you want to provide pages of articles with the most recent ones first.

You can create pages that will be found at the following addresses:

```
/pages/articles/1/
/pages/articles/2/
/pages/articles/3/
```

To do this, we create the following filein `/pages/articles/` with the name `[page].astro`.

As you can see, we have used a token for `[page]`; this will be replaced with each page number.

A more complex example would be to have paged lists *per category*. That is possible, too – you can use tokens anywhere in the file path.

For our paged list by category, we’ll add another file within `/pages/articles/` but this time we'll use folders and file names to create `category/[category]/[page].astro`. The idea is to generate addresses for all the categories:

```
/pages/articles/category/typescript/1/
/pages/articles/category/typescript/2/
/pages/articles/category/javascript/1/
/pages/articles/category/javascript/2/
```

The only rule for tokens is that each one needs to have a param when we create the `getStaticPaths` function. Cue segueway jingle…

## The `getStaticPaths` function

The basic structure of the `getStaticPaths` function is:

1. You grab a list of posts that are relevant
2. You hand them over to `paginate`
3. You return what `paginate` gives you

Here’s the basic shape of things:

```typescript
export async function getStaticPaths({ paginate }: any) {
  // Get a list of "appropriate posts... then:
  return paginate(posts, { pageSize: SITE.pageSize });
}
```

And a working example of “page all articles”:

```typescript
const sortByPubDateDesc = (a: MarkdownInstance<Record<string, any>>, b: MarkdownInstance<Record<string, any>>) => {
  return b.frontmatter.pubDate.localeCompare(a.frontmatter.pubDate);
}

export async function getStaticPaths({ paginate }: any) {
  const sourcePosts = await Astro.glob('./**/*.md');
  const posts = sourcePosts
    .filter(p => p.url != null && p.url != '')
    .sort(sortByPubDateDesc);

  return paginate(posts, { pageSize: SITE.pageSize });
}
```

In the above example, we filter and sort the posts we found with `Astro.glob`. In most cases, it makes sense to place the `[page].astro` page in the same folder as all the posts, like `/pages/articles/` or `/pages/blog/`, so we can look for all markdown files in subfolders.

But what if we want to add category lists?

You just need to do a little more work in our function.

The example below is broken into three chunks… get all the posts, then find a list of categories based on them, and then create a paginate instance for each category with a filtered list of posts.

```typescript
export async function getStaticPaths({ paginate }: any) {
  const sourcePosts = await Astro.glob('../../**/*.md');
  const posts = sourcePosts
    .filter(p => p.url != null && p.url != '')
    .sort(sortByPubDateDesc);

  const categories: string[] = [];
  posts.forEach(p => {
    const cats: string[] = p.frontmatter.categories ?? [];
    if (cats.length == 0) {
      console.log('No categories found', p.url);
    }
    cats.forEach(c => {
      if (!categories.includes(c)) {
        categories.push(c);
      }
    });
  });

  return categories.map(c => {
    const filtered = posts.filter(p => {
      const cats: string[] = p.frontmatter.categories ?? [];
      return cats.includes(c);
    });
    return paginate(
      filtered,
      { params: { category: c.toLowerCase() },
      pageSize: SITE.pageSize
    });
  });
}
```

## Summing up

The combination of file path tokens and the `getStaticPaths` function, with their shared params / tokens is what powers the generation of paged lists.

You can see a working example in my [Astro Accelerator project on GitHub](https://github.com/Steve-Fenton/astro-accelerator/tree/main/src/pages/articles).
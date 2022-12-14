import { SITE } from '@config';
import type { MarkdownInstance } from 'astro';
import type { NavPage } from './NavigationTypes';

import { Urls } from 'astro-accelerator-utils';

export function mapNavPage (page: MarkdownInstance<Record<string, any>>) {

  let url = page.url == null || (page.url ?? '').length == 0 
      ? '/'
      : page.url;

  // Send visitors straight to the first page
  if (page.frontmatter.paged) {
    url += '/1/';
  }

  url = Urls.addSlashToAddress(url, SITE);

  if (page.frontmatter.layout == 'src/layouts/Redirect.astro') {
    // Skips past the redirect
    url = page.frontmatter.redirect;
  }

  const entry: NavPage = {
    section: page.frontmatter.navSection ?? page.frontmatter.navTitle ?? page.frontmatter.title,
    title: page.frontmatter.navTitle ?? page.frontmatter.title,
    url: url,
    order: page.frontmatter.navOrder,
    children: [],
    // These are later set to the correct value, but not now as we want to cache
    isOpen: false,
    ariaCurrent: false,
  }

  return entry;
};

export function setCurrentPage (pages: NavPage[], currentUrl: URL) {
  pages.forEach(p => {
    p.isOpen = currentUrl.pathname.startsWith(p.url);
    p.ariaCurrent = p.url == currentUrl.pathname ? 'page': false;
    if (p.children) setCurrentPage(p.children, currentUrl);
  });
}

export function popMatchingPage (allPages: MarkdownInstance<Record<string, any>>[], search: string) {
  const numberToRemove = 1;
  let indexToRemove = -1;
  let match = null;

  for (let i = 0; i < allPages.length; i++) {
    if (allPages[i].url == search) {
      indexToRemove = i;
      match = allPages[i];
    }
  }

  if (match) {
    allPages.splice(indexToRemove, numberToRemove);
  }

  return match;
};

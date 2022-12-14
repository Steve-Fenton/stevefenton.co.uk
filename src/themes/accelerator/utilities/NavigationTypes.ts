export type NavPage = {
  section?: string;
  title: string;
  url: string;
  order: number;
  isOpen: boolean;
  ariaCurrent: 'page' | false;
  children: NavPage[];
  rel?: string;
}

export function isNavPage (item: NavPage | 'auto' | 'tags' | 'toptags' | 'categories') : item is NavPage {
  if (typeof item === 'string' && ['auto', 'tags', 'toptags', 'categories'].includes(item)) {
    return false;
  }

  return true;
}

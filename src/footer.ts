import type { NavPage } from '@util/NavigationTypes.astro';

export const menu: (NavPage | 'categories' | 'tags' | 'toptags')[] = [
	'categories',
	'toptags',
	{
		title: 'Quick Links',
		url: '',
		ariaCurrent: false,
		isOpen: false,
		order: 1,
		section: '',
		children: [{
			title: '🐘 Mastodon',
			url: 'https://mastodon.social/@stevefenton',
			ariaCurrent: false,
			isOpen: false,
			order: 1,
			section: '',
			children: []
		},{
			title: '🐈 GitHub',
			url: 'https://github.com/Steve-Fenton',
			ariaCurrent: false,
			isOpen: false,
			order: 1,
			section: '',
			children: []
		},{
			title: '🏢 LinkedIn',
			url: 'https://www.linkedin.com/in/stevefenton/',
			ariaCurrent: false,
			isOpen: false,
			order: 1,
			section: '',
			children: []
		}]
}];

/*
See navigation.ts
Allows customisation of the footer navigation

'categories' -> Auto columns of links for categories
'tags' -> Auto columns of links for tags

*/
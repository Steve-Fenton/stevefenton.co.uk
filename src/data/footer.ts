import type { MenuItem } from '@util/NavigationTypes.astro';

export const menu: (MenuItem | 'categories' | 'tags' | 'toptags')[] = [
	'categories',
	'toptags',
	{
		title: 'Quick Links',
		order: 1,
		children: [{
			title: '🐘 Mastodon',
			url: 'https://mastodon.social/@stevefenton',
			order: 10,
			rel: 'me',
		},{
			title: '🦋 Bluesky',
			url: 'https://bsky.app/profile/stevefenton.co.uk',
			order: 20,
			rel: 'me',
		},{
			title: '🐈 GitHub',
			url: 'https://github.com/Steve-Fenton',
			order: 30,
			rel: 'me',
		},{
			title: '🏢 LinkedIn',
			url: 'https://www.linkedin.com/in/stevefenton/',
			order: 40,
			rel: 'me',
		},{
			title: '♾️ DevOps engineer\'s handbook',
			url: 'https://www.octopus.com/devops/authors/steve-fenton/1/',
			order: 50,
			rel: 'me',
		},{
			title: '📚 The New Stack',
			url: 'https://thenewstack.io/author/steve-fenton/',
			order: 60,
			rel: 'me',
		},{
			title: '🔮 Medium',
			url: 'https://medium.com/@steve.fenton',
			order: 70,
			rel: 'me',
		}]
}];

/*
See navigation.ts
Allows customisation of the footer navigation

'categories' -> Auto columns of links for categories
'tags' -> Auto columns of links for tags

*/

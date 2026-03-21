import type { MenuItem } from '@util/NavigationTypes.astro';

export const menu: (MenuItem | 'categories' | 'tags' | 'toptags')[] = [
	'categories',
	'toptags',
	{
		title: 'Quick Links',
		order: 1,
		children: [{
			title: '🗼 RSS feed',
			url: 'https://stevefenton.co.uk/feed.xml',
			order: 0
		}, {
			title: '🐘 Mastodon',
			url: 'https://mastodon.social/@stevefenton',
			order: 10,
			rel: 'me',
		}, {
			title: '🦋 Bluesky',
			url: 'https://bsky.app/profile/stevefenton.co.uk',
			order: 20,
			rel: 'me',
		}, {
			title: '🐈 GitHub',
			url: 'https://github.com/Steve-Fenton',
			order: 30,
			rel: 'me',
		}, {
			title: '🏢 LinkedIn',
			url: 'https://www.linkedin.com/in/stevefenton/',
			order: 40,
			rel: 'me',
		}, {
			title: '♾️ DevOps',
			url: 'https://www.octopus.com/devops/authors/steve-fenton/1/',
			order: 50,
			rel: 'me',
		}, {
			title: '🐙 Octopus blog',
			url: 'https://www.octopus.com/blog/authors/steve-fenton/1/',
			order: 50,
			rel: 'me',
		}, {
			title: '📚 The New Stack',
			url: 'https://thenewstack.io/author/steve-fenton/',
			order: 60,
			rel: 'me',
		}, {
			title: '🔮 Medium',
			url: 'https://medium.com/@steve.fenton',
			order: 70,
			rel: 'me',
		}, {
			title: '⛽ DEV',
			url: 'https://dev.to/_steve_fenton_',
			order: 80,
			rel: 'me',
		}, {
			title: '💻 Coderlegion',
			url: 'https://coderlegion.com/user/Steve+Fenton',
			order: 90,
			rel: 'me',
		}]
	}];

/*
See navigation.ts
Allows customisation of the footer navigation

'categories' -> Auto columns of links for categories
'tags' -> Auto columns of links for tags

*/

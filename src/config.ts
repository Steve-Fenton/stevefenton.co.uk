export const SITE = {
	url: 'https://stevefenton.co.uk',
	subfolder: '',
	useTrailingUrlSlash: true,
	captureStatistics: false,
	feedUrl: '/feed.xml',
	title: 'Steve Fenton',
	description: 'My website, tech blog, and other information.',
	startYear: '2009',
	defaultLanguage: 'en',
	themeColor: '#222255',
	owner: 'Steve Fenton',
	default: {
		lang: 'en',
		locale: 'en-GB',
		ogLocale: 'en_GB',
		dir: 'ltr'
	},
	search: {
		fallbackUrl: 'https://www.google.com/search',
		fallbackSite: 'q',
		fallbackQuery: 'q',
	},
	pageSize: 10,
	pageLinks: 5,
	rssLimit: 20,
	dateOptions: {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	},
	cacheMaxAge: 200,
	featureFlags: {
		stickyNav: { top: 100 },
		codeBlocks: ['copy'],
		figures: ['enlarge'],
		youTubeLinks: ['embed'],
		headers: ['link'],
		search: ['dialog','headings'],
	},
	images: {
		contentSize: '(max-width: 860px) 100vw, 620px',
		listerSize: '(max-width: 860px) 90vw, 372px',
		authorSize: '50px',
	}
};

// Default image for OG: Tags
export const OPEN_GRAPH = {
	image: {
		src: '/img/surface-accessories.png',
		alt: 'Alt text for image goes here',
	}
};

export const HEADER_SCRIPTS = `
<meta name="copyright" content="Steve Fenton">
<link rel="preload" href="/css/AtkinsonHyperlegibleNext-Bold.otf" as="font" crossorigin>
<link rel="preload" href="/css/AtkinsonHyperlegibleNext-Regular.otf" as="font" crossorigin>
<script defer src="https://cloud.umami.is/script.js" data-website-id="6873987a-df53-4cf3-bd80-5a66c1af0886"></script>
`.trim();


export const SITE = {
	url: 'https://www.stevefenton.co.uk',
	title: 'Steve Fenton',
	description: 'My website, tech blog, and other information.',
	defaultLanguage: 'en',
	themeColor: '#336699',
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
<meta name="google-site-verification" content="yMPNx-fUOFkHhPCbuRMPgjQzZ6fOdT8YKZP6RVtAw7M" />
<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-Q3C5CMFDKJ"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-Q3C5CMFDKJ', { 'anonymize_ip': true });
  gtag('set', 'allow_ad_personalization_signals', false);
</script>
`.trim();

type Mapped<T> = {
    [P in keyof T]?: any
}

export type Site = Mapped<typeof SITE>;

export type Frontmatter = {
	layout: string;
	title: string;
	keywords: string;
	description: string;
	pubDate: Date;
	id?: string;
	authors?: string[];
	navTitle?: string;
	navSection?: string;
	navOrder?: number;
	bannerImage?: { src: string; alt: string };
	dir?: 'ltr' | 'rtl';
	ogLocale?: string;
	lang?: string;
	paged?: boolean;
	navSearch?: boolean;
	navSitemap?: boolean;
	navMenu?: boolean;
};
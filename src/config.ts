export const SITE = {
	url: 'https://www.stevefenton.co.uk',
	subfolder: '',
	useTrailingUrlSlash: true,
	feedUrl: '/blog/feed.xml',
	title: 'Steve Fenton',
	description: 'My website, tech blog, and other information.',
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
<link rel="preload" href="/css/Atkinson-Hyperlegible-Bold-102a.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/css/Atkinson-Hyperlegible-Regular-102a.woff2" as="font" type="font/woff2" crossorigin>
<script>
if (document.location.hostname === 'www.stevefenton.co.uk') {
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "dz9of278l4");
}
</script>
<!-- TODO: Remove GA -->
<meta name="google-site-verification" content="yMPNx-fUOFkHhPCbuRMPgjQzZ6fOdT8YKZP6RVtAw7M" />
<script>
function add_ga(id) {
  var script = document.createElement('script');
  script.setAttribute('async', 'async');
  script.src = 'https://www.googletagmanager.com/gtag/js?id=' + id;
  document.getElementsByTagName('head')[0].appendChild(script);
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', id, { 'anonymize_ip': true });
  gtag('set', 'allow_ad_personalization_signals', false);
}
if (document.location.hostname === 'www.stevefenton.co.uk') {
  add_ga('G-Q3C5CMFDKJ')
}
</script>
`.trim();


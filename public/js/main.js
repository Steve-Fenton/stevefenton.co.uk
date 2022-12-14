// @ts-check
import { addIntersectionObserver, addListImageIntersectionObserver } from './modules/animation.js';
import { addResizedEvent } from './modules/resizing.js';
import { addStickyNavigation } from './modules/nav-sticky.js';
import { addMobileNav } from './modules/nav-mobile.js';
import { setClickableBlocks } from './modules/click-blocks.js';
import { setExternalLinkAttributes } from './modules/external-links.js';
import { monitorInputType } from './modules/input-type.js';
import { enableSharing } from './modules/share.js';

const resizedEventName = addResizedEvent();

setClickableBlocks();
setExternalLinkAttributes();
addStickyNavigation('.site-header', '#site-nav', '#site-nav > ul', resizedEventName);
addMobileNav(resizedEventName);
addIntersectionObserver('.anim-show-parent img, .anim-show-parent .list-item');
addListImageIntersectionObserver('.post-list img');
monitorInputType();
enableSharing();

// @ts-ignore
const f = site_features ?? {};

/**
 * 
 * @param {string[]} settings 
 * @param {string} option 
 * @returns 
 */
function enabled(settings, option) {
    return settings
        && settings.includes(option);
}

if (enabled(f.youTubeLinks, 'embed')) {
    const youTube = await import('./modules/youtube.js');
    youTube.enhanceYoutubeLinks();
}

if (enabled(f.codeBlocks, 'copy')) {
    const codeBlocks = await import('./modules/code-blocks.js');
    codeBlocks.enhanceCodeBlocks();
}

if (enabled(f.figures, 'enlarge')) {
    const figures = await import('./modules/figures.js');
    figures.enhanceFigures();
}

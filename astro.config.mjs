import remarkDirective from 'remark-directive';
import { defineConfig } from 'astro/config';
import { attributeMarkdown } from './src/plugins/custom-markdown.mjs';

// https://astro.build/config
export default defineConfig({
    site: 'https://www.stevefenton.co.uk',
    markdown: {
        remarkPlugins: [
            remarkDirective,
            attributeMarkdown
        ],
        extendDefaultPlugins: true,
    },
});

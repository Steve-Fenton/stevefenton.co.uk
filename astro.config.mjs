import remarkDirective from 'remark-directive';
import { defineConfig } from 'astro/config';
import { attributeMarkdown, wrapTables } from './src/themes/accelerator/utilities/custom-markdown.mjs';

// https://astro.build/config
export default defineConfig({
    site: 'https://www.stevefenton.co.uk',
    markdown: {
        shikiConfig: {
            theme: 'nord'
        },
        remarkPlugins: [
            remarkDirective,
            attributeMarkdown,
            wrapTables
        ],
        extendDefaultPlugins: true,
    },
});

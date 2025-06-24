import remarkDirective from 'remark-directive';
import { defineConfig } from 'astro/config';
import { defaultLayout } from '/src/themes/accelerator/utilities/default-layout.mjs';
import { attributeMarkdown, wrapTables } from './src/themes/accelerator/utilities/custom-markdown.mjs';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
    site: 'https://stevefenton.co.uk',
    integrations: [mdx()],
    markdown: {
        shikiConfig: {
            theme: 'nord'
        },
        remarkPlugins: [
            defaultLayout,
            remarkDirective,
            attributeMarkdown,
            wrapTables
        ],
        extendDefaultPlugins: true,
        trailingSlash: 'always'
    },
    server: {
        port: 3000
    },
});

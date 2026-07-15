import remarkDirective from 'remark-directive';
import { defineConfig } from 'astro/config';
import { readingTime } from '/src/themes/accelerator/utilities/reading-time.mjs';
import { unified } from '@astrojs/markdown-remark';
import { defaultLayout } from '/src/themes/accelerator/utilities/default-layout.mjs';
import { attributeMarkdown, wrapTables } from './src/themes/accelerator/utilities/custom-markdown.mjs';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: "https://stevefenton.co.uk",
  integrations: [mdx()],
  trailingSlash: "always",
  markdown: {
    shikiConfig: {
      theme: "nord",
    },
    processor: unified({
      remarkPlugins: [
        defaultLayout,
        remarkDirective,
        attributeMarkdown,
        wrapTables,
        readingTime,
      ],
    }),
  },
  server: {
    port: 3000,
  },
});

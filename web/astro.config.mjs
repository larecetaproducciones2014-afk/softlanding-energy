import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://softlanding-energy.com',
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/gracias/'),
    }),
  ],
  image: { layout: 'constrained' },
});

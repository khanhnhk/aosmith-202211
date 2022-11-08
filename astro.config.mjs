import { defineConfig } from 'astro/config';
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import image from "@astrojs/image";
import netlify from '@astrojs/netlify/functions';

export default defineConfig({
  integrations: [react(), tailwind(
    {config: { applyBaseStyles: false }}
  ), image()],
});
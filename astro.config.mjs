// @ts-check
import { defineConfig, fontProviders, svgoOptimizer } from "astro/config";

import netlify from "@astrojs/netlify";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://jamesbuttonoboe.com/",

  adapter: netlify({
    imageCDN: false,
  }),

  build: {
    inlineStylesheets: "always",
  },

  fonts: [
    {
      provider: fontProviders.google(),
      name: "Playfair Display",
      cssVariable: "--font-Playfair",
      weights: [400, 700],
      subsets: ["latin"],
      styles: ["normal"],
    },
    {
      provider: fontProviders.google(),
      name: "Montserrat",
      cssVariable: "--font-Montserrat",
      weights: [400, 700],
      subsets: ["latin"],
      styles: ["normal"],
    },
  ],

  image: {
    responsiveStyles: true,
  },

  experimental: {
    svgOptimizer: svgoOptimizer(),
  },

  integrations: [
    sitemap({
      filter: (page) => page !== "https://jamesbuttonoboe.com/ds/",
      lastmod: new Date(),
    }),
  ],
});
